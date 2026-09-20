'use client';

import React from 'react';

export function BrandMarquee() {
  const items = [
    "✦ THERE'S NO PARTY LIKE A RIDGEWELLS PARTY",
    "✦ CELEBRATING DISTINCTIVE EVENTS SINCE 1928",
    "✦ EXCLUSIVE CATERER & MANAGER OF ANDREW W. MELLON AUDITORIUM",
    "✦ ARTISANAL CULINARY DESIGN BY EXECUTIVE CHEF KASHIF BROWNE",
    "✦ MAJOR SPORTING HOSPITALITY — US OPEN CHAMPIONSHIP",
    "✦ BESPOKE TASTING SUITES AT 5522 DORSEY LANE BETHESDA",
  ];

  return (
    <div style={{
      backgroundColor: '#592367',
      color: '#FFFFFF',
      overflow: 'hidden',
      padding: '14px 0',
      borderTop: '1px solid rgba(255, 255, 255, 0.2)',
      borderBottom: '1px solid rgba(255, 255, 255, 0.2)',
      position: 'relative',
      userSelect: 'none',
    }}>
      <div className="animate-marquee" style={{ display: 'flex', gap: '36px', alignItems: 'center' }}>
        {[...items, ...items].map((text, idx) => (
          <div
            key={idx}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
              whiteSpace: 'nowrap',
              fontFamily: 'var(--font-sans)',
              fontSize: '12px',
              fontWeight: 700,
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color: idx % 2 === 0 ? '#FFFFFF' : '#F3EAF6',
            }}
          >
            <span>{text}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
