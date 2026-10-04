export type PerspectiveId = 'CUSTOMER' | 'OWNER' | 'MARKET' | 'INVESTOR' | 'FINANCE';

export interface QuestionOption {
  id: 'A' | 'B' | 'C' | 'D';
  title: string;
  description: string;
  strategicMatch?: boolean;
  scoreVector: {
    customer: number;
    market: number;
    finance: number;
    moat: number;
    velocity: number;
  };
}

export interface DeckQuestion {
  id: string;
  perspective: PerspectiveId;
  stageNumber: number;
  questionIndex: number; // 1-based within perspective
  totalInPerspective: number;
  headline: string;
  subtitle: string;
  options: QuestionOption[];
  defaultOptionId: 'A' | 'B' | 'C' | 'D';
  defaultNotes?: string;
  nuanceLabel: string;
  nuancePlaceholder: string;
  cognitiveAlignment: string;
  evaluationBenchmark: string;
  nextStagePreview: string;
  dossierKey?: 'primaryL1' | 'secondaryL2';
  dossierShortValue?: Record<'A' | 'B' | 'C' | 'D', string>;
}

export interface PerspectiveMeta {
  id: PerspectiveId;
  stageCode: string;
  stageNumber: number;
  label: string;
  fullTitle: string;
  questionCount: number;
  primaryMetricLabel: string;
  secondaryMetricLabel: string;
  badgeText: string;
}

export interface AnswerRecord {
  questionId: string;
  selectedOptionId: 'A' | 'B' | 'C' | 'D';
  notes: string;
  updatedAt: string;
}

export interface WeightParameters {
  customerWeight: number;
  ownerWeight: number;
  marketWeight: number;
  investorWeight: number;
  financeWeight: number;
  qwenThinkingMode: boolean; // /think vs /no_think token mode for Qwen3 4B
  temperature: number;
  contextWindow: number;
}

export interface SynthesisPhase {
  phaseNumber: number;
  tabLabel: string;
  eyebrow: string;
  headline: string;
  primaryObjective: string;
  workstreams: string[];
  criticalMilestonesTitle: string;
  criticalMilestonesProgress: number;
  identifiedRisk: string;
  founderAlignmentLabel: string;
  stageStatusBadge: string;
  targetQuarter: string;
}

export interface SynthesisResult {
  artifactId: string;
  generatedAt: string;
  modelEngine: string;
  qwenThinkingTrace: string;
  overallReadiness: number;
  readinessBreakdown: {
    cust: number;
    mkt: number;
    fin: number;
  };
  synthesisMetric: string;
  synthesisMetricDesc: string;
  runwayProjection: string;
  runwayProjectionDesc: string;
  strategicMoat: string;
  strategicMoatDesc: string;
  phases: SynthesisPhase[];
}

export const PERSPECTIVES: PerspectiveMeta[] = [
  {
    id: 'CUSTOMER',
    stageCode: 'STAGE 01',
    stageNumber: 1,
    label: 'CUSTOMER',
    fullTitle: 'Customer Perspective',
    questionCount: 8,
    primaryMetricLabel: 'Primary ICP',
    secondaryMetricLabel: 'Core Pain',
    badgeText: 'High Urgency Tier',
  },
  {
    id: 'OWNER',
    stageCode: 'STAGE 02',
    stageNumber: 2,
    label: 'OWNER',
    fullTitle: 'Owner Perspective',
    questionCount: 6,
    primaryMetricLabel: 'Venture Vision',
    secondaryMetricLabel: 'Target Horizon',
    badgeText: 'Founder Aligned',
  },
  {
    id: 'MARKET',
    stageCode: 'STAGE 03',
    stageNumber: 3,
    label: 'MARKET',
    fullTitle: 'Market Perspective',
    questionCount: 7,
    primaryMetricLabel: 'TAM Definition',
    secondaryMetricLabel: 'Differentiation',
    badgeText: 'Blue Ocean Niche',
  },
  {
    id: 'INVESTOR',
    stageCode: 'STAGE 04',
    stageNumber: 4,
    label: 'INVESTOR',
    fullTitle: 'Investor Perspective',
    questionCount: 7,
    primaryMetricLabel: 'Defensibility',
    secondaryMetricLabel: 'Capital Target',
    badgeText: 'High Moat Index',
  },
  {
    id: 'FINANCE',
    stageCode: 'STAGE 05',
    stageNumber: 5,
    label: 'FINANCE',
    fullTitle: 'Finance Perspective',
    questionCount: 8,
    primaryMetricLabel: 'Revenue Model',
    secondaryMetricLabel: 'Gross Margin Goal',
    badgeText: 'Unit Economics Validated',
  },
];

// Hotlinked assets from the user's provided HTML and uploaded reference images
export const BRAND_ASSETS = {
  aetherLogoUrl:
    'https://lh3.googleusercontent.com/aida/AEtjO1Uripo3hOolSm3mvd7BA5vwKlSEFn9dkYJNhMosHL-6V6E7kkztzDcJBR8ezibytiJIGMgWVaG_4qQPdqSeLBMq9F9JmdQcVToAnm00iUXMtdCnqnXZ-U3dvRMuP8d13YLNlCQBaz8qDSOLnHtr8fNGwv0FYNzzAEDu32Dsw7J43tuVPTVGONvXdNKK2-lAYEdoKQSCMtbFUmA7rJYrKuV8pPbLRAYYfdG6NEon4OG2z8_KBPU0z3uCerdl',
};

export const DECK_QUESTIONS: DeckQuestion[] = [
  // ==========================================
  // STAGE 01: CUSTOMER (8 Questions)
  // ==========================================
  {
    id: 'CUST-01',
    perspective: 'CUSTOMER',
    stageNumber: 1,
    questionIndex: 1,
    totalInPerspective: 8,
    headline: 'What is the acute workflow pain point your target user experiences weekly?',
    subtitle: 'Identify whether the problem stems from fragmented tooling, manual cognitive overhead, or compliance bottlenecks.',
    defaultOptionId: 'B',
    dossierKey: 'secondaryL2',
    dossierShortValue: {
      A: 'Manual compliance & audit overhead across distributed teams',
      B: 'Fragmented discovery tooling and noisy roadmaps',
      C: 'High latency infrastructure & cloud compute sprawl',
      D: 'Unstructured customer feedback lost in chat channels',
    },
    options: [
      {
        id: 'A',
        title: 'Compliance & Audit Bottlenecks',
        description: 'Manual governance checks slowing down production releases.',
        scoreVector: { customer: 84, market: 72, finance: 80, moat: 82, velocity: 70 },
      },
      {
        id: 'B',
        title: 'Fragmented Discovery Tooling & Noisy Roadmaps',
        description: 'Disconnected docs, static spreadsheets, and misaligned strategic priorities.',
        strategicMatch: true,
        scoreVector: { customer: 95, market: 86, finance: 88, moat: 90, velocity: 92 },
      },
      {
        id: 'C',
        title: 'Infrastructure & Compute Sprawl',
        description: 'Escalating inference and pipeline orchestration costs.',
        scoreVector: { customer: 82, market: 78, finance: 85, moat: 80, velocity: 75 },
      },
      {
        id: 'D',
        title: 'Siloed Customer Intelligence',
        description: 'Insights trapped across call recordings and support tickets.',
        scoreVector: { customer: 80, market: 74, finance: 76, moat: 72, velocity: 84 },
      },
    ],
    nuanceLabel: 'Pain Severity & Frequency Context',
    nuancePlaceholder: 'Describe how many hours per week teams lose to this friction or what triggers an immediate search for a solution...',
    cognitiveAlignment: 'High-frequency weekly workflow pain creates 3.4x faster seed-stage conversion than quarterly reporting tools.',
    evaluationBenchmark: 'Benchmarked against 210 B2B SaaS seed cohorts evaluated by Qwen3 4B.',
    nextStagePreview: 'Card 02 examines how target users currently solve or work around this friction.',
  },
  {
    id: 'CUST-02',
    perspective: 'CUSTOMER',
    stageNumber: 1,
    questionIndex: 2,
    totalInPerspective: 8,
    headline: 'What incumbent workaround are customers actively trying to replace?',
    subtitle: 'Replacing brittle internal scripts or static documents yields different switching dynamics than ripping out an ERP.',
    defaultOptionId: 'A',
    options: [
      {
        id: 'A',
        title: 'Static Slide Decks & Spreadsheet Matrices',
        description: 'Ad-hoc Notion pages, Figma boards, and disconnected spreadsheet models.',
        strategicMatch: true,
        scoreVector: { customer: 92, market: 84, finance: 82, moat: 86, velocity: 94 },
      },
      {
        id: 'B',
        title: 'Legacy Enterprise Suite Modules',
        description: 'Heavyweight, multi-year licensed platforms with poor UX adoption.',
        scoreVector: { customer: 85, market: 88, finance: 90, moat: 88, velocity: 65 },
      },
      {
        id: 'C',
        title: 'External Advisory & Strategy Consultants',
        description: 'High-cost human agencies charging $25k+ per engagement cycle.',
        scoreVector: { customer: 88, market: 80, finance: 92, moat: 84, velocity: 78 },
      },
      {
        id: 'D',
        title: 'Homegrown Internal LLM Prompts',
        description: 'Unstructured chat threads lacking rubric discipline or state persistence.',
        scoreVector: { customer: 90, market: 85, finance: 80, moat: 82, velocity: 90 },
      },
    ],
    nuanceLabel: 'Incumbent Switching Dynamics',
    nuancePlaceholder: 'Optional notes on migration friction, data import requirements, or existing contract lock-in...',
    cognitiveAlignment: 'Unbundling static spreadsheets into spatial interactive workflows reduces time-to-value under 8 minutes.',
    evaluationBenchmark: 'Top decile PLG startups achieve first-session activation within 12 minutes of signup.',
    nextStagePreview: 'Card 03 evaluates urgency triggers and budget unlock catalysts.',
  },
  {
    id: 'CUST-03',
    perspective: 'CUSTOMER',
    stageNumber: 1,
    questionIndex: 3,
    totalInPerspective: 8,
    headline: 'What catalyst forces the customer to evaluate your solution right now?',
    subtitle: 'Pinpoint the exact organizational event that turns a passive annoyance into an active buying mandate.',
    defaultOptionId: 'B',
    options: [
      {
        id: 'A',
        title: 'Upcoming Board or Institutional Fundraising Cycle',
        description: 'Founders and VPs needing rigorous validation before capital roadshows.',
        scoreVector: { customer: 91, market: 82, finance: 89, moat: 85, velocity: 88 },
      },
      {
        id: 'B',
        title: 'AI Product Roadmap Pivot & Architecture Reset',
        description: 'Engineering and product leads re-architecting core workflows for agentic models.',
        strategicMatch: true,
        scoreVector: { customer: 94, market: 90, finance: 86, moat: 91, velocity: 93 },
      },
      {
        id: 'C',
        title: 'Executive Mandate to Cut Burn Rate',
        description: 'CFO-driven consolidation of redundant SaaS licenses and contractor spend.',
        scoreVector: { customer: 84, market: 79, finance: 92, moat: 80, velocity: 76 },
      },
      {
        id: 'D',
        title: 'New Regulatory or Security Compliance Deadline',
        description: 'Mandatory SOC2/ISO/AI-Act readiness prior to enterprise deal closure.',
        scoreVector: { customer: 86, market: 83, finance: 88, moat: 89, velocity: 72 },
      },
    ],
    nuanceLabel: 'Trigger Timing & Urgency Window',
    nuancePlaceholder: 'Note seasonal budget cycles, product launch windows, or board cadence...',
    cognitiveAlignment: 'Tying adoption to an active architecture pivot compresses sales cycles by 42%.',
    evaluationBenchmark: 'Urgency-backed deals close in 19 days vs 64 days for vitamin workflows.',
    nextStagePreview: 'Card 04 defines the primary decision-maker and end-user persona.',
  },
  {
    id: 'CUST-04',
    perspective: 'CUSTOMER',
    stageNumber: 1,
    questionIndex: 4,
    totalInPerspective: 8,
    headline: 'Who is the primary decision-maker and end-user for your proposed solution?',
    subtitle: 'Define whether you sell directly to individual contributors, department heads, or enterprise procurement teams.',
    defaultOptionId: 'B',
    dossierKey: 'primaryL1',
    dossierShortValue: {
      A: 'B2B Enterprise Leaders',
      B: 'Product & Engineering Teams',
      C: 'SMB Founders & Small Operators',
      D: 'Direct-to-Consumer Prosumers',
    },
    options: [
      {
        id: 'A',
        title: 'B2B Enterprise Leaders',
        description: 'C-Suite / VPs with centralized budget authority and procurement review.',
        scoreVector: { customer: 86, market: 84, finance: 90, moat: 86, velocity: 68 },
      },
      {
        id: 'B',
        title: 'Product & Engineering Teams',
        description: 'Bottom-up self-serve adoption with organic team expansion and high retention.',
        strategicMatch: true,
        scoreVector: { customer: 96, market: 91, finance: 88, moat: 92, velocity: 95 },
      },
      {
        id: 'C',
        title: 'SMB Founders & Small Operators',
        description: 'High volume, rapid conversion velocity, price-sensitive annual contracts.',
        scoreVector: { customer: 88, market: 80, finance: 78, moat: 75, velocity: 92 },
      },
      {
        id: 'D',
        title: 'Direct-to-Consumer Prosumers',
        description: 'Individual creators, autonomous freelancers, and micro-studios.',
        scoreVector: { customer: 82, market: 76, finance: 70, moat: 68, velocity: 94 },
      },
    ],
    nuanceLabel: 'Persona Nuances & Sales Motion',
    nuancePlaceholder: 'Optional notes or nuances regarding your target buyer personas, ACV expectations, or multi-seat procurement cycles...',
    cognitiveAlignment: 'Bottom-up motions accelerate product virality with lower initial customer acquisition cost.',
    evaluationBenchmark: 'Compared against 142 AI developer tool seeds raised in late 2024 cohorts.',
    nextStagePreview: 'Card 05 explores sales expansion barriers and internal security clearance.',
  },
  {
    id: 'CUST-05',
    perspective: 'CUSTOMER',
    stageNumber: 1,
    questionIndex: 5,
    totalInPerspective: 8,
    headline: 'What is the primary barrier to team-wide expansion after initial user onboarding?',
    subtitle: 'Identify the main friction point between a single champion testing the deck and a 25-seat workspace rollout.',
    defaultOptionId: 'A',
    options: [
      {
        id: 'A',
        title: 'Data Privacy & Local Model Sovereignty Requirements',
        description: 'Enterprise Infosec requiring on-prem or VPC-isolated LLM inference (e.g. Qwen3 4B).',
        strategicMatch: true,
        scoreVector: { customer: 93, market: 89, finance: 90, moat: 94, velocity: 85 },
      },
      {
        id: 'B',
        title: 'Cross-Departmental Workflow Standardization',
        description: 'Getting Finance, Product, and GTM teams to share a unified taxonomy.',
        scoreVector: { customer: 87, market: 82, finance: 84, moat: 86, velocity: 80 },
      },
      {
        id: 'C',
        title: 'Integration Depth with Existing Issue Trackers',
        description: 'Requires bidirectional sync with Linear, Jira, GitHub, and CRM pipelines.',
        scoreVector: { customer: 89, market: 85, finance: 82, moat: 88, velocity: 84 },
      },
      {
        id: 'D',
        title: 'Seat-Based Pricing Threshold Approval',
        description: 'Moving from discretionary corporate card spend ($200/mo) to CFO PO sign-off.',
        scoreVector: { customer: 85, market: 80, finance: 86, moat: 78, velocity: 88 },
      },
    ],
    nuanceLabel: 'Security & Procurement Clearance',
    nuancePlaceholder: 'Specify if customers require self-hosted weights, zero-data-retention APIs, or RBAC...',
    cognitiveAlignment: 'Supporting compact self-hostable models like Qwen3 4B neutralizes enterprise AI data-leakage objections.',
    evaluationBenchmark: '68% of technical buyers prefer architectures that allow VPC or local weight execution.',
    nextStagePreview: 'Card 06 measures quantifiable ROI delivered within the first 30 days.',
  },
  {
    id: 'CUST-06',
    perspective: 'CUSTOMER',
    stageNumber: 1,
    questionIndex: 6,
    totalInPerspective: 8,
    headline: 'How does the customer quantify return on investment within the first 30 days?',
    subtitle: 'Select the primary north-star value metric that justifies immediate renewal and referrals.',
    defaultOptionId: 'B',
    options: [
      {
        id: 'A',
        title: 'Direct Headcount & Agency Cost Reduction',
        description: 'Replacing $15k–$40k in external market research and diligence fees.',
        scoreVector: { customer: 88, market: 82, finance: 93, moat: 82, velocity: 84 },
      },
      {
        id: 'B',
        title: 'Engineering & Product Cycle Velocity (+35% Faster Alignment)',
        description: 'Eliminating weeks of circular debate before writing production code.',
        strategicMatch: true,
        scoreVector: { customer: 95, market: 88, finance: 87, moat: 90, velocity: 94 },
      },
      {
        id: 'C',
        title: 'Higher Fundraising & Deal Conversion Rate',
        description: 'Generating institutional-grade strategic dossiers that win stakeholder buy-in.',
        scoreVector: { customer: 91, market: 86, finance: 90, moat: 86, velocity: 89 },
      },
      {
        id: 'D',
        title: 'Automated Risk & Blindspot Detection',
        description: 'Catching unit-economic or GTM flaws before capital deployment.',
        scoreVector: { customer: 89, market: 84, finance: 89, moat: 88, velocity: 82 },
      },
    ],
    nuanceLabel: 'Customer Value Metric Details',
    nuancePlaceholder: 'Add concrete KPIs your early design partners track...',
    cognitiveAlignment: 'Velocity metrics paired with tangible artifact exports drive 91% month-2 retention.',
    evaluationBenchmark: 'Validated across 85 product-led AI workflow deployments.',
    nextStagePreview: 'Card 07 examines customer onboarding modality and time-to-first-artifact.',
  },
  {
    id: 'CUST-07',
    perspective: 'CUSTOMER',
    stageNumber: 1,
    questionIndex: 7,
    totalInPerspective: 8,
    headline: 'What is your target onboarding modality and time-to-first-value (TTFV)?',
    subtitle: 'Determine how quickly a new user can complete their first synthesis without human intervention.',
    defaultOptionId: 'A',
    options: [
      {
        id: 'A',
        title: 'Instant Guided 3D Card Deck (< 6 Minutes to Synthesis)',
        description: 'Zero-config interactive interview that compiles a complete executive dossier.',
        strategicMatch: true,
        scoreVector: { customer: 96, market: 90, finance: 88, moat: 91, velocity: 97 },
      },
      {
        id: 'B',
        title: 'Repository & Workspace Document Ingestion',
        description: 'Connects to Notion, GitHub, or Drive and indexes context over 15 minutes.',
        scoreVector: { customer: 89, market: 86, finance: 85, moat: 92, velocity: 84 },
      },
      {
        id: 'C',
        title: 'White-Glove Solutions Architect Onboarding',
        description: 'Dedicated 45-minute workshop to configure custom enterprise rubrics.',
        scoreVector: { customer: 84, market: 78, finance: 91, moat: 85, velocity: 64 },
      },
      {
        id: 'D',
        title: 'API / CLI SDK Integration First',
        description: 'Developers install a package and run local synthesis pipelines.',
        scoreVector: { customer: 87, market: 85, finance: 82, moat: 89, velocity: 86 },
      },
    ],
    nuanceLabel: 'Activation Funnel Mechanics',
    nuancePlaceholder: 'Note guest mode previews, template libraries, or collaborative invite loops...',
    cognitiveAlignment: 'Tactile card progression yields 78% completion rates compared to 22% on long-form forms.',
    evaluationBenchmark: 'Interactive spatial decks outperform standard chat interfaces by 3.1x on structured signal capture.',
    nextStagePreview: 'Card 08 captures net retention and organic viral loop mechanics.',
  },
  {
    id: 'CUST-08',
    perspective: 'CUSTOMER',
    stageNumber: 1,
    questionIndex: 8,
    totalInPerspective: 8,
    headline: 'How do existing users organically bring new users into the platform?',
    subtitle: 'Viral distribution loops lower blended CAC and compound defensibility across organizations.',
    defaultOptionId: 'B',
    options: [
      {
        id: 'A',
        title: 'Public Template & Benchmark Marketplace',
        description: 'Users publish anonymized industry decks for community remixing.',
        scoreVector: { customer: 88, market: 89, finance: 82, moat: 87, velocity: 90 },
      },
      {
        id: 'B',
        title: 'Shared Executive Dossier Links & Co-Founder Alignment Rooms',
        description: 'Founders share live synthesis artifacts (#SYN-9402) with co-founders and investors.',
        strategicMatch: true,
        scoreVector: { customer: 95, market: 92, finance: 90, moat: 93, velocity: 95 },
      },
      {
        id: 'C',
        title: 'Embedded Slack / Linear Digest Notifications',
        description: 'Automated weekly strategic drift alerts pushed to team channels.',
        scoreVector: { customer: 86, market: 84, finance: 85, moat: 84, velocity: 86 },
      },
      {
        id: 'D',
        title: 'Syndicate & Accelerator Cohort Partnerships',
        description: 'Batch onboarding through venture studios and university incubators.',
        scoreVector: { customer: 90, market: 88, finance: 87, moat: 86, velocity: 89 },
      },
    ],
    nuanceLabel: 'Viral K-Factor Assumptions',
    nuancePlaceholder: 'Describe how exported dossiers or live links convert viewers into active creators...',
    cognitiveAlignment: 'Every exported strategic dossier acts as a high-trust credentialed acquisition asset.',
    evaluationBenchmark: 'Completes Stage 01 (Customer Perspective) with 8/8 high-signal vectors.',
    nextStagePreview: 'Stage 02 transitions to Owner Perspective (Venture Vision & Founder Alignment).',
  },

  // ==========================================
  // STAGE 02: OWNER (6 Questions)
  // ==========================================
  {
    id: 'OWN-01',
    perspective: 'OWNER',
    stageNumber: 2,
    questionIndex: 1,
    totalInPerspective: 6,
    headline: 'What is the overarching 5-year venture vision for the platform?',
    subtitle: 'Define the terminal category position you are building toward as the product matures.',
    defaultOptionId: 'B',
    dossierKey: 'primaryL1',
    dossierShortValue: {
      A: 'Vertical AI Advisory & Diligence Firm',
      B: 'Autonomous venture building OS',
      C: 'Open-Weight Enterprise Reasoning Infrastructure',
      D: 'Collaborative Product Discovery Suite',
    },
    options: [
      {
        id: 'A',
        title: 'Vertical AI Advisory & Diligence Engine',
        description: 'Automating investment committee memos and corporate M&A screening.',
        scoreVector: { customer: 86, market: 85, finance: 90, moat: 84, velocity: 82 },
      },
      {
        id: 'B',
        title: 'Autonomous Venture Building OS',
        description: 'End-to-end cognitive architecture guiding founders from thesis to Series B.',
        strategicMatch: true,
        scoreVector: { customer: 94, market: 93, finance: 91, moat: 94, velocity: 92 },
      },
      {
        id: 'C',
        title: 'Open-Weight Enterprise Reasoning Infrastructure',
        description: 'Fine-tuned Qwen3 4B decision models deployed inside Fortune 500 VPCs.',
        scoreVector: { customer: 88, market: 91, finance: 89, moat: 93, velocity: 80 },
      },
      {
        id: 'D',
        title: 'Collaborative Product Discovery Suite',
        description: 'The system of record for product managers and design engineers.',
        scoreVector: { customer: 92, market: 87, finance: 86, moat: 85, velocity: 91 },
      },
    ],
    nuanceLabel: 'Founder North-Star Thesis',
    nuancePlaceholder: 'Articulate your non-consensus belief about how strategic software will look in 2028...',
    cognitiveAlignment: 'Positioning as an Autonomous Venture Building OS expands LTV across the entire company lifecycle.',
    evaluationBenchmark: 'Multi-stage workflow platforms command 2.4x higher net dollar retention.',
    nextStagePreview: 'Card 02 defines your target profitability and operational horizon.',
  },
  {
    id: 'OWN-02',
    perspective: 'OWNER',
    stageNumber: 2,
    questionIndex: 2,
    totalInPerspective: 6,
    headline: 'What is your target operational horizon to reach default-alive profitability?',
    subtitle: 'Calibrate capital intensity against your desired timeline for sustainable cash-flow break-even.',
    defaultOptionId: 'B',
    dossierKey: 'secondaryL2',
    dossierShortValue: {
      A: '12-month bootstrap to Ramen profitability',
      B: '18-month profitability & break-even run-rate',
      C: '36-month hypergrowth Blitzscaling trajectory',
      D: '24-month R&D deep-tech commercialization',
    },
    options: [
      {
        id: 'A',
        title: '12-Month Lean Profitability',
        description: 'Immediate revenue monetization with zero external dilution.',
        scoreVector: { customer: 88, market: 78, finance: 94, moat: 78, velocity: 92 },
      },
      {
        id: 'B',
        title: '18-Month Profitability & Break-Even Run-Rate',
        description: 'Balanced seed deployment achieving cash-flow autonomy before Series A.',
        strategicMatch: true,
        scoreVector: { customer: 92, market: 89, finance: 95, moat: 90, velocity: 91 },
      },
      {
        id: 'C',
        title: '36-Month Hypergrowth Market Capture',
        description: 'Prioritizing maximum land-grab and network effects over near-term margins.',
        scoreVector: { customer: 89, market: 94, finance: 76, moat: 91, velocity: 88 },
      },
      {
        id: 'D',
        title: '24-Month Deep-Tech R&D Horizon',
        description: 'Front-loading proprietary model training and synthetic dataset curation.',
        scoreVector: { customer: 82, market: 88, finance: 80, moat: 95, velocity: 74 },
      },
    ],
    nuanceLabel: 'Runway & Milestone Pacing',
    nuancePlaceholder: 'Notes on hiring velocity, compute burn, and revenue milestones...',
    cognitiveAlignment: 'An 18-month break-even horizon maximizes optionality during Series A negotiations.',
    evaluationBenchmark: '81% of top-performing 2025 seed startups target default-alive metrics within 18 months.',
    nextStagePreview: 'Card 03 evaluates founder-market fit and unfair domain advantages.',
  },
  {
    id: 'OWN-03',
    perspective: 'OWNER',
    stageNumber: 2,
    questionIndex: 3,
    totalInPerspective: 6,
    headline: 'What is the founding team’s core unfair advantage in this domain?',
    subtitle: 'Identify why your team is uniquely equipped to out-execute well-funded incumbents.',
    defaultOptionId: 'A',
    options: [
      {
        id: 'A',
        title: 'Full-Stack Spatial UX + Small-Model AI Systems Engineering',
        description: 'Deep expertise combining tactile 3D interfaces with quantized Qwen3 4B inference.',
        strategicMatch: true,
        scoreVector: { customer: 94, market: 90, finance: 89, moat: 94, velocity: 95 },
      },
      {
        id: 'B',
        title: 'Proprietary Venture & Accelerator Distribution Network',
        description: 'Direct access to 500+ active founders and institutional seed funds.',
        scoreVector: { customer: 92, market: 91, finance: 88, moat: 87, velocity: 92 },
      },
      {
        id: 'C',
        title: 'Prior Second-Time Founder Exit Pedigree',
        description: 'Proven operational playbooks across GTM, enterprise sales, and fundraising.',
        scoreVector: { customer: 90, market: 89, finance: 92, moat: 88, velocity: 90 },
      },
      {
        id: 'D',
        title: 'Academic Research & Fine-Tuning Dataset Ownership',
        description: 'Exclusive curated corpus of 10,000+ annotated startup post-mortems and decks.',
        scoreVector: { customer: 86, market: 88, finance: 85, moat: 96, velocity: 82 },
      },
    ],
    nuanceLabel: 'Founding Team Composition',
    nuancePlaceholder: 'List key technical and commercial co-founder strengths...',
    cognitiveAlignment: 'Pairing compact local-ready models (Qwen3 4B) with high-craft UX creates a rare dual moat.',
    evaluationBenchmark: 'Technical-design hybrid founding teams ship 2.7x faster per dollar of burn.',
    nextStagePreview: 'Card 04 examines organizational hiring architecture.',
  },
  {
    id: 'OWN-04',
    perspective: 'OWNER',
    stageNumber: 2,
    questionIndex: 4,
    totalInPerspective: 6,
    headline: 'How will you structure engineering and GTM headcount over the next 12 months?',
    subtitle: 'Keep headcount lean to preserve runway while maximizing product shipping velocity.',
    defaultOptionId: 'B',
    options: [
      {
        id: 'A',
        title: 'Ultra-Lean AI-Native Squad (3–5 Senior Builders)',
        description: 'Founders + 2 staff engineers leveraging agentic workflows for 10x output.',
        scoreVector: { customer: 90, market: 86, finance: 96, moat: 88, velocity: 95 },
      },
      {
        id: 'B',
        title: 'Balanced Product & Founding GTM Pod (6–8 Core Team)',
        description: '4 AI/Full-stack engineers, 1 spatial designer, 2 technical GTM leads.',
        strategicMatch: true,
        scoreVector: { customer: 94, market: 90, finance: 92, moat: 91, velocity: 94 },
      },
      {
        id: 'C',
        title: 'Enterprise Sales-Heavy Expansion (12+ Headcount)',
        description: 'Early AE/SDR pod to aggressively hunt six-figure enterprise contracts.',
        scoreVector: { customer: 85, market: 88, finance: 75, moat: 84, velocity: 78 },
      },
      {
        id: 'D',
        title: 'Open-Source Community & Core Maintainer Model',
        description: 'Core team of 4 supported by external contributors and dev-rel champions.',
        scoreVector: { customer: 89, market: 91, finance: 90, moat: 90, velocity: 88 },
      },
    ],
    nuanceLabel: 'Key Hire Sequence',
    nuancePlaceholder: 'Specify which role is your #1 immediate hire post-synthesis...',
    cognitiveAlignment: 'A 6–8 person pod maintains high consensus velocity while sustaining 14.5+ months of runway.',
    evaluationBenchmark: 'Directly informs the Qwen3 4B Runway Projection capital preservation model.',
    nextStagePreview: 'Card 05 assesses governance and decision velocity rituals.',
  },
  {
    id: 'OWN-05',
    perspective: 'OWNER',
    stageNumber: 2,
    questionIndex: 5,
    totalInPerspective: 6,
    headline: 'What internal operating cadence governs product and strategic pivots?',
    subtitle: 'High-performing teams use explicit empirical thresholds to validate or kill assumptions.',
    defaultOptionId: 'A',
    options: [
      {
        id: 'A',
        title: 'Weekly Empirical Sprint + Customer Telemetry Loops',
        description: 'Every feature ships with quantitative completion and retention hypotheses.',
        strategicMatch: true,
        scoreVector: { customer: 95, market: 89, finance: 91, moat: 90, velocity: 96 },
      },
      {
        id: 'B',
        title: 'Monthly Design Partner Advisory Councils',
        description: 'Structured review with 15 flagship founders guiding roadmap weights.',
        scoreVector: { customer: 92, market: 88, finance: 88, moat: 89, velocity: 87 },
      },
      {
        id: 'C',
        title: 'Quarterly OKR & Board Dossier Synthesis',
        description: 'Formal top-down strategic allocation every 90 days.',
        scoreVector: { customer: 82, market: 84, finance: 89, moat: 82, velocity: 76 },
      },
      {
        id: 'D',
        title: 'Continuous Autonomous A/B Prompt & Flow Evolution',
        description: 'Automated rubric optimization driven by Qwen3 4B agreement scores.',
        scoreVector: { customer: 91, market: 90, finance: 88, moat: 93, velocity: 92 },
      },
    ],
    nuanceLabel: 'Founder Alignment Rituals',
    nuancePlaceholder: 'Note how co-founders resolve strategic disagreements...',
    cognitiveAlignment: 'Weekly empirical loops drive Strong Consensus (+18.4% velocity) across co-founders.',
    evaluationBenchmark: 'Teams with weekly telemetry audits pivot 3x faster away from dead-end features.',
    nextStagePreview: 'Card 06 defines long-term strategic autonomy and exit optionality.',
  },
  {
    id: 'OWN-06',
    perspective: 'OWNER',
    stageNumber: 2,
    questionIndex: 6,
    totalInPerspective: 6,
    headline: 'What is the primary long-term strategic outcome aligned across all founders?',
    subtitle: 'Ensure co-founders agree on dilution tolerance, category leadership, and strategic exit horizons.',
    defaultOptionId: 'B',
    options: [
      {
        id: 'A',
        title: 'Standalone Category-Defining Public Software Company',
        description: 'Compounding past $100M ARR as the standard for venture intelligence.',
        scoreVector: { customer: 92, market: 95, finance: 90, moat: 94, velocity: 89 },
      },
      {
        id: 'B',
        title: 'High-Leverage Category Leader with Strategic Optionality',
        description: 'Building an indispensable platform with both Series B scale and Tier-1 M&A appeal.',
        strategicMatch: true,
        scoreVector: { customer: 94, market: 92, finance: 94, moat: 92, velocity: 93 },
      },
      {
        id: 'C',
        title: 'Early Strategic Acquisition by Cloud / DevTools Giant',
        description: '3–4 year horizon targeting integration into a major enterprise ecosystem.',
        scoreVector: { customer: 86, market: 85, finance: 89, moat: 86, velocity: 88 },
      },
      {
        id: 'D',
        title: 'Cash-Flow Compounder & Venture Studio Engine',
        description: 'Using platform cash flows to incubate and spin out new vertical AI ventures.',
        scoreVector: { customer: 89, market: 86, finance: 95, moat: 89, velocity: 86 },
      },
    ],
    nuanceLabel: 'Founder Consensus Notes',
    nuancePlaceholder: 'Record any specific liquidity or control preferences...',
    cognitiveAlignment: 'Complete founder alignment eliminates the #1 internal cause of seed-to-Series A failure.',
    evaluationBenchmark: 'Completes Stage 02 (Owner Perspective) with 6/6 aligned vectors.',
    nextStagePreview: 'Stage 03 transitions to Market Perspective (TAM, Competition & Differentiation).',
  },

  // ==========================================
  // STAGE 03: MARKET (7 Questions)
  // ==========================================
  {
    id: 'MKT-01',
    perspective: 'MARKET',
    stageNumber: 3,
    questionIndex: 1,
    totalInPerspective: 7,
    headline: 'What is your primary addressable market (TAM) and wedge segment?',
    subtitle: 'Anchor your initial beachhead in a high-growth budget category with clear expansion adjacency.',
    defaultOptionId: 'B',
    dossierKey: 'primaryL1',
    dossierShortValue: {
      A: '$8.6B Enterprise Strategy & BI Software',
      B: '$14.2B Global Developer Tools',
      C: '$22.5B AI Productivity & Knowledge Work',
      D: '$6.4B Venture Capital & Private Equity FinTech',
    },
    options: [
      {
        id: 'A',
        title: '$8.6B Enterprise Strategy & Portfolio Management',
        description: 'Replacing traditional top-down strategic planning suites.',
        scoreVector: { customer: 85, market: 86, finance: 88, moat: 84, velocity: 78 },
      },
      {
        id: 'B',
        title: '$14.2B Global Developer Tools & Product Architecture',
        description: 'High-velocity technical teams adopting AI-native specification and strategy decks.',
        strategicMatch: true,
        scoreVector: { customer: 95, market: 94, finance: 90, moat: 92, velocity: 94 },
      },
      {
        id: 'C',
        title: '$22.5B Horizontal AI Workspace & Knowledge Synthesis',
        description: 'Broad knowledge worker adoption across product, marketing, and operations.',
        scoreVector: { customer: 88, market: 92, finance: 84, moat: 78, velocity: 88 },
      },
      {
        id: 'D',
        title: '$6.4B Institutional Venture & CorpDev Intelligence',
        description: 'Specialized diligence and portfolio diagnostic tooling for capital allocators.',
        scoreVector: { customer: 89, market: 84, finance: 92, moat: 89, velocity: 84 },
      },
    ],
    nuanceLabel: 'Bottom-Up SAM / SOM Math',
    nuancePlaceholder: 'Detail target account counts × average annual contract value (ACV)...',
    cognitiveAlignment: 'Anchoring in the $14.2B Developer & Product Tools market captures rapid bottom-up budget authority.',
    evaluationBenchmark: 'DevTools & Product Architecture budgets grew +34% YoY in 2025.',
    nextStagePreview: 'Card 02 defines your core architectural differentiation against incumbents.',
  },
  {
    id: 'MKT-02',
    perspective: 'MARKET',
    stageNumber: 3,
    questionIndex: 2,
    totalInPerspective: 7,
    headline: 'How does your product experience fundamentally differentiate from alternatives?',
    subtitle: 'Contrast your interaction paradigm against both legacy SaaS dashboards and generic AI chat boxes.',
    defaultOptionId: 'B',
    dossierKey: 'secondaryL2',
    dossierShortValue: {
      A: 'Autonomous multi-agent background research pipelines',
      B: 'Tactile Spatial AI decks vs dense dashboards',
      C: 'On-premise air-gapped Qwen3 4B inference',
      D: 'Real-time financial ledger & ERP integration',
    },
    options: [
      {
        id: 'A',
        title: 'Autonomous Multi-Agent Background Research',
        description: 'Deep web scraping and competitor synthesis without human prompting.',
        scoreVector: { customer: 88, market: 87, finance: 84, moat: 85, velocity: 86 },
      },
      {
        id: 'B',
        title: 'Tactile Spatial AI Decks vs Dense Dashboards',
        description: 'Calm, high-signal 3D card-deck progression eliminating cognitive overload.',
        strategicMatch: true,
        scoreVector: { customer: 96, market: 93, finance: 90, moat: 92, velocity: 95 },
      },
      {
        id: 'C',
        title: 'Air-Gapped Qwen3 4B Local Execution',
        description: 'Zero-latency private reasoning running on standard edge or VPC hardware.',
        scoreVector: { customer: 90, market: 89, finance: 91, moat: 94, velocity: 86 },
      },
      {
        id: 'D',
        title: 'Live Financial Ledger & Telemetry Binding',
        description: 'Direct connection to Stripe, Ramp, and cloud billing metrics.',
        scoreVector: { customer: 89, market: 86, finance: 92, moat: 88, velocity: 82 },
      },
    ],
    nuanceLabel: 'UX & Technical Wedge',
    nuancePlaceholder: 'Explain why users prefer your interface within the first 60 seconds...',
    cognitiveAlignment: 'Tactile Spatial AI decks transform tedious strategic interrogation into an executive flow state.',
    evaluationBenchmark: 'Blue Ocean UX differentiation reduces paid CAC by up to 55%.',
    nextStagePreview: 'Card 03 analyzes primary competitive threats and incumbent blindspots.',
  },
  {
    id: 'MKT-03',
    perspective: 'MARKET',
    stageNumber: 3,
    questionIndex: 3,
    totalInPerspective: 7,
    headline: 'Why will horizontal AI foundation model labs not commoditize your workflow?',
    subtitle: 'Foundation models commoditize generic chat; durable startups own structured domain state and workflow rubrics.',
    defaultOptionId: 'A',
    options: [
      {
        id: 'A',
        title: 'Structured 36-Vector Rubric + Multi-Perspective State Graph',
        description: 'General chat lacks deterministic 5-perspective diagnostic schemas and benchmark calibration.',
        strategicMatch: true,
        scoreVector: { customer: 94, market: 91, finance: 89, moat: 95, velocity: 92 },
      },
      {
        id: 'B',
        title: 'Model-Agnostic / Compact Qwen3 4B Fine-Tuned Specialization',
        description: 'Domain-tuned 4B parameter model outperforms bloated general models on latency and cost.',
        scoreVector: { customer: 91, market: 90, finance: 94, moat: 93, velocity: 90 },
      },
      {
        id: 'C',
        title: 'Deep Multi-Player Stakeholder Workflow Lock-In',
        description: 'Co-founders, advisors, and investors collaborate inside shared versioned workspaces.',
        scoreVector: { customer: 92, market: 89, finance: 90, moat: 92, velocity: 88 },
      },
      {
        id: 'D',
        title: 'Proprietary Cohort Benchmark Telemetry',
        description: 'Every completed deck enriches anonymized percentile scoring across industries.',
        scoreVector: { customer: 89, market: 92, finance: 88, moat: 96, velocity: 85 },
      },
    ],
    nuanceLabel: 'Anti-Commoditization Defense',
    nuancePlaceholder: 'Detail how your vertical workflow captures proprietary context...',
    cognitiveAlignment: 'Owning the structured input rubric and benchmark graph insulates the app from raw LLM price wars.',
    evaluationBenchmark: 'Vertical workflow capture is rated the #1 defensibility factor by institutional seed leads.',
    nextStagePreview: 'Card 04 evaluates Go-To-Market channel economics.',
  },
  {
    id: 'MKT-04',
    perspective: 'MARKET',
    stageNumber: 3,
    questionIndex: 4,
    totalInPerspective: 7,
    headline: 'What is your primary Go-To-Market (GTM) acquisition channel for the first 1,000 teams?',
    subtitle: 'Identify the highest-leverage distribution channel before scaling paid acquisition.',
    defaultOptionId: 'B',
    options: [
      {
        id: 'A',
        title: 'Open-Source Qwen3 4B Strategy Templates & GitHub Ecosystem',
        description: 'Developer evangelism through open diagnostic schemas and local model runners.',
        scoreVector: { customer: 92, market: 91, finance: 92, moat: 90, velocity: 93 },
      },
      {
        id: 'B',
        title: 'Product-Led Interactive Sandbox + Founder Referral Loops',
        description: 'Instant guest-mode deck preview that converts founders via exported synthesis dossiers.',
        strategicMatch: true,
        scoreVector: { customer: 95, market: 93, finance: 91, moat: 91, velocity: 96 },
      },
      {
        id: 'C',
        title: 'Venture Accelerator & Incubator Cohort Licensing',
        description: 'Partnering with top accelerators to run every batch company through Aether Deck.',
        scoreVector: { customer: 91, market: 90, finance: 89, moat: 89, velocity: 90 },
      },
      {
        id: 'D',
        title: 'Outbound Executive Account-Based Marketing (ABM)',
        description: 'Targeted outreach to VP Product and Chief Strategy Officers at Series B+ firms.',
        scoreVector: { customer: 84, market: 85, finance: 86, moat: 83, velocity: 74 },
      },
    ],
    nuanceLabel: 'Early Evangelism Strategy',
    nuancePlaceholder: 'Note developer communities, accelerators, or launch channels...',
    cognitiveAlignment: 'Early developer and founder evangelism builds a distribution moat before feature replication occurs.',
    evaluationBenchmark: 'Addresses the Qwen3 Flagged Risk on early distribution velocity.',
    nextStagePreview: 'Card 05 examines international and cross-vertical market expansion.',
  },
  {
    id: 'MKT-05',
    perspective: 'MARKET',
    stageNumber: 3,
    questionIndex: 5,
    totalInPerspective: 7,
    headline: 'Why is right now the inflection point ("Why Now?") for this category?',
    subtitle: 'Connect macro technological shifts to immediate buyer readiness.',
    defaultOptionId: 'A',
    options: [
      {
        id: 'A',
        title: 'Breakthrough Reasoning in Compact Models (Qwen3 4B)',
        description: '4B-parameter models now deliver frontier-grade strategic synthesis at 1/20th the inference cost.',
        strategicMatch: true,
        scoreVector: { customer: 93, market: 95, finance: 95, moat: 92, velocity: 94 },
      },
      {
        id: 'B',
        title: 'AI Coding Explosion Shifting Bottleneck to Strategy & Architecture',
        description: 'When code generation is near-instant, deciding WHAT to build becomes the critical bottleneck.',
        scoreVector: { customer: 96, market: 94, finance: 90, moat: 91, velocity: 95 },
      },
      {
        id: 'C',
        title: 'Heightened Institutional Bar for Seed & Series A Capital',
        description: 'Investors demand rigorous empirical validation and unit economics from day one.',
        scoreVector: { customer: 91, market: 89, finance: 92, moat: 87, velocity: 89 },
      },
      {
        id: 'D',
        title: 'Enterprise Fatigue with Cluttered Multi-Tab Dashboards',
        description: 'Buyers actively Favor calm, spatial, decision-oriented interfaces over raw charts.',
        scoreVector: { customer: 90, market: 88, finance: 86, moat: 88, velocity: 90 },
      },
    ],
    nuanceLabel: 'Macro Tailwinds',
    nuancePlaceholder: 'Combine technical model breakthroughs with market demand shifts...',
    cognitiveAlignment: 'Code generation speed has made architectural and strategic validation the #1 bottleneck in software.',
    evaluationBenchmark: 'Strongest macro "Why Now" thesis scored across 2025 AI infrastructure cohorts.',
    nextStagePreview: 'Card 06 evaluates ecosystem partnerships and platform integrations.',
  },
  {
    id: 'MKT-06',
    perspective: 'MARKET',
    stageNumber: 3,
    questionIndex: 6,
    totalInPerspective: 7,
    headline: 'Which ecosystem integrations create the highest switching cost for your users?',
    subtitle: 'Embedding into the daily toolchain turns a point diagnostic into a persistent operating system.',
    defaultOptionId: 'B',
    options: [
      {
        id: 'A',
        title: 'CRM & Revenue Pipelines (HubSpot, Salesforce, Stripe)',
        description: 'Continuously comparing strategic assumptions against live revenue actuals.',
        scoreVector: { customer: 89, market: 88, finance: 93, moat: 90, velocity: 84 },
      },
      {
        id: 'B',
        title: 'Engineering & Product Specs (Linear, GitHub, Cursor/IDE)',
        description: 'Exporting validated synthesis phases directly into actionable engineering roadmaps.',
        strategicMatch: true,
        scoreVector: { customer: 95, market: 92, finance: 89, moat: 94, velocity: 95 },
      },
      {
        id: 'C',
        title: 'Local AI Runtimes (Ollama, vLLM, HuggingFace, Cloud Run)',
        description: 'Seamless one-click switching between local Qwen3 4B and cloud inference.',
        scoreVector: { customer: 91, market: 90, finance: 92, moat: 93, velocity: 91 },
      },
      {
        id: 'D',
        title: 'Investor Data Rooms (DocSend, Notion, Carta)',
        description: 'Syncing live executive dossiers directly into fundraising data rooms.',
        scoreVector: { customer: 90, market: 87, finance: 90, moat: 88, velocity: 89 },
      },
    ],
    nuanceLabel: 'Integration Roadmap',
    nuancePlaceholder: 'List first 3 native connectors or export formats...',
    cognitiveAlignment: 'Bridging strategic synthesis directly into engineering workstreams locks in daily active usage.',
    evaluationBenchmark: 'Workflow-integrated tools experience 62% lower annual churn.',
    nextStagePreview: 'Card 07 assesses category expansion from wedge to enterprise.',
  },
  {
    id: 'MKT-07',
    perspective: 'MARKET',
    stageNumber: 3,
    questionIndex: 7,
    totalInPerspective: 7,
    headline: 'How does your initial startup wedge expand into multi-product enterprise accounts?',
    subtitle: 'Map the expansion path from early-stage teams to growth-stage and enterprise divisions.',
    defaultOptionId: 'A',
    options: [
      {
        id: 'A',
        title: 'Single Product Team → Multi-Squad Portfolio Governance',
        description: 'Expanding from one product initiative to every new product line launched inside the enterprise.',
        strategicMatch: true,
        scoreVector: { customer: 94, market: 93, finance: 92, moat: 92, velocity: 91 },
      },
      {
        id: 'B',
        title: 'Founder Diagnostic → Continuous Board & Investor Reporting',
        description: 'Transitioning from initial strategy deck to ongoing quarterly board synthesis.',
        scoreVector: { customer: 90, market: 88, finance: 90, moat: 88, velocity: 89 },
      },
      {
        id: 'C',
        title: 'SaaS Subscription → Managed Private Qwen3 4B Model Clusters',
        description: 'Upselling dedicated fine-tuned strategic models trained on proprietary company history.',
        scoreVector: { customer: 89, market: 91, finance: 94, moat: 95, velocity: 84 },
      },
      {
        id: 'D',
        title: 'Internal Tool → White-Labeled Advisory Platform',
        description: 'Licensing the spatial deck engine to consulting firms and venture funds.',
        scoreVector: { customer: 87, market: 89, finance: 91, moat: 87, velocity: 86 },
      },
    ],
    nuanceLabel: 'Land-and-Expand Mechanics',
    nuancePlaceholder: 'Describe net dollar retention (NDR) drivers...',
    cognitiveAlignment: 'Multi-squad expansion drives >130% Net Dollar Retention without enterprise outbound overhead.',
    evaluationBenchmark: 'Completes Stage 03 (Market Perspective) with 7/7 validated market vectors.',
    nextStagePreview: 'Stage 04 transitions to Investor Perspective (Defensibility, Moat & Capital).',
  },

  // ==========================================
  // STAGE 04: INVESTOR (7 Questions)
  // ==========================================
  {
    id: 'INV-01',
    perspective: 'INVESTOR',
    stageNumber: 4,
    questionIndex: 1,
    totalInPerspective: 7,
    headline: 'What is the primary structural moat that compounds as your platform scales?',
    subtitle: 'Institutional investors look for compounding defensibility beyond initial UI polish.',
    defaultOptionId: 'B',
    dossierKey: 'primaryL1',
    dossierShortValue: {
      A: 'Fine-tuned open-weight Qwen3 4B checkpoints',
      B: 'Proprietary multi-turn card data graph',
      C: 'Network effects across venture syndicate rooms',
      D: 'SOC2 / HIPAA air-gapped enterprise compliance',
    },
    options: [
      {
        id: 'A',
        title: 'Custom RLHF Checkpoints on Qwen3 4B Architecture',
        description: 'Domain-specific reasoning weights trained on verified venture outcomes.',
        scoreVector: { customer: 89, market: 90, finance: 91, moat: 94, velocity: 86 },
      },
      {
        id: 'B',
        title: 'Proprietary Multi-Turn Card Data Graph',
        description: 'Structured 36-dimension decision vectors linking founder assumptions to execution metrics.',
        strategicMatch: true,
        scoreVector: { customer: 94, market: 93, finance: 92, moat: 97, velocity: 92 },
      },
      {
        id: 'C',
        title: 'Two-Sided Founder & Capital Allocator Network Effects',
        description: 'Verified high-readiness dossiers matched directly with thesis-aligned seed funds.',
        scoreVector: { customer: 91, market: 92, finance: 90, moat: 93, velocity: 89 },
      },
      {
        id: 'D',
        title: 'Deep System-of-Record Workflow Embedding',
        description: 'Historical decision logs and assumption audits deeply tied to engineering sprints.',
        scoreVector: { customer: 92, market: 89, finance: 90, moat: 92, velocity: 88 },
      },
    ],
    nuanceLabel: 'Defensibility Compounding Loop',
    nuancePlaceholder: 'Explain how user #10,000 gets a measurably better experience than user #100...',
    cognitiveAlignment: 'A proprietary multi-turn card data graph creates a structured dataset unavailable on the public web.',
    evaluationBenchmark: 'Directly supports Tier A (High) Strategic Moat classification.',
    nextStagePreview: 'Card 02 defines your current fundraising round and capital target.',
  },
  {
    id: 'INV-02',
    perspective: 'INVESTOR',
    stageNumber: 4,
    questionIndex: 2,
    totalInPerspective: 7,
    headline: 'What is your current capital target and instrument structure?',
    subtitle: 'Align your capital raise with concrete 18-month value-inflection milestones.',
    defaultOptionId: 'B',
    dossierKey: 'secondaryL2',
    dossierShortValue: {
      A: 'Pre-Seed SAFE: $1.0M at $10M post-money cap',
      B: 'Seed Round ask: $2.5M at institutional terms',
      C: 'Series A: $8.0M priced equity round',
      D: 'Bootstrapped / Customer-funded growth',
    },
    options: [
      {
        id: 'A',
        title: 'Pre-Seed Ask: $1.0M on Post-Money SAFE',
        description: 'Fast angel & micro-VC syndicate round to reach initial 100 paying teams.',
        scoreVector: { customer: 90, market: 86, finance: 92, moat: 85, velocity: 95 },
      },
      {
        id: 'B',
        title: 'Seed Round Ask: $2.5M at Institutional Terms',
        description: '18–22 months runway to scale PLG adoption, Qwen3 4B pipeline, and $1.5M ARR.',
        strategicMatch: true,
        scoreVector: { customer: 94, market: 92, finance: 94, moat: 93, velocity: 93 },
      },
      {
        id: 'C',
        title: 'Series A Ask: $8.0M Priced Equity Round',
        description: 'Scaling enterprise GTM and global multi-region inference infrastructure.',
        scoreVector: { customer: 88, market: 91, finance: 86, moat: 90, velocity: 82 },
      },
      {
        id: 'D',
        title: 'Non-Dilutive Revenue & Grant Financing',
        description: 'Growing organically via annual upfront customer contracts and compute credits.',
        scoreVector: { customer: 91, market: 84, finance: 96, moat: 86, velocity: 88 },
      },
    ],
    nuanceLabel: 'Use of Proceeds Breakdown',
    nuancePlaceholder: 'Example: 65% Engineering & AI R&D, 25% PLG/Developer Evangelism, 10% Ops...',
    cognitiveAlignment: 'A disciplined $2.5M Seed provides optimal capital preservation while hitting Series A readiness.',
    evaluationBenchmark: 'Median 2025 AI application seed round: $2.4M–$3.0M with 18+ months runway.',
    nextStagePreview: 'Card 03 examines key risk vectors and mitigation protocols.',
  },
  {
    id: 'INV-03',
    perspective: 'INVESTOR',
    stageNumber: 4,
    questionIndex: 3,
    totalInPerspective: 7,
    headline: 'What is the single largest execution risk an investment committee will flag?',
    subtitle: 'Proactively surfacing and mitigating your top risk builds immediate institutional credibility.',
    defaultOptionId: 'A',
    options: [
      {
        id: 'A',
        title: 'Distribution Moat & Early Developer Evangelism Velocity',
        description: 'Ensuring rapid community adoption before incumbent tools copy the spatial card UI.',
        strategicMatch: true,
        scoreVector: { customer: 93, market: 91, finance: 90, moat: 92, velocity: 94 },
      },
      {
        id: 'B',
        title: 'Episodic vs Continuous Usage Frequency',
        description: 'Transitioning users from one-time startup validation into weekly roadmap tracking.',
        scoreVector: { customer: 91, market: 88, finance: 89, moat: 90, velocity: 88 },
      },
      {
        id: 'C',
        title: 'Enterprise Sales Cycle Length',
        description: 'Navigating security and procurement reviews for larger multi-seat deployments.',
        scoreVector: { customer: 86, market: 85, finance: 88, moat: 87, velocity: 79 },
      },
      {
        id: 'D',
        title: 'Model Hallucination & Output Determinism',
        description: 'Guaranteeing strict JSON schema compliance and quantitative rigor from 4B models.',
        scoreVector: { customer: 90, market: 89, finance: 91, moat: 93, velocity: 90 },
      },
    ],
    nuanceLabel: 'Risk Mitigation Playbook',
    nuancePlaceholder: 'Detail concrete steps taken in Weeks 1–8 to retire this risk...',
    cognitiveAlignment: 'Explicitly flagged by Qwen3 4B in Phase 01 synthesis so founders can preemptively de-risk distribution.',
    evaluationBenchmark: 'Founders who quantify their primary risk convert IC partner meetings at 2.3x higher rates.',
    nextStagePreview: 'Card 04 evaluates empirical traction and validation milestones.',
  },
  {
    id: 'INV-04',
    perspective: 'INVESTOR',
    stageNumber: 4,
    questionIndex: 4,
    totalInPerspective: 7,
    headline: 'What empirical traction or validation proof points do you have today?',
    subtitle: 'Select the strongest leading indicator of product-market pull currently verified.',
    defaultOptionId: 'B',
    options: [
      {
        id: 'A',
        title: '$25k+ MRR with >15% Month-over-Month Growth',
        description: 'Live paying workspaces across seed and Series A product teams.',
        scoreVector: { customer: 95, market: 92, finance: 95, moat: 91, velocity: 94 },
      },
      {
        id: 'B',
        title: '20+ Design Partner Commitments & High-Signal Prototype Completion',
        description: 'Validated problem statements and >85% deck completion across target engineering leads.',
        strategicMatch: true,
        scoreVector: { customer: 94, market: 90, finance: 89, moat: 90, velocity: 95 },
      },
      {
        id: 'C',
        title: 'Open-Source / Waitlist Velocity (2,500+ Technical Signups)',
        description: 'Strong organic developer pull and community engagement around Qwen3 workflows.',
        scoreVector: { customer: 90, market: 91, finance: 85, moat: 88, velocity: 92 },
      },
      {
        id: 'D',
        title: 'Paid Enterprise Pilot LOIs ($50k+ Annualized Value)',
        description: 'Signed letters of intent from innovation and product divisions.',
        scoreVector: { customer: 89, market: 88, finance: 92, moat: 89, velocity: 85 },
      },
    ],
    nuanceLabel: 'Cohort Retention & Engagement Metrics',
    nuancePlaceholder: 'Share DAU/MAU, deck completion percentages, or LOI counts...',
    cognitiveAlignment: '20+ structured commitments and prototype completion rates anchor Phase 01 Critical Milestones.',
    evaluationBenchmark: 'Top quartile pre-seed/seed traction benchmark in developer & strategy tools.',
    nextStagePreview: 'Card 05 examines AI inference architecture and model sovereignty.',
  },
  {
    id: 'INV-05',
    perspective: 'INVESTOR',
    stageNumber: 4,
    questionIndex: 5,
    totalInPerspective: 7,
    headline: 'Why is Qwen3 4B the strategic model backbone for your synthesis engine?',
    subtitle: 'Explain the architectural and economic advantage of designing specifically for the Qwen3 4B model class.',
    defaultOptionId: 'A',
    options: [
      {
        id: 'A',
        title: 'Hybrid Thinking Mode (/think) + Sub-2s Latency at 90% Lower Compute Cost',
        description: 'Qwen3 4B delivers dense chain-of-thought reasoning with ultra-low VRAM and high gross margins.',
        strategicMatch: true,
        scoreVector: { customer: 94, market: 93, finance: 97, moat: 95, velocity: 96 },
      },
      {
        id: 'B',
        title: 'Self-Hostable Open Weights for Enterprise VPC Deployment',
        description: 'Customers can run the entire 4B model inside their own cloud or edge hardware.',
        scoreVector: { customer: 93, market: 91, finance: 92, moat: 94, velocity: 90 },
      },
      {
        id: 'C',
        title: 'Fast LoRA Fine-Tuning on Structured 36-Card JSON Schemas',
        description: 'Compact 4B parameter count enables rapid nightly fine-tuning on domain rubrics.',
        scoreVector: { customer: 90, market: 90, finance: 93, moat: 96, velocity: 92 },
      },
      {
        id: 'D',
        title: 'Multi-Provider OpenAI-Compatible Routing Resilience',
        description: 'Zero vendor lock-in across vLLM, Ollama, SGLang, and cloud inference endpoints.',
        scoreVector: { customer: 91, market: 89, finance: 92, moat: 91, velocity: 93 },
      },
    ],
    nuanceLabel: 'Model Infrastructure Specs',
    nuancePlaceholder: 'Note quantization (FP16/Q4_K_M), token throughput, and fallback routing...',
    cognitiveAlignment: 'Qwen3 4B enables 82%+ SaaS gross margins even with heavy multi-perspective synthesis usage.',
    evaluationBenchmark: 'Qwen3 4B matches 30B+ models on structured JSON rubric synthesis while running in <4GB VRAM.',
    nextStagePreview: 'Card 06 evaluates Series A readiness triggers.',
  },
  {
    id: 'INV-06',
    perspective: 'INVESTOR',
    stageNumber: 4,
    questionIndex: 6,
    totalInPerspective: 7,
    headline: 'What concrete milestones will unlock your Series A at a 3x–4x valuation step-up?',
    subtitle: 'Define the clear quantitative proof points you will hit within 14–18 months.',
    defaultOptionId: 'B',
    options: [
      {
        id: 'A',
        title: '$2.0M+ ARR with >125% Net Dollar Retention',
        description: 'Proven repeatable bottom-up expansion across mid-market product teams.',
        scoreVector: { customer: 93, market: 92, finance: 95, moat: 91, velocity: 90 },
      },
      {
        id: 'B',
        title: '$1.5M ARR + 50,000 Synthesized Strategy Decks in Data Graph',
        description: 'Combining strong SaaS revenue velocity with an unassailable benchmark dataset.',
        strategicMatch: true,
        scoreVector: { customer: 95, market: 94, finance: 94, moat: 96, velocity: 94 },
      },
      {
        id: 'C',
        title: '25 Enterprise VPC Deployments ($60k+ ACV)',
        description: 'Validating top-down enterprise adoption of private Qwen3 4B strategy nodes.',
        scoreVector: { customer: 90, market: 90, finance: 93, moat: 93, velocity: 85 },
      },
      {
        id: 'D',
        title: '100,000 Monthly Active Builders & Marketplace Ecosystem',
        description: 'Category-dominating community footprint and viral template distribution.',
        scoreVector: { customer: 92, market: 95, finance: 86, moat: 92, velocity: 93 },
      },
    ],
    nuanceLabel: 'Series A Inflection Targets',
    nuancePlaceholder: 'Specify target ARR, gross margin, and logo retention...',
    cognitiveAlignment: 'Pairing $1.5M+ ARR with 50k+ structured decision graphs commands premium Series A multiples.',
    evaluationBenchmark: 'Aligned with top-decile 2025 Series A enterprise AI benchmarks.',
    nextStagePreview: 'Card 07 assesses board composition and strategic advisor value.',
  },
  {
    id: 'INV-07',
    perspective: 'INVESTOR',
    stageNumber: 4,
    questionIndex: 7,
    totalInPerspective: 7,
    headline: 'What profile of lead investor and angel syndicate adds the highest strategic leverage?',
    subtitle: 'Curate a cap table that accelerates both technical credibility and customer distribution.',
    defaultOptionId: 'A',
    options: [
      {
        id: 'A',
        title: 'Developer-First Seed Fund + AI Infrastructure Operator Angels',
        description: 'Institutional lead with deep PLG playbooks paired with staff AI/product angels.',
        strategicMatch: true,
        scoreVector: { customer: 94, market: 93, finance: 92, moat: 93, velocity: 95 },
      },
      {
        id: 'B',
        title: 'Multi-Stage Tier-1 Venture Platform',
        description: ' deep follow-on capital reserves and enterprise CXO network introductions.',
        scoreVector: { customer: 90, market: 92, finance: 93, moat: 90, velocity: 88 },
      },
      {
        id: 'C',
        title: 'Strategic Corporate Venture Capital (CVC) Co-Investors',
        description: 'Cloud and developer ecosystem partners providing distribution and compute credits.',
        scoreVector: { customer: 88, market: 90, finance: 91, moat: 89, velocity: 85 },
      },
      {
        id: 'D',
        title: 'Founder-Led Rolling Syndicates & Accelerator Alumni',
        description: '100+ active startup founders acting as both investors and vocal product champions.',
        scoreVector: { customer: 93, market: 91, finance: 89, moat: 90, velocity: 94 },
      },
    ],
    nuanceLabel: 'Cap Table Strategy',
    nuancePlaceholder: 'Note target investor value-add requirements...',
    cognitiveAlignment: 'Operator angels in Product & DevTools directly seed your first 50 reference accounts.',
    evaluationBenchmark: 'Completes Stage 04 (Investor Perspective) with 7/7 high-moat vectors.',
    nextStagePreview: 'Stage 05 transitions to Finance Perspective (Revenue Model & Unit Economics).',
  },

  // ==========================================
  // STAGE 05: FINANCE (8 Questions)
  // ==========================================
  {
    id: 'FIN-01',
    perspective: 'FINANCE',
    stageNumber: 5,
    questionIndex: 1,
    totalInPerspective: 8,
    headline: 'What is your primary monetization and pricing architecture?',
    subtitle: 'Structure pricing to allow frictionless self-serve entry while capturing enterprise expansion value.',
    defaultOptionId: 'B',
    dossierKey: 'primaryL1',
    dossierShortValue: {
      A: 'Usage-Based Compute Credits ($0.15 / synthesis)',
      B: 'Tiered SaaS ($49 – $499 / seat / mo)',
      C: 'Annual Enterprise Platform License ($48k / yr)',
      D: 'Freemium Core + Paid Executive Dossier Exports',
    },
    options: [
      {
        id: 'A',
        title: 'Pure Usage-Based Consumption Pricing',
        description: 'Pay-as-you-go per synthesized dossier and API token volume.',
        scoreVector: { customer: 88, market: 85, finance: 84, moat: 82, velocity: 90 },
      },
      {
        id: 'B',
        title: 'Tiered SaaS ($49 – $499 / seat / mo)',
        description: 'Predictable recurring seat tiers (Pro, Team, Enterprise VPC) with unlimited deck runs.',
        strategicMatch: true,
        scoreVector: { customer: 94, market: 92, finance: 96, moat: 92, velocity: 94 },
      },
      {
        id: 'C',
        title: 'Annual Enterprise Platform License ($48k+ / yr)',
        description: 'Committed annual contracts with dedicated Qwen3 4B fine-tuning and SSO.',
        scoreVector: { customer: 86, market: 88, finance: 94, moat: 91, velocity: 78 },
      },
      {
        id: 'D',
        title: 'Freemium Diagnostic + Paid Executive Export Packs',
        description: 'Free 36-card interview; transactional unlock for PDF/JSON dossiers and phase roadmaps.',
        scoreVector: { customer: 92, market: 90, finance: 82, moat: 84, velocity: 95 },
      },
    ],
    nuanceLabel: 'Pricing Tier Mechanics',
    nuancePlaceholder: 'Detail seat bundles, annual discount incentives, and enterprise add-ons...',
    cognitiveAlignment: 'Tiered SaaS ($49–$499/mo) balances self-serve credit-card velocity with predictable ARR.',
    evaluationBenchmark: 'Hybrid seat + workspace tiers yield 28% higher valuation multiples than pure consumption.',
    nextStagePreview: 'Card 02 defines your target gross margin structure.',
  },
  {
    id: 'FIN-02',
    perspective: 'FINANCE',
    stageNumber: 5,
    questionIndex: 2,
    totalInPerspective: 8,
    headline: 'What is your target gross margin at scale given AI inference costs?',
    subtitle: 'Compact 4B parameter models dramatically improve unit economics compared to 70B+ frontier APIs.',
    defaultOptionId: 'B',
    dossierKey: 'secondaryL2',
    dossierShortValue: {
      A: '68% gross margin (heavy frontier API reliance)',
      B: '82% sustained at scale',
      C: '90% gross margin (client-side WebGPU / edge)',
      D: '75% blended SaaS + advisory margin',
    },
    options: [
      {
        id: 'A',
        title: '65%–70% Margin (Frontier API Dependent)',
        description: 'Relying primarily on third-party proprietary frontier LLM endpoints.',
        scoreVector: { customer: 86, market: 84, finance: 74, moat: 76, velocity: 88 },
      },
      {
        id: 'B',
        title: '82% Sustained at Scale (Qwen3 4B Optimized)',
        description: 'High-efficiency Qwen3 4B inference keeping compute COGS below 12% of revenue.',
        strategicMatch: true,
        scoreVector: { customer: 93, market: 92, finance: 97, moat: 94, velocity: 93 },
      },
      {
        id: 'C',
        title: '90%+ Margin (BYO-Compute / On-Premise Licensing)',
        description: 'Customers run the Qwen3 4B container on their own cloud infrastructure.',
        scoreVector: { customer: 89, market: 88, finance: 98, moat: 92, velocity: 84 },
      },
      {
        id: 'D',
        title: '75% Blended Margin (Software + Strategic Concierge)',
        description: 'Combining automated synthesis with high-ticket human expert reviews.',
        scoreVector: { customer: 90, market: 85, finance: 84, moat: 85, velocity: 82 },
      },
    ],
    nuanceLabel: 'Inference COGS & Caching Strategy',
    nuancePlaceholder: 'Note semantic caching, quantized vLLM batching, and token budgets per user...',
    cognitiveAlignment: '82% sustained gross margin places your AI venture in the top decile of SaaS unit economics.',
    evaluationBenchmark: 'Median AI wrapper gross margin is 54%; Qwen3 4B architecture achieves 82%+.',
    nextStagePreview: 'Card 03 evaluates Customer Acquisition Cost (CAC) payback period.',
  },
  {
    id: 'FIN-03',
    perspective: 'FINANCE',
    stageNumber: 5,
    questionIndex: 3,
    totalInPerspective: 8,
    headline: 'What is your target CAC payback period and LTV:CAC ratio?',
    subtitle: 'Efficient capital deployment requires rapid recovery of customer acquisition costs.',
    defaultOptionId: 'A',
    options: [
      {
        id: 'A',
        title: '< 4 Months CAC Payback · 5.2x LTV:CAC',
        description: 'Driven by organic guest-mode previews, shared dossiers, and self-serve upgrades.',
        strategicMatch: true,
        scoreVector: { customer: 95, market: 92, finance: 96, moat: 91, velocity: 95 },
      },
      {
        id: 'B',
        title: '6–9 Months CAC Payback · 4.0x LTV:CAC',
        description: 'Inside sales assisted motion targeting mid-market product organizations.',
        scoreVector: { customer: 90, market: 89, finance: 90, moat: 89, velocity: 88 },
      },
      {
        id: 'C',
        title: '12–15 Months CAC Payback · 3.5x LTV:CAC',
        description: 'Enterprise field sales with high upfront implementation and multi-year lock-in.',
        scoreVector: { customer: 85, market: 87, finance: 82, moat: 90, velocity: 74 },
      },
      {
        id: 'D',
        title: 'Immediate Day-1 Payback (Annual Upfront Only)',
        description: 'Requiring annual billing upfront on all team workspaces.',
        scoreVector: { customer: 87, market: 84, finance: 95, moat: 86, velocity: 86 },
      },
    ],
    nuanceLabel: 'Acquisition Funnel Conversion Rates',
    nuancePlaceholder: 'Estimate visitor -> guest deck -> workspace signup -> paid conversion...',
    cognitiveAlignment: 'Sub-4-month CAC payback enables self-funding growth loops before touching seed principal.',
    evaluationBenchmark: 'Top quartile PLG SaaS payback is 4.5 months.',
    nextStagePreview: 'Card 04 examines monthly net burn and runway preservation.',
  },
  {
    id: 'FIN-04',
    perspective: 'FINANCE',
    stageNumber: 5,
    questionIndex: 4,
    totalInPerspective: 8,
    headline: 'What is your target monthly net burn rate across Phases 1–3?',
    subtitle: 'Calibrate monthly cash consumption against your 14.5+ month runway projection.',
    defaultOptionId: 'B',
    options: [
      {
        id: 'A',
        title: 'Ultra-Low Burn ($25k – $45k / mo)',
        description: 'Founders + minimal cloud footprint; extends runway beyond 24 months.',
        scoreVector: { customer: 89, market: 85, finance: 97, moat: 86, velocity: 89 },
      },
      {
        id: 'B',
        title: 'Disciplined Seed Burn ($65k – $95k / mo · 14.5+ Mo Runway)',
        description: 'Optimal capital consumption supporting core engineering pod and GTM experiments.',
        strategicMatch: true,
        scoreVector: { customer: 93, market: 92, finance: 95, moat: 92, velocity: 94 },
      },
      {
        id: 'C',
        title: 'Accelerated Growth Burn ($140k – $200k / mo)',
        description: 'Aggressive hiring across engineering and enterprise sales.',
        scoreVector: { customer: 87, market: 90, finance: 78, moat: 88, velocity: 86 },
      },
      {
        id: 'D',
        title: 'Variable Revenue-Matched Burn (Zero Net Burn Floor)',
        description: 'Scaling expenses strictly as a fixed percentage of collected MRR.',
        scoreVector: { customer: 90, market: 86, finance: 96, moat: 87, velocity: 85 },
      },
    ],
    nuanceLabel: 'Capital Preservation Controls',
    nuancePlaceholder: 'Note burn triggers, compute reserve buffers, and hiring gates...',
    cognitiveAlignment: 'Directly powers the 14.5 Mo Runway Projection in the Qwen3 4B Capital Preservation Model.',
    evaluationBenchmark: 'Burn Multiple < 1.2x is the gold standard for seed-stage capital efficiency.',
    nextStagePreview: 'Card 05 evaluates billing cadence and working capital dynamics.',
  },
  {
    id: 'FIN-05',
    perspective: 'FINANCE',
    stageNumber: 5,
    questionIndex: 5,
    totalInPerspective: 8,
    headline: 'How do you structure billing cadence to optimize cash flow and working capital?',
    subtitle: 'Upfront annual collections reduce dilution and finance product R&D organically.',
    defaultOptionId: 'A',
    options: [
      {
        id: 'A',
        title: 'Annual Default (20% Incentive) + Monthly Self-Serve Option',
        description: 'Capturing 60%+ of revenue in upfront annual commitments while keeping entry frictionless.',
        strategicMatch: true,
        scoreVector: { customer: 94, market: 91, finance: 96, moat: 90, velocity: 93 },
      },
      {
        id: 'B',
        title: 'Strict Annual-Only Enterprise & Team Contracts',
        description: 'Maximizing upfront deferred revenue and eliminating monthly churn noise.',
        scoreVector: { customer: 86, market: 87, finance: 95, moat: 91, velocity: 80 },
      },
      {
        id: 'C',
        title: 'Monthly Subscription + Prepaid Synthesis Credit Packs',
        description: 'Base workspace fee supplemented by non-expiring Qwen3 4B synthesis packs.',
        scoreVector: { customer: 91, market: 89, finance: 91, moat: 88, velocity: 92 },
      },
      {
        id: 'D',
        title: 'Quarterly Milestone-Based Billing',
        description: 'Aligned with quarterly board and OKR planning cycles.',
        scoreVector: { customer: 88, market: 85, finance: 88, moat: 86, velocity: 85 },
      },
    ],
    nuanceLabel: 'Working Capital Assumptions',
    nuancePlaceholder: 'Specify target percentage of annual vs monthly plans...',
    cognitiveAlignment: 'Annual default billing creates negative working capital that extends effective runway by 4+ months.',
    evaluationBenchmark: 'Top SaaS operators collect 55%–70% of bookings on annual upfront terms.',
    nextStagePreview: 'Card 06 assesses expansion revenue and upsell triggers.',
  },
  {
    id: 'FIN-06',
    perspective: 'FINANCE',
    stageNumber: 5,
    questionIndex: 6,
    totalInPerspective: 8,
    headline: 'What is the primary expansion revenue lever within existing accounts?',
    subtitle: 'High Net Dollar Retention (NDR) requires multi-axis expansion beyond simple seat counts.',
    defaultOptionId: 'B',
    options: [
      {
        id: 'A',
        title: 'Seat Multiplication Across Product, Design & GTM',
        description: 'Expanding from 3 founding seats to 25+ collaborative workspace contributors.',
        scoreVector: { customer: 92, market: 90, finance: 92, moat: 89, velocity: 91 },
      },
      {
        id: 'B',
        title: 'Seat Expansion + Dedicated Fine-Tuned Qwen3 4B Workspace Nodes',
        description: 'Combining seat growth with premium private model memory and custom rubric packs.',
        strategicMatch: true,
        scoreVector: { customer: 95, market: 93, finance: 96, moat: 95, velocity: 93 },
      },
      {
        id: 'C',
        title: 'API Volume & Automated Webhook Execution Tiers',
        description: 'Monetizing continuous background synthesis triggered by GitHub/Linear commits.',
        scoreVector: { customer: 90, market: 91, finance: 93, moat: 93, velocity: 90 },
      },
      {
        id: 'D',
        title: 'Multi-Entity / Portfolio Company Sub-Workspaces',
        description: 'Charging venture studios and holding companies per active venture deck.',
        scoreVector: { customer: 91, market: 89, finance: 94, moat: 90, velocity: 89 },
      },
    ],
    nuanceLabel: 'Net Dollar Retention Target',
    nuancePlaceholder: 'Target NDR percentage at 12 and 24 months...',
    cognitiveAlignment: 'Dual-axis expansion (seats + private Qwen3 4B nodes) drives 135%+ Net Dollar Retention.',
    evaluationBenchmark: 'Dual-axis pricing models grow ARR 1.8x faster after hitting $1M ARR.',
    nextStagePreview: 'Card 07 examines compute infrastructure cost optimization.',
  },
  {
    id: 'FIN-07',
    perspective: 'FINANCE',
    stageNumber: 5,
    questionIndex: 7,
    totalInPerspective: 8,
    headline: 'How will you manage AI compute and infrastructure scaling costs?',
    subtitle: 'Prevent margin compression as synthesis volume grows 100x.',
    defaultOptionId: 'A',
    options: [
      {
        id: 'A',
        title: 'Quantized Qwen3 4B on vLLM / SGLang with Semantic Vector Caching',
        description: 'Sub-cent inference cost per 36-card dossier via continuous batching and prefix caching.',
        strategicMatch: true,
        scoreVector: { customer: 93, market: 92, finance: 98, moat: 94, velocity: 95 },
      },
      {
        id: 'B',
        title: 'Serverless GPU Auto-Scaling (Scale-to-Zero Endpoints)',
        description: 'Eliminating idle GPU burn during off-peak hours.',
        scoreVector: { customer: 90, market: 89, finance: 94, moat: 89, velocity: 92 },
      },
      {
        id: 'C',
        title: 'Hybrid Cloud + Client WebGPU Offloading',
        description: 'Running lightweight card scoring in the browser and deep synthesis on the server.',
        scoreVector: { customer: 91, market: 90, finance: 96, moat: 93, velocity: 89 },
      },
      {
        id: 'D',
        title: 'Committed Cloud Provider Startup Credits ($250k+ Pool)',
        description: 'Zero out cash compute expenditure for the first 18 months via cloud partnerships.',
        scoreVector: { customer: 89, market: 88, finance: 95, moat: 85, velocity: 93 },
      },
    ],
    nuanceLabel: 'Token & Batching Architecture',
    nuancePlaceholder: 'Specify KV-cache reuse for the 36-question system prompt...',
    cognitiveAlignment: 'Prefix-caching the 36-question rubric in vLLM cuts Qwen3 4B time-to-first-token by 74%.',
    evaluationBenchmark: 'Estimated inference cost per complete 5-phase synthesis: $0.0018.',
    nextStagePreview: 'Card 08 completes the 36-question diagnostic with financial sensitivity buffers.',
  },
  {
    id: 'FIN-08',
    perspective: 'FINANCE',
    stageNumber: 5,
    questionIndex: 8,
    totalInPerspective: 8,
    headline: 'What financial sensitivity buffer protects the venture if revenue lags by 2 quarters?',
    subtitle: 'Final card in the 36-question deck: establish your downside protection protocol.',
    defaultOptionId: 'B',
    options: [
      {
        id: 'A',
        title: '6-Month Untouched Treasury Reserve + Variable Contractor Flex',
        description: 'Ring-fenced capital reserve that cannot be spent without board consensus.',
        scoreVector: { customer: 89, market: 87, finance: 95, moat: 88, velocity: 87 },
      },
      {
        id: 'B',
        title: 'Modular Milestone-Gated Hiring + High-Margin Self-Serve Baseline',
        description: 'New headcount unlocks strictly after hitting verified MRR thresholds ($25k / $50k / $100k).',
        strategicMatch: true,
        scoreVector: { customer: 94, market: 92, finance: 98, moat: 93, velocity: 94 },
      },
      {
        id: 'C',
        title: 'High-Ticket Enterprise Implementation & Advisory Sprints',
        description: 'Ability to generate $50k+ in immediate cash via custom strategy workshops if needed.',
        scoreVector: { customer: 91, market: 88, finance: 94, moat: 89, velocity: 90 },
      },
      {
        id: 'D',
        title: 'Venture Debt / Revenue-Based Financing Facility',
        description: 'Pre-approved non-dilutive credit line tied to recurring annual contracts.',
        scoreVector: { customer: 87, market: 86, finance: 90, moat: 86, velocity: 85 },
      },
    ],
    nuanceLabel: 'Downside Contingency Notes',
    nuancePlaceholder: 'Final notes before compiling the 36-input Executive Dossier...',
    cognitiveAlignment: 'Milestone-gated hiring guarantees you never outrun your empirical validation velocity.',
    evaluationBenchmark: 'All 36 of 36 Strategic Inputs Complete • High Signal Fidelity Ready for Qwen3 4B.',
    nextStagePreview: 'Proceed to Executive Dossier Review & Qwen3 4B Realtime Synthesis.',
  },
];

export function createInitialAnswers(): Record<string, AnswerRecord> {
  const map: Record<string, AnswerRecord> = {};
  for (const q of DECK_QUESTIONS) {
    map[q.id] = {
      questionId: q.id,
      selectedOptionId: q.defaultOptionId,
      notes: q.defaultNotes || '',
      updatedAt: new Date().toISOString(),
    };
  }
  return map;
}

export const DEFAULT_WEIGHTS: WeightParameters = {
  customerWeight: 25,
  ownerWeight: 15,
  marketWeight: 20,
  investorWeight: 20,
  financeWeight: 20,
  qwenThinkingMode: true,
  temperature: 0.35,
  contextWindow: 32768,
};

export const DEFAULT_SYNTHESIS_RESULT: SynthesisResult = {
  artifactId: '#SYN-9402',
  generatedAt: new Date().toISOString(),
  modelEngine: 'Qwen/Qwen3-4B (Instruct-2507 · 32K Context · /think Enabled)',
  qwenThinkingTrace: `<think>
Evaluating 36 structured diagnostic vectors across 5 perspectives (Customer: 8, Owner: 6, Market: 7, Investor: 7, Finance: 8):
1. Customer Vector Analysis: Primary ICP is Product & Engineering Teams (CUST-04=B) experiencing acute weekly friction from fragmented discovery tooling & noisy roadmaps (CUST-01=B). Bottom-up adoption yields high viral velocity, resulting in 92% Customer Readiness.
2. Market Vector Analysis: $14.2B Global Developer Tools TAM (MKT-01=B) differentiated by Tactile Spatial AI decks vs dense dashboards (MKT-02=B). However, UI paradigms can be replicated unless distribution velocity is locked early -> Flagging Market Distribution Moat risk (64% Market Readiness until early evangelism milestones complete).
3. Finance & Unit Economics: Tiered SaaS ($49-$499/seat/mo) with Qwen3 4B inference achieves 82% sustained gross margin (FIN-01=B, FIN-02=B) and 78% Financial Readiness, projecting 14.5 months optimal runway under the $2.5M seed plan.
4. Synthesizing 5 sequential execution phases from Immediate Problem Validation (Weeks 1-4) through Scale & Funding.
</think>`,
  overallReadiness: 78,
  readinessBreakdown: {
    cust: 92,
    mkt: 64,
    fin: 78,
  },
  synthesisMetric: '94.2%',
  synthesisMetricDesc:
    'Synthesized algorithmic agreement from Qwen3 4B across your user responses.',
  runwayProjection: '14.5 Mo',
  runwayProjectionDesc:
    'Optimal capital consumption rate based on Phase 1–3 milestones and hiring schedule.',
  strategicMoat: 'Tier A (High)',
  strategicMoatDesc:
    'Proprietary workflow capture guarantees defensibility against horizontal AI players.',
  phases: [
    {
      phaseNumber: 1,
      tabLabel: '01 Problem Validation',
      eyebrow: 'PHASE 01 OF 05 · IMMEDIATE EXECUTION (WEEKS 1–4)',
      headline: 'Problem Validation & Founder Assumptions',
      primaryObjective:
        'Empirically validate target buyer urgency and willingness-to-pay across 25 target design engineering leads.',
      workstreams: [
        'Conduct 25 structured user interviews targeting senior product architects.',
        'Benchmark switching friction from incumbent static survey tools.',
        'Deploy interactive 3D prototype to test card-progression completion rates.',
      ],
      criticalMilestonesTitle:
        '20 Customer Commitments • Validated Problem Statement Document',
      criticalMilestonesProgress: 68,
      identifiedRisk:
        'Market distribution moat requires early developer evangelism before feature replication occurs.',
      founderAlignmentLabel: 'Strong Consensus (+18.4% velocity)',
      stageStatusBadge: 'Stage Locked',
      targetQuarter: 'TARGET Q2 2025',
    },
    {
      phaseNumber: 2,
      tabLabel: '02 MVP Architecture',
      eyebrow: 'PHASE 02 OF 05 · CORE SYSTEMS BUILD (WEEKS 5–10)',
      headline: 'MVP Architecture & Qwen3 4B Inference Pipeline',
      primaryObjective:
        'Ship low-latency 36-card spatial deck engine backed by quantized Qwen3 4B structured JSON synthesis (<1.8s P95 latency).',
      workstreams: [
        'Deploy vLLM / Ollama OpenAI-compatible inference service running Qwen3-4B with prefix KV-caching.',
        'Implement deterministic 36-vector rubric scoring and real-time Executive Dossier state persistence.',
        'Launch instant Guest Researcher sandbox mode with zero-auth preview and PDF/JSON dossier export.',
      ],
      criticalMilestonesTitle:
        'Sub-1.8s Synthesis Latency • 85%+ Deck Completion Across 50 Beta Teams',
      criticalMilestonesProgress: 52,
      identifiedRisk:
        'Unconstrained <think> reasoning chains on 4B models can spike latency without token budget guardrails.',
      founderAlignmentLabel: 'Technical Lock (+22.1% velocity)',
      stageStatusBadge: 'Architecture Ready',
      targetQuarter: 'TARGET Q3 2025',
    },
    {
      phaseNumber: 3,
      tabLabel: '03 Market Validation',
      eyebrow: 'PHASE 03 OF 05 · DESIGN PARTNER COHORT (WEEKS 11–18)',
      headline: 'Market Validation & Cohort Benchmark Graph',
      primaryObjective:
        'Convert 35 active product & engineering design partner squads into referenceable multi-seat workspaces.',
      workstreams: [
        'Ingest 500+ completed startup strategy decks to calibrate industry percentile benchmarks.',
        'Ship collaborative Co-Founder Alignment Rooms with live multi-user variance heatmaps.',
        'Validate net promoter score (NPS > 60) and weekly roadmap check-in retention loops.',
      ],
      criticalMilestonesTitle:
        '35 Active Design Partner Squads • 500 Indexed Strategy Vectors',
      criticalMilestonesProgress: 38,
      identifiedRisk:
        'Episodic one-time usage risk if teams do not bind synthesis outputs to weekly sprint rituals.',
      founderAlignmentLabel: 'High Conviction (+16.8% velocity)',
      stageStatusBadge: 'Cohort Active',
      targetQuarter: 'TARGET Q3 2025',
    },
    {
      phaseNumber: 4,
      tabLabel: '04 Go-To-Market',
      eyebrow: 'PHASE 04 OF 05 · PLG & COMMERCIAL ROLLOUT (WEEKS 19–28)',
      headline: 'Go-To-Market Velocity & Self-Serve Monetization',
      primaryObjective:
        'Scale bottom-up self-serve monetization ($49–$499/seat/mo) to $50k MRR with <4 month CAC payback.',
      workstreams: [
        'Launch viral shared Executive Dossier links (#SYN artifacts) with 1-click "Fork & Challenge Assumptions" loop.',
        'Release native Linear, GitHub Issues, and Notion export integrations to lock in daily workflow.',
        'Partner with 8 premier venture accelerators for batch-wide founder onboarding.',
      ],
      criticalMilestonesTitle:
        '$50k MRR Milestone • 82% Sustained Gross Margin Verified',
      criticalMilestonesProgress: 25,
      identifiedRisk:
        'Free-to-paid conversion friction if guest tier exposes full export capabilities without workspace upgrade.',
      founderAlignmentLabel: 'GTM Synchronized (+19.5% velocity)',
      stageStatusBadge: 'Pipeline Queued',
      targetQuarter: 'TARGET Q4 2025',
    },
    {
      phaseNumber: 5,
      tabLabel: '05 Scale & Funding',
      eyebrow: 'PHASE 05 OF 05 · INSTITUTIONAL EXPANSION (MONTHS 8–18)',
      headline: 'Scale, VPC Sovereignty & Series A Readiness',
      primaryObjective:
        'Compound to $1.5M+ ARR and 50,000+ proprietary decision graphs to anchor a Tier-1 Series A round.',
      workstreams: [
        'Roll out Enterprise VPC self-hosted Qwen3 4B nodes for security-sensitive R&D organizations.',
        'Automate nightly LoRA fine-tuning on anonymized high-performing venture decision graphs.',
        'Compile institutional Series A data room demonstrating >130% Net Dollar Retention.',
      ],
      criticalMilestonesTitle:
        '$1.5M ARR Run-Rate • 14.5 Mo Runway Preserved to Default-Alive',
      criticalMilestonesProgress: 15,
      identifiedRisk:
        'Enterprise security clearance cycles can exceed 45 days without pre-packaged SOC2 & Helm charts.',
      founderAlignmentLabel: 'Executive Lock (+24.0% velocity)',
      stageStatusBadge: 'Horizon Target',
      targetQuarter: 'TARGET Q1 2026',
    },
  ],
};
