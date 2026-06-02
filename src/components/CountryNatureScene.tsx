import { useMemo, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getNatureProfile } from '../data/countryNatureProfiles';
import type { NatureProfile } from '../data/countryNatureProfiles';

interface CountryNatureSceneProps {
  countryCode: string | null;
  reducedMotion: boolean;
}

// ─── Seeded Random (stable per country + index) ───
function seededRandom(seed: string, index: number, salt: number): number {
  let hash = 0;
  const str = `${seed}:${index}:${salt}`;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash |= 0;
  }
  return (Math.abs(hash) % 1000) / 1000;
}

// ─── Intensity Duration Multiplier ───
function intensityMultiplier(intensity: 1 | 2 | 3): number {
  if (intensity === 1) return 1.3;
  if (intensity === 3) return 0.75;
  return 1.0;
}

// ─── Particle Config ───
interface ParticleConfig {
  x: number;
  y: number;
  size: number;
  opacity: number;
  duration: number;
  delay: number;
  sway: number;
  driftX: number;
  driftY: number;
  rotation: number;
}

function generateParticles(profile: NatureProfile, countryCode: string | null): ParticleConfig[] {
  const seed = `${profile.biome}-${countryCode ?? 'none'}`;
  const count = 20;
  const particles: ParticleConfig[] = [];

  const baseDuration =
    profile.particleType === 'snow' ? 12 :
    profile.particleType === 'sakura' ? 14 :
    profile.particleType === 'leaves' ? 10 :
    profile.particleType === 'sand' ? 4.5 :
    profile.particleType === 'rain' ? 1.5 :
    profile.particleType === 'aurora' ? 25 :
    profile.particleType === 'mist' ? 32 :
    profile.particleType === 'fireflies' ? 6 :
    profile.particleType === 'stars' ? 4.5 :
    10;

  const mult = intensityMultiplier(profile.motionIntensity);

  for (let i = 0; i < count; i++) {
    const r = (salt: number) => seededRandom(seed, i, salt);

    particles.push({
      x: r(0) * 100,
      y: r(1) * 100,
      size:
        profile.particleType === 'snow' ? 1.5 + r(2) * 2.5 :
        profile.particleType === 'sakura' ? 2 + r(2) * 3 :
        profile.particleType === 'leaves' ? 3 + r(2) * 3 :
        profile.particleType === 'sand' ? 1 + r(2) * 1.5 :
        profile.particleType === 'rain' ? 12 + r(2) * 18 :
        profile.particleType === 'aurora' ? 60 + r(2) * 80 :
        profile.particleType === 'mist' ? 50 + r(2) * 60 :
        profile.particleType === 'fireflies' ? 1.5 + r(2) * 2 :
        profile.particleType === 'stars' ? 0.6 + r(2) * 1.2 :
        2,
      opacity:
        profile.particleType === 'snow' ? 0.15 + r(3) * 0.15 :
        profile.particleType === 'sakura' ? 0.2 + r(3) * 0.2 :
        profile.particleType === 'leaves' ? 0.2 + r(3) * 0.2 :
        profile.particleType === 'sand' ? 0.3 + r(3) * 0.3 :
        profile.particleType === 'rain' ? 0.1 + r(3) * 0.15 :
        profile.particleType === 'aurora' ? 0.06 + r(3) * 0.06 :
        profile.particleType === 'mist' ? 0.03 + r(3) * 0.04 :
        profile.particleType === 'fireflies' ? 0.4 + r(3) * 0.4 :
        profile.particleType === 'stars' ? 0.5 + r(3) * 0.5 :
        0.3,
      duration: (baseDuration + r(4) * baseDuration * 0.4) * mult,
      delay: r(5) * baseDuration * mult,
      sway: (r(6) - 0.5) * 30,
      driftX: (r(7) - 0.5) * 40,
      driftY: (r(8) - 0.5) * 40,
      rotation: r(9) * 360,
    });
  }

  return particles;
}

// ─── Keyframes Generator ───
function generateKeyframes(
  type: NatureProfile['particleType'],
  biome: string,
  particles: ParticleConfig[]
): string {
  let css = '';

  for (let i = 0; i < particles.length; i++) {
    const p = particles[i];
    const name = `anim-${biome}-${type}-${i}`;

    switch (type) {
      case 'snow': {
        css += `
          @keyframes ${name} {
            0% { transform: translate(${p.x}%, -10%) translateX(0); opacity: 0; }
            5% { transform: translate(${p.x}%, ${p.y * 0.5}%) translateX(${p.sway * 0.3}px); opacity: ${p.opacity}; }
            50% { transform: translate(${p.x + p.sway * 0.5}%, ${p.y + 40}%) translateX(${p.sway * 0.5}px); opacity: ${p.opacity * 0.8}; }
            95% { transform: translate(${p.x - p.sway * 0.2}%, 105%) translateX(${-p.sway * 0.2}px); opacity: ${p.opacity * 0.6}; }
            100% { transform: translate(${p.x}%, 110%) translateX(0); opacity: 0; }
          }
        `;
        break;
      }
      case 'sakura': {
        css += `
          @keyframes ${name} {
            0% { transform: translate(${p.x}%, -10%) rotate(0deg); opacity: 0; }
            8% { transform: translate(${p.x + p.sway * 0.2}%, ${p.y * 0.4}%) rotate(${p.rotation * 0.2}deg); opacity: ${p.opacity}; }
            50% { transform: translate(${p.x + p.sway * 0.6}%, ${p.y + 35}%) rotate(${p.rotation * 0.6}deg); opacity: ${p.opacity * 0.85}; }
            92% { transform: translate(${p.x - p.sway * 0.3}%, 105%) rotate(${p.rotation * 0.9}deg); opacity: ${p.opacity * 0.6}; }
            100% { transform: translate(${p.x}%, 110%) rotate(${p.rotation}deg); opacity: 0; }
          }
        `;
        break;
      }
      case 'leaves': {
        css += `
          @keyframes ${name} {
            0% { transform: translate(${p.x}%, -10%) rotate(0deg); opacity: 0; }
            6% { transform: translate(${p.x + p.driftX * 0.15}%, ${p.y * 0.3}%) rotate(${p.sway * 0.2}deg); opacity: ${p.opacity}; }
            50% { transform: translate(${p.x + p.driftX * 0.5}%, ${p.y + 35}%) rotate(${-p.sway * 0.4}deg); opacity: ${p.opacity * 0.85}; }
            94% { transform: translate(${p.x + p.driftX * 0.85}%, 105%) rotate(${p.sway * 0.7}deg); opacity: ${p.opacity * 0.5}; }
            100% { transform: translate(${p.x + p.driftX}%, 110%) rotate(0deg); opacity: 0; }
          }
        `;
        break;
      }
      case 'sand': {
        css += `
          @keyframes ${name} {
            0% { transform: translate(-10%, ${p.y}%) translateY(0); opacity: 0; }
            5% { transform: translate(5%, ${p.y + p.driftY * 0.1}%) translateY(0); opacity: ${p.opacity}; }
            50% { transform: translate(50%, ${p.y + p.driftY * 0.5}%) translateY(${p.sway * 0.3}px); opacity: ${p.opacity * 0.9}; }
            95% { transform: translate(95%, ${p.y + p.driftY * 0.9}%) translateY(0); opacity: ${p.opacity * 0.7}; }
            100% { transform: translate(110%, ${p.y + p.driftY}%) translateY(0); opacity: 0; }
          }
        `;
        break;
      }
      case 'rain': {
        css += `
          @keyframes ${name} {
            0% { transform: translate(${p.x}%, -15%) scaleY(1); opacity: 0; }
            8% { transform: translate(${p.x}%, ${p.y * 0.5}%) scaleY(1); opacity: ${p.opacity}; }
            50% { transform: translate(${p.x + p.sway * 0.2}%, ${p.y + 40}%) scaleY(0.85); opacity: ${p.opacity * 0.8}; }
            92% { transform: translate(${p.x}%, 105%) scaleY(1); opacity: ${p.opacity * 0.5}; }
            100% { transform: translate(${p.x}%, 115%) scaleY(1); opacity: 0; }
          }
        `;
        break;
      }
      case 'aurora': {
        css += `
          @keyframes ${name} {
            0% { transform: translate(${p.x}%, ${p.y}%) translateY(0); opacity: ${p.opacity * 0.5}; }
            25% { transform: translate(${p.x + p.driftX * 0.25}%, ${p.y + p.driftY * 0.25}%) translateY(${-p.sway * 0.3}px); opacity: ${p.opacity}; }
            50% { transform: translate(${p.x + p.driftX * 0.5}%, ${p.y + p.driftY * 0.5}%) translateY(${p.sway * 0.2}px); opacity: ${p.opacity * 0.7}; }
            75% { transform: translate(${p.x + p.driftX * 0.75}%, ${p.y + p.driftY * 0.75}%) translateY(${-p.sway * 0.1}px); opacity: ${p.opacity * 0.9}; }
            100% { transform: translate(${p.x + p.driftX}%, ${p.y + p.driftY}%) translateY(0); opacity: ${p.opacity * 0.5}; }
          }
        `;
        break;
      }
      case 'mist': {
        css += `
          @keyframes ${name} {
            0% { transform: translate(${p.x}%, ${p.y}%) scale(1); opacity: ${p.opacity * 0.6}; }
            33% { transform: translate(${p.x + p.driftX * 0.4}%, ${p.y + p.driftY * 0.4}%) scale(1.05); opacity: ${p.opacity}; }
            66% { transform: translate(${p.x + p.driftX * 0.7}%, ${p.y + p.driftY * 0.7}%) scale(0.95); opacity: ${p.opacity * 0.8}; }
            100% { transform: translate(${p.x + p.driftX}%, ${p.y + p.driftY}%) scale(1); opacity: ${p.opacity * 0.6}; }
          }
        `;
        break;
      }
      case 'fireflies': {
        css += `
          @keyframes ${name} {
            0% { transform: translate(${p.x}%, ${p.y}%) scale(1); opacity: ${p.opacity * 0.4}; }
            25% { transform: translate(${p.x + p.driftX * 0.5}%, ${p.y + p.driftY * 0.5}%) scale(1.2); opacity: ${p.opacity}; }
            50% { transform: translate(${p.x + p.driftX}%, ${p.y + p.driftY}%) scale(0.8); opacity: ${p.opacity * 0.6}; }
            75% { transform: translate(${p.x + p.driftX * 0.3}%, ${p.y + p.driftY * 0.3}%) scale(1.1); opacity: ${p.opacity * 0.9}; }
            100% { transform: translate(${p.x}%, ${p.y}%) scale(1); opacity: ${p.opacity * 0.4}; }
          }
        `;
        break;
      }
      case 'stars': {
        css += `
          @keyframes ${name} {
            0% { opacity: ${p.opacity * 0.3}; transform: scale(0.8); }
            50% { opacity: ${p.opacity}; transform: scale(1.2); }
            100% { opacity: ${p.opacity * 0.3}; transform: scale(0.8); }
          }
        `;
        break;
      }
      default:
        break;
    }
  }

  return css;
}

// ─── Particle Shape Renderer ───
function ParticleShape({ type, size }: { type: NatureProfile['particleType']; size: number }) {
  switch (type) {
    case 'snow':
      return <circle r={size} fill="#ffffff" />;
    case 'sakura':
      return <ellipse rx={size} ry={size * 0.6} fill="#ffb7c5" transform={`rotate(15)`} />;
    case 'leaves': {
      const s = size;
      return (
        <path
          d={`M0,0 C${s * 0.4},${-s * 0.3} ${s * 0.8},${-s * 0.2} ${s},0 C${s * 0.8},${s * 0.2} ${s * 0.4},${s * 0.3} 0,0`}
          fill="#4a7c59"
        />
      );
    }
    case 'sand':
      return <circle r={size} fill="#d4c4a8" />;
    case 'rain':
      return (
        <line
          x1={0}
          y1={0}
          x2={0}
          y2={size}
          stroke="#8a9ab0"
          strokeWidth={0.6}
          strokeLinecap="round"
        />
      );
    case 'aurora':
      return (
        <rect
          x={-size}
          y={-size * 0.4}
          width={size * 2}
          height={size * 0.8}
          fill="url(#auroraGradient)"
          filter="url(#blur20)"
          rx={size * 0.2}
        />
      );
    case 'mist':
      return (
        <ellipse
          cx={0}
          cy={0}
          rx={size}
          ry={size * 0.5}
          fill="#ffffff"
          filter="url(#blur35)"
        />
      );
    case 'fireflies':
      return <circle r={size} fill="#f0e68c" />;
    case 'stars':
      return <circle r={size} fill="#ffffff" />;
    default:
      return null;
  }
}

// ─── Main Component ───
export function CountryNatureScene({ countryCode, reducedMotion }: CountryNatureSceneProps) {
  const [isTabVisible, setIsTabVisible] = useState(() => !document.hidden);

  useEffect(() => {
    const onChange = () => setIsTabVisible(!document.hidden);
    document.addEventListener('visibilitychange', onChange);
    return () => document.removeEventListener('visibilitychange', onChange);
  }, []);

  const profile = useMemo(() => getNatureProfile(countryCode), [countryCode]);

  const particles = useMemo(
    () => generateParticles(profile, countryCode),
    [profile, countryCode]
  );

  const keyframesCSS = useMemo(
    () => generateKeyframes(profile.particleType, profile.biome, particles),
    [profile, particles]
  );

  const showParticles = !reducedMotion && profile.particleType !== 'none';

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={countryCode || 'none'}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
        className="fixed inset-0 pointer-events-none"
        style={{ zIndex: -1 }}
        aria-hidden="true"
      >
        <div
          className="w-full h-full"
          style={{
            background: `linear-gradient(to bottom, ${profile.gradientFrom}, ${profile.gradientTo})`,
          }}
        >
          {showParticles && (
            <svg
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              className={`absolute inset-0 w-full h-full overflow-visible ${!isTabVisible ? 'nature-scene-paused' : ''}`}
            >
              <defs>
                <filter id="blur20">
                  <feGaussianBlur stdDeviation="20" />
                </filter>
                <filter id="blur35">
                  <feGaussianBlur stdDeviation="35" />
                </filter>
                <linearGradient id="auroraGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#7dd3fc" stopOpacity="0.3" />
                  <stop offset="50%" stopColor="#a78bfa" stopOpacity="0.2" />
                  <stop offset="100%" stopColor="#86efac" stopOpacity="0.1" />
                </linearGradient>
              </defs>
              <style dangerouslySetInnerHTML={{ __html: keyframesCSS }} />
              {particles.map((p, i) => {
                const animName = `anim-${profile.biome}-${profile.particleType}-${i}`;
                return (
                  <g
                    key={i}
                    style={{
                      animation: `${animName} ${p.duration}s linear ${p.delay}s infinite`,
                      opacity: profile.particleType === 'stars' ? undefined : p.opacity,
                      transformOrigin: 'center',
                    }}
                  >
                    <ParticleShape type={profile.particleType} size={p.size} />
                  </g>
                );
              })}
            </svg>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
