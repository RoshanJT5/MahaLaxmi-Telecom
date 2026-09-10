'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';

interface LoadingScreenProps {
  onComplete?: () => void;
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    const startTime = Date.now();
    const duration = 2000;

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const pct = Math.min(100, Math.floor((elapsed / duration) * 100));
      setProgress(pct);

      if (pct >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          setIsFadingOut(true);
          setTimeout(() => {
            if (typeof onComplete === 'function') onComplete();
          }, 700);
        }, 150);
      }
    }, 25);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#000000',
        userSelect: 'none',
        opacity: isFadingOut ? 0 : 1,
        transition: 'opacity 700ms cubic-bezier(0.16, 1, 0.3, 1)',
        pointerEvents: isFadingOut ? 'none' : 'auto',
      }}
    >
      {/* GOLD MAHALAXMI IMAGE LOGO + TEXT LOCKUP */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '28px',
          marginBottom: '44px',
        }}
      >
        {/* Real Mahalaxmi Logo Image */}
        <div style={{ position: 'relative', width: '110px', height: '110px', flexShrink: 0 }}>
          <Image
            src="/mahalaxmi-logo.png"
            alt="Mahalaxmi Telecom Logo"
            fill
            priority
            style={{ objectFit: 'contain' }}
          />
        </div>

        {/* Brand Text */}
        <div style={{ display: 'flex', flexDirection: 'column', textAlign: 'left', gap: '4px' }}>
          {/* MAHALAXMI TELECOM */}
          <h1
            style={{
              margin: 0,
              fontSize: '28px',
              fontFamily:
                'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
              fontWeight: 800,
              letterSpacing: '0.1em',
              color: '#FFFFFF',
              lineHeight: 1.1,
              textTransform: 'uppercase',
            }}
          >
            MAHALAXMI TELECOM
          </h1>

          {/* PRIVATE LIMITED */}
          <span
            style={{
              fontSize: '13px',
              fontFamily:
                'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
              fontWeight: 600,
              letterSpacing: '0.28em',
              color: '#D4AF37',
              textTransform: 'uppercase',
            }}
          >
            PRIVATE LIMITED
          </span>
        </div>
      </div>

      {/* THIN GOLD LOADING BAR */}
      <div
        style={{
          width: '100%',
          maxWidth: '320px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          paddingInline: '24px',
        }}
      >
        <div
          style={{
            width: '100%',
            height: '2.5px',
            backgroundColor: '#1a1a1a',
            borderRadius: '9999px',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              width: `${progress}%`,
              height: '100%',
              borderRadius: '9999px',
              transition: 'width 30ms linear',
              background:
                'linear-gradient(90deg, #8A6414 0%, #D4AF37 55%, #FFF2B2 100%)',
              boxShadow: '0 0 8px rgba(212, 175, 55, 0.5)',
            }}
          />
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%',
            marginTop: '10px',
            fontSize: '10px',
            fontFamily: 'monospace',
            letterSpacing: '0.2em',
            color: 'rgba(212, 175, 55, 0.7)',
          }}
        >
          <span>LOADING</span>
          <span style={{ fontWeight: 600 }}>{progress}%</span>
        </div>
      </div>
    </div>
  );
}
