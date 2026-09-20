'use client';

import React, { useState } from 'react';

export function Footer() {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setIsSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer id="footer-contact" style={{ backgroundColor: '#592367', color: '#FFFFFF', overflow: 'hidden' }}>
      {/* 1. NEWSLETTER & MAILING LIST CARD */}
      <div style={{ padding: 'clamp(48px, 7vw, 80px) clamp(16px, 4vw, 36px) clamp(36px, 5vw, 60px)' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          {/* Top Brand Contact Summary */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              flexWrap: 'wrap',
              gap: '24px',
              marginBottom: 'clamp(32px, 5vw, 48px)',
            }}
          >
            {/* Wordmark */}
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: 'clamp(32px, 5vw, 44px)',
                  fontWeight: 700,
                  letterSpacing: '-0.02em',
                  color: '#FFFFFF',
                  lineHeight: 1,
                }}
              >
                ridgewells
              </span>
              <span
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '10px',
                  fontWeight: 800,
                  letterSpacing: '0.36em',
                  textTransform: 'uppercase',
                  color: '#FAF5FC',
                  marginTop: '6px',
                  opacity: 0.95,
                }}
              >
                CATERING
              </span>
            </div>

            {/* Quick Bethesda Info */}
            <div
              style={{
                fontSize: '14px',
                lineHeight: 1.7,
                fontWeight: 600,
              }}
            >
              <p style={{ color: '#FFFFFF' }}>5522 Dorsey Ln, Bethesda, MD 20816</p>
              <p>
                <a href="mailto:info@ridgewells.com" style={{ color: '#FAF5FC' }}>
                  info@ridgewells.com
                </a>
              </p>
              <p>
                <a href="tel:+13016521515" style={{ color: '#FAF5FC' }}>
                  (301) 652-1515
                </a>
              </p>
            </div>
          </div>

          {/* Floating White Mailing List Card */}
          <div
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '10px',
              color: '#181519',
              padding: 'clamp(24px, 5vw, 56px)',
              boxShadow: '0 20px 50px rgba(0, 0, 0, 0.25)',
            }}
          >
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))',
                gap: 'clamp(24px, 4vw, 64px)',
                alignItems: 'center',
                marginBottom: '32px',
              }}
            >
              {/* Left Headline */}
              <div>
                <h3
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: 'clamp(24px, 3.4vw, 40px)',
                    fontWeight: 400,
                    color: '#181519',
                    lineHeight: 1.2,
                  }}
                >
                  Curious what we’ve got cooking up next? Join our mailing list.
                </h3>
              </div>

              {/* Right Form */}
              <div>
                <p style={{ fontSize: '14.5px', color: '#47434B', lineHeight: 1.6, marginBottom: '18px' }}>
                  Be among the first to hear about the latest news, menu releases, and special seasonal offerings.
                </p>

                {isSubscribed ? (
                  <div
                    style={{
                      backgroundColor: '#FAF5FB',
                      border: '1px solid #592367',
                      color: '#592367',
                      padding: '12px 18px',
                      borderRadius: '4px',
                      fontSize: '13.5px',
                      fontWeight: 600,
                    }}
                  >
                    ✓ Thank you for joining the Ridgewells Catering mailing list!
                  </div>
                ) : (
                  <form onSubmit={handleSubscribe}>
                    <label style={{ display: 'block', fontSize: '11.5px', color: '#592367', fontWeight: 600, marginBottom: '6px' }}>
                      Enter Your Email *
                    </label>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                      <input
                        type="email"
                        required
                        placeholder="your@email.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        style={{
                          width: '100%',
                          padding: '12px 14px',
                          borderRadius: '4px',
                          border: '1.5px solid #592367',
                          fontSize: '16px',
                          outline: 'none',
                        }}
                      />
                      <button
                        type="submit"
                        className="btn-luxury-purple"
                        style={{ padding: '12px 28px', fontSize: '12px', alignSelf: 'flex-start' }}
                      >
                        JOIN
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>

            {/* Social Icons inside card */}
            <div
              style={{
                borderTop: '1px solid rgba(89, 35, 103, 0.12)',
                paddingTop: '18px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '14px',
                fontSize: '12.5px',
                color: '#736D78',
              }}
            >
              <div style={{ display: 'flex', gap: '16px', color: '#181519' }}>
                <a href="https://instagram.com" target="_blank" rel="noreferrer" title="Instagram" style={{ color: '#181519', opacity: 0.85 }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>
                <a href="https://facebook.com" target="_blank" rel="noreferrer" title="Facebook" style={{ color: '#181519', opacity: 0.85 }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z"/>
                  </svg>
                </a>
                <a href="https://linkedin.com" target="_blank" rel="noreferrer" title="LinkedIn" style={{ color: '#181519', opacity: 0.85 }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                  </svg>
                </a>
                <a href="https://pinterest.com" target="_blank" rel="noreferrer" title="Pinterest" style={{ color: '#181519', opacity: 0.85 }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0c-6.627 0-12 5.372-12 12 0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345-.09.375-.291 1.199-.332 1.365-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146 1.124.347 2.317.535 3.554.535 6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z"/>
                  </svg>
                </a>
                <a href="https://tiktok.com" target="_blank" rel="noreferrer" title="TikTok" style={{ color: '#181519', opacity: 0.85 }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
                  </svg>
                </a>
              </div>

              <p>© {new Date().getFullYear()} by Ridgewells Catering. All Rights Reserved.</p>
            </div>
          </div>
        </div>
      </div>

      {/* 2. RICH 4-COLUMN LUXURY FOOTER */}
      <div
        style={{
          backgroundColor: '#42164D',
          borderTop: '1px solid rgba(255, 255, 255, 0.12)',
          padding: 'clamp(48px, 6vw, 72px) clamp(16px, 4vw, 36px) clamp(24px, 4vw, 36px)',
        }}
      >
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 220px), 1fr))',
              gap: 'clamp(28px, 4vw, 48px)',
              marginBottom: 'clamp(36px, 5vw, 56px)',
            }}
          >
            {/* Col 1: Heritage & Story */}
            <div>
              <span
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: '28px',
                  fontWeight: 700,
                  letterSpacing: '-0.02em',
                  color: '#FFFFFF',
                  display: 'block',
                  lineHeight: 1,
                  marginBottom: '4px',
                }}
              >
                ridgewells
              </span>
              <span
                style={{
                  fontSize: '9px',
                  fontWeight: 800,
                  letterSpacing: '0.36em',
                  textTransform: 'uppercase',
                  color: '#FAF5FC',
                  display: 'block',
                  marginBottom: '14px',
                  opacity: 0.9,
                }}
              >
                CATERING • EST. 1928
              </span>
              <p style={{ fontSize: '13px', lineHeight: 1.7, color: 'rgba(255, 255, 255, 0.85)', marginBottom: '14px' }}>
                Celebrating 98 years of landmark hospitality, culinary mastery, and distinctive celebrations across Washington DC, Maryland, and Virginia.
              </p>
              <p style={{ fontSize: '13px', color: '#FFFFFF' }}>
                <strong>Direct Line:</strong>{' '}
                <a href="tel:+13016521515" style={{ color: '#FFFFFF', textDecoration: 'underline' }}>
                  (301) 652-1515
                </a>
              </p>
            </div>

            {/* Col 2: Divisions & Services */}
            <div>
              <h4
                style={{
                  fontSize: '11.5px',
                  fontWeight: 700,
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  color: '#FAF5FC',
                  marginBottom: '16px',
                }}
              >
                Event Divisions
              </h4>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '13px' }}>
                <li><a href="#corporate" style={{ color: 'rgba(255, 255, 255, 0.85)' }}>Corporate Events & Galas</a></li>
                <li><a href="#weddings" style={{ color: 'rgba(255, 255, 255, 0.85)' }}>Weddings & Celebrations</a></li>
                <li><a href="#social" style={{ color: 'rgba(255, 255, 255, 0.85)' }}>Social & Milestone Gatherings</a></li>
                <li><a href="#major-events" style={{ color: 'rgba(255, 255, 255, 0.85)' }}>Major Sporting Events (USGA)</a></li>
                <li><a href="#culinary" style={{ color: 'rgba(255, 255, 255, 0.85)' }}>The Party Kitchen & Menus</a></li>
              </ul>
            </div>

            {/* Col 3: Landmark Venues */}
            <div>
              <h4
                style={{
                  fontSize: '11.5px',
                  fontWeight: 700,
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  color: '#FAF5FC',
                  marginBottom: '16px',
                }}
              >
                Landmark Venues
              </h4>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '13px' }}>
                <li><a href="#venues" style={{ color: 'rgba(255, 255, 255, 0.85)' }}>Andrew W. Mellon Auditorium</a></li>
                <li><a href="#venues" style={{ color: 'rgba(255, 255, 255, 0.85)' }}>Decatur House on Lafayette Square</a></li>
                <li><a href="#venues" style={{ color: 'rgba(255, 255, 255, 0.85)' }}>Anderson House (Embassy Row)</a></li>
                <li><a href="#venues" style={{ color: 'rgba(255, 255, 255, 0.85)' }}>Smithsonian Institution Museums</a></li>
                <li><a href="#showroom" style={{ color: 'rgba(255, 255, 255, 0.85)' }}>Bethesda Tasting Showroom</a></li>
              </ul>
            </div>

            {/* Col 4: Location & Desks */}
            <div>
              <h4
                style={{
                  fontSize: '11.5px',
                  fontWeight: 700,
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  color: '#FAF5FC',
                  marginBottom: '16px',
                }}
              >
                Bethesda Headquarters
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '13px', lineHeight: 1.6 }}>
                <div>
                  <strong>Tasting Suites & Kitchens:</strong>
                  <p style={{ color: 'rgba(255, 255, 255, 0.85)' }}>5522 Dorsey Lane, Bethesda, MD 20816</p>
                </div>
                <div>
                  <strong>Hours of Operation:</strong>
                  <p style={{ color: 'rgba(255, 255, 255, 0.85)' }}>Mon – Fri: 9:00 AM – 5:30 PM</p>
                </div>
                <div>
                  <strong>Direct Inquiries:</strong>
                  <p><a href="mailto:info@ridgewells.com" style={{ color: '#FFFFFF', textDecoration: 'underline' }}>info@ridgewells.com</a></p>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Legal & Copyright Bar */}
          <div
            style={{
              borderTop: '1px solid rgba(255, 255, 255, 0.15)',
              paddingTop: '20px',
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: '12px',
              fontSize: '11.5px',
              color: 'rgba(255, 255, 255, 0.7)',
            }}
          >
            <p>© {new Date().getFullYear()} Ridgewells Catering. All Rights Reserved. Celebrating Since 1928.</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
              <span>Privacy Policy</span>
              <span>Terms of Service</span>
              <span>Allergen Protocols</span>
              <span>Bethesda, MD</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
