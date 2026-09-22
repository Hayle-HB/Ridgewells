'use client';

import React from 'react';

export function InquiryConciergeSidebar() {
  return (
    <aside
      style={{
        position: 'sticky',
        top: '110px',
        backgroundColor: '#FFFFFF',
        border: '1px solid #E5E5E5',
        overflow: 'hidden',
      }}
    >
      {/* Top Header */}
      <div
        style={{
          backgroundColor: '#000000',
          color: '#FFFFFF',
          padding: '16px 20px',
        }}
      >
        <span
          style={{
            fontSize: '9px',
            fontWeight: 700,
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color: '#AAAAAA',
            display: 'block',
            marginBottom: '4px',
          }}
        >
          DIRECT CONCIERGE
        </span>
        <h4
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: '17px',
            fontWeight: 400,
            color: '#FFFFFF',
            margin: 0,
            letterSpacing: '-0.01em',
          }}
        >
          Speak With Our Team
        </h4>
      </div>

      {/* Direct Contact Details */}
      <div style={{ padding: '22px 20px', backgroundColor: '#FFFFFF' }}>
        <a
          href="tel:+13016521515"
          style={{
            display: 'block',
            fontSize: '22px',
            fontWeight: 400,
            fontFamily: 'var(--font-serif)',
            color: '#000000',
            marginBottom: '4px',
            letterSpacing: '-0.01em',
            textDecoration: 'none',
          }}
        >
          (301) 652-1515
        </a>
        <p style={{ fontSize: '11.5px', color: '#666666', margin: '0 0 16px 0', letterSpacing: '0.01em' }}>
          Monday – Friday, 9:00 AM – 5:00 PM EST
        </p>

        <div style={{ height: '1px', backgroundColor: '#EBEBEB', margin: '16px 0' }} />

        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', fontSize: '13px', color: '#222222' }}>
          {/* Email */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#000000" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
              <rect width="20" height="16" x="2" y="4" rx="2" />
              <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
            </svg>
            <a href="mailto:info@ridgewells.com" style={{ color: '#000000', fontWeight: 600, textDecoration: 'none' }}>
              info@ridgewells.com
            </a>
          </div>

          {/* Bethesda Address */}
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#000000" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" style={{ marginTop: '2px', flexShrink: 0 }}>
              <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            <div style={{ lineHeight: 1.5 }}>
              <strong style={{ color: '#000000', fontWeight: 600 }}>Bethesda Tasting Kitchen:</strong>
              <br />
              <span style={{ color: '#555555' }}>5522 Dorsey Lane, Bethesda, MD 20816</span>
            </div>
          </div>
        </div>

        <div style={{ height: '1px', backgroundColor: '#EBEBEB', margin: '18px 0' }} />

        {/* Minimalist Black & White Guarantee Note */}
        <div style={{ backgroundColor: '#FFFFFF', padding: '14px 16px', border: '1px solid #E5E5E5' }}>
          <span
            style={{
              fontSize: '9.5px',
              fontWeight: 700,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: '#000000',
              display: 'block',
              marginBottom: '6px',
            }}
          >
            THE RIDGEWELLS STANDARD
          </span>
          <p
            style={{
              fontFamily: 'var(--font-editorial)',
              fontSize: '13.5px',
              fontStyle: 'italic',
              color: '#444444',
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
