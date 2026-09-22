'use client';

import React from 'react';

export function InquiryConciergeSidebar() {
  return (
    <aside
      style={{
        position: 'sticky',
        top: '110px',
        backgroundColor: '#FFFFFF',
        border: '1px solid rgba(89, 35, 103, 0.14)',
        borderRadius: '4px',
        overflow: 'hidden',
        boxShadow: '0 8px 30px rgba(89, 35, 103, 0.05)',
      }}
    >
      {/* Top Heritage Header */}
      <div
        style={{
          backgroundColor: '#42164D',
          color: '#FFFFFF',
          padding: '18px 22px',
          borderBottom: '2px solid #C5A880',
        }}
      >
        <span
          style={{
            fontSize: '9.5px',
            fontWeight: 700,
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color: '#C5A880',
            display: 'block',
            marginBottom: '4px',
          }}
        >
          DIRECT CONCIERGE
        </span>
        <h4
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: '18px',
            fontWeight: 400,
            color: '#FFFFFF',
            margin: 0,
            letterSpacing: '-0.01em',
          }}
        >
          Prefer to Speak Directly?
        </h4>
      </div>

      {/* Direct Contact Details */}
      <div style={{ padding: '24px 22px' }}>
        <a
          href="tel:+13016521515"
          style={{
            display: 'block',
            fontSize: '23px',
            fontWeight: 400,
            fontFamily: 'var(--font-serif)',
            color: '#42164D',
            marginBottom: '4px',
            letterSpacing: '-0.01em',
            textDecoration: 'none',
          }}
        >
          (301) 652-1515
        </a>
        <p style={{ fontSize: '12px', color: '#736B79', margin: '0 0 16px 0', letterSpacing: '0.01em' }}>
          Monday – Friday, 9:00 AM – 5:00 PM EST
        </p>

        <div style={{ height: '1px', backgroundColor: 'rgba(89, 35, 103, 0.08)', margin: '16px 0' }} />

        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', fontSize: '13px', color: '#453E4B' }}>
          {/* Email */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#592367" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
              <rect width="20" height="16" x="2" y="4" rx="2" />
              <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
            </svg>
            <a href="mailto:info@ridgewells.com" style={{ color: '#592367', fontWeight: 600, textDecoration: 'none' }}>
              info@ridgewells.com
            </a>
          </div>

          {/* Bethesda Address */}
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#592367" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" style={{ marginTop: '2px', flexShrink: 0 }}>
              <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            <div style={{ lineHeight: 1.5 }}>
              <strong style={{ color: '#2F2834', fontWeight: 600 }}>Bethesda Showroom & Tasting Kitchen:</strong>
              <br />
              <span style={{ color: '#6A6270' }}>5522 Dorsey Lane, Bethesda, MD 20816</span>
            </div>
          </div>
        </div>

        <div style={{ height: '1px', backgroundColor: 'rgba(89, 35, 103, 0.08)', margin: '20px 0' }} />

        {/* White-Glove Editorial Guarantee */}
        <div style={{ backgroundColor: '#FAF6FA', padding: '14px 16px', borderRadius: '3px', border: '1px solid rgba(89, 35, 103, 0.08)' }}>
          <span
            style={{
              fontSize: '10px',
              fontWeight: 700,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: '#9F8055',
              display: 'block',
              marginBottom: '6px',
            }}
          >
            THE RIDGEWELLS STANDARD
          </span>
          <p
            style={{
              fontFamily: 'var(--font-editorial)',
              fontSize: '14px',
              fontStyle: 'italic',
              color: '#493E50',
              lineHeight: 1.55,
              margin: 0,
            }}
          >
            &ldquo;Celebrating distinctive events and timeless hospitality across the Capital for nearly a century.&rdquo;
          </p>
        </div>
      </div>
    </aside>
  );
}
