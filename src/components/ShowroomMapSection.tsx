'use client';

import React from 'react';
import { Button, Badge } from './ui';

interface ShowroomMapSectionProps {
  onOpenInquiry: (initialData?: { eventType?: string; venue?: string; guests?: number }) => void;
}

export function ShowroomMapSection({ onOpenInquiry }: ShowroomMapSectionProps) {
  return (
    <section
      id="showroom"
      style={{
        backgroundColor: '#FFFFFF',
        padding: 'clamp(64px, 8vw, 120px) 0',
        borderTop: '1px solid rgba(89, 35, 103, 0.08)',
      }}
    >
      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 clamp(16px, 4vw, 36px)' }}>
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: 'clamp(36px, 6vw, 72px)' }}>
          <div style={{ marginBottom: '14px' }}>
            <Badge variant="purple">
              HEADQUARTERS & TASTING SUITES • BETHESDA, MD
            </Badge>
          </div>
          <h2
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(30px, 4.5vw, 50px)',
              fontWeight: 400,
              color: '#592367',
              lineHeight: 1.15,
              marginTop: '8px',
            }}
          >
            The Bethesda Tasting Suites
          </h2>
          <div
            style={{
              width: '60px',
              height: '2px',
              backgroundColor: '#592367',
              margin: '20px auto 0',
              opacity: 0.3,
            }}
          />
        </div>

        {/* 2-Column Luxury Editorial Spread */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))',
            gap: 'clamp(36px, 6vw, 80px)',
            alignItems: 'center',
          }}
        >
          {/* Left Column: Tasting Room & Showroom Experience */}
          <div>
            <span
              style={{
                fontSize: '11px',
                fontWeight: 800,
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: '#592367',
                opacity: 0.85,
                display: 'block',
                marginBottom: '12px',
              }}
            >
              FLAGSHIP LOCATION & OPERATIONS
            </span>

            <h3
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(26px, 3.5vw, 38px)',
                fontWeight: 400,
                color: '#592367',
                lineHeight: 1.2,
                marginBottom: '18px',
              }}
            >
              5522 Dorsey Lane, Bethesda
            </h3>

            <p
              style={{
                fontSize: 'clamp(14.5px, 1.6vw, 16px)',
                lineHeight: 1.8,
                color: '#47434B',
                marginBottom: '28px',
              }}
            >
              Located just outside the Capital in Bethesda, Maryland, our state-of-the-art culinary kitchens and private design suites host hosts and couples for customized tasting sessions, tablescape mockups, and wine pairings.
            </p>

            {/* Clean Spec List */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '16px',
                marginBottom: '32px',
                paddingBottom: '24px',
                borderBottom: '1px solid rgba(89, 35, 103, 0.12)',
              }}
            >
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <span style={{ fontSize: '10.5px', fontWeight: 800, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#736D78' }}>
                  Address
                </span>
                <p style={{ fontSize: '14.5px', color: '#181519', fontWeight: 500 }}>
                  5522 Dorsey Lane, Bethesda, MD 20816
                </p>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <span style={{ fontSize: '10.5px', fontWeight: 800, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#736D78' }}>
                  Private Tasting Hours
                </span>
                <p style={{ fontSize: '14.5px', color: '#181519', fontWeight: 500 }}>
                  Monday – Friday: 9:00 AM – 5:30 PM (By Appointment)
                </p>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <span style={{ fontSize: '10.5px', fontWeight: 800, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#736D78' }}>
                  Direct Concierge Line
                </span>
                <p style={{ fontSize: '14.5px', color: '#592367', fontWeight: 700 }}>
                  <a href="tel:+13016521515" style={{ color: '#592367' }}>(301) 652-1515</a> • <a href="mailto:info@ridgewells.com" style={{ color: '#592367' }}>info@ridgewells.com</a>
                </p>
              </div>
            </div>

            <Button
              variant="purple"
              arrow
              onClick={() => onOpenInquiry({ eventType: 'TASTING', venue: 'Bethesda Showroom' })}
            >
              Schedule a Tasting Suite Appointment
            </Button>
          </div>

          {/* Right Column: Google Maps Embed in High-End Architectural Frame */}
          <div
            style={{
              position: 'relative',
              borderRadius: '4px',
              overflow: 'hidden',
              boxShadow: 'var(--shadow-card)',
              border: '1px solid rgba(89, 35, 103, 0.16)',
              height: 'clamp(320px, 45vw, 520px)',
              backgroundColor: '#FAF5FB',
              width: '100%',
            }}
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d652.117324042817!2d-77.10198335364979!3d38.96484105800779!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89b7c988093b5029%3A0x30fc61ea3ad93d9e!2s5510%20Dorsey%20Ln%2C%20Bethesda%2C%20MD%2020816!5e1!3m2!1sen!2sus!4v1789724061114!5m2!1sen!2sus"
              width="100%"
              height="100%"
              style={{
                border: 0,
                width: '100%',
                height: '100%',
                display: 'block',
              }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="strict-origin-when-cross-origin"
              title="Ridgewells Catering Bethesda Location Map"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
