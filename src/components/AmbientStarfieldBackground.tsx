import React, { useEffect, useRef } from 'react';

interface AmbientStarfieldBackgroundProps {
  mode?: 'daylight' | 'studio';
}

interface DiffusedStar {
  x: number;
  y: number;
  z: number; // Depth layer (0.2 to 1.0)
  radius: number;
  haloRadius: number;
  vx: number;
  vy: number;
  baseAlpha: number;
  phase: number;
  pulseSpeed: number;
  colorRgb: string;
  hasCrossFlare: boolean;
}

const STAR_PALETTE_DAYLIGHT = [
  '13, 148, 136', // Luminous Teal (#0d9488)
  '0, 104, 95',   // Deep Primary Teal (#00685f)
  '99, 102, 241', // Soft Indigo (#6366f1)
  '56, 189, 248', // Sky Cyan (#38bdf8)
  '16, 185, 129', // Emerald Glow (#10b981)
];

const STAR_PALETTE_DARK = [
  '45, 212, 191',  // Bright Bioluminescent Teal (#2dd4bf)
  '137, 245, 231', // Luminous Aqua (#89f5e7)
  '56, 189, 248',  // Celestial Cyan (#38bdf8)
  '129, 140, 248', // Starlight Indigo (#818cf8)
  '52, 211, 153',  // Neon Emerald (#34d399)
];

export const AmbientStarfieldBackground: React.FC<
  AmbientStarfieldBackgroundProps
> = ({ mode = 'daylight' }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isDark = mode === 'studio';

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const resize = () => {
      if (!canvas) return;
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener('resize', resize);

    // Subtle mouse parallax tracking
    let targetMouseX = 0;
    let targetMouseY = 0;
    let currentMouseX = 0;
    let currentMouseY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      targetMouseX = (e.clientX / width - 0.5) * 28;
      targetMouseY = (e.clientY / height - 0.5) * 28;
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // Create 85 diffused stars across 3 depth planes
    const activePalette = isDark ? STAR_PALETTE_DARK : STAR_PALETTE_DAYLIGHT;
    const starCount = 85;
    const stars: DiffusedStar[] = Array.from({ length: starCount }, (_, i) => {
      const z = 0.25 + Math.random() * 0.75;
      const coreRadius = (1.4 + Math.random() * 2.8) * z;
      return {
        x: Math.random() * width,
        y: Math.random() * height,
        z,
        radius: coreRadius,
        haloRadius: coreRadius * (isDark ? 6.5 + Math.random() * 5.5 : 5.5 + Math.random() * 5.0),
        vx: (Math.random() - 0.5) * 0.28 * z,
        vy: (-0.08 - Math.random() * 0.22) * z, // Gentle upward celestial drift
        baseAlpha: isDark ? 0.42 + Math.random() * 0.52 : 0.28 + Math.random() * 0.48,
        phase: Math.random() * Math.PI * 2,
        pulseSpeed: 0.012 + Math.random() * 0.022,
        colorRgb: activePalette[i % activePalette.length],
        hasCrossFlare: i % 5 === 0,
      };
    });

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      currentMouseX += (targetMouseX - currentMouseX) * 0.05;
      currentMouseY += (targetMouseY - currentMouseY) * 0.05;

      for (const s of stars) {
        s.x += s.vx;
        s.y += s.vy;
        s.phase += s.pulseSpeed;

        // Wrap around viewport bounds with padding for halo
        const pad = s.haloRadius;
        if (s.x < -pad) s.x = width + pad;
        if (s.x > width + pad) s.x = -pad;
        if (s.y < -pad) s.y = height + pad;
        if (s.y > height + pad) s.y = -pad;

        const drawX = s.x + currentMouseX * s.z;
        const drawY = s.y + currentMouseY * s.z;

        const twinkle = 0.65 + 0.35 * Math.sin(s.phase);
        const alpha = s.baseAlpha * twinkle;

        // 1. Outer diffused bokeh star halo
        const grad = ctx.createRadialGradient(
          drawX,
          drawY,
          0,
          drawX,
          drawY,
          s.haloRadius
        );
        grad.addColorStop(0, `rgba(${s.colorRgb}, ${(alpha * 0.75).toFixed(3)})`);
        grad.addColorStop(
          0.35,
          `rgba(${s.colorRgb}, ${(alpha * 0.28).toFixed(3)})`
        );
        grad.addColorStop(
          0.7,
          `rgba(${s.colorRgb}, ${(alpha * 0.07).toFixed(3)})`
        );
        grad.addColorStop(1, `rgba(${s.colorRgb}, 0)`);

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(drawX, drawY, s.haloRadius, 0, Math.PI * 2);
        ctx.fill();

        // 2. Luminous star core
        ctx.fillStyle = `rgba(255, 255, 255, ${Math.min(1, alpha * 1.15).toFixed(3)})`;
        ctx.beginPath();
        ctx.arc(drawX, drawY, s.radius * 0.75, 0, Math.PI * 2);
        ctx.fill();

        // 3. Soft diffused starlight cross-glint on featured stars
        if (s.hasCrossFlare) {
          const flareLen = s.haloRadius * (0.7 + 0.25 * Math.sin(s.phase));
          ctx.strokeStyle = `rgba(${s.colorRgb}, ${(alpha * 0.38).toFixed(3)})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(drawX - flareLen, drawY);
          ctx.lineTo(drawX + flareLen, drawY);
          ctx.moveTo(drawX, drawY - flareLen);
          ctx.lineTo(drawX, drawY + flareLen);
          ctx.stroke();
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [mode]);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
    >
      {/* Slow-drifting Ambient Nebula / Diffused Starlight Clouds */}
      <div className="absolute -top-28 -left-16 h-[540px] w-[540px] rounded-full bg-[#0d9488]/[0.11] blur-3xl animate-[pulse_7s_ease-in-out_infinite]" />
      <div className="absolute top-1/4 -right-20 h-[620px] w-[620px] rounded-full bg-[#6366f1]/[0.09] blur-3xl animate-[pulse_9s_ease-in-out_infinite]" />
      <div className="absolute -bottom-36 left-1/3 h-[520px] w-[520px] rounded-full bg-[#14b8a6]/[0.13] blur-3xl animate-[pulse_8s_ease-in-out_infinite]" />

      {/* Interactive 60fps Diffused Starfield Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full block"
      />
    </div>
  );
};
