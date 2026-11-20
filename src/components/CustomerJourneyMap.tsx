import React from 'react';

interface CustomerJourneyMapProps {
  idea: string;
  persona: string;
}

const journeyStages = [
  {
    icon: 'chat_bubble_outline',
    title: 'SAYS',
    content: '“I need a reliable way to solve this without adding more friction.”',
  },
  {
    icon: 'cloud',
    title: 'THINKS',
    content: '“Will this be easy to trust and use when I need it?”',
  },
  {
    icon: 'directions_walk',
    title: 'DOES',
    content: 'Looks for options, compares convenience, and chooses what fits best.',
  },
  {
    icon: 'favorite_border',
    title: 'FEELS',
    content: 'Frustrated by today’s friction; reassured when the experience feels simple and dependable.',
  },
];

export const CustomerJourneyMap: React.FC<CustomerJourneyMapProps> = ({
  idea,
  persona,
}) => (
  <section
    aria-labelledby="customer-journey-title"
    className="mb-6 rounded-[1.75rem] border border-[#64748B]/15 bg-white/90 p-5 shadow-sm sm:p-7"
  >
    <div className="mb-4 border-b border-[#64748B]/20 pb-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2
          id="customer-journey-title"
          className="font-headline text-xl font-bold tracking-tight text-[#0F172A]"
        >
          Customer Journey Map
        </h2>
        <span className="rounded-full bg-[#e6f4f1] px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-[#00685f]">
          Hypothesis to validate
        </span>
      </div>
      <p className="mt-1 text-sm font-semibold text-[#334155]">
        Target persona: {persona}
      </p>
      <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-[#64748B]">
        Idea context: {idea || 'No startup idea provided'}
      </p>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2">
      {journeyStages.map((stage, index) => (
        <article
          key={stage.title}
          className={`min-w-0 px-3 py-5 sm:px-6 ${
            index < 2 ? 'border-b border-[#64748B]/35' : ''
          } ${index % 2 === 0 ? 'sm:border-r sm:border-[#64748B]/35' : ''}`}
        >
          <h3 className="mb-3 flex items-center gap-2.5 text-lg font-extrabold tracking-wide text-[#111827]">
            <span
              aria-hidden="true"
              className="material-symbols-outlined text-[27px] leading-none"
            >
              {stage.icon}
            </span>
            {stage.title}
          </h3>
          <p className="text-sm leading-relaxed text-[#1F2937]">
            {stage.content}
          </p>
        </article>
      ))}
    </div>
  </section>
);
