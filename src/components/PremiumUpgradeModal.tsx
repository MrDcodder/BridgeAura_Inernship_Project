import React, { useState } from 'react';

interface PremiumUpgradeModalProps {
  isOpen: boolean;
  isPro: boolean;
  onSkip: () => void;
  onUpgradeSuccess: () => void;
  ventureName: string;
}

export const PremiumUpgradeModal: React.FC<PremiumUpgradeModalProps> = ({
  isOpen,
  isPro,
  onSkip,
  onUpgradeSuccess,
  ventureName,
}) => {
  const [isProcessing, setIsProcessing] = useState(false);

  if (!isOpen) return null;

  const handleActivatePro = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      onUpgradeSuccess();
    }, 550);
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#0F172A]/60 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn">
      <div className="relative w-full max-w-[520px] rounded-[2rem] bg-white/95 backdrop-blur-2xl luminous-card-shadow border border-white/90 overflow-hidden p-6 sm:p-8">
        {/* Top Ambient Accent Bar */}
        <div className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-[#00685f] via-[#14b8a6] to-[#6366f1]" />
        <div className="absolute -top-24 -right-24 w-56 h-56 rounded-full bg-[#89f5e7]/30 blur-3xl pointer-events-none" />

        {/* Top Row: Restriction Badge + Skip (Close) Button */}
        <div className="flex items-center justify-between gap-3 mb-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#ffdbce]/70 border border-[#924628]/25 text-[#924628] text-[10px] font-bold uppercase tracking-wider">
            <span className="material-symbols-outlined text-[14px]">lock</span>
            <span>PREMIUM ACCOUNT RESTRICTION</span>
          </div>

          <button
            type="button"
            onClick={onSkip}
            title="Skip for now"
            className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#f0f5f2] hover:bg-[#e4e9e7] text-[#64748B] hover:text-[#0F172A] text-xs font-bold transition-colors cursor-pointer"
          >
            <span>Skip</span>
            <span>✕</span>
          </button>
        </div>

        {/* Headline & Restriction Copy */}
        <div className="mb-5">
          <h2 className="font-headline font-extrabold text-2xl sm:text-[26px] text-[#0F172A] tracking-tight leading-snug mb-1.5">
            Unlock Full Executive Synthesis with Venture Vision Pro
          </h2>
          <p className="text-xs sm:text-sm text-[#64748B] leading-relaxed">
            Your 36-vector strategic summary for{' '}
            <strong className="text-[#0F172A] font-bold">{ventureName}</strong>{' '}
            has been generated. Full deep-reasoning exports, live weight
            re-calibration, and institutional investor dossiers are reserved for{' '}
            <strong className="text-[#00685f] font-bold">
              Premium Account
            </strong>{' '}
            members.
          </p>
        </div>

        {/* Pricing Card Box ($49/month) */}
        <div className="rounded-2xl bg-[#f5faf8] border-2 border-[#00685f]/35 p-5 mb-5 relative overflow-hidden">
          <div className="flex items-baseline justify-between gap-2 mb-3">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#00685f] block">
                VENTURE VISION PRO PLAN
              </span>
              <span className="font-headline font-bold text-base text-[#0F172A]">
                Founder & Syndicate Tier
              </span>
            </div>
            <div className="text-right">
              <span className="font-headline font-extrabold text-3xl text-[#0F172A] tabular-nums">
                $49
              </span>
              <span className="text-xs font-semibold text-[#64748B]">
                {' '}
                / month
              </span>
            </div>
          </div>

          <ul className="space-y-2 text-xs text-[#334155]">
            <li className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[16px] text-[#00685f]">
                check_circle
              </span>
              <span>
                Unlimited Qwen3 4B <code>/think</code> Chain-of-Thought
                synthesis runs
              </span>
            </li>
            <li className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[16px] text-[#00685f]">
                check_circle
              </span>
              <span>
                Full 5-Phase Execution Roadmap & critical risk mitigation flags
              </span>
            </li>
            <li className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[16px] text-[#00685f]">
                check_circle
              </span>
              <span>
                Real-time Perspective Weight Parameter tuning & JSON/PDF Dossier
                Export
              </span>
            </li>
            <li className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[16px] text-[#00685f]">
                check_circle
              </span>
              <span>
                Priority dedicated vLLM / Qwen3 4B high-context inference queue
              </span>
            </li>
          </ul>
        </div>

        {/* Action Buttons: Upgrade CTA + Skippable Action */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
          <button
            type="button"
            disabled={isProcessing || isPro}
            onClick={handleActivatePro}
            className="flex-1 inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-full bg-gradient-to-r from-[#00685f] via-[#008378] to-[#38485d] text-white font-bold text-xs sm:text-sm shadow-md teal-cta-glow transition-all hover:scale-[1.01] active:scale-98 cursor-pointer"
          >
            {isProcessing ? (
              <>
                <span className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
                <span>Activating Pro Plan...</span>
              </>
            ) : isPro ? (
              <>
                <span className="material-symbols-outlined text-base">
                  verified
                </span>
                <span>Pro Plan Active ($49/mo)</span>
              </>
            ) : (
              <>
                <span className="material-symbols-outlined text-base">
                  workspace_premium
                </span>
                <span>Buy Pro Subscription — $49/mo</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={onSkip}
            className="inline-flex items-center justify-center gap-1.5 py-3.5 px-5 rounded-full bg-[#f0f5f2] hover:bg-[#e4e9e7] text-[#475569] hover:text-[#0F172A] font-bold text-xs transition-all cursor-pointer"
          >
            <span>Skip for Now</span>
            <span>→</span>
          </button>
        </div>
      </div>
    </div>
  );
};
