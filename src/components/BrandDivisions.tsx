'use client';

import React from 'react';
import { SectionHeader, EditorialSpread } from './ui';

interface BrandDivisionsProps {
  onOpenInquiry: (initialData?: { eventType?: string; venue?: string; guests?: number }) => void;
}

export function BrandDivisions({ onOpenInquiry }: BrandDivisionsProps) {
  const sections = [
    {
      id: 'corporate',
      eyebrow: 'BESPOKE HOSPITALITY & DIPLOMATIC PROTOCOLS',
      title: 'Corporate Events & Galas',
      description:
        'From high-profile international summits and ambassadorial dinners to corporate galas and non-profit fundraisers, Ridgewells orchestrates seamless dining with white-glove precision and turnkey staging.',
      image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1600&q=85',
      imageAlt: 'Corporate Event Ballroom with Architectural Lighting',
      ctaText: 'Inquire for Corporate Event',
      eventType: 'CORPORATE',
      venue: 'Andrew W. Mellon Auditorium',
      guests: 250,
      reversed: false,
    },
    {
      id: 'weddings',
      eyebrow: 'ROMANTIC MILESTONES & CELEBRATIONS',
      title: 'Weddings & Celebrations',
      description:
        'Every love story is unique. We collaborate closely with couples to design custom menus, curated beverage pairings, and breathtaking tablescapes crafted with culinary excellence at our Bethesda tasting showroom.',
      image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1600&q=85',
      imageAlt: 'Romantic Luxury Wedding Dinner Reception',
      ctaText: 'Plan Your Wedding',
      eventType: 'WEDDING',
      venue: 'Decatur House on Lafayette Square',
      guests: 150,
      reversed: true,
    },
    {
      id: 'major-events',
      eyebrow: 'CHAMPIONSHIP PRECISION & SCALE',
      title: 'Major Sporting Events',
      description:
        'Trusted by the world’s most prestigious sports organizations, including the USGA (124th U.S. Open Championship), Preakness Stakes, and motorsport invitationals catering to thousands of VIP guests.',
      image: 'https://images.unsplash.com/photo-1535131749006-b7f58c99034b?auto=format&fit=crop&w=1600&q=85',
      imageAlt: 'Championship Sporting Event Hospitality Pavilion',
      ctaText: 'Inquire for Major Tournament',
      eventType: 'MAJOR_EVENT',
      venue: 'Championship Pavilion',
      guests: 500,
      reversed: false,
    },
    {
      id: 'social',
      eyebrow: 'INTIMATE GATHERINGS & SPECIAL OCCASIONS',
      title: 'Social Gatherings & Milestones',
      description:
        'Anniversary milestones, birthday soirees, private estate dinners, and festive holiday celebrations elevated by innovative seasonal cuisine and gracious hospitality.',
      image: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=1600&q=85',
      imageAlt: 'Intimate Social Dinner Tablescape with Wine Glasses',
      ctaText: 'Plan a Social Celebration',
      eventType: 'GALA_SOCIAL',
      venue: 'Private Estate / Tented Lawn',
      guests: 80,
      reversed: true,
    },
  ];

  return (
    <section id="heritage-about" style={{ backgroundColor: '#FFFFFF', padding: '100px 0' }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 36px' }}>
        {/* Reusable Section Lead Header */}
        <SectionHeader
          badge="ABOUT RIDGEWELLS • CELEBRATING SINCE 1928"
          title="Distinctive Excellence for Every Occasion"
          subtitle="Nearly a century of culinary craftsmanship, landmark venue expertise, and tailored hospitality across the Capital region and beyond."
        />

        {/* Reusable Editorial Spreads */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '100px' }}>
          {sections.map((sec) => (
            <EditorialSpread
              key={sec.id}
              id={sec.id}
              eyebrow={sec.eyebrow}
              title={sec.title}
              description={sec.description}
              image={sec.image}
              imageAlt={sec.imageAlt}
              reversed={sec.reversed}
              ctaText={sec.ctaText}
              ctaVariant="purple"
              onCtaClick={() => onOpenInquiry({
                eventType: sec.eventType,
                venue: sec.venue,
                guests: sec.guests,
              })}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
