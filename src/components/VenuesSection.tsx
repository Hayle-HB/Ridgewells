'use client';

import React from 'react';
import { SectionHeader, Button, Badge, ImageCard } from './ui';

interface VenuesSectionProps {
  onOpenInquiry: (initialData?: { eventType?: string; venue?: string; guests?: number }) => void;
}

export function VenuesSection({ onOpenInquiry }: VenuesSectionProps) {
  const secondaryVenues = [
    {
      name: 'Decatur House on Lafayette Square',
      eyebrow: 'HISTORIC LAFAYETTE SQUARE',
      categoryBadge: 'FEDERAL TOWNHOUSE',
      address: '748 Jackson Pl NW, Washington, DC',
      capacity: 'Up to 250 Guests',
      image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=85',
      desc: 'Historic Federal townhouse and heated tented brick courtyard steps from the White House, perfect for intimate galas and weddings.',
      features: ['White House Proximity', 'Heated Brick Courtyard', 'Historic Preservation'],
    },
    {
      name: 'Anderson House on Embassy Row',
      eyebrow: 'EMBASSY ROW • DUPONT CIRCLE',
      categoryBadge: 'GILDED AGE MANSION',
      address: '2118 Massachusetts Ave NW, Washington, DC',
      capacity: 'Up to 350 Guests',
      image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=85',
      desc: 'Embassy Row Gilded Age mansion with Florentine marble staircases, soaring gilded ballrooms, and reflecting pool garden.',
      features: ['Florentine Marble', 'Gilded Ballroom', 'Reflecting Pool Garden'],
    },
    {
      name: 'Smithsonian Institution Museums',
      eyebrow: 'NATIONAL MALL • MONUMENTAL AXIS',
      categoryBadge: 'GLASS ATRIUM',
      address: 'National Mall, Washington, DC',
      capacity: 'Up to 1,500 Guests',
      image: 'https://images.unsplash.com/photo-1568832359672-e36cf5d74f54?auto=format&fit=crop&w=1200&q=85',
      desc: 'Monumental glass atriums and iconic national art galleries along the National Mall for high-profile summits and milestone receptions.',
      features: ['Undulating Glass Canopy', 'National Art Galleries', 'VIP Mall Access'],
    },
  ];

  return (
    <section
      id="venues"
      style={{
        backgroundColor: '#FFFFFF',
        padding: 'clamp(64px, 8vw, 120px) 0',
      }}
    >
      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 clamp(16px, 4vw, 36px)' }}>
        {/* Reusable Section Header */}
        <SectionHeader
          badge="ICONIC WASHINGTON DC ADDRESSES"
          title="Landmark Venues & Stewardship"
          subtitle="From exclusive management of the Andrew W. Mellon Auditorium to historic Gilded Age estates, we unlock the Capital’s most prestigious architectural treasures."
        />

        {/* Featured Masterpiece: Andrew W. Mellon Auditorium */}
        <div
          style={{
            backgroundColor: '#FAF5FB',
            border: '1px solid rgba(89, 35, 103, 0.15)',
            borderRadius: '4px',
            overflow: 'hidden',
            marginBottom: 'clamp(40px, 6vw, 64px)',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))',
            alignItems: 'center',
            boxShadow: 'var(--shadow-card)',
          }}
        >
          {/* Photo */}
          <div
            className="image-zoom-container"
            style={{
              height: 'clamp(280px, 45vw, 520px)',
              position: 'relative',
            }}
          >
            <div
              className="zoom-bg"
              style={{
                width: '100%',
                height: '100%',
                backgroundImage: `url('https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1600&q=85')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
              role="img"
              aria-label="Andrew W. Mellon Auditorium Monumental Great Hall"
            />
            <div style={{ position: 'absolute', top: '16px', left: '16px' }}>
              <Badge variant="purple">
                ✦ EXCLUSIVE RIDGEWELLS MANAGER & CATERER
              </Badge>
            </div>
          </div>

          {/* Description */}
          <div style={{ padding: 'clamp(24px, 5vw, 64px)' }}>
            <span
              style={{
                fontSize: '11px',
                fontWeight: 800,
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: '#592367',
                opacity: 0.85,
                display: 'block',
                marginBottom: '10px',
              }}
            >
              THE MONUMENTAL GREAT HALL
            </span>

            <h3
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(26px, 3.5vw, 38px)',
                fontWeight: 400,
                color: '#592367',
                lineHeight: 1.2,
                marginBottom: '14px',
              }}
            >
              Andrew W. Mellon Auditorium
            </h3>

            <p style={{ fontSize: '13px', color: '#736D78', marginBottom: '18px', fontWeight: 600 }}>
              📍 1301 Constitution Avenue NW, Washington, DC 20240
            </p>

            <p style={{ fontSize: '14.5px', lineHeight: 1.75, color: '#47434B', marginBottom: '24px' }}>
              A soaring neoclassical masterpiece on Constitution Avenue. Featuring 65-foot gilded ceilings, fluted limestone Doric columns, and marble floors. Ridgewells is the Exclusive Manager and Caterer.
            </p>

            {/* Capacity Metrics */}
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '24px',
                marginBottom: '32px',
                paddingBottom: '20px',
                borderBottom: '1px solid rgba(89, 35, 103, 0.12)',
              }}
            >
              <div>
                <p style={{ fontSize: '10.5px', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#736D78', fontWeight: 700 }}>
                  Seated Banquet
                </p>
                <p style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(22px, 2.5vw, 26px)', fontWeight: 700, color: '#592367', marginTop: '2px' }}>
                  696 Guests
                </p>
              </div>
              <div className="desktop-only" style={{ width: '1px', backgroundColor: 'rgba(89, 35, 103, 0.15)' }} />
              <div>
                <p style={{ fontSize: '10.5px', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#736D78', fontWeight: 700 }}>
                  Standing Reception
                </p>
                <p style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(22px, 2.5vw, 26px)', fontWeight: 700, color: '#592367', marginTop: '2px' }}>
                  1,000 Guests
                </p>
              </div>
            </div>

            <Button
              variant="purple"
              arrow
              onClick={() => onOpenInquiry({
                eventType: 'GALA_SOCIAL',
                venue: 'Andrew W. Mellon Auditorium',
                guests: 350,
              })}
            >
              Inquire for Mellon Auditorium
            </Button>
          </div>
        </div>

        {/* 3 Secondary Venues Grid (Using Reusable ImageCard Components) */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))',
            gap: 'clamp(24px, 4vw, 36px)',
          }}
        >
          {secondaryVenues.map((v, i) => (
            <ImageCard
              key={i}
              image={v.image}
              imageAlt={v.name}
              title={v.name}
              eyebrow={v.eyebrow}
              categoryBadge={v.categoryBadge}
              capacityBadge={v.capacity}
              address={v.address}
              description={v.desc}
              features={v.features}
              ctaText="Check Date Availability"
              ctaVariant="outline"
              onCtaClick={() => onOpenInquiry({ venue: v.name })}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
