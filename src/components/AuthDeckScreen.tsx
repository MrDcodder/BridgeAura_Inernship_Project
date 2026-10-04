import React, { useState, useRef } from 'react';
import { AetherLogoMark } from './BrandIcons';
import { PERSPECTIVES, type PerspectiveId } from '../data/deckData';

interface AuthDeckScreenProps {
  email: string;
  setEmail: (email: string) => void;
  ventureName: string;
  setVentureName: (name: string) => void;
  onStartDeck: (targetPerspective?: PerspectiveId) => void;
  onJumpToDossier: () => void;
  onJumpToSynthesis: () => void;
  onOpenBackendArch: () => void;
}

export const AuthDeckScreen: React.FC<AuthDeckScreenProps> = ({
  email,
  setEmail,
  ventureName,
  setVentureName,
  onStartDeck,
  onJumpToDossier,
  onJumpToSynthesis,
  onOpenBackendArch,
}) => {
  const [password, setPassword] = useState('••••••••••••');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [founderRole, setFounderRole] = useState('Founder & CEO');
  const [ventureStage, setVentureStage] = useState('Pre-Seed / Seed');
  const [showPassword, setShowPassword] = useState(false);
  const [isAdvancing, setIsAdvancing] = useState(false);
  const [advanceStatus, setAdvanceStatus] = useState<'idle' | 'synthesizing' | 'granted'>('idle');
  const [isRegisterMode, setIsRegisterMode] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const [authSuccessMsg, setAuthSuccessMsg] = useState<string | null>(null);
  const [tilt, setTilt] = useState({ rotX: 0, rotY: 0, active: false });

  const stageRef = useRef<HTMLDivElement>(null);
  const emailInputRef = useRef<HTMLInputElement>(null);
  const fullNameInputRef = useRef<HTMLInputElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!stageRef.current || isAdvancing) return;
    const rect = stageRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    const factorX = y / (rect.height / 2);
    const factorY = x / (rect.width / 2);

    // Clamped to ±3.5deg X and ±4.5deg Y matching the HTML script
    setTilt({
      rotX: Number((-factorX * 3.5).toFixed(2)),
      rotY: Number((factorY * 4.5).toFixed(2)),
      active: true,
    });
  };

  const handleMouseLeave = () => {
    setTilt({ rotX: 0, rotY: 0, active: false });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isAdvancing) return;
    setAuthError(null);
    setAuthSuccessMsg(null);

    if (isRegisterMode) {
      if (!fullName.trim()) {
        setAuthError('Please enter your full name to register.');
        return;
      }
      if (password.length < 6) {
        setAuthError('Password must be at least 6 characters long.');
        return;
      }
      if (password !== confirmPassword) {
        setAuthError('Passwords do not match. Please confirm your password.');
        return;
      }
    }

    setIsAdvancing(true);
    setAdvanceStatus('synthesizing');

    try {
      const endpoint = isRegisterMode ? '/api/auth/register' : '/api/auth/login';
      const bodyPayload = isRegisterMode
        ? {
            fullName: fullName.trim(),
            email: email.trim(),
            password,
            ventureName: ventureName.trim() || 'Venture Vision',
            founderRole,
            ventureStage,
          }
        : {
            email: email.trim(),
            password,
          };

      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bodyPayload),
      });

      const data = await res.json();

      if (!res.ok) {
        setIsAdvancing(false);
        setAdvanceStatus('idle');
        setAuthError(data.error || 'Authentication failed. Please check your details.');
        return;
      }

      if (data.user?.email) setEmail(data.user.email);
      if (data.user?.ventureName) setVentureName(data.user.ventureName);
      if (isRegisterMode) {
        setAuthSuccessMsg(`Account created for ${data.user?.fullName || email}!`);
      }

      setAdvanceStatus('granted');
      setTimeout(() => {
        setIsAdvancing(false);
        setAdvanceStatus('idle');
        onStartDeck('CUSTOMER');
      }, 480);
    } catch {
      setIsAdvancing(false);
      setAdvanceStatus('idle');
      setAuthError('Network error while contacting authentication server.');
    }
  };

  const toggleRegisterMode = () => {
    setAuthError(null);
    setAuthSuccessMsg(null);
    setIsRegisterMode((prev) => {
      const next = !prev;
      if (next) {
        // Prepare clean registration defaults
        if (email === 'founder@startup.io') setEmail('');
        if (password === '••••••••••••') setPassword('');
        setConfirmPassword('');
        setTimeout(() => fullNameInputRef.current?.focus(), 60);
      } else {
        if (!email) setEmail('founder@startup.io');
        if (!password) setPassword('••••••••••••');
        setTimeout(() => emailInputRef.current?.focus(), 60);
      }
      return next;
    });
  };

  const handleGuestMode = () => {
    setEmail('guest.analyst@venture-vision.dev');
    setVentureName('Venture Vision');
    onStartDeck('CUSTOMER');
  };

  return (
    <div className="relative z-10 w-full min-h-screen flex flex-col justify-between p-4 md:p-6 select-none">
      {/* Top Floating Bar matching Image 12 */}
      <div className="w-full max-w-7xl mx-auto flex items-center justify-between px-2 pt-1">
        <div className="flex items-center gap-3">
          <AetherLogoMark variant="v" size="sm" />
          <div className="flex flex-col">
            <span className="font-headline font-bold text-sm text-[#0F172A] tracking-tight leading-none">
              Venture Vision
            </span>
            <span className="text-[10px] font-medium text-[#64748B] mt-0.5">
              smart start creates smart startups
            </span>
          </div>
        </div>
      </div>

      {/* Center Interactive Staged Card Deck Container */}
      <div className="flex flex-col w-full items-center justify-center my-auto py-4">
        <div
          ref={stageRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="relative w-full max-w-[540px] flex items-center justify-center [perspective:1400px]"
        >
          {/* Background Sub-deck Card Layer 3 (Deepest) */}
          <div
            aria-hidden="true"
            className="absolute inset-x-5 top-5 bottom-1 rounded-[2rem] bg-[#e4e9e7]/65 backdrop-blur-md pointer-events-none transition-transform duration-700 ease-out flex flex-col justify-between p-8 overflow-hidden opacity-45 [transform:translateY(34px)_translateZ(-80px)_rotate(-3.2deg)] luminous-subdeck-2"
          >
            <div className="flex items-center justify-between opacity-60">
              <span className="text-[11px] font-bold uppercase text-[#6d7a77] tracking-wider">
                Perspective 03 · Valuation Vector
              </span>
              <span className="material-symbols-outlined text-[#6d7a77] text-lg">
                pie_chart
              </span>
            </div>
            <div className="h-20 w-full rounded-xl bg-[#dee4e1]/50" />
            <div className="flex justify-between items-center opacity-50">
              <div className="h-2.5 w-32 rounded-full bg-[#dee4e1]" />
              <span className="text-[11px] font-semibold text-[#6d7a77] tabular-nums">
                AETHER-DECK · 99.4%
              </span>
            </div>
          </div>

          {/* Background Sub-deck Card Layer 2 (Middle) */}
          <div
            aria-hidden="true"
            className="absolute inset-x-2.5 top-2.5 bottom-3 rounded-[2rem] bg-[#eaefed]/80 backdrop-blur-lg pointer-events-none transition-transform duration-700 ease-out flex flex-col justify-between p-8 overflow-hidden opacity-75 [transform:translateY(18px)_translateZ(-40px)_rotate(2.1deg)] luminous-subdeck-1"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-[#00685f] animate-ping" />
                <span className="text-[11px] font-bold uppercase text-[#00685f] tracking-widest">
                  Perspective 01 · Unit Economics
                </span>
              </div>
              <span className="material-symbols-outlined text-[#64748B] text-base">
                network_intelligence
              </span>
            </div>
            <div className="space-y-2 opacity-60">
              <div className="h-3.5 w-4/5 rounded-full bg-[#dee4e1]" />
              <div className="h-2.5 w-3/5 rounded-full bg-[#dee4e1]" />
            </div>
            <div className="flex items-center justify-between text-[#64748B] opacity-70 text-xs font-semibold">
              <span>Stage: Seed to Series A</span>
              <span>Vector Matrix Online</span>
            </div>
          </div>

          {/* Background Sub-deck Layer 1 (Proximal Glow Frame) */}
          <div
            aria-hidden="true"
            className="absolute inset-0 rounded-[2rem] bg-white/45 backdrop-blur-xl pointer-events-none transition-transform duration-500 [transform:translateY(8px)_translateZ(-15px)_rotate(-0.8deg)] shadow-xl"
          />

          {/* Primary Foreground Login Card (Interactive 3D Stage) */}
          <div
            style={{
              transform: isAdvancing
                ? 'translateY(-22px) scale(0.96) translateZ(36px) rotate(1.1deg)'
                : tilt.active
                ? `rotateX(${tilt.rotX}deg) rotateY(${tilt.rotY}deg) translateZ(6px)`
                : 'rotateX(0deg) rotateY(0deg) translateZ(0px)',
              transition: isAdvancing
                ? 'transform 0.45s cubic-bezier(0.2, 0.8, 0.2, 1)'
                : 'transform 0.15s ease-out',
            }}
            className="relative z-20 w-full rounded-[2rem] bg-white/86 backdrop-blur-2xl luminous-card-shadow border border-white/80 overflow-hidden flex flex-col justify-between p-6 sm:p-8"
          >
            {/* Subtle Ambient Card Top Shimmer */}
            <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-[#00685f]/35 to-transparent" />
            <div className="absolute -top-24 -right-24 w-52 h-52 rounded-full bg-[#89f5e7]/25 blur-2xl pointer-events-none" />

            {/* Card Top: Branding & Mode Pill */}
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-3">
                <AetherLogoMark variant="v" size="md" />
                <div className="flex flex-col">
                  <span className="font-headline font-bold text-xl tracking-tight text-[#0F172A] leading-none">
                    Venture Vision
                  </span>
                  <span className="text-[10px] font-bold text-[#64748B] tracking-wide mt-1">
                    smart start creates smart startups
                  </span>
                </div>
              </div>
              <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#00685f]/10 text-[#00685f]">
                {isRegisterMode ? 'New User Registration' : 'Workspace Sign In'}
              </span>
            </div>

            {/* Error or Success Banner */}
            {authError && (
              <div className="mb-3.5 px-3.5 py-2.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-semibold flex items-center gap-2">
                <span className="material-symbols-outlined text-base text-red-600 shrink-0">
                  error
                </span>
                <span>{authError}</span>
              </div>
            )}
            {authSuccessMsg && (
              <div className="mb-3.5 px-3.5 py-2.5 rounded-xl bg-[#e6f7f5] border border-[#00685f]/30 text-[#00685f] text-xs font-semibold flex items-center gap-2">
                <span className="material-symbols-outlined text-base text-[#00685f] shrink-0">
                  verified_user
                </span>
                <span>{authSuccessMsg}</span>
              </div>
            )}

            {/* Form Arena */}
            <form onSubmit={handleSubmit} className="space-y-3.5 mb-4">
              {isRegisterMode && (
                <>
                  {/* Full Name Input */}
                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <label
                        htmlFor="register-full-name"
                        className="text-xs font-semibold text-[#0F172A]"
                      >
                        Full Name
                      </label>
                      <span className="text-[11px] text-[#94A3B8]">Founder Profile</span>
                    </div>
                    <div className="relative group">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#64748B] group-focus-within:text-[#00685f]">
                        <span className="material-symbols-outlined text-lg">
                          badge
                        </span>
                      </div>
                      <input
                        ref={fullNameInputRef}
                        id="register-full-name"
                        type="text"
                        required
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="e.g. Alex Rivera"
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/90 border border-[#64748B]/20 text-[#0F172A] text-sm placeholder:text-[#94A3B8] focus:outline-none focus:border-[#00685f] focus:ring-2 focus:ring-[#00685f]/15 transition-all"
                      />
                    </div>
                  </div>

                  {/* Venture Name Input */}
                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <label
                        htmlFor="venture-name"
                        className="text-xs font-semibold text-[#0F172A]"
                      >
                        Startup / Venture Name
                      </label>
                      <span className="text-[11px] text-[#94A3B8]">Active Dossier</span>
                    </div>
                    <div className="relative group">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#64748B] group-focus-within:text-[#00685f]">
                        <span className="material-symbols-outlined text-lg">
                          rocket_launch
                        </span>
                      </div>
                      <input
                        id="venture-name"
                        type="text"
                        required
                        value={ventureName}
                        onChange={(e) => setVentureName(e.target.value)}
                        placeholder="e.g. Venture Vision AI"
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/90 border border-[#64748B]/20 text-[#0F172A] text-sm placeholder:text-[#94A3B8] focus:outline-none focus:border-[#00685f] focus:ring-2 focus:ring-[#00685f]/15 transition-all"
                      />
                    </div>
                  </div>

                  {/* Role & Stage 2-Column Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    <div className="space-y-1">
                      <label
                        htmlFor="founder-role"
                        className="text-xs font-semibold text-[#0F172A] block"
                      >
                        Your Role
                      </label>
                      <select
                        id="founder-role"
                        value={founderRole}
                        onChange={(e) => setFounderRole(e.target.value)}
                        className="w-full px-3 py-2.5 rounded-xl bg-white/90 border border-[#64748B]/20 text-[#0F172A] text-xs font-semibold focus:outline-none focus:border-[#00685f] focus:ring-2 focus:ring-[#00685f]/15 transition-all"
                      >
                        <option value="Founder & CEO">Founder & CEO</option>
                        <option value="Technical Co-Founder / CTO">Technical Co-Founder / CTO</option>
                        <option value="Product Lead / CPO">Product Lead / CPO</option>
                        <option value="Venture Partner / Investor">Venture Partner / Investor</option>
                      </select>
                    </div>
                    <div className="space-y-1">
                      <label
                        htmlFor="venture-stage"
                        className="text-xs font-semibold text-[#0F172A] block"
                      >
                        Startup Stage
                      </label>
                      <select
                        id="venture-stage"
                        value={ventureStage}
                        onChange={(e) => setVentureStage(e.target.value)}
                        className="w-full px-3 py-2.5 rounded-xl bg-white/90 border border-[#64748B]/20 text-[#0F172A] text-xs font-semibold focus:outline-none focus:border-[#00685f] focus:ring-2 focus:ring-[#00685f]/15 transition-all"
                      >
                        <option value="Ideation / Pre-Seed">Ideation / Pre-Seed</option>
                        <option value="Pre-Seed / Seed">Pre-Seed / Seed</option>
                        <option value="Seed to Series A">Seed to Series A</option>
                        <option value="Series A+ Growth">Series A+ Growth</option>
                      </select>
                    </div>
                  </div>
                </>
              )}

              {/* Email Input */}
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="work-email"
                    className="text-xs font-semibold text-[#0F172A]"
                  >
                    Executive Email
                  </label>
                  <span className="text-[11px] font-medium text-[#94A3B8]">
                    Work or Syndicate
                  </span>
                </div>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#64748B] group-focus-within:text-[#00685f] transition-colors">
                    <span className="material-symbols-outlined text-lg">
                      alternate_email
                    </span>
                  </div>
                  <input
                    ref={emailInputRef}
                    id="work-email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="founder@startup.io"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/90 border border-[#64748B]/20 text-[#0F172A] text-sm placeholder:text-[#94A3B8] focus:outline-none focus:border-[#00685f] focus:ring-2 focus:ring-[#00685f]/15 transition-all shadow-2xs"
                  />
                </div>
              </div>

              {/* Password Input */}
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="auth-key"
                    className="text-xs font-semibold text-[#0F172A]"
                  >
                    {isRegisterMode
                      ? 'Create Security Token / Password'
                      : 'Security Token / Workspace Key'}
                  </label>
                  {!isRegisterMode && (
                    <button
                      type="button"
                      onClick={() => setPassword('AETHER-QWEN3-4B-KEY')}
                      className="text-xs font-semibold text-[#00685f] hover:underline cursor-pointer"
                    >
                      Reset Demo Key
                    </button>
                  )}
                </div>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#64748B] group-focus-within:text-[#00685f] transition-colors">
                    <span className="material-symbols-outlined text-lg">
                      lock_open
                    </span>
                  </div>
                  <input
                    id="auth-key"
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder={
                      isRegisterMode
                        ? 'Minimum 6 characters'
                        : 'Enter your security token'
                    }
                    className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-white/90 border border-[#64748B]/20 text-[#0F172A] text-sm placeholder:text-[#94A3B8] focus:outline-none focus:border-[#00685f] focus:ring-2 focus:ring-[#00685f]/15 transition-all shadow-2xs tracking-wider"
                  />
                  <button
                    type="button"
                    aria-label="Toggle password visibility"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-[#94A3B8] hover:text-[#0F172A] transition-colors cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-lg">
                      {showPassword ? 'visibility_off' : 'visibility'}
                    </span>
                  </button>
                </div>
              </div>

              {/* Confirm Password Input (Registration Mode Only) */}
              {isRegisterMode && (
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor="confirm-auth-key"
                      className="text-xs font-semibold text-[#0F172A]"
                    >
                      Confirm Security Token / Password
                    </label>
                    <span className="text-[11px] text-[#94A3B8]">Required</span>
                  </div>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#64748B] group-focus-within:text-[#00685f] transition-colors">
                      <span className="material-symbols-outlined text-lg">
                        verified_user
                      </span>
                    </div>
                    <input
                      id="confirm-auth-key"
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Re-enter your password"
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/90 border border-[#64748B]/20 text-[#0F172A] text-sm placeholder:text-[#94A3B8] focus:outline-none focus:border-[#00685f] focus:ring-2 focus:ring-[#00685f]/15 transition-all shadow-2xs tracking-wider"
                    />
                  </div>
                </div>
              )}

              {/* Primary CTA Button */}
              <button
                type="submit"
                disabled={isAdvancing}
                className="w-full mt-2 group relative flex items-center justify-center gap-2 py-3.5 px-6 rounded-full bg-gradient-to-r from-[#00685f] via-[#008378] to-[#38485d] text-white font-semibold text-sm shadow-md teal-cta-glow transition-all duration-200 hover:scale-[1.005] active:scale-[0.99] cursor-pointer"
              >
                {advanceStatus === 'synthesizing' && (
                  <>
                    <span className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
                    <span>
                      {isRegisterMode
                        ? 'Registering Credentials...'
                        : 'Synthesizing Perspective...'}
                    </span>
                  </>
                )}
                {advanceStatus === 'granted' && (
                  <>
                    <span className="material-symbols-outlined text-base">
                      check_circle
                    </span>
                    <span>
                      {isRegisterMode
                        ? 'Registered • Launching Deck'
                        : 'Access Granted • Deck Loaded'}
                    </span>
                  </>
                )}
                {advanceStatus === 'idle' && (
                  <>
                    <span>
                      {isRegisterMode
                        ? 'Create Account & Start Deck'
                        : 'Begin Analysis Deck'}
                    </span>
                    <span className="material-symbols-outlined text-base transition-transform group-hover:translate-x-1 duration-200">
                      arrow_forward
                    </span>
                  </>
                )}
              </button>
            </form>

            {/* Secondary Action Grid */}
            <div className="grid grid-cols-2 gap-2.5">
              <button
                type="button"
                onClick={handleGuestMode}
                className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-full bg-[#f0f5f2] hover:bg-[#e4e9e7] text-[#0F172A] font-semibold text-xs transition-all shadow-2xs active:scale-95 cursor-pointer"
              >
                <span className="material-symbols-outlined text-sm text-[#64748B]">
                  explore
                </span>
                <span className="truncate">Try Guest Mode (Instant)</span>
              </button>
              <button
                type="button"
                onClick={toggleRegisterMode}
                className={`flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-full font-semibold text-xs transition-all shadow-2xs active:scale-95 cursor-pointer ${
                  isRegisterMode
                    ? 'bg-[#00685f]/15 text-[#00685f] hover:bg-[#00685f]/25'
                    : 'bg-[#f0f5f2] hover:bg-[#e4e9e7] text-[#0F172A]'
                }`}
              >
                <span
                  className={`material-symbols-outlined text-sm ${
                    isRegisterMode ? 'text-[#00685f]' : 'text-[#64748B]'
                  }`}
                >
                  {isRegisterMode ? 'login' : 'person_add'}
                </span>
                <span className="truncate">
                  {isRegisterMode ? 'Sign In Instead' : 'Register'}
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Quiet Footer */}
      <div className="w-full max-w-7xl mx-auto flex items-center justify-between text-[11px] text-[#94A3B8] px-2 pb-1">
        <span>© 2025 Venture Vision: smart start creates smart startups</span>
      </div>
    </div>
  );
};
