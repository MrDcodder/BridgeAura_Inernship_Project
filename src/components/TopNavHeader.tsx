import React, { useState } from 'react';
import { AetherLogoMark, FounderAvatar } from './BrandIcons';
import { PERSPECTIVES, type PerspectiveId } from '../data/deckData';

export type ScreenMode = 'AUTH' | 'DECK' | 'DOSSIER' | 'SYNTHESIS';

interface TopNavHeaderProps {
  currentScreen: ScreenMode;
  activePerspective: PerspectiveId;
  onSelectPerspective: (p: PerspectiveId) => void;
  onNavigateScreen: (screen: ScreenMode) => void;
  onOpenBackendArch: () => void;
  email: string;
  ambientMode: 'daylight' | 'studio';
  onToggleAmbient: () => void;
  onLogout: () => void;
}

export const TopNavHeader: React.FC<TopNavHeaderProps> = ({
  currentScreen,
  activePerspective,
  onSelectPerspective,
  onNavigateScreen,
  onOpenBackendArch,
  email,
  ambientMode,
  onToggleAmbient,
  onLogout,
}) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const isDark = ambientMode === 'studio';

  return (
    <header className="relative z-30 w-full bg-white/85 backdrop-blur-xl border-b border-[#64748B]/12 px-4 sm:px-8 py-3 transition-colors duration-300">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Left Brand Zone */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={() => onNavigateScreen('AUTH')}
            className="flex items-center gap-2.5 text-left group cursor-pointer"
          >
            <AetherLogoMark variant="v" size="sm" />
            <div>
              <div className="flex flex-col">
                <span className="font-headline font-extrabold text-lg text-[#0F172A] tracking-tight leading-none group-hover:text-[#00685f] transition-colors">
                  Venture Vision
                </span>
                <span className="text-[10px] font-medium text-[#64748B] tracking-tight mt-0.5">
                  smart start creates smart startups
                </span>
              </div>
            </div>
          </button>
        </div>

        {/* Right Controls: Dark/Light Theme Toggle + Profile & Logout */}
        <div className="flex items-center gap-2.5 shrink-0">
          <button
            type="button"
            onClick={onToggleAmbient}
            title={isDark ? 'Switch to Light Theme' : 'Switch to Dark Theme'}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#f0f5f2] hover:bg-[#e4e9e7] text-[#0F172A] text-xs font-semibold border border-[#64748B]/15 transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[15px] text-[#0F172A]">
              {isDark ? 'dark_mode' : 'light_mode'}
            </span>
            <span>{isDark ? 'Dark Theme' : 'Light Theme'}</span>
          </button>

          {/* Profile Menu Trigger with Logout Button inside span:nth-of-type(1) */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setMenuOpen((o) => !o)}
              className="flex items-center gap-2 p-1 pr-2.5 rounded-full bg-[#f0f5f2]/70 hover:bg-[#e4e9e7] border border-[#64748B]/15 transition-colors cursor-pointer"
            >
              <FounderAvatar email={email} />
              <span
                onClick={(e) => {
                  e.stopPropagation();
                  setMenuOpen(false);
                  onLogout();
                }}
                title="Logout of Workspace"
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#00685f]/12 hover:bg-[#ba1a1a]/15 text-[#0F172A] hover:text-[#ba1a1a] text-xs font-bold transition-colors cursor-pointer"
              >
                <span className="material-symbols-outlined text-[14px]">
                  logout
                </span>
                <span>Logout</span>
              </span>
            </button>

            {menuOpen && (
              <div
                onMouseLeave={() => setMenuOpen(false)}
                className="absolute right-0 mt-2 w-60 rounded-2xl bg-white/95 backdrop-blur-xl shadow-xl border border-[#64748B]/15 py-2 z-50 text-xs"
              >
                <div className="px-3.5 py-2 border-b border-[#64748B]/10">
                  <div className="font-bold text-[#0F172A] truncate">{email}</div>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setMenuOpen(false);
                    onLogout();
                  }}
                  className="w-full px-3.5 py-2 text-left hover:bg-[#f0f5f2] flex items-center gap-2 text-[#ba1a1a] font-semibold cursor-pointer"
                >
                  <span className="material-symbols-outlined text-base">
                    logout
                  </span>
                  <span>Logout</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
