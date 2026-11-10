import React from 'react';
import { AetherLogoMark } from './BrandIcons';

interface StartupIdeaScreenProps {
  idea: string;
  error?: string | null;
  onChangeIdea: (idea: string) => void;
  onContinue: () => void;
}

export const StartupIdeaScreen: React.FC<StartupIdeaScreenProps> = ({
  idea,
  error,
  onChangeIdea,
  onContinue,
}) => (
  <main className="relative z-10 flex min-h-screen items-center justify-center px-4 py-10">
    <section className="w-full max-w-2xl rounded-[2rem] border border-white/90 bg-white/92 p-7 shadow-xl backdrop-blur-2xl sm:p-10">
      <div className="mb-7 flex items-center gap-3">
        <AetherLogoMark variant="v" size="sm" />
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#00685f]">
            Startup diagnostic · Step 1
          </p>
          <p className="text-xs text-[#64748B]">Your idea shapes every perspective</p>
        </div>
      </div>

      <h1 className="font-headline text-3xl font-bold tracking-tight text-[#0F172A] sm:text-4xl">
        What startup are you building?
      </h1>
      <p className="mt-3 max-w-xl text-sm leading-relaxed text-[#64748B]">
        Describe the problem, who it helps, and how your solution works. We’ll
        pick out the key terms and tailor the customer, owner, market, investor,
        and finance questions to your idea.
      </p>

      <label
        htmlFor="startup-idea"
        className="mt-7 block text-sm font-bold text-[#334155]"
      >
        Your startup idea
      </label>
      <textarea
        id="startup-idea"
        value={idea}
        onChange={(event) => onChangeIdea(event.target.value)}
        onKeyDown={(event) => {
          if ((event.ctrlKey || event.metaKey) && event.key === 'Enter' && idea.trim()) {
            onContinue();
          }
        }}
        maxLength={1000}
        rows={6}
        placeholder="Example: A mobile platform that helps independent clinics reduce missed appointments with automated reminders and simple scheduling."
        className="mt-2 w-full resize-y rounded-2xl border border-[#64748B]/20 bg-[#f8faf9] px-4 py-3 text-sm leading-relaxed text-[#0F172A] placeholder:text-[#94A3B8] focus:border-[#00685f] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#00685f]/15"
        autoFocus
      />
      <div className="mt-2 flex items-center justify-between gap-3 text-xs text-[#64748B]">
        <span>Include your target customer and the problem you solve.</span>
        <span>{idea.length}/1000</span>
      </div>
      {error && (
        <p role="alert" className="mt-3 text-sm font-medium text-red-700">
          {error}
        </p>
      )}

      <button
        type="button"
        onClick={onContinue}
        disabled={!idea.trim()}
        className="mt-7 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#00685f] px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#005049] disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
      >
        <span>Tailor my diagnostic</span>
        <span aria-hidden="true">→</span>
      </button>
    </section>
  </main>
);
