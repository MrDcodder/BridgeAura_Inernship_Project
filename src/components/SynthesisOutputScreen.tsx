import React, { useState } from 'react';
import type {
  AnswerRecord,
  SynthesisResult,
  WeightParameters,
} from '../data/deckData';

interface SynthesisOutputScreenProps {
  synthesis: SynthesisResult;
  weights: WeightParameters;
  answers: Record<string, AnswerRecord>;
  ventureName: string;
  isSynthesizing: boolean;
  onUpdateWeightsAndResynthesize: (newWeights: WeightParameters) => void;
  onBackToDeck: () => void;
  onOpenBackendArch: () => void;
  isPro: boolean;
  onOpenProModal: () => void;
}

export const SynthesisOutputScreen: React.FC<SynthesisOutputScreenProps> = ({
  synthesis,
  weights,
  answers,
  ventureName,
  isSynthesizing,
  onUpdateWeightsAndResynthesize,
  onBackToDeck,
  onOpenBackendArch,
  isPro,
  onOpenProModal,
}) => {
  const [activePhaseIdx, setActivePhaseIdx] = useState(0);
  const [showWeightModal, setShowWeightModal] = useState(false);
  const [showThinkTrace, setShowThinkTrace] = useState(false);
  const [draftWeights, setDraftWeights] = useState<WeightParameters>(weights);
  const [exportFeedback, setExportFeedback] = useState<string | null>(null);

  const phases = synthesis.phases || [];
  const currentPhase = phases[activePhaseIdx] || phases[0];
  const nextPhase = phases[activePhaseIdx + 1];

  const handleExportDossier = () => {
    if (!isPro) {
      onOpenProModal();
      return;
    }
    const payload = {
      application: 'Venture Vision: smart start creates smart startups',
      modelBackbone: synthesis.modelEngine,
      ventureName,
      artifactId: synthesis.artifactId,
      exportedAt: new Date().toISOString(),
      weightParameters: weights,
      executiveMetrics: {
        overallReadiness: `${synthesis.overallReadiness}%`,
        readinessBreakdown: synthesis.readinessBreakdown,
        synthesisMetric: synthesis.synthesisMetric,
        runwayProjection: synthesis.runwayProjection,
        strategicMoat: synthesis.strategicMoat,
      },
      qwen3ThinkingTrace: synthesis.qwenThinkingTrace,
      roadmapPhases: synthesis.phases,
      rawVectorAnswers: answers,
    };

    const blob = new Blob([JSON.stringify(payload, null, 2)], {
      type: 'application/json',
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Aether-Dossier-${synthesis.artifactId.replace('#', '')}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    setExportFeedback('Exported Dossier JSON');
    setTimeout(() => setExportFeedback(null), 2500);
  };

  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 py-5 flex flex-col items-center">
      {/* Top Indication Card to Buy Pro Subscription ($49/month) */}
      <div className="w-full max-w-[820px] mb-4 rounded-2xl bg-white/92 backdrop-blur-xl border border-[#00685f]/30 px-4 py-3 flex flex-wrap items-center justify-between gap-3 shadow-xs">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-[#e6f4f1] text-[#00685f] flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-lg">
              workspace_premium
            </span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-headline font-bold text-xs sm:text-sm text-[#0F172A]">
                {isPro
                  ? 'Venture Vision Pro Subscription Active'
                  : 'Unlock Full Venture Vision Pro Synthesis'}
              </span>
              <span className="px-2 py-0.5 rounded-full bg-[#e6f4f1] text-[#00685f] text-[10px] font-bold uppercase tracking-wider">
                $49 / month
              </span>
            </div>
            <p className="text-[11px] text-[#64748B]">
              {isPro
                ? 'All premium Qwen3 4B deep-reasoning traces, weight controls, and dossier exports are enabled.'
                : 'Previewing executive summary. Upgrade to Pro for unlimited Qwen3 4B deep-reasoning & full dossier exports.'}
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={onOpenProModal}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-gradient-to-r from-[#00685f] to-[#008378] text-white text-xs font-bold shadow-xs teal-cta-glow transition-all hover:scale-[1.02] cursor-pointer"
        >
          <span className="material-symbols-outlined text-[15px]">
            {isPro ? 'verified' : 'lock_open'}
          </span>
          <span>{isPro ? 'Pro Plan Active' : 'Buy Pro Subscription ($49/mo)'}</span>
        </button>
      </div>
      {/* Sub-Header Status Bar (matching Image 8) */}
      <div className="w-full max-w-[820px] flex flex-wrap items-center justify-between gap-3 mb-5">
        <div className="flex flex-wrap items-center gap-2.5">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#e6f4f1] border border-[#00685f]/25 text-[#005049] text-[10px] font-bold uppercase tracking-wider shadow-2xs">
            <span className="w-2 h-2 rounded-full bg-[#00685f] animate-pulse" />
            <span>QWEN3 4B SYNTHESIS ENGINE · REALTIME OUTPUT</span>
          </div>
          <span className="text-xs font-semibold text-[#64748B] tabular-nums">
            ✦ Artifact ID: {synthesis.artifactId}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setShowThinkTrace((v) => !v)}
            className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold border transition-all cursor-pointer ${
              showThinkTrace
                ? 'bg-[#00685f] text-white border-[#00685f]'
                : 'bg-white/90 hover:bg-white text-[#0F172A] border-[#64748B]/15'
            }`}
          >
            <span className="material-symbols-outlined text-[15px]">
              psychology_alt
            </span>
            <span>{showThinkTrace ? 'Hide <think>' : 'View <think>'}</span>
          </button>

          <button
            type="button"
            onClick={onBackToDeck}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/90 hover:bg-white text-[#0F172A] text-xs font-semibold border border-[#64748B]/15 shadow-2xs transition-all cursor-pointer"
          >
            <span className="material-symbols-outlined text-[15px] text-[#00685f]">
              view_carousel
            </span>
            <span>Tactile Deck Stage</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setDraftWeights(weights);
              setShowWeightModal(true);
            }}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/90 hover:bg-white text-[#0F172A] text-xs font-semibold border border-[#64748B]/15 shadow-2xs transition-all cursor-pointer"
          >
            <span className="material-symbols-outlined text-[15px] text-[#00685f]">
              tune
            </span>
            <span>Weight Parameters</span>
          </button>
        </div>
      </div>

      {/* Collapsible Qwen3 4B <think> Reasoning Trace Drawer */}
      {showThinkTrace && (
        <div className="w-full max-w-[820px] mb-5 rounded-2xl bg-[#0F172A] text-[#e2e8f0] p-4 border border-[#00685f]/40 shadow-lg">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2 text-xs font-mono-tabular text-[#89f5e7]">
              <span className="material-symbols-outlined text-sm">terminal</span>
              <span>{synthesis.modelEngine} — Chain-of-Thought Reasoning</span>
            </div>
            <button
              type="button"
              onClick={onOpenBackendArch}
              className="text-[11px] font-semibold text-[#89f5e7] hover:underline cursor-pointer"
            >
              Open Full Backend Blueprint →
            </button>
          </div>
          <pre className="font-mono-tabular text-[11px] leading-relaxed text-[#cbd5e1] whitespace-pre-wrap overflow-x-auto">
            {synthesis.qwenThinkingTrace}
          </pre>
        </div>
      )}

      {/* 5 Phase Selector Tabs (matching Image 8) */}
      <div className="w-full max-w-[820px] flex flex-wrap items-center justify-between gap-2 mb-6 px-1">
        {phases.map((phase, idx) => {
          const isActive = idx === activePhaseIdx;
          return (
            <button
              key={phase.phaseNumber}
              type="button"
              onClick={() => setActivePhaseIdx(idx)}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                isActive
                  ? 'bg-[#00685f] text-white shadow-sm'
                  : 'bg-transparent hover:bg-white/70 text-[#475569]'
              }`}
            >
              <span>{phase.tabLabel}</span>
              {isActive && (
                <span className="w-2.5 h-2.5 rounded-full border-2 border-white/80 inline-block" />
              )}
            </button>
          );
        })}
      </div>

      {/* Main Foreground Phase Synthesis Card (matching Image 8) */}
      {currentPhase && (
        <div className="relative w-full max-w-[760px] mb-6">
          {/* Sub-deck glass layer */}
          <div
            aria-hidden="true"
            className="absolute inset-x-4 -bottom-3 h-10 rounded-[2.25rem] bg-white/65 backdrop-blur-md border border-white/60 luminous-subdeck-1 pointer-events-none"
          />

          <div className="relative z-10 w-full rounded-[2.25rem] bg-white/95 backdrop-blur-2xl luminous-card-shadow border border-white/90 p-6 sm:p-10">
            {/* Phase Header + Startup Readiness Gauge */}
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-6">
              <div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#e6f4f1] text-[#005049] text-[10px] font-bold uppercase tracking-wider mb-3">
                  <span>⚡ {currentPhase.eyebrow}</span>
                </div>
                <h1 className="font-headline font-bold text-2xl sm:text-[31px] text-[#0F172A] tracking-tight leading-[1.2] max-w-md">
                  {currentPhase.headline}
                </h1>
              </div>

              {/* Right Readiness Gauge & Cust / Mkt / Fin Breakdown */}
              <div className="flex items-center gap-3.5 bg-[#f8faf9] border border-[#64748B]/12 rounded-2xl px-4 py-3 shrink-0 self-start">
                <div className="relative w-12 h-12 flex items-center justify-center">
                  <svg className="w-12 h-12 -rotate-90" viewBox="0 0 48 48">
                    <circle
                      cx="24"
                      cy="24"
                      r="19"
                      fill="none"
                      stroke="#dee4e1"
                      strokeWidth="4.5"
                    />
                    <circle
                      cx="24"
                      cy="24"
                      r="19"
                      fill="none"
                      stroke="#00685f"
                      strokeWidth="4.5"
                      strokeDasharray="119.38"
                      strokeDashoffset={
                        119.38 * (1 - synthesis.overallReadiness / 100)
                      }
                      strokeLinecap="round"
                    />
                  </svg>
                  <span className="absolute font-headline font-extrabold text-xs text-[#0F172A] tabular-nums">
                    {synthesis.overallReadiness}%
                  </span>
                </div>

                <div>
                  <div className="text-[9px] font-bold uppercase tracking-wider text-[#64748B] leading-tight mb-1">
                    STARTUP READINESS
                  </div>
                  <div className="flex items-center gap-3 text-[11px] tabular-nums">
                    <div>
                      <span className="text-[#64748B] block text-[10px]">
                        Cust
                      </span>
                      <strong className="font-bold text-[#0F172A]">
                        {synthesis.readinessBreakdown.cust}%
                      </strong>
                    </div>
                    <div>
                      <span className="text-[#64748B] block text-[10px]">
                        Mkt
                      </span>
                      <strong className="font-bold text-[#0F172A]">
                        {synthesis.readinessBreakdown.mkt}%
                      </strong>
                    </div>
                    <div>
                      <span className="text-[#64748B] block text-[10px]">
                        Fin
                      </span>
                      <strong className="font-bold text-[#0F172A]">
                        {synthesis.readinessBreakdown.fin}%
                      </strong>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Primary Phase Objective Banner */}
            <div className="rounded-2xl bg-[#f5faf8] border border-[#64748B]/12 p-4 sm:p-5 mb-6">
              <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-[#00685f] mb-1.5">
                <span className="material-symbols-outlined text-[14px]">
                  language
                </span>
                <span>PRIMARY PHASE OBJECTIVE</span>
              </div>
              <p className="font-headline font-semibold text-base sm:text-[17px] text-[#0F172A] leading-snug">
                {currentPhase.primaryObjective}
              </p>
            </div>

            {/* Two-Column Workstreams & Critical Milestones / Risk Arena */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-6">
              {/* Left Column: Actionable Workstreams (7 cols) */}
              <div className="md:col-span-7">
                <div className="text-[10px] font-bold uppercase tracking-wider text-[#64748B] mb-3.5">
                  ACTIONABLE WORKSTREAMS
                </div>
                <div className="space-y-4">
                  {currentPhase.workstreams.map((ws, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <span className="w-6 h-6 rounded-full bg-[#e6f4f1] text-[#00685f] font-bold text-xs flex items-center justify-center shrink-0 mt-0.5 tabular-nums">
                        {idx + 1}
                      </span>
                      <p className="text-xs sm:text-[13.5px] text-[#1e293b] leading-relaxed">
                        {ws}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Column: Critical Milestones & Identified Risk (5 cols) */}
              <div className="md:col-span-5 space-y-3.5">
                {/* Critical Milestones Box */}
                <div className="rounded-2xl bg-[#f5faf8] border border-[#64748B]/12 p-4">
                  <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-[#00685f] mb-1.5">
                    <span className="material-symbols-outlined text-[14px]">
                      flag
                    </span>
                    <span>CRITICAL MILESTONES</span>
                  </div>
                  <p className="font-semibold text-xs text-[#0F172A] leading-snug mb-3">
                    {currentPhase.criticalMilestonesTitle}
                  </p>
                  <div className="w-full h-1.5 rounded-full bg-[#dee4e1] overflow-hidden">
                    <div
                      className="h-full rounded-full bg-[#00685f]"
                      style={{
                        width: `${currentPhase.criticalMilestonesProgress}%`,
                      }}
                    />
                  </div>
                </div>

                {/* Identified Risk · Qwen3 Flag Box */}
                <div className="rounded-2xl bg-[#ffdbce]/45 border border-[#924628]/20 p-4">
                  <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-[#924628] mb-1.5">
                    <span className="material-symbols-outlined text-[14px]">
                      warning
                    </span>
                    <span>IDENTIFIED RISK · QWEN3 FLAG</span>
                  </div>
                  <p className="text-xs text-[#370e00] leading-relaxed">
                    {currentPhase.identifiedRisk}
                  </p>
                </div>
              </div>
            </div>

            {/* Card Footer: Founder Alignment Sparkline & Stage Locked */}
            <div className="pt-4 border-t border-[#64748B]/12 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3.5">
                {/* Sparkline SVG matching Image 8 */}
                <svg
                  viewBox="0 0 84 26"
                  className="w-20 h-6 shrink-0"
                  fill="none"
                >
                  <path
                    d="M2 22C16 22 24 10 38 11C52 12 58 16 82 5"
                    stroke="#00685f"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />
                </svg>
                <div>
                  <div className="text-[9px] font-bold uppercase tracking-wider text-[#64748B]">
                    FOUNDER ALIGNMENT
                  </div>
                  <div className="text-xs font-bold text-[#0F172A]">
                    {currentPhase.founderAlignmentLabel}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span className="px-3 py-1 rounded-full bg-[#e6f4f1] text-[#00685f] text-[11px] font-bold">
                  {currentPhase.stageStatusBadge}
                </span>
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#64748B] tabular-nums">
                  {currentPhase.targetQuarter}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Below Card Action Controls (Export Dossier / Prev Phase / Next Phase matching Image 8) */}
      <div className="w-full max-w-[760px] flex flex-wrap items-center justify-between gap-3 mb-7">
        <button
          type="button"
          onClick={handleExportDossier}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white hover:bg-[#f0f5f2] text-[#0F172A] text-xs font-semibold border border-[#64748B]/15 shadow-2xs transition-all cursor-pointer"
        >
          <span className="material-symbols-outlined text-[16px] text-[#00685f]">
            download
          </span>
          <span>
            {exportFeedback || 'Export Strategic Dossier (PDF/JSON)'}
          </span>
        </button>

        <div className="flex items-center gap-3">
          <button
            type="button"
            disabled={activePhaseIdx === 0}
            onClick={() => setActivePhaseIdx((i) => Math.max(0, i - 1))}
            className={`inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
              activePhaseIdx === 0
                ? 'text-[#94A3B8] cursor-not-allowed'
                : 'bg-white/80 hover:bg-white text-[#475569]'
            }`}
          >
            <span>←</span>
            <span>Previous Phase</span>
          </button>

          <button
            type="button"
            onClick={() =>
              setActivePhaseIdx((i) => (i + 1 < phases.length ? i + 1 : 0))
            }
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#00685f] hover:bg-[#005049] text-white text-xs font-semibold shadow-sm teal-cta-glow transition-all cursor-pointer"
          >
            <span>
              {nextPhase
                ? `Next Phase: ${nextPhase.tabLabel.replace(/^\d+\s*/, '')}`
                : 'Cycle to Phase 01'}
            </span>
            <span>→</span>
          </button>
        </div>
      </div>

      {/* Bottom 3 Executive Metric Cards (matching Image 8) */}
      <div className="w-full max-w-[760px] grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Card 1: SYNTHESIS METRIC */}
        <div className="rounded-2xl bg-white/88 backdrop-blur-md border border-[#64748B]/12 p-5 flex flex-col justify-between shadow-2xs">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#64748B]">
                SYNTHESIS METRIC
              </span>
              <span className="material-symbols-outlined text-[17px] text-[#00685f]">
                neurology
              </span>
            </div>
            <div className="font-headline font-extrabold text-2xl sm:text-[28px] text-[#0F172A] tracking-tight mb-2 tabular-nums">
              {synthesis.synthesisMetric}
            </div>
            <p className="text-[11px] text-[#64748B] leading-relaxed">
              {synthesis.synthesisMetricDesc}
            </p>
          </div>
          <div className="pt-3 mt-3 border-t border-[#64748B]/10 text-[9px] font-bold uppercase tracking-widest text-[#94A3B8]">
            ALGORITHMIC BASELINE
          </div>
        </div>

        {/* Card 2: RUNWAY PROJECTION */}
        <div className="rounded-2xl bg-white/88 backdrop-blur-md border border-[#64748B]/12 p-5 flex flex-col justify-between shadow-2xs">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#64748B]">
                RUNWAY PROJECTION
              </span>
              <span className="material-symbols-outlined text-[17px] text-[#00685f]">
                timelapse
              </span>
            </div>
            <div className="font-headline font-extrabold text-2xl sm:text-[28px] text-[#0F172A] tracking-tight mb-2 tabular-nums">
              {synthesis.runwayProjection}
            </div>
            <p className="text-[11px] text-[#64748B] leading-relaxed">
              {synthesis.runwayProjectionDesc}
            </p>
          </div>
          <div className="pt-3 mt-3 border-t border-[#64748B]/10 text-[9px] font-bold uppercase tracking-widest text-[#94A3B8]">
            CAPITAL PRESERVATION MODEL
          </div>
        </div>

        {/* Card 3: STRATEGIC MOAT */}
        <div className="rounded-2xl bg-white/88 backdrop-blur-md border border-[#64748B]/12 p-5 flex flex-col justify-between shadow-2xs">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#64748B]">
                STRATEGIC MOAT
              </span>
              <span className="material-symbols-outlined text-[17px] text-[#00685f]">
                verified_user
              </span>
            </div>
            <div className="font-headline font-extrabold text-2xl sm:text-[28px] text-[#0F172A] tracking-tight mb-2">
              {synthesis.strategicMoat}
            </div>
            <p className="text-[11px] text-[#64748B] leading-relaxed">
              {synthesis.strategicMoatDesc}
            </p>
          </div>
          <div className="pt-3 mt-3 border-t border-[#64748B]/10 text-[9px] font-bold uppercase tracking-widest text-[#94A3B8]">
            DEFENSIBILITY ASSESSMENT
          </div>
        </div>
      </div>

      {/* Weight Parameters Tuning Modal */}
      {showWeightModal && (
        <div className="fixed inset-0 z-50 bg-[#0F172A]/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-lg rounded-3xl bg-white shadow-2xl border border-[#64748B]/15 p-6 sm:p-8">
            <div className="flex items-center justify-between mb-4">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#00685f]">
                  QWEN3 4B HYPERPARAMETERS
                </span>
                <h2 className="font-headline font-bold text-xl text-[#0F172A]">
                  Perspective Weights & Reasoning Mode
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setShowWeightModal(false)}
                className="w-8 h-8 rounded-full bg-[#f0f5f2] hover:bg-[#e4e9e7] flex items-center justify-center text-[#475569] cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4 mb-6">
              {(
                [
                  ['customerWeight', 'Stage 01 · Customer Weight'],
                  ['ownerWeight', 'Stage 02 · Owner Weight'],
                  ['marketWeight', 'Stage 03 · Market Weight'],
                  ['investorWeight', 'Stage 04 · Investor Weight'],
                  ['financeWeight', 'Stage 05 · Finance Weight'],
                ] as const
              ).map(([key, label]) => (
                <div key={key}>
                  <div className="flex justify-between text-xs font-semibold mb-1">
                    <span className="text-[#0F172A]">{label}</span>
                    <span className="text-[#00685f] tabular-nums">
                      {draftWeights[key]}%
                    </span>
                  </div>
                  <input
                    type="range"
                    min={5}
                    max={50}
                    step={5}
                    value={draftWeights[key]}
                    onChange={(e) =>
                      setDraftWeights({
                        ...draftWeights,
                        [key]: Number(e.target.value),
                      })
                    }
                    className="w-full accent-[#00685f] cursor-pointer"
                  />
                </div>
              ))}

              <div className="pt-3 border-t border-[#64748B]/15 flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-[#0F172A]">
                    Qwen3 4B Hybrid Thinking Token (`/think`)
                  </div>
                  <div className="text-[11px] text-[#64748B]">
                    Emit `&lt;think&gt;...&lt;/think&gt;` reasoning block before JSON
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() =>
                    setDraftWeights((w) => ({
                      ...w,
                      qwenThinkingMode: !w.qwenThinkingMode,
                    }))
                  }
                  className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-colors cursor-pointer ${
                    draftWeights.qwenThinkingMode
                      ? 'bg-[#00685f] text-white'
                      : 'bg-[#e4e9e7] text-[#475569]'
                  }`}
                >
                  {draftWeights.qwenThinkingMode ? '/think ON' : '/no_think'}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setShowWeightModal(false)}
                className="px-4 py-2 rounded-full bg-[#f0f5f2] text-xs font-semibold text-[#475569] cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={isSynthesizing}
                onClick={() => {
                  onUpdateWeightsAndResynthesize(draftWeights);
                  setShowWeightModal(false);
                }}
                className="px-6 py-2.5 rounded-full bg-[#00685f] hover:bg-[#005049] text-white text-xs font-semibold shadow-sm cursor-pointer"
              >
                {isSynthesizing
                  ? 'Re-Synthesizing...'
                  : 'Apply & Re-Run Qwen3 4B Synthesis'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
