'use client';

import React from 'react';
import { Button, Badge } from './ui';

interface CulinarySectionProps {
  onOpenInquiry: (initialData?: { eventType?: string; venue?: string; guests?: number }) => void;
}

export function CulinarySection({ onOpenInquiry }: CulinarySectionProps) {
  return (
    <section
      id="culinary"
      style={{
        backgroundColor: '#FAF5FB',
        padding: 'clamp(64px, 8vw, 120px) 0',
        borderTop: '1px solid rgba(89, 35, 103, 0.08)',
        borderBottom: '1px solid rgba(89, 35, 103, 0.08)',
      }}
    >
      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 clamp(16px, 4vw, 36px)' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))',
            gap: 'clamp(36px, 6vw, 80px)',
            alignItems: 'center',
          }}
        >
          {/* Left Column: Michelin-Caliber Gourmet Plating Photograph */}
          <div
            className="image-zoom-container"
            style={{
              borderRadius: '4px',
              overflow: 'hidden',
              height: 'clamp(320px, 48vw, 580px)',
              boxShadow: 'var(--shadow-card)',
              position: 'relative',
            }}
          >
            <div
              className="zoom-bg"
              style={{
                width: '100%',
                height: '100%',
                backgroundImage: `url('https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1600&q=90')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
              role="img"
              aria-label="Executive Chef Kashif Browne Michelin-Caliber Plating"
            />
            {/* Luxury caption overlay */}
            <div
              style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                padding: 'clamp(18px, 3vw, 28px)',
                background: 'linear-gradient(180deg, transparent 0%, rgba(42, 9, 50, 0.88) 100%)',
                color: '#FFFFFF',
              }}
            >
              <p style={{ fontSize: '10.5px', textTransform: 'uppercase', letterSpacing: '0.18em', color: '#FAF5FC', fontWeight: 700 }}>
                CULINARY DIRECTION
              </p>
              <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(18px, 2.5vw, 22px)', fontWeight: 400, marginTop: '2px' }}>
                Executive Chef Kashif Browne
              </h4>
              <p style={{ fontSize: '12px', color: 'rgba(255, 255, 255, 0.88)', marginTop: '2px' }}>
                Former Executive Sous Chef at the White House
              </p>
            </div>
          </div>

          {/* Right Column: Culinary Philosophy & Formats */}
          <div>
            <div style={{ marginBottom: '16px' }}>
              <Badge variant="purple">
                HOW DO WE MAKE MAGIC HAPPEN?
              </Badge>
            </div>

            <h2
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(30px, 4.2vw, 48px)',
                fontWeight: 400,
                color: '#592367',
                lineHeight: 1.16,
                marginBottom: '20px',
              }}
            >
              Passion for Celebration & Culinary Mastery
            </h2>

            <p
              style={{
                fontSize: 'clamp(14.5px, 1.6vw, 16px)',
                lineHeight: 1.8,
                color: '#47434B',
                marginBottom: '28px',
              }}
            >
              Under the culinary direction of Executive Chef Kashif Browne, Ridgewells creates restaurant-caliber menus inspired by seasonal mid-Atlantic agriculture, global flavor profiles, and theatrical presentation.
            </p>

            {/* Service Formats List */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '14px',
                marginBottom: '32px',
              }}
            >
              {[
                { title: 'Plated Multi-Course Dinners', desc: 'Synchronized white-glove service with sommelier wine pairings.' },
                { title: 'Artisanal Passed Hors d’oeuvres', desc: 'Sculptural bite-sized flavor compositions for cocktail hours.' },
                { title: 'Interactive Chef Theatres', desc: 'Live seared Chesapeake rockfish, carving boards, and pasta wheels.' },
                { title: 'Pastry Arts & Flambé Displays', desc: 'Valrhona chocolate spheres, French macarons, and flambé stations.' },
              ].map((item, idx) => (
                <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                  <span style={{ color: '#592367', fontSize: '14px', marginTop: '2px' }}>✦</span>
                  <div>
                    <h4 style={{ fontSize: '14.5px', fontWeight: 700, color: '#592367' }}>
                      {item.title}
                    </h4>
                    <p style={{ fontSize: '12.5px', color: '#736D78', lineHeight: 1.5 }}>
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Allergen Protocol Note */}
            <div
              style={{
                backgroundColor: '#FFFFFF',
                border: '1px solid rgba(89, 35, 103, 0.12)',
                borderRadius: '4px',
                padding: '16px 20px',
                marginBottom: '32px',
              }}
            >
              <p style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#592367', marginBottom: '6px' }}>
                Allergen Isolation & Dietary Inclusivity:
              </p>
              <p style={{ fontSize: '13px', color: '#47434B', lineHeight: 1.6 }}>
                Certified dedicated preparation protocols for Gluten-Free, Plant-Based Vegan, Kosher-Style, and Halal-Friendly dining.
              </p>
            </div>

            <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap', alignItems: 'center' }}>
              <Button
                variant="purple"
                arrow
                onClick={() => onOpenInquiry({ eventType: 'TASTING' })}
              >
                Schedule Bethesda Tasting Suite
              </Button>
              <a
                href="https://ridgewellscatering.gethoneycart.com/"
                target="_blank"
                rel="noopener noreferrer"
                style={{ textDecoration: 'none' }}
              >
                <Button variant="outline">
                  Browse Catering Menus ↗
                </Button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
