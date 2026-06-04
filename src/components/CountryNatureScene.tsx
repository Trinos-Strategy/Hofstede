import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getCountryNatureProfile, type CountryNatureProfile } from '../data/countryNatureProfiles';

interface CountryNatureSceneProps {
  countryCode?: string | null;
  className?: string;
  isDarkMode?: boolean;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  baseSize: number;
  opacity: number;
  baseOpacity: number;
  color: string;
  angle: number;
  spin: number;
  offsetX: number;
  offsetY: number;
  layer: 1 | 2 | 3;
}

interface ShootingStarState {
  id: number;
  x1: number;
  y1: number;
  x2: number;
  y2: number;
}

export function CountryNatureScene({
  countryCode = null,
  className = '',
  isDarkMode = true,
}: CountryNatureSceneProps) {
  const profile: CountryNatureProfile = getCountryNatureProfile(countryCode || '');
  const { biome, particleType, particleColors } = profile;

  // Reduced motion media query state
  const [reducedMotion, setReducedMotion] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    }
    return false;
  });

  // Shooting star state
  const [shootingStar, setShootingStar] = useState<ShootingStarState | null>(null);

  // Canvas and container refs
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef1 = useRef<HTMLCanvasElement>(null);
  const canvasRef2 = useRef<HTMLCanvasElement>(null);
  const canvasRef3 = useRef<HTMLCanvasElement>(null);

  // Animation and state refs to avoid React rerenders in requestAnimationFrame
  const isPausedRef = useRef(false);
  const animFrameIdRef = useRef<number | null>(null);
  const mouseRef = useRef({ x: 0, y: 0, active: false });

  // Monitor prefers-reduced-motion
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

    const listener = (e: MediaQueryListEvent) => {
      setReducedMotion(e.matches);
    };

    mediaQuery.addEventListener('change', listener);
    return () => {
      mediaQuery.removeEventListener('change', listener);
    };
  }, []);

  // Monitor Page Visibility API
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        isPausedRef.current = true;
        if (animFrameIdRef.current) {
          cancelAnimationFrame(animFrameIdRef.current);
          animFrameIdRef.current = null;
        }
      } else {
        isPausedRef.current = false;
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  // Mouse move handlers
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reducedMotion) return;
    const rect = containerRef.current?.getBoundingClientRect();
    if (rect) {
      mouseRef.current.x = e.clientX - rect.left;
      mouseRef.current.y = e.clientY - rect.top;
      mouseRef.current.active = true;
    }
  };

  const handleMouseLeave = () => {
    mouseRef.current.active = false;
  };

  // Shooting star effect (only for 'stars' biome and if motion is allowed)
  useEffect(() => {
    if (biome !== 'stars' || reducedMotion) {
      const timer = setTimeout(() => {
        setShootingStar(null);
      }, 0);
      return () => clearTimeout(timer);
    }

    let timerId: number;

    const triggerShootingStar = () => {
      const width = containerRef.current?.clientWidth || window.innerWidth;
      const startX = Math.random() * (width * 0.4) + width * 0.5; // Top-right region
      const startY = Math.random() * 100;
      const length = Math.random() * 100 + 80;
      
      // Calculate end position going down-left (135 degrees)
      const endX = startX - length;
      const endY = startY + length;

      setShootingStar({
        id: Date.now(),
        x1: startX,
        y1: startY,
        x2: endX,
        y2: endY,
      });

      // Clear the star after transition finishes (0.5s duration)
      window.setTimeout(() => {
        setShootingStar(null);
      }, 500);

      // Schedule next shooting star between 6 and 12 seconds
      const nextDelay = (Math.random() * 6 + 6) * 1000;
      timerId = window.setTimeout(triggerShootingStar, nextDelay);
    };

    // First trigger delay
    const initialDelay = (Math.random() * 4 + 4) * 1000;
    timerId = window.setTimeout(triggerShootingStar, initialDelay);

    return () => {
      window.clearTimeout(timerId);
    };
  }, [biome, reducedMotion]);

  // Particle Simulation Engine
  useEffect(() => {
    // If reduced motion is preferred, do not run simulation at all
    if (reducedMotion) {
      if (animFrameIdRef.current) {
        cancelAnimationFrame(animFrameIdRef.current);
        animFrameIdRef.current = null;
      }
      return;
    }

    const canvas1 = canvasRef1.current;
    const canvas2 = canvasRef2.current;
    const canvas3 = canvasRef3.current;
    if (!canvas1 || !canvas2 || !canvas3) return;

    const ctx1 = canvas1.getContext('2d');
    const ctx2 = canvas2.getContext('2d');
    const ctx3 = canvas3.getContext('2d');
    if (!ctx1 || !ctx2 || !ctx3) return;

    // Set canvas sizes
    let width = (canvas1.width = canvas2.width = canvas3.width = containerRef.current?.clientWidth || window.innerWidth);
    let height = (canvas1.height = canvas2.height = canvas3.height = containerRef.current?.clientHeight || window.innerHeight);

    const handleResize = () => {
      if (!containerRef.current) return;
      width = canvas1.width = canvas2.width = canvas3.width = containerRef.current.clientWidth;
      height = canvas1.height = canvas2.height = canvas3.height = containerRef.current.clientHeight;
    };
    window.addEventListener('resize', handleResize);

    // Particle count is performance-gated based on hardwareConcurrency
    const particleCount = navigator.hardwareConcurrency <= 4 ? 25 : 55;
    const particles: Particle[] = [];

    // Initialize particles
    for (let i = 0; i < particleCount; i++) {
      // Split into 3 z-layers: 40% Layer 1, 40% Layer 2, 20% Layer 3
      let layer: 1 | 2 | 3 = 1;
      if (i >= particleCount * 0.8) {
        layer = 3;
      } else if (i >= particleCount * 0.4) {
        layer = 2;
      }

      // Specs per layer
      let sizeRange = [2, 4];
      let speedMultiplier = 0.25;
      let baseOpacity = 0.4;

      if (layer === 2) {
        sizeRange = [4, 7];
        speedMultiplier = 0.6;
        baseOpacity = 0.6;
      } else if (layer === 3) {
        sizeRange = [7, 12];
        speedMultiplier = 1.1;
        baseOpacity = 0.8;
      }

      const size = Math.random() * (sizeRange[1] - sizeRange[0]) + sizeRange[0];
      const color = particleColors[Math.floor(Math.random() * particleColors.length)];

      // Initialize base velocity based on particle type
      let vx = 0;
      let vy = 0;

      if (particleType === 'snow') {
        // Fall down and slightly right
        vx = (Math.random() * 0.4 + 0.1) * speedMultiplier;
        vy = (Math.random() * 0.7 + 0.5) * speedMultiplier;
      } else if (particleType === 'petal') {
        // Drifting diagonals
        vx = (Math.random() * 0.5 + 0.3) * speedMultiplier;
        vy = (Math.random() * 0.6 + 0.4) * speedMultiplier;
      } else if (particleType === 'bubble') {
        // Floating upwards
        vx = (Math.random() - 0.5) * 0.25 * speedMultiplier;
        vy = -(Math.random() * 0.7 + 0.4) * speedMultiplier;
      } else if (particleType === 'sand') {
        // Rising warm embers
        vx = (Math.random() - 0.5) * 0.3 * speedMultiplier;
        vy = -(Math.random() * 0.8 + 0.5) * speedMultiplier;
      } else if (particleType === 'leaf') {
        // Swaying leaf fall
        vx = (Math.random() - 0.5) * 0.15 * speedMultiplier;
        vy = (Math.random() * 0.5 + 0.3) * speedMultiplier;
      } else {
        // Default floating (mist, aurora, star, sparkle)
        vx = (Math.random() - 0.5) * 0.3 * speedMultiplier;
        vy = (Math.random() - 0.5) * 0.3 * speedMultiplier;
      }

      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx,
        vy,
        size,
        baseSize: size,
        opacity: baseOpacity * (Math.random() * 0.3 + 0.85),
        baseOpacity,
        color,
        angle: Math.random() * Math.PI * 2,
        spin: (Math.random() - 0.5) * 0.02,
        offsetX: 0,
        offsetY: 0,
        layer,
      });
    }

    // Animation Loop
    const loop = () => {
      if (isPausedRef.current) {
        animFrameIdRef.current = requestAnimationFrame(loop);
        return;
      }

      // Clear layers
      ctx1.clearRect(0, 0, width, height);
      ctx2.clearRect(0, 0, width, height);
      ctx3.clearRect(0, 0, width, height);

      const mouseX = mouseRef.current.x;
      const mouseY = mouseRef.current.y;
      const mouseActive = mouseRef.current.active;

      particles.forEach((p) => {
        // 1. Move baseline position
        if (particleType === 'star') {
          // Twinkle and micro-drift
          p.x += p.vx * 0.08;
          p.y += p.vy * 0.08;
          p.angle += p.spin * 0.3;
          p.opacity = p.baseOpacity * (0.2 + 0.8 * Math.abs(Math.sin(p.angle)));
        } else if (particleType === 'bubble') {
          p.y += p.vy;
          p.x += Math.sin(p.angle) * 0.25;
          p.angle += p.spin * 0.6;
        } else if (particleType === 'leaf') {
          p.y += p.vy;
          p.x += Math.sin(p.angle) * 0.5;
          p.angle += p.spin;
        } else if (particleType === 'petal') {
          p.y += p.vy;
          p.x += p.vx + Math.sin(p.angle) * 0.35;
          p.angle += p.spin;
        } else if (particleType === 'sand') {
          p.y += p.vy;
          p.x += p.vx;
          // Slowly fade out as embers float high
          const screenPercent = p.y / height;
          p.opacity = p.baseOpacity * screenPercent;
        } else if (particleType === 'mist') {
          p.x += p.vx;
          p.y += p.vy;
          p.angle += p.spin * 0.15;
          p.opacity = p.baseOpacity * (0.35 + 0.65 * Math.abs(Math.sin(p.angle)));
        } else if (particleType === 'aurora') {
          p.x += p.vx;
          p.y += p.vy;
          p.angle += p.spin * 0.2;
          p.opacity = p.baseOpacity * (0.4 + 0.6 * Math.abs(Math.sin(p.angle)));
        } else if (particleType === 'sparkle') {
          p.x += p.vx;
          p.y += p.vy;
          p.angle += p.spin * 0.4;
          p.opacity = p.baseOpacity * (0.25 + 0.75 * Math.abs(Math.sin(p.angle)));
        } else {
          // snow
          p.y += p.vy;
          p.x += p.vx + Math.sin(p.angle) * 0.25;
          p.angle += p.spin;
        }

        // Screen boundary wrap-around / respawn
        if (p.x < -20) p.x = width + 20;
        if (p.x > width + 20) p.x = -20;
        if (p.y < -20) {
          p.y = height + 20;
          p.x = Math.random() * width;
          p.opacity = p.baseOpacity;
        }
        if (p.y > height + 20) {
          p.y = -20;
          p.x = Math.random() * width;
          p.opacity = p.baseOpacity;
        }

        // 2. Mouse Repulsion Shifting (5px - 15px shift when within 80px radius)
        let targetOffsetX = 0;
        let targetOffsetY = 0;

        if (mouseActive) {
          const dx = p.x - mouseX;
          const dy = p.y - mouseY;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 80) {
            const force = (80 - distance) / 80;
            const shift = 5 + force * 10; // Shifts dynamically from 5px to 15px

            if (distance > 0) {
              targetOffsetX = (dx / distance) * shift;
              targetOffsetY = (dy / distance) * shift;
            }
          }
        }

        // Smooth interpolation of offsets (direct DOM/ref modification, no react setState)
        p.offsetX += (targetOffsetX - p.offsetX) * 0.15;
        p.offsetY += (targetOffsetY - p.offsetY) * 0.15;

        const drawX = p.x + p.offsetX;
        const drawY = p.y + p.offsetY;

        // Choose layer canvas context
        const ctx = p.layer === 1 ? ctx1 : p.layer === 2 ? ctx2 : ctx3;
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.opacity;

        // 3. Draw particles based on biome type
        if (particleType === 'star') {
          // 4-pointed glowing stars
          ctx.save();
          ctx.translate(drawX, drawY);
          ctx.beginPath();
          ctx.moveTo(0, -p.size);
          ctx.lineTo(p.size * 0.22, -p.size * 0.22);
          ctx.lineTo(p.size, 0);
          ctx.lineTo(p.size * 0.22, p.size * 0.22);
          ctx.lineTo(0, p.size);
          ctx.lineTo(-p.size * 0.22, p.size * 0.22);
          ctx.lineTo(-p.size, 0);
          ctx.lineTo(-p.size * 0.22, -p.size * 0.22);
          ctx.closePath();
          ctx.fill();
          ctx.restore();
        } else if (particleType === 'bubble') {
          // Hollow glowing bubbles
          ctx.beginPath();
          ctx.arc(drawX, drawY, p.size, 0, Math.PI * 2);
          ctx.strokeStyle = p.color;
          ctx.lineWidth = 1;
          ctx.stroke();

          // Bubble highlight shine
          ctx.beginPath();
          ctx.arc(drawX - p.size * 0.35, drawY - p.size * 0.35, p.size * 0.18, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(255, 255, 255, 0.45)';
          ctx.fill();
        } else if (particleType === 'leaf') {
          // Falling leaves
          ctx.save();
          ctx.translate(drawX, drawY);
          ctx.rotate(p.angle);
          ctx.beginPath();
          ctx.ellipse(0, 0, p.size, p.size * 0.45, 0, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        } else if (particleType === 'petal') {
          // Organic curved flower petals
          ctx.save();
          ctx.translate(drawX, drawY);
          ctx.rotate(p.angle);
          ctx.beginPath();
          ctx.moveTo(0, -p.size);
          ctx.bezierCurveTo(p.size * 0.75, -p.size * 0.5, p.size * 0.75, p.size * 0.5, 0, p.size);
          ctx.bezierCurveTo(-p.size * 0.75, p.size * 0.5, -p.size * 0.75, -p.size * 0.5, 0, -p.size);
          ctx.fill();
          ctx.restore();
        } else if (particleType === 'mist' || particleType === 'aurora') {
          // Fluffy cloud-like radial gradients
          ctx.beginPath();
          const radGrad = ctx.createRadialGradient(drawX, drawY, 0, drawX, drawY, p.size);
          radGrad.addColorStop(0, p.color);
          radGrad.addColorStop(0.3, p.color);
          radGrad.addColorStop(1, 'transparent');
          ctx.fillStyle = radGrad;
          ctx.arc(drawX, drawY, p.size, 0, Math.PI * 2);
          ctx.fill();
        } else {
          // Snow, warm sand, and spark dots
          ctx.beginPath();
          ctx.arc(drawX, drawY, p.size, 0, Math.PI * 2);
          ctx.fill();
        }
      });

      animFrameIdRef.current = requestAnimationFrame(loop);
    };

    // Start simulation loop
    animFrameIdRef.current = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animFrameIdRef.current) {
        cancelAnimationFrame(animFrameIdRef.current);
      }
    };
  }, [particleType, particleColors, reducedMotion]);

  // CSS transition configurations for cross-fade
  const themeGradient = isDarkMode ? profile.gradients.dark : profile.gradients.light;

  return (
    <AnimatePresence mode="sync">
      <motion.div
        key={`${profile.countryCode}-${isDarkMode}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.9, ease: [0.4, 0, 0.2, 1] }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        ref={containerRef}
        className={`absolute inset-0 overflow-hidden pointer-events-none select-none ${className}`}
        style={{
          background: themeGradient,
          zIndex: -10,
        }}
      >
        {/* Render nature scenes unless prefers-reduced-motion is active */}
        {!reducedMotion && (
          <>
            {/* Aurora overlay (Nordic countries) */}
            {particleType === 'aurora' && (
              <motion.div
                className="absolute inset-0"
                style={{
                  background:
                    'linear-gradient(180deg, transparent 0%, rgba(0,255,180,0.06) 40%, rgba(100,0,255,0.04) 70%, transparent 100%)',
                  filter: 'blur(40px)',
                  zIndex: -4,
                }}
                animate={{
                  opacity: [0.3, 0.8, 0.3],
                  scaleX: [1, 1.1, 0.9, 1],
                }}
                transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
              />
            )}

            {/* Canvas layer 1 (z: -3, background particles) */}
            <canvas
              ref={canvasRef1}
              className="absolute inset-0 pointer-events-none"
              style={{
                zIndex: -3,
                filter: 'blur(1.5px)',
                opacity: 0.4,
              }}
            />

            {/* Canvas layer 2 (z: -2, midground particles) */}
            <canvas
              ref={canvasRef2}
              className="absolute inset-0 pointer-events-none"
              style={{
                zIndex: -2,
                opacity: 0.6,
              }}
            />

            {/* Canvas layer 3 (z: -1, foreground particles) */}
            <canvas
              ref={canvasRef3}
              className="absolute inset-0 pointer-events-none"
              style={{
                zIndex: -1,
                opacity: 0.8,
              }}
            />

            {/* Shooting Star overlay (for 'stars' biome) */}
            {shootingStar && (
              <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: -1 }}>
                <motion.line
                  x1={shootingStar.x1}
                  y1={shootingStar.y1}
                  x2={shootingStar.x2}
                  y2={shootingStar.y2}
                  stroke="url(#shootingStarGradient)"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity: [0, 1, 0],
                    x: [0, -120],
                    y: [0, 120],
                  }}
                  transition={{ duration: 0.5, ease: 'linear' }}
                />
                <defs>
                  <linearGradient id="shootingStarGradient" x1="1" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="rgba(255, 255, 255, 0)" />
                    <stop offset="60%" stopColor="rgba(255, 253, 220, 0.8)" />
                    <stop offset="100%" stopColor="rgba(255, 255, 255, 1)" />
                  </linearGradient>
                </defs>
              </svg>
            )}
          </>
        )}
      </motion.div>
    </AnimatePresence>
  );
}
