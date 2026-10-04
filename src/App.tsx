/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from 'react';
import {
  DECK_QUESTIONS,
  DEFAULT_SYNTHESIS_RESULT,
  DEFAULT_WEIGHTS,
  createInitialAnswers,
  type AnswerRecord,
  type PerspectiveId,
  type SynthesisResult,
  type WeightParameters,
} from './data/deckData';
import { AuthDeckScreen } from './components/AuthDeckScreen';
import { TopNavHeader, type ScreenMode } from './components/TopNavHeader';
import { QuestionDeckScreen } from './components/QuestionDeckScreen';
import { DossierReviewScreen } from './components/DossierReviewScreen';
import { SynthesisOutputScreen } from './components/SynthesisOutputScreen';
import { BackendArchModal } from './components/BackendArchModal';
import { AmbientStarfieldBackground } from './components/AmbientStarfieldBackground';
import { PremiumUpgradeModal } from './components/PremiumUpgradeModal';

export default function App() {
  const [screen, setScreen] = useState<ScreenMode>('AUTH');
  const [email, setEmail] = useState('founder@startup.io');
  const [ventureName, setVentureName] = useState('Venture Vision');
  // Start on index 3 (CUST-04: Question 04 / 08) so the initial Deck view matches Image 6 immediately
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(3);
  const [answers, setAnswers] = useState<Record<string, AnswerRecord>>(() =>
    createInitialAnswers()
  );
  const [weights, setWeights] = useState<WeightParameters>(DEFAULT_WEIGHTS);
  const [synthesis, setSynthesis] = useState<SynthesisResult>(
    DEFAULT_SYNTHESIS_RESULT
  );
  const [autosaveStatus, setAutosaveStatus] = useState<'saved' | 'saving'>('saved');
  const [isSynthesizing, setIsSynthesizing] = useState(false);
  const [ambientMode, setAmbientMode] = useState<'daylight' | 'studio'>('daylight');
  const [backendModalOpen, setBackendModalOpen] = useState(false);
  const [isPro, setIsPro] = useState(false);
  const [premiumModalOpen, setPremiumModalOpen] = useState(false);
  const [qwenApiBase, setQwenApiBase] = useState('http://localhost:11434/v1');
  const [qwenModelName, setQwenModelName] = useState('qwen3:4b');

  // Hydrate initial session state from Express backend on mount
  useEffect(() => {
    fetch('/api/session')
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data) {
          if (data.email) setEmail(data.email);
          if (data.ventureName) setVentureName(data.ventureName);
          if (data.answers) setAnswers(data.answers);
          if (data.weights) setWeights(data.weights);
          if (data.lastSynthesis) setSynthesis(data.lastSynthesis);
          if (data.qwenConfig?.apiBase) setQwenApiBase(data.qwenConfig.apiBase);
          if (data.qwenConfig?.modelName)
            setQwenModelName(data.qwenConfig.modelName);
        }
      })
      .catch(() => {});
  }, []);

  // Autosave helper to backend
  const triggerBackendAutosave = (
    updatedAnswers: Record<string, AnswerRecord>,
    updatedWeights = weights
  ) => {
    setAutosaveStatus('saving');
    fetch('/api/session/autosave', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email,
        ventureName,
        answers: updatedAnswers,
        weights: updatedWeights,
      }),
    })
      .then(() => {
        setTimeout(() => setAutosaveStatus('saved'), 250);
      })
      .catch(() => {
        setAutosaveStatus('saved');
      });
  };

  const handleSelectAnswer = (
    questionId: string,
    optionId: 'A' | 'B' | 'C' | 'D',
    notes: string
  ) => {
    const nextAnswers: Record<string, AnswerRecord> = {
      ...answers,
      [questionId]: {
        questionId,
        selectedOptionId: optionId,
        notes,
        updatedAt: new Date().toISOString(),
      },
    };
    setAnswers(nextAnswers);
    triggerBackendAutosave(nextAnswers);
  };

  const handleSelectPerspective = (perspective: PerspectiveId) => {
    if (perspective === 'CUSTOMER') {
      // Jump to Question 04/08 on Customer if coming from overview, or first question of Customer
      setCurrentQuestionIndex(3);
      return;
    }
    const firstIdx = DECK_QUESTIONS.findIndex(
      (q) => q.perspective === perspective
    );
    if (firstIdx !== -1) {
      setCurrentQuestionIndex(firstIdx);
    }
  };

  const handleRunSynthesis = async (customWeights?: WeightParameters) => {
    const activeWeights = customWeights || weights;
    if (customWeights) {
      setWeights(customWeights);
    }
    setIsSynthesizing(true);
    try {
      const response = await fetch('/api/qwen3/synthesize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          answers,
          weights: activeWeights,
          ventureName,
          apiBase: qwenApiBase,
          modelName: qwenModelName,
        }),
      });
      if (response.ok) {
        const data = await response.json();
        if (data.synthesis) {
          setSynthesis(data.synthesis);
        }
      }
    } catch {
      // Fallback retains current synthesis state
    } finally {
      setIsSynthesizing(false);
      setScreen('SYNTHESIS');
      if (!isPro) {
        setPremiumModalOpen(true);
      }
    }
  };

  const handleSaveEndpointConfig = (apiBase: string, modelName: string) => {
    setQwenApiBase(apiBase);
    setQwenModelName(modelName);
    fetch('/api/session/autosave', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        qwenConfig: { apiBase, modelName },
      }),
    }).catch(() => {});
  };

  const handleLogout = () => {
    fetch('/api/auth/logout', { method: 'POST' }).catch(() => {});
    setScreen('AUTH');
  };

  const activeQuestion =
    DECK_QUESTIONS[currentQuestionIndex] || DECK_QUESTIONS[0];

  return (
    <div
      className={`relative min-h-screen w-full overflow-x-hidden flex flex-col justify-between transition-colors duration-500 ${
        ambientMode === 'daylight'
          ? 'bg-[#f5faf8] text-[#0F172A]'
          : 'theme-dark bg-[#070d14] text-[#F1F5F9]'
      }`}
    >
      {/* Motion Background: Ambient Diffused Stars + Luminous Nebula Halos */}
      <AmbientStarfieldBackground mode={ambientMode} />

      {/* Screen 1: Authorization / Login 3D Deck */}
      {screen === 'AUTH' ? (
        <AuthDeckScreen
          email={email}
          setEmail={setEmail}
          ventureName={ventureName}
          setVentureName={setVentureName}
          onStartDeck={(targetPerspective) => {
            if (targetPerspective) {
              handleSelectPerspective(targetPerspective);
            }
            setScreen('DECK');
          }}
          onJumpToDossier={() => setScreen('DOSSIER')}
          onJumpToSynthesis={() => {
            setScreen('SYNTHESIS');
            if (!isPro) {
              setPremiumModalOpen(true);
            }
          }}
          onOpenBackendArch={() => setBackendModalOpen(true)}
        />
      ) : (
        <>
          {/* Persistent Top Navigation Header for Deck, Dossier, and Synthesis */}
          <TopNavHeader
            currentScreen={screen}
            activePerspective={activeQuestion.perspective}
            onSelectPerspective={handleSelectPerspective}
            onNavigateScreen={(nextScreen) => {
              setScreen(nextScreen);
              if (nextScreen === 'SYNTHESIS' && !isPro) {
                setPremiumModalOpen(true);
              }
            }}
            onOpenBackendArch={() => setBackendModalOpen(true)}
            email={email}
            ambientMode={ambientMode}
            onToggleAmbient={() =>
              setAmbientMode((m) => (m === 'daylight' ? 'studio' : 'daylight'))
            }
            onLogout={handleLogout}
            isPro={isPro}
            onOpenProModal={() => setPremiumModalOpen(true)}
          />

          {/* Main Content Arena */}
          <main className="relative z-10 flex-1 flex flex-col justify-center">
            {screen === 'DECK' && (
              <QuestionDeckScreen
                currentQuestionIndex={currentQuestionIndex}
                onChangeQuestionIndex={setCurrentQuestionIndex}
                answers={answers}
                onSelectAnswer={handleSelectAnswer}
                autosaveStatus={autosaveStatus}
                onFinishToDossier={() => setScreen('DOSSIER')}
                onSelectPerspective={handleSelectPerspective}
              />
            )}

            {screen === 'DOSSIER' && (
              <DossierReviewScreen
                answers={answers}
                onEditPerspective={(p) => {
                  handleSelectPerspective(p);
                  setScreen('DECK');
                }}
                onReviewFullDeck={() => {
                  setCurrentQuestionIndex(0);
                  setScreen('DECK');
                }}
                onRunSynthesis={() => handleRunSynthesis()}
                isSynthesizing={isSynthesizing}
              />
            )}

            {screen === 'SYNTHESIS' && (
              <SynthesisOutputScreen
                synthesis={synthesis}
                weights={weights}
                answers={answers}
                ventureName={ventureName}
                isSynthesizing={isSynthesizing}
                onUpdateWeightsAndResynthesize={(newWeights) =>
                  handleRunSynthesis(newWeights)
                }
                onBackToDeck={() => setScreen('DECK')}
                onOpenBackendArch={() => setBackendModalOpen(true)}
                isPro={isPro}
                onOpenProModal={() => setPremiumModalOpen(true)}
              />
            )}
          </main>
        </>
      )}

      {/* Skippable Premium Plan ($49/month) Restriction Pop-up Modal */}
      <PremiumUpgradeModal
        isOpen={premiumModalOpen}
        isPro={isPro}
        ventureName={ventureName}
        onSkip={() => setPremiumModalOpen(false)}
        onUpgradeSuccess={() => {
          setIsPro(true);
          setPremiumModalOpen(false);
        }}
      />

      {/* Qwen3 4B Backend Architecture & Live Inspector Modal */}
      <BackendArchModal
        isOpen={backendModalOpen}
        onClose={() => setBackendModalOpen(false)}
        apiBase={qwenApiBase}
        modelName={qwenModelName}
        onSaveEndpointConfig={handleSaveEndpointConfig}
      />
    </div>
  );
}
