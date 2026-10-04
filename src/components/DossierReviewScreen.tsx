import React from 'react';
import {
  DECK_QUESTIONS,
  PERSPECTIVES,
  type AnswerRecord,
  type PerspectiveId,
} from '../data/deckData';

interface DossierReviewScreenProps {
  answers: Record<string, AnswerRecord>;
  onEditPerspective: (p: PerspectiveId) => void;
  onReviewFullDeck: () => void;
  onRunSynthesis: () => void;
  isSynthesizing: boolean;
}

export const DossierReviewScreen: React.FC<DossierReviewScreenProps> = ({
  answers,
  onEditPerspective,
  onReviewFullDeck,
  onRunSynthesis,
  isSynthesizing,
}) => {
  // Helper to resolve dynamic summary text from the user's selected answer
  const getDossierField = (questionId: string, fallback: string): string => {
    const q = DECK_QUESTIONS.find((item) => item.id === questionId);
    if (!q) return fallback;
    const selId = answers[questionId]?.selectedOptionId || q.defaultOptionId;
    if (q.dossierShortValue && q.dossierShortValue[selId]) {
      return q.dossierShortValue[selId];
    }
    const opt = q.options.find((o) => o.id === selId);
    return opt ? opt.title : fallback;
  };

  const totalAnswered = Object.keys(answers).length;

  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 py-6 flex flex-col items-center">
      {/* Top Completed Perspectives Pill Track (matching Image 10) */}
      <div className="w-full max-w-[780px] flex items-center justify-center mb-6">
        <div className="inline-flex flex-wrap items-center justify-center gap-2 sm:gap-3 px-5 py-2 rounded-full bg-white/75 backdrop-blur-md border border-[#64748B]/12 shadow-2xs text-[11px] font-bold tracking-wider uppercase text-[#00685f]">
          {PERSPECTIVES.map((p, index) => (
            <React.Fragment key={p.id}>
              <button
                type="button"
                onClick={() => onEditPerspective(p.id)}
                className="inline-flex items-center gap-1.5 hover:opacity-80 transition-opacity cursor-pointer"
              >
                <span className="w-4 h-4 rounded-full bg-[#00685f] text-white flex items-center justify-center text-[10px]">
                  ✓
                </span>
                <span>{p.label}</span>
              </button>
              {index < PERSPECTIVES.length - 1 && (
                <span className="w-5 h-[1px] bg-[#bcc9c6] hidden sm:inline-block" />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Main Executive Dossier Review Card */}
      <div className="relative w-full max-w-[780px]">
        {/* Sub-deck shadow plane */}
        <div
          aria-hidden="true"
          className="absolute inset-x-4 -bottom-3 h-12 rounded-[2.25rem] bg-white/65 backdrop-blur-md border border-white/60 luminous-subdeck-1 pointer-events-none"
        />

        <div className="relative z-10 w-full rounded-[2.25rem] bg-white/94 backdrop-blur-2xl luminous-card-shadow border border-white/90 p-6 sm:p-10">
          {/* Card Header Row */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-7">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#e6f4f1] text-[#005049] text-[10px] font-bold uppercase tracking-wider mb-2.5">
                <span className="material-symbols-outlined text-[13px]">
                  verified
                </span>
                <span>ALL PERSPECTIVES COMPLETE · SYNTHESIS READY</span>
              </div>
              <h1 className="font-headline font-bold text-2xl sm:text-[32px] text-[#0F172A] tracking-tight leading-tight">
                Executive Dossier Review
              </h1>
              <p className="text-sm text-[#64748B] mt-1 max-w-md leading-relaxed">
                Confirm your structured answers before feeding them to the Qwen3
                4B Strategic Intelligence Model.
              </p>
            </div>

            {/* 100% 36 of 36 Inputs Pill Box */}
            <div className="inline-flex items-center gap-3 px-4 py-3 rounded-2xl bg-[#f5faf8] border border-[#64748B]/12 self-start sm:self-center shrink-0">
              <div className="relative w-12 h-12 flex items-center justify-center">
                <svg className="w-12 h-12 -rotate-90" viewBox="0 0 48 48">
                  <circle
                    cx="24"
                    cy="24"
                    r="19"
                    fill="none"
                    stroke="#dee4e1"
                    strokeWidth="4"
                  />
                  <circle
                    cx="24"
                    cy="24"
                    r="19"
                    fill="none"
                    stroke="#00685f"
                    strokeWidth="4"
                    strokeDasharray="119.38"
                    strokeDashoffset="0"
                    strokeLinecap="round"
                  />
                </svg>
                <span className="absolute font-headline font-extrabold text-[11px] text-[#00685f] tabular-nums">
                  100%
                </span>
              </div>
              <div>
                <div className="font-headline font-bold text-xs text-[#0F172A] tabular-nums">
                  {totalAnswered} of 36 Inputs
                </div>
                <div className="text-[11px] text-[#64748B]">
                  High Signal Fidelity
                </div>
              </div>
            </div>
          </div>

          {/* 2x2 Grid for Stages 01–04 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            {/* STAGE 01 · CUSTOMER */}
            <div className="rounded-2xl bg-[#f5faf8]/90 border border-[#64748B]/12 p-5 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#00685f]">
                    STAGE 01 · CUSTOMER
                  </span>
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#e6f4f1] text-[#00685f] text-[10px] font-bold tabular-nums">
                    ✓ 8/8 Answered
                  </span>
                </div>
                <div className="text-xs text-[#64748B] mb-1.5">
                  <span>Primary ICP: </span>
                  <strong className="font-bold text-[#0F172A] text-[13px]">
                    {getDossierField('CUST-04', 'Product & Engineering Teams')}
                  </strong>
                </div>
                <div className="grid grid-cols-[56px_1fr] text-xs text-[#64748B] leading-snug">
                  <span>Core Pain:</span>
                  <span className="text-[#334155]">
                    {getDossierField(
                      'CUST-01',
                      'Fragmented discovery tooling and noisy roadmaps'
                    )}
                  </span>
                </div>
              </div>
              <div className="flex items-center justify-between pt-3.5 mt-3.5 border-t border-[#64748B]/10 text-[11px]">
                <span className="font-semibold text-[#00685f]">
                  High Urgency Tier
                </span>
                <button
                  type="button"
                  onClick={() => onEditPerspective('CUSTOMER')}
                  className="inline-flex items-center gap-1 text-[#64748B] hover:text-[#0F172A] font-semibold cursor-pointer"
                >
                  <span>Edit</span>
                  <span className="material-symbols-outlined text-[13px]">
                    edit
                  </span>
                </button>
              </div>
            </div>

            {/* STAGE 02 · OWNER */}
            <div className="rounded-2xl bg-[#f5faf8]/90 border border-[#64748B]/12 p-5 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#00685f]">
                    STAGE 02 · OWNER
                  </span>
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#e6f4f1] text-[#00685f] text-[10px] font-bold tabular-nums">
                    ✓ 6/6 Answered
                  </span>
                </div>
                <div className="text-xs text-[#64748B] mb-1.5">
                  <span>Venture Vision: </span>
                  <strong className="font-bold text-[#0F172A] text-[13px]">
                    {getDossierField('OWN-01', 'Autonomous venture building OS')}
                  </strong>
                </div>
                <div className="text-xs text-[#64748B] leading-snug">
                  <span>Target Horizon: </span>
                  <span className="text-[#334155]">
                    {getDossierField(
                      'OWN-02',
                      '18-month profitability & break-even run-rate'
                    )}
                  </span>
                </div>
              </div>
              <div className="flex items-center justify-between pt-3.5 mt-3.5 border-t border-[#64748B]/10 text-[11px]">
                <span className="font-semibold text-[#00685f]">
                  Founder Aligned
                </span>
                <button
                  type="button"
                  onClick={() => onEditPerspective('OWNER')}
                  className="inline-flex items-center gap-1 text-[#64748B] hover:text-[#0F172A] font-semibold cursor-pointer"
                >
                  <span>Edit</span>
                  <span className="material-symbols-outlined text-[13px]">
                    edit
                  </span>
                </button>
              </div>
            </div>

            {/* STAGE 03 · MARKET */}
            <div className="rounded-2xl bg-[#f5faf8]/90 border border-[#64748B]/12 p-5 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#00685f]">
                    STAGE 03 · MARKET
                  </span>
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#e6f4f1] text-[#00685f] text-[10px] font-bold tabular-nums">
                    ✓ 7/7 Answered
                  </span>
                </div>
                <div className="text-xs text-[#64748B] mb-1.5">
                  <span>TAM Definition: </span>
                  <strong className="font-bold text-[#0F172A] text-[13px]">
                    {getDossierField('MKT-01', '$14.2B Global Developer Tools')}
                  </strong>
                </div>
                <div className="text-xs text-[#64748B] leading-snug">
                  <span>Differentiation: </span>
                  <span className="text-[#334155]">
                    {getDossierField(
                      'MKT-02',
                      'Tactile Spatial AI decks vs dense dashboards'
                    )}
                  </span>
                </div>
              </div>
              <div className="flex items-center justify-between pt-3.5 mt-3.5 border-t border-[#64748B]/10 text-[11px]">
                <span className="font-semibold text-[#00685f]">
                  Blue Ocean Niche
                </span>
                <button
                  type="button"
                  onClick={() => onEditPerspective('MARKET')}
                  className="inline-flex items-center gap-1 text-[#64748B] hover:text-[#0F172A] font-semibold cursor-pointer"
                >
                  <span>Edit</span>
                  <span className="material-symbols-outlined text-[13px]">
                    edit
                  </span>
                </button>
              </div>
            </div>

            {/* STAGE 04 · INVESTOR */}
            <div className="rounded-2xl bg-[#f5faf8]/90 border border-[#64748B]/12 p-5 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#00685f]">
                    STAGE 04 · INVESTOR
                  </span>
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#e6f4f1] text-[#00685f] text-[10px] font-bold tabular-nums">
                    ✓ 7/7 Answered
                  </span>
                </div>
                <div className="text-xs text-[#64748B] mb-1.5">
                  <span>Defensibility: </span>
                  <strong className="font-bold text-[#0F172A] text-[13px]">
                    {getDossierField(
                      'INV-01',
                      'Proprietary multi-turn card data graph'
                    )}
                  </strong>
                </div>
                <div className="text-xs text-[#64748B] leading-snug">
                  <span>Capital Target: </span>
                  <span className="text-[#334155]">
                    {getDossierField(
                      'INV-02',
                      'Seed Round ask: $2.5M at institutional terms'
                    )}
                  </span>
                </div>
              </div>
              <div className="flex items-center justify-between pt-3.5 mt-3.5 border-t border-[#64748B]/10 text-[11px]">
                <span className="font-semibold text-[#00685f]">
                  High Moat Index
                </span>
                <button
                  type="button"
                  onClick={() => onEditPerspective('INVESTOR')}
                  className="inline-flex items-center gap-1 text-[#64748B] hover:text-[#0F172A] font-semibold cursor-pointer"
                >
                  <span>Edit</span>
                  <span className="material-symbols-outlined text-[13px]">
                    edit
                  </span>
                </button>
              </div>
            </div>
          </div>

          {/* Full-Width STAGE 05 · FINANCE Card (matching Image 10) */}
          <div className="rounded-2xl bg-[#f5faf8]/90 border border-[#64748B]/12 p-5 mb-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1.5">
              <div className="flex items-center gap-2.5 mb-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#00685f]">
                  STAGE 05 · FINANCE
                </span>
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#e6f4f1] text-[#00685f] text-[10px] font-bold tabular-nums">
                  ✓ 8/8 Answered
                </span>
              </div>
              <div className="text-xs text-[#64748B]">
                <span>Revenue Model: </span>
                <strong className="font-bold text-[#0F172A] text-sm">
                  {getDossierField(
                    'FIN-01',
                    'Tiered SaaS ($49 – $499 / seat / mo)'
                  )}
                </strong>
              </div>
              <div className="text-xs text-[#64748B]">
                <span>Gross Margin Goal: </span>
                <strong className="font-bold text-[#00685f] text-sm">
                  {getDossierField('FIN-02', '82% sustained at scale')}
                </strong>
              </div>
            </div>

            <div className="flex items-center justify-between sm:justify-end gap-6 pt-3 sm:pt-0 border-t sm:border-t-0 border-[#64748B]/10">
              <div className="text-xs text-[#64748B] leading-tight">
                <div>Unit Economics</div>
                <div>Validated</div>
              </div>
              <button
                type="button"
                onClick={() => onEditPerspective('FINANCE')}
                className="inline-flex items-center gap-1 text-xs text-[#64748B] hover:text-[#0F172A] font-semibold cursor-pointer"
              >
                <span>Edit</span>
                <span className="material-symbols-outlined text-[14px]">
                  edit
                </span>
              </button>
            </div>
          </div>

          {/* Vector Buffer Bar */}
          <div className="rounded-xl bg-[#f0f5f2] px-4 py-2.5 mb-6 flex items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2 text-[#475569] truncate">
              <span className="material-symbols-outlined text-[16px] text-[#00685f]">
                layers
              </span>
              <span className="truncate">
                Archived cards stacked in deck buffer (36 raw vectors ready for
                embedding).
              </span>
            </div>
            <span className="font-mono-tabular text-[10px] font-bold uppercase tracking-wider text-[#64748B] shrink-0">
              LATENCY ~1.8S
            </span>
          </div>

          {/* Bottom Action Row */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            <button
              type="button"
              onClick={onReviewFullDeck}
              className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-[#eaefed] hover:bg-[#dee4e1] text-[#0F172A] text-xs font-semibold transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined text-[16px]">
                undo
              </span>
              <span>Review Full Deck</span>
            </button>

            <button
              type="button"
              disabled={isSynthesizing}
              onClick={onRunSynthesis}
              className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-full bg-[#00685f] hover:bg-[#005049] text-white text-xs sm:text-sm font-semibold shadow-md teal-cta-glow transition-all active:scale-98 cursor-pointer"
            >
              {isSynthesizing ? (
                <>
                  <span className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
                  <span>Synthesizing via Qwen3 4B...</span>
                </>
              ) : (
                <>
                  <span className="material-symbols-outlined text-[18px]">
                    psychology
                  </span>
                  <span>Run Qwen3 4B Analysis</span>
                  <span>→</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
