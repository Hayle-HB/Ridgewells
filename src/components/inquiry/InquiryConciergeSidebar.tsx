'use client';

import React from 'react';

export function InquiryConciergeSidebar() {
  return (
    <aside
      style={{
        position: 'sticky',
        top: '100px',
        backgroundColor: '#FFFFFF',
        border: '1px solid rgba(89, 35, 103, 0.14)',
        borderRadius: '3px',
        overflow: 'hidden',
        boxShadow: '0 8px 30px rgba(89, 35, 103, 0.05)',
      }}
    >
      {/* 1. Top Image Banner (Andrew W. Mellon Great Hall & Ridgewells Tasting Showcase) */}
      <div
        style={{
          position: 'relative',
          height: '180px',
          backgroundImage: `url('https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=85')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(180deg, rgba(42, 9, 50, 0.2) 0%, rgba(42, 9, 50, 0.75) 100%)',
          }}
        />

        {/* Established Badge */}
        <div style={{ position: 'absolute', top: '14px', left: '16px' }}>
          <span
            style={{
              backgroundColor: 'rgba(89, 35, 103, 0.85)',
              backdropFilter: 'blur(6px)',
              color: '#F7EFE4',
              border: '1px solid rgba(197, 168, 128, 0.5)',
              padding: '4px 10px',
              borderRadius: '2px',
              fontSize: '10px',
              fontWeight: 800,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
            }}
          >
            EST. 1928 • WASHINGTON DC
          </span>
        </div>

        {/* Caption Over Image */}
        <div style={{ position: 'absolute', bottom: '14px', left: '16px', right: '16px', color: '#FFFFFF' }}>
          <h4
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: '18px',
              fontWeight: 500,
              color: '#FFFFFF',
              lineHeight: 1.2,
              marginBottom: '2px',
            }}
          >
            Direct Concierge & Planning Desk
          </h4>
          <p style={{ fontSize: '11.5px', color: 'rgba(255, 255, 255, 0.88)' }}>
            Bethesda Flagship Showroom & Landmark Venues
          </p>
        </div>
      </div>

      {/* 2. Direct Concierge Hotline Box */}
      <div
        style={{
          padding: '24px',
          backgroundColor: '#FAF5FB',
          borderBottom: '1px solid rgba(89, 35, 103, 0.1)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
          <span className="pulse-dot" />
          <span
            style={{
              fontSize: '11px',
              fontWeight: 800,
              letterSpacing: '0.16em',
              textTransform: 'uppercase',
              color: '#592367',
            }}
          >
            SPEAK DIRECTLY WITH A DIRECTOR
          </span>
        </div>

        <a
          href="tel:+13016521515"
          style={{
            display: 'block',
            fontSize: '24px',
            fontWeight: 800,
            fontFamily: 'var(--font-serif)',
            color: '#592367',
            marginBottom: '6px',
            letterSpacing: '0.01em',
          }}
        >
          (301) 652-1515
        </a>

        <p style={{ fontSize: '12.5px', color: '#524C58', lineHeight: 1.5, marginBottom: '14px' }}>
          Monday through Friday, 9:00 AM – 5:30 PM EST. Private tastings & walkthroughs by appointment.
        </p>

        <a
          href="mailto:info@ridgewells.com"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            fontSize: '13px',
            fontWeight: 600,
            color: '#592367',
            textDecoration: 'underline',
          }}
        >
          <span>✉</span> info@ridgewells.com
        </a>
      </div>

      {/* 3. Bethesda Flagship Tasting Suites */}
      <div style={{ padding: '24px', borderBottom: '1px solid rgba(89, 35, 103, 0.08)' }}>
        <span
          style={{
            fontSize: '10px',
            fontWeight: 800,
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            color: '#9F8055',
            display: 'block',
            marginBottom: '6px',
          }}
        >
          FLAGSHIP SHOWROOM & TASTING ROOM
        </span>

        <h4
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: '17px',
            fontWeight: 600,
            color: '#592367',
            marginBottom: '6px',
          }}
        >
          5522 Dorsey Lane, Bethesda, MD
        </h4>

        <p style={{ fontSize: '13px', color: '#47434B', lineHeight: 1.6 }}>
          Join our culinary team for private chef tastings, custom tablescape mockups, and sommelier wine pairings.
        </p>
      </div>

      {/* 4. Credentials & Hallmarks */}
      <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '18px' }}>
        <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
          <span style={{ fontSize: '18px', color: '#592367', flexShrink: 0, marginTop: '2px' }}>🏛️</span>
          <div>
            <h5 style={{ fontSize: '13.5px', fontWeight: 700, color: '#181519', marginBottom: '2px' }}>
              Andrew W. Mellon Auditorium
            </h5>
            <p style={{ fontSize: '12.5px', color: '#524C58', lineHeight: 1.5 }}>
              Exclusive manager & caterer of Washington DC’s grandest neoclassical Great Hall on Constitution Ave.
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
          <span style={{ fontSize: '18px', color: '#592367', flexShrink: 0, marginTop: '2px' }}>👨‍🍳</span>
          <div>
            <h5 style={{ fontSize: '13.5px', fontWeight: 700, color: '#181519', marginBottom: '2px' }}>
              Executive Chef Kashif Browne
            </h5>
            <p style={{ fontSize: '12.5px', color: '#524C58', lineHeight: 1.5 }}>
              Former White House Sous Chef leading certified allergen isolation and seasonal Mid-Atlantic gastronomy.
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
          <span style={{ fontSize: '18px', color: '#592367', flexShrink: 0, marginTop: '2px' }}>⏱️</span>
          <div>
            <h5 style={{ fontSize: '13.5px', fontWeight: 700, color: '#181519', marginBottom: '2px' }}>
              1 Business Day Response
            </h5>
            <p style={{ fontSize: '12.5px', color: '#524C58', lineHeight: 1.5 }}>
              A dedicated Senior Catering Director is assigned to review your date and details upon submission.
            </p>
          </div>
        </div>
      </div>

      {/* 5. Bottom Brand Footnote */}
      <div
        style={{
          padding: '14px 24px',
          backgroundColor: '#FAF8F5',
          borderTop: '1px solid rgba(197, 168, 128, 0.3)',
          textAlign: 'center',
          fontSize: '11.5px',
          color: '#7A6448',
          fontWeight: 600,
          letterSpacing: '0.04em',
        }}
      >
        ✦ Ridgewells Hospitality Group • Nearly 100 Years of Excellence ✦
      </div>
    </aside>
  );
}
