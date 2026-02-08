import { useEffect, useState } from 'react';

interface SplashScreenProps {
  onComplete: () => void;
}

export function SplashScreen({ onComplete }: SplashScreenProps) {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 100);
    const t2 = setTimeout(() => setPhase(2), 600);
    const t3 = setTimeout(() => setPhase(3), 1400);
    const t4 = setTimeout(onComplete, 2200);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, [onComplete]);

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center overflow-hidden select-none"
      style={{
        background: 'linear-gradient(180deg, #0a1a3a 0%, #0d2a5c 40%, #102e6a 70%, #0a1a3a 100%)',
        opacity: phase >= 1 ? 1 : 0,
        transition: 'opacity 0.5s ease-out',
      }}
    >
      {/* Soft center glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 60% 50% at 50% 45%, rgba(60,130,246,0.15) 0%, transparent 70%)',
        }}
      />

      {/* Main content area */}
      <div className="relative flex items-center justify-center" style={{ width: 300, height: 220 }}>
        {/* 3D-style piggy bank matching app icon */}
        <svg
          viewBox="0 0 200 180"
          className="absolute"
          style={{
            width: 200,
            height: 180,
            left: 15,
            top: 10,
            opacity: phase >= 2 ? 1 : 0,
            transform: phase >= 2 ? 'scale(1)' : 'scale(0.85)',
            transition: 'opacity 0.7s ease-out, transform 0.7s ease-out',
          }}
        >
          <defs>
            {/* Body gradient - white with subtle blue shadow */}
            <radialGradient id="bodyGrad" cx="45%" cy="40%" r="55%">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="60%" stopColor="#f0f0f5" />
              <stop offset="100%" stopColor="#d8dce8" />
            </radialGradient>
            {/* Head gradient */}
            <radialGradient id="headGrad" cx="50%" cy="35%" r="55%">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="55%" stopColor="#f2f2f7" />
              <stop offset="100%" stopColor="#dde0ea" />
            </radialGradient>
            {/* Snout gradient */}
            <radialGradient id="snoutGrad" cx="50%" cy="40%" r="50%">
              <stop offset="0%" stopColor="#f5f0f0" />
              <stop offset="100%" stopColor="#e8e0e0" />
            </radialGradient>
            {/* Ear gradient */}
            <radialGradient id="earGrad" cx="50%" cy="30%" r="60%">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="100%" stopColor="#e0dce8" />
            </radialGradient>
            {/* Inner ear pink tint */}
            <radialGradient id="earInnerGrad" cx="50%" cy="40%" r="50%">
              <stop offset="0%" stopColor="rgba(255,200,200,0.35)" />
              <stop offset="100%" stopColor="rgba(255,200,200,0.05)" />
            </radialGradient>
            {/* Coin gradient */}
            <linearGradient id="coinGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFE066" />
              <stop offset="30%" stopColor="#FFD700" />
              <stop offset="70%" stopColor="#F6C544" />
              <stop offset="100%" stopColor="#D4A22A" />
            </linearGradient>
            {/* Coin shine */}
            <radialGradient id="coinShine" cx="35%" cy="30%" r="40%">
              <stop offset="0%" stopColor="rgba(255,255,255,0.6)" />
              <stop offset="100%" stopColor="rgba(255,255,255,0)" />
            </radialGradient>
            {/* Body shadow */}
            <radialGradient id="shadowGrad" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="rgba(0,0,0,0.15)" />
              <stop offset="100%" stopColor="rgba(0,0,0,0)" />
            </radialGradient>
            {/* Body highlight */}
            <radialGradient id="bodyHighlight" cx="38%" cy="30%" r="35%">
              <stop offset="0%" stopColor="rgba(255,255,255,0.7)" />
              <stop offset="100%" stopColor="rgba(255,255,255,0)" />
            </radialGradient>
          </defs>

          {/* Ground shadow */}
          <ellipse cx="100" cy="162" rx="55" ry="8" fill="url(#shadowGrad)" />

          {/* BODY - main round shape */}
          <ellipse cx="95" cy="100" rx="52" ry="42" fill="url(#bodyGrad)" />
          {/* Body highlight */}
          <ellipse cx="82" cy="88" rx="28" ry="22" fill="url(#bodyHighlight)" />

          {/* LEGS */}
          <rect x="58" y="132" width="14" height="20" rx="7" fill="url(#bodyGrad)" />
          <rect x="78" y="134" width="14" height="20" rx="7" fill="url(#bodyGrad)" />
          <rect x="98" y="134" width="14" height="20" rx="7" fill="#eaeaf0" />
          <rect x="118" y="132" width="14" height="20" rx="7" fill="#eaeaf0" />
          {/* Leg shadows */}
          <rect x="58" y="142" width="14" height="10" rx="7" fill="rgba(0,0,0,0.04)" />
          <rect x="78" y="144" width="14" height="10" rx="7" fill="rgba(0,0,0,0.04)" />
          <rect x="98" y="144" width="14" height="10" rx="7" fill="rgba(0,0,0,0.04)" />
          <rect x="118" y="142" width="14" height="10" rx="7" fill="rgba(0,0,0,0.04)" />

          {/* TAIL */}
          <path
            d="M 43 95 Q 30 82 34 98 Q 38 108 28 102"
            fill="none"
            stroke="#e0dce8"
            strokeWidth="3.5"
            strokeLinecap="round"
          />

          {/* HEAD - overlapping body */}
          <circle cx="130" cy="88" r="28" fill="url(#headGrad)" />
          {/* Head highlight */}
          <circle cx="124" cy="78" r="14" fill="rgba(255,255,255,0.4)" />

          {/* EARS */}
          <ellipse cx="112" cy="58" rx="10" ry="16" fill="url(#earGrad)" transform="rotate(-10 112 58)" />
          <ellipse cx="112" cy="58" rx="6" ry="10" fill="url(#earInnerGrad)" transform="rotate(-10 112 58)" />
          <ellipse cx="135" cy="54" rx="9" ry="15" fill="url(#earGrad)" transform="rotate(10 135 54)" />
          <ellipse cx="135" cy="54" rx="5.5" ry="9" fill="url(#earInnerGrad)" transform="rotate(10 135 54)" />

          {/* SNOUT */}
          <ellipse cx="150" cy="92" rx="13" ry="10" fill="url(#snoutGrad)" />
          {/* Nostrils */}
          <circle cx="146" cy="91" r="2.5" fill="rgba(80,70,80,0.25)" />
          <circle cx="154" cy="91" r="2.5" fill="rgba(80,70,80,0.25)" />

          {/* EYES */}
          <circle cx="122" cy="82" r="3.5" fill="rgba(20,20,40,0.7)" />
          <circle cx="140" cy="80" r="3.5" fill="rgba(20,20,40,0.7)" />
          {/* Eye shine */}
          <circle cx="123.5" cy="80.5" r="1.2" fill="white" />
          <circle cx="141.5" cy="78.5" r="1.2" fill="white" />

          {/* Subtle smile */}
          <path d="M 142 98 Q 148 103 155 98" stroke="rgba(80,70,80,0.15)" strokeWidth="1.5" fill="none" strokeLinecap="round" />

          {/* COIN SLOT */}
          <rect x="85" y="56" width="22" height="3.5" rx="1.75" fill="rgba(20,20,40,0.12)" />
        </svg>

        {/* Bar chart - right side */}
        <div
          className="absolute flex items-end gap-1"
          style={{
            right: 0,
            bottom: 32,
            height: 70,
            opacity: phase >= 3 ? 1 : 0,
            transition: 'opacity 0.4s ease-out',
          }}
        >
          {[28, 42, 35, 55, 65].map((h, i) => (
            <div
              key={i}
              className="rounded-sm"
              style={{
                width: 8,
                height: phase >= 3 ? h : 0,
                background: `rgba(60, 130, 246, ${0.25 + i * 0.08})`,
                border: '1px solid rgba(100, 160, 255, 0.3)',
                transition: `height 0.5s ease-out ${i * 0.08}s`,
              }}
            />
          ))}
          {/* Arrow up */}
          <svg
            viewBox="0 0 20 30"
            className="absolute"
            style={{
              width: 16,
              height: 24,
              right: -2,
              top: -18,
              opacity: phase >= 3 ? 1 : 0,
              transform: phase >= 3 ? 'translateY(0)' : 'translateY(8px)',
              transition: 'opacity 0.3s ease-out 0.3s, transform 0.3s ease-out 0.3s',
            }}
          >
            <path d="M 10 28 L 10 6 M 4 12 L 10 4 L 16 12" stroke="rgba(100,180,255,0.7)" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>

        {/* Falling coin */}
        <div
          className="absolute"
          style={{
            left: 108,
            top: phase >= 3 ? 48 : -25,
            opacity: phase >= 3 ? 1 : 0,
            transition: 'top 0.5s cubic-bezier(0.34, 1.2, 0.64, 1), opacity 0.2s ease-out',
          }}
        >
          <svg width="24" height="24" viewBox="0 0 28 28">
            <circle cx="14" cy="14" r="12" fill="url(#coinGrad2)" stroke="#B8860B" strokeWidth="1.5" />
            <circle cx="14" cy="14" r="12" fill="url(#coinShine2)" />
            <text x="14" y="19" textAnchor="middle" fontSize="13" fill="#8B6914" fontWeight="bold">$</text>
            <defs>
              <linearGradient id="coinGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FFE066" />
                <stop offset="30%" stopColor="#FFD700" />
                <stop offset="70%" stopColor="#F6C544" />
                <stop offset="100%" stopColor="#D4A22A" />
              </linearGradient>
              <radialGradient id="coinShine2" cx="35%" cy="30%" r="40%">
                <stop offset="0%" stopColor="rgba(255,255,255,0.5)" />
                <stop offset="100%" stopColor="rgba(255,255,255,0)" />
              </radialGradient>
            </defs>
          </svg>
        </div>
      </div>

      {/* App name */}
      <h1
        className="mt-4 text-3xl font-bold tracking-tight"
        style={{
          color: 'rgba(255,255,255,0.95)',
          opacity: phase >= 3 ? 1 : 0,
          transform: phase >= 3 ? 'translateY(0)' : 'translateY(12px)',
          transition: 'opacity 0.5s ease-out 0.2s, transform 0.5s ease-out 0.2s',
        }}
      >
        Controle$
      </h1>

      {/* Tagline */}
      <p
        className="mt-3 text-sm tracking-wide"
        style={{
          color: 'rgba(255,255,255,0.7)',
          fontFamily: 'system-ui, -apple-system, sans-serif',
          opacity: phase >= 3 ? 1 : 0,
          transform: phase >= 3 ? 'translateY(0)' : 'translateY(10px)',
          transition: 'opacity 0.5s ease-out 0.35s, transform 0.5s ease-out 0.35s',
        }}
      >
        Contas, gastos e investimentos
      </p>
    </div>
  );
}
