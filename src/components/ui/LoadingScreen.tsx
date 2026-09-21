'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

import { LOADING_LOGO_BASE64 } from './loading-logo-base64';

interface LoadingScreenProps {
  /** 0-100 download progress driven by the asset preloader. */
  progress: number;
  onComplete?: () => void;
}

export default function LoadingScreen({ progress, onComplete }: LoadingScreenProps) {
  const [isFadingOut, setIsFadingOut] = useState(false);
  const doneRef = useRef(false);

  useEffect(() => {
    if (progress < 100 || doneRef.current) return;
    doneRef.current = true;
    const holdId = setTimeout(() => {
      setIsFadingOut(true);
      const fadeId = setTimeout(() => {
        if (typeof onComplete === 'function') onComplete();
      }, 700);
      return () => clearTimeout(fadeId);
    }, 250);
    return () => clearTimeout(holdId);
  }, [progress, onComplete]);

  const pct = Math.max(0, Math.min(100, Math.floor(progress)));

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
        {/* Instant Inlined Base64 Mahalaxmi Logo */}
        <div style={{ position: 'relative', width: '110px', height: '110px', flexShrink: 0 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={LOADING_LOGO_BASE64}
            alt="Mahalaxmi Telecom Logo"
            width={110}
            height={110}
            style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }}
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
              width: `${pct}%`,
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
          <span style={{ fontWeight: 600 }}>{pct}%</span>
        </div>
      </div>
    </div>
  );
}
