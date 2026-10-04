import React, { useEffect, useState } from 'react';

interface BackendArchModalProps {
  isOpen: boolean;
  onClose: () => void;
  apiBase: string;
  modelName: string;
  onSaveEndpointConfig: (apiBase: string, modelName: string) => void;
}

export const BackendArchModal: React.FC<BackendArchModalProps> = ({
  isOpen,
  onClose,
  apiBase,
  modelName,
  onSaveEndpointConfig,
}) => {
  const [activeTab, setActiveTab] = useState<
    'pipeline' | 'chatml' | 'deployment' | 'schema'
  >('pipeline');
  const [draftApiBase, setDraftApiBase] = useState(apiBase);
  const [draftModel, setDraftModel] = useState(modelName);
  const [blueprintData, setBlueprintData] = useState<any>(null);
  const [savedBanner, setSavedBanner] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    fetch('/api/architecture-blueprint')
      .then((r) => r.json())
      .then((data) => setBlueprintData(data))
      .catch(() => {});
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-[#0F172A]/50 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="w-full max-w-4xl rounded-[2rem] bg-white shadow-2xl border border-[#64748B]/20 overflow-hidden my-8">
        {/* Top Header */}
        <div className="bg-[#0F172A] text-white px-6 sm:px-8 py-5 flex items-center justify-between">
          <div>
            <div className="inline-flex items-center gap-2 text-[10px] font-mono-tabular uppercase tracking-widest text-[#89f5e7] mb-1">
              <span className="w-2 h-2 rounded-full bg-[#6bd8cb] animate-pulse" />
              <span>BACKEND SYSTEM ARCHITECTURE · QWEN3 4B COMPATIBLE</span>
            </div>
            <h2 className="font-headline font-bold text-xl sm:text-2xl">
              Qwen3 4B Strategic Synthesis Engine Blueprint
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-[#f0f5f2] px-6 sm:px-8 py-2.5 border-b border-[#64748B]/15 flex flex-wrap items-center gap-2">
          {(
            [
              ['pipeline', '1. Architecture & API Pipeline'],
              ['chatml', '2. Qwen3 4B ChatML & /think Prompt'],
              ['deployment', '3. vLLM / Ollama Qwen3-4B Config'],
              ['schema', '4. Database & Vector Schema'],
            ] as const
          ).map(([id, label]) => (
            <button
              key={id}
              type="button"
              onClick={() => setActiveTab(id)}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                activeTab === id
                  ? 'bg-[#00685f] text-white shadow-2xs'
                  : 'text-[#475569] hover:bg-white'
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 max-h-[70vh] overflow-y-auto space-y-6 text-xs sm:text-sm text-[#1e293b]">
          {activeTab === 'pipeline' && (
            <div className="space-y-5">
              {/* Live Endpoint Configurator */}
              <div className="rounded-2xl bg-[#f5faf8] border border-[#00685f]/25 p-5">
                <div className="text-[11px] font-bold uppercase tracking-wider text-[#00685f] mb-3">
                  LIVE QWEN3 4B ENDPOINT CONFIGURATION (OPENAI / VLLM / OLLAMA COMPATIBLE)
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
                  <div>
                    <label className="block text-xs font-semibold text-[#0F172A] mb-1">
                      OpenAI-Compatible Base URL (`QWEN3_API_BASE`)
                    </label>
                    <input
                      type="text"
                      value={draftApiBase}
                      onChange={(e) => setDraftApiBase(e.target.value)}
                      placeholder="http://localhost:11434/v1"
                      className="w-full px-3.5 py-2 rounded-xl bg-white border border-[#64748B]/25 font-mono-tabular text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#0F172A] mb-1">
                      Model Identifier (`QWEN3_MODEL_NAME`)
                    </label>
                    <input
                      type="text"
                      value={draftModel}
                      onChange={(e) => setDraftModel(e.target.value)}
                      placeholder="qwen3:4b or Qwen/Qwen3-4B"
                      className="w-full px-3.5 py-2 rounded-xl bg-white border border-[#64748B]/25 font-mono-tabular text-xs"
                    />
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[11px] text-[#64748B]">
                    Automatically routes to `{draftApiBase}/chat/completions` with graceful fallback when local GPU is offline.
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      onSaveEndpointConfig(draftApiBase, draftModel);
                      setSavedBanner(true);
                      setTimeout(() => setSavedBanner(false), 2000);
                    }}
                    className="px-4 py-1.5 rounded-full bg-[#00685f] text-white text-xs font-semibold cursor-pointer"
                  >
                    {savedBanner ? '✓ Saved to Backend' : 'Save Endpoint Config'}
                  </button>
                </div>
              </div>

              {/* 4-Stage Backend Architecture Breakdown */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="rounded-2xl border border-[#64748B]/15 p-4">
                  <div className="font-bold text-[#0F172A] mb-1">
                    Stage A · 36-Card Vector Normalization
                  </div>
                  <p className="text-xs text-[#64748B] leading-relaxed">
                    Each of the 36 cards across Customer (8), Owner (6), Market (7), Investor (7), and Finance (8) maps to a 5-tuple score vector `(customer, market, finance, moat, velocity)` plus optional free-text persona nuances.
                  </p>
                </div>
                <div className="rounded-2xl border border-[#64748B]/15 p-4">
                  <div className="font-bold text-[#0F172A] mb-1">
                    Stage B · Qwen3 4B Token Budget & KV-Cache
                  </div>
                  <p className="text-xs text-[#64748B] leading-relaxed">
                    Because Qwen3 4B is a dense 4.0B parameter model with 32,768 native context, the backend structures the 36 card inputs into a compact ~1,450-token prompt with static system prefix for vLLM automatic prefix caching.
                  </p>
                </div>
                <div className="rounded-2xl border border-[#64748B]/15 p-4">
                  <div className="font-bold text-[#0F172A] mb-1">
                    Stage C · Hybrid `/think` & `/no_think` Parser
                  </div>
                  <p className="text-xs text-[#64748B] leading-relaxed">
                    Supports Qwen3&apos;s native `/think` mode (`&lt;think&gt;...&lt;/think&gt;` chain-of-thought extraction) for deep 5-phase dossier synthesis, and `/no_think` mode for sub-400ms interactive card previews.
                  </p>
                </div>
                <div className="rounded-2xl border border-[#64748B]/15 p-4">
                  <div className="font-bold text-[#0F172A] mb-1">
                    Stage D · Deterministic Metric Anchoring
                  </div>
                  <p className="text-xs text-[#64748B] leading-relaxed">
                    Quantitative readiness scores (`Cust 92%`, `Mkt 64%`, `Fin 78%`) are computed deterministically on the backend before injecting into the Qwen3 4B prompt, preventing numeric hallucination.
                  </p>
                </div>
              </div>

              {/* Active Express REST Endpoints Table */}
              <div>
                <div className="text-xs font-bold uppercase tracking-wider text-[#64748B] mb-2">
                  ACTIVE EXPRESS BACKEND ENDPOINTS (`server.ts`)
                </div>
                <div className="rounded-2xl border border-[#64748B]/15 overflow-hidden">
                  <table className="w-full text-left border-collapse text-xs">
                    <thead className="bg-[#f0f5f2] text-[#0F172A]">
                      <tr>
                        <th className="py-2.5 px-4 font-bold">Method</th>
                        <th className="py-2.5 px-4 font-bold">Route</th>
                        <th className="py-2.5 px-4 font-bold">Purpose</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#64748B]/10">
                      {(blueprintData?.endpoints || []).map(
                        (ep: any, i: number) => (
                          <tr key={i}>
                            <td className="py-2.5 px-4 font-mono-tabular font-bold text-[#00685f]">
                              {ep.method}
                            </td>
                            <td className="py-2.5 px-4 font-mono-tabular text-[#0F172A]">
                              {ep.path}
                            </td>
                            <td className="py-2.5 px-4 text-[#64748B]">
                              {ep.description}
                            </td>
                          </tr>
                        )
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'chatml' && (
            <div className="space-y-4">
              <p className="text-xs text-[#64748B]">
                Below is the live Qwen3 4B ChatML prompt template compiled from your current 36 card answers (`&lt;|im_start|&gt;` / `&lt;|im_end|&gt;` with `/think` token directive):
              </p>
              <pre className="rounded-2xl bg-[#0F172A] text-[#e2e8f0] p-4 font-mono-tabular text-[11px] leading-relaxed overflow-x-auto max-h-96">
                {blueprintData?.chatMLPreview || 'Loading live ChatML prompt...'}
              </pre>
            </div>
          )}

          {activeTab === 'deployment' && (
            <div className="space-y-4">
              <div className="rounded-2xl bg-[#f5faf8] border border-[#64748B]/15 p-4">
                <div className="font-bold text-[#0F172A] mb-2">
                  Option 1: Local / Edge Deployment via Ollama (`qwen3:4b`)
                </div>
                <pre className="rounded-xl bg-[#0F172A] text-[#89f5e7] p-3 font-mono-tabular text-xs overflow-x-auto">
{`# Pull and serve Qwen3 4B (2.6 GB VRAM Q4_K_M)
ollama pull qwen3:4b
OLLAMA_HOST=0.0.0.0:11434 ollama serve

# Connect Aether Deck Backend:
export QWEN3_API_BASE="http://localhost:11434/v1"
export QWEN3_MODEL_NAME="qwen3:4b"`}
                </pre>
              </div>

              <div className="rounded-2xl bg-[#f5faf8] border border-[#64748B]/15 p-4">
                <div className="font-bold text-[#0F172A] mb-2">
                  Option 2: Production GPU Cluster via vLLM (`Qwen/Qwen3-4B`)
                </div>
                <pre className="rounded-xl bg-[#0F172A] text-[#89f5e7] p-3 font-mono-tabular text-xs overflow-x-auto">
{`# Launch vLLM with Qwen3 reasoning parser & automatic prefix caching
vllm serve Qwen/Qwen3-4B \\
  --port 8000 \\
  --enable-prefix-caching \\
  --enable-reasoning \\
  --reasoning-parser deepseek_r1 \\
  --max-model-len 32768 \\
  --gpu-memory-utilization 0.85

# Connect Aether Deck Backend:
export QWEN3_API_BASE="http://localhost:8000/v1"
export QWEN3_MODEL_NAME="Qwen/Qwen3-4B"`}
                </pre>
              </div>
            </div>
          )}

          {activeTab === 'schema' && (
            <div className="space-y-4">
              <p className="text-xs text-[#64748B]">
                Recommended relational + pgvector persistence schema for storing workspaces, 36-card answer vectors, and Qwen3 4B synthesis artifacts:
              </p>
              <pre className="rounded-2xl bg-[#0F172A] text-[#e2e8f0] p-4 font-mono-tabular text-[11px] leading-relaxed overflow-x-auto">
{`CREATE TABLE workspaces (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  founder_email VARCHAR(255) NOT NULL,
  venture_name VARCHAR(255) NOT NULL,
  weights_json JSONB NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE deck_answers (
  workspace_id UUID REFERENCES workspaces(id) ON DELETE CASCADE,
  question_id VARCHAR(16) NOT NULL, -- e.g. 'CUST-04', 'FIN-02'
  perspective VARCHAR(16) NOT NULL, -- CUSTOMER | OWNER | MARKET | INVESTOR | FINANCE
  selected_option CHAR(1) NOT NULL CHECK (selected_option IN ('A','B','C','D')),
  nuance_notes TEXT DEFAULT '',
  score_vector JSONB NOT NULL,      -- {customer, market, finance, moat, velocity}
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  PRIMARY KEY (workspace_id, question_id)
);

CREATE TABLE synthesis_artifacts (
  artifact_id VARCHAR(32) PRIMARY KEY, -- e.g. '#SYN-9402'
  workspace_id UUID REFERENCES workspaces(id) ON DELETE CASCADE,
  model_engine VARCHAR(128) NOT NULL,  -- 'Qwen/Qwen3-4B'
  qwen_thinking_trace TEXT,            -- Raw <think>...</think> CoT output
  overall_readiness SMALLINT NOT NULL,
  readiness_breakdown JSONB NOT NULL,  -- {cust: 92, mkt: 64, fin: 78}
  phases_json JSONB NOT NULL,          -- 5-Phase Execution Dossier
  created_at TIMESTAMPTZ DEFAULT NOW()
);`}
              </pre>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
