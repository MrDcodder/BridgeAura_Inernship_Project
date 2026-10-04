import React, { useEffect, useState } from 'react';
import {
  DECK_QUESTIONS,
  PERSPECTIVES,
  type AnswerRecord,
  type DeckQuestion,
  type PerspectiveId,
} from '../data/deckData';

interface QuestionDeckScreenProps {
  currentQuestionIndex: number; // 0 to 35 across DECK_QUESTIONS
  onChangeQuestionIndex: (index: number) => void;
  answers: Record<string, AnswerRecord>;
  onSelectAnswer: (
    questionId: string,
    optionId: 'A' | 'B' | 'C' | 'D',
    notes: string
  ) => void;
  autosaveStatus: 'saved' | 'saving';
  onFinishToDossier: () => void;
  onSelectPerspective: (p: PerspectiveId) => void;
}

export const QuestionDeckScreen: React.FC<QuestionDeckScreenProps> = ({
  currentQuestionIndex,
  onChangeQuestionIndex,
  answers,
  onSelectAnswer,
  autosaveStatus,
  onFinishToDossier,
  onSelectPerspective,
}) => {
  const [transitionDir, setTransitionDir] = useState<'none' | 'next' | 'prev'>('none');

  const question: DeckQuestion =
    DECK_QUESTIONS[currentQuestionIndex] || DECK_QUESTIONS[3];

  const currentAnswer = answers[question.id] || {
    questionId: question.id,
    selectedOptionId: question.defaultOptionId,
    notes: '',
    updatedAt: '',
  };

  const perspectiveQuestions = DECK_QUESTIONS.filter(
    (q) => q.perspective === question.perspective
  );

  const progressPercentage = Math.round(
    (question.questionIndex / question.totalInPerspective) * 100
  );

  const triggerAdvance = (targetIdx: number, dir: 'next' | 'prev') => {
    setTransitionDir(dir);
    setTimeout(() => {
      onChangeQuestionIndex(targetIdx);
      setTransitionDir('none');
    }, 160);
  };

  const handleNext = () => {
    if (currentQuestionIndex < DECK_QUESTIONS.length - 1) {
      triggerAdvance(currentQuestionIndex + 1, 'next');
    } else {
      onFinishToDossier();
    }
  };

  const handlePrev = () => {
    if (currentQuestionIndex > 0) {
      triggerAdvance(currentQuestionIndex - 1, 'prev');
    }
  };

  // Support pressing Enter to advance card (when not typing inside textarea)
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement)?.tagName;
      if (tag === 'TEXTAREA' || tag === 'INPUT') return;
      if (e.key === 'Enter') {
        e.preventDefault();
        handleNext();
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        handleNext();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        handlePrev();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  });

  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 py-6 flex flex-col items-center">
      {/* Sub-Header Stage Breadcrumb & Autosaved Pill (matching Image 6) */}
      <div className="w-full max-w-[760px] flex flex-wrap items-center justify-between gap-3 mb-5">
        <div className="flex flex-wrap items-center gap-2 text-[11px] font-bold tracking-wider uppercase">
          {PERSPECTIVES.map((p, idx) => {
            const isCurrent = p.id === question.perspective;
            const isPast = p.stageNumber < question.stageNumber;
            return (
              <React.Fragment key={p.id}>
                {isCurrent ? (
                  <button
                    type="button"
                    onClick={() => onSelectPerspective(p.id)}
                    className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-[#00685f]/50 text-[#00685f] shadow-2xs cursor-pointer"
                  >
                    <span className="w-2 h-2 rounded-full bg-[#00685f]" />
                    <span>{p.label}</span>
                    <span className="text-[#64748B] font-semibold ml-0.5">
                      {p.stageCode}
                    </span>
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => onSelectPerspective(p.id)}
                    className={`px-1.5 py-0.5 transition-colors cursor-pointer ${
                      isPast
                        ? 'text-[#00685f] hover:underline'
                        : 'text-[#64748B]/80 hover:text-[#0F172A]'
                    }`}
                  >
                    {isPast ? `✓ ${p.label}` : p.label}
                  </button>
                )}
                {idx < PERSPECTIVES.length - 1 && (
                  <span aria-hidden="true" className="text-[#94A3B8] font-normal">
                    →
                  </span>
                )}
              </React.Fragment>
            );
          })}
        </div>

        <div className="flex items-center gap-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/90 border border-[#64748B]/15 text-[11px] font-semibold text-[#0F172A] shadow-2xs">
            <span className="material-symbols-outlined text-[14px] text-[#00685f]">
              verified_user
            </span>
            <span>{autosaveStatus === 'saving' ? 'Saving...' : 'Autosaved'}</span>
          </div>
        </div>
      </div>

      {/* Stacked 3D Question Card Stage */}
      <div className="relative w-full max-w-[760px] mb-7">
        {/* Subtle Sub-Deck Layer 2 */}
        <div
          aria-hidden="true"
          className="absolute inset-x-6 -bottom-3.5 h-12 rounded-[2rem] bg-white/55 backdrop-blur-md border border-white/60 luminous-subdeck-2 pointer-events-none"
        />
        {/* Subtle Sub-Deck Layer 1 */}
        <div
          aria-hidden="true"
          className="absolute inset-x-3 -bottom-2 h-12 rounded-[2rem] bg-white/75 backdrop-blur-lg border border-white/70 luminous-subdeck-1 pointer-events-none"
        />

        {/* Foreground Active Question Card */}
        <div
          className={`relative z-10 w-full rounded-[2rem] bg-white/92 backdrop-blur-2xl luminous-card-shadow border border-white/90 p-6 sm:p-10 transition-all duration-200 ${
            transitionDir === 'next'
              ? 'opacity-80 -translate-y-1.5 scale-[0.99]'
              : transitionDir === 'prev'
              ? 'opacity-80 translate-y-1.5 scale-[0.99]'
              : 'opacity-100 translate-y-0 scale-100'
          }`}
        >
          {/* Card Top Progress Row */}
          <div className="flex items-center justify-between gap-4 mb-3">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-[#89f5e7]/40 text-[#005049] text-[10px] font-bold uppercase tracking-wider">
                {question.perspective} PERSPECTIVE
              </span>
              <span className="text-xs font-semibold text-[#0F172A] tabular-nums">
                • Question {String(question.questionIndex).padStart(2, '0')} /{' '}
                {String(question.totalInPerspective).padStart(2, '0')}
              </span>
            </div>

            {/* Interactive Milestone Dots for Current Stage */}
            <div className="flex items-center gap-1.5">
              {perspectiveQuestions.map((pq) => {
                const globalIdx = DECK_QUESTIONS.findIndex((d) => d.id === pq.id);
                const isFilled = pq.questionIndex <= question.questionIndex;
                const isCurrentDot = pq.id === question.id;
                return (
                  <button
                    key={pq.id}
                    type="button"
                    title={`Jump to Question ${pq.questionIndex}`}
                    onClick={() => onChangeQuestionIndex(globalIdx)}
                    className={`w-2.5 h-2.5 rounded-full transition-all cursor-pointer ${
                      isCurrentDot
                        ? 'bg-[#00685f] ring-2 ring-[#00685f]/30 scale-110'
                        : isFilled
                        ? 'bg-[#00685f]'
                        : 'bg-[#dee4e1] hover:bg-[#94A3B8]'
                    }`}
                  />
                );
              })}
            </div>
          </div>

          {/* Horizontal Progress Track */}
          <div className="w-full h-1.5 rounded-full bg-[#e4e9e7] overflow-hidden mb-7">
            <div
              className="h-full rounded-full bg-[#00685f] transition-all duration-300"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>

          {/* Question Headline & Subtitle */}
          <div className="mb-6">
            <h1 className="font-headline font-bold text-2xl sm:text-[31px] text-[#0F172A] tracking-tight leading-[1.22] mb-2.5">
              {question.headline}
            </h1>
            <p className="text-sm sm:text-[15px] text-[#64748B] leading-relaxed">
              {question.subtitle}
            </p>
          </div>

          {/* 4 Multiple Choice Options (A, B, C, D) */}
          <div className="space-y-2.5 mb-6">
            {question.options.map((opt) => {
              const isSelected = currentAnswer.selectedOptionId === opt.id;
              return (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() =>
                    onSelectAnswer(question.id, opt.id, currentAnswer.notes)
                  }
                  className={`w-full text-left rounded-2xl p-4 transition-all duration-150 flex items-center justify-between gap-4 border cursor-pointer ${
                    isSelected
                      ? 'bg-[#e6f4f1]/75 border-[#00685f]/40 shadow-xs'
                      : 'bg-[#f8faf9]/80 hover:bg-white border-[#64748B]/12 hover:border-[#64748B]/25'
                  }`}
                >
                  <div className="flex items-start gap-3.5 min-w-0">
                    {/* Option Letter Circle (A, B, C, D) */}
                    <span
                      className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5 transition-colors ${
                        isSelected
                          ? 'bg-[#004d46] text-white'
                          : 'bg-[#eaefed] text-[#475569]'
                      }`}
                    >
                      {opt.id}
                    </span>

                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <span
                          className={`font-semibold text-sm sm:text-[15px] ${
                            isSelected ? 'text-[#004d46]' : 'text-[#0F172A]'
                          }`}
                        >
                          {opt.title}
                        </span>
                        {opt.strategicMatch && (
                          <span className="px-2 py-0.5 rounded-full bg-[#89f5e7]/55 text-[#005049] text-[9px] font-bold uppercase tracking-wider">
                            STRATEGIC MATCH
                          </span>
                        )}
                      </div>
                      <p className="text-xs sm:text-[13px] text-[#64748B] mt-0.5 leading-snug">
                        {opt.description}
                      </p>
                    </div>
                  </div>

                  {/* Right Checkmark Indicator */}
                  <div className="shrink-0">
                    {isSelected ? (
                      <span className="material-symbols-outlined text-[#00685f] text-xl">
                        check_circle
                      </span>
                    ) : (
                      <span className="w-5 h-5 rounded-full border border-[#cbd5e1] block opacity-50" />
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Optional Context / Persona Nuances Input Arena (matching Image 6) */}
          <div className="mb-7">
            <div className="flex items-center justify-between mb-1.5">
              <label
                htmlFor="nuance-notes"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#334155]"
              >
                <span className="material-symbols-outlined text-[15px] text-[#00685f]">
                  notes
                </span>
                <span>{question.nuanceLabel}</span>
              </label>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#94A3B8]">
                OPTIONAL CONTEXT
              </span>
            </div>
            <textarea
              id="nuance-notes"
              rows={2}
              value={currentAnswer.notes}
              onChange={(e) =>
                onSelectAnswer(
                  question.id,
                  currentAnswer.selectedOptionId,
                  e.target.value
                )
              }
              placeholder={question.nuancePlaceholder}
              className="w-full rounded-xl bg-[#f8faf9] border border-[#64748B]/18 px-3.5 py-2.5 text-xs sm:text-[13px] text-[#0F172A] placeholder:text-[#94A3B8] focus:outline-none focus:bg-white focus:border-[#00685f] focus:ring-2 focus:ring-[#00685f]/15 transition-all resize-none"
            />
          </div>

          {/* Card Footer Action Row */}
          <div className="flex items-center justify-between gap-4 pt-2 border-t border-[#64748B]/10">
            <button
              type="button"
              onClick={handlePrev}
              disabled={currentQuestionIndex === 0}
              className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                currentQuestionIndex === 0
                  ? 'bg-[#f0f5f2]/60 text-[#94A3B8] cursor-not-allowed'
                  : 'bg-[#f0f5f2] hover:bg-[#e4e9e7] text-[#0F172A]'
              }`}
            >
              <span>←</span>
              <span>Previous Card</span>
            </button>

            <div className="flex items-center gap-3">
              <span className="hidden sm:inline-block text-[10px] font-bold uppercase tracking-wider text-[#94A3B8]">
                PRESS ENTER ↵
              </span>
              <button
                type="button"
                onClick={handleNext}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#00685f] hover:bg-[#005049] text-white text-xs sm:text-sm font-semibold shadow-sm teal-cta-glow transition-all active:scale-98 cursor-pointer"
              >
                <span>
                  {currentQuestionIndex === DECK_QUESTIONS.length - 1
                    ? 'Complete & Review Dossier'
                    : 'Continue to Next Card'}
                </span>
                <span>→</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
