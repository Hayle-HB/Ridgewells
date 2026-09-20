'use client';

import React from 'react';
import { Navbar } from '../../components/Navbar';
import { Footer } from '../../components/Footer';
import { LiveConciergeWidget } from '../../components/concierge-widget/LiveConciergeWidget';
import { BespokeInquiryForm } from '../../components/inquiry/BespokeInquiryForm';
import { InquiryConciergeSidebar } from '../../components/inquiry/InquiryConciergeSidebar';
import { ParallaxRevealSection } from '../../components/ParallaxRevealSection';

export default function InquirePage() {
  return (
    <main style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: '#FFFFFF' }}>
      {/* 1. Header & Navigation */}
      <Navbar onOpenInquiry={() => window.scrollTo({ top: 400, behavior: 'smooth' })} />

      {/* 2. Top Hero Photo Banner (Authentic Ridgewells Candlelit Dinner Toast) */}
      <div
        style={{
          width: '100%',
          height: 'clamp(280px, 35vw, 440px)',
          backgroundImage: `url('https://static.wixstatic.com/media/313fa1_4896d24048fd41e5b4e093be7d56c4e4~mv2.jpg/v1/fill/w_1920,h_750,q_90/313fa1_4896d24048fd41e5b4e093be7d56c4e4~mv2.jpg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center 40%',
          position: 'relative',
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(180deg, rgba(0,0,0,0.15) 0%, rgba(42, 9, 50, 0.45) 100%)',
          }}
        />
      </div>

      {/* 3. Royal Purple "Let's Get This Party Started" Banner */}
      <div
        style={{
          backgroundColor: '#592367',
          color: '#FFFFFF',
          padding: 'clamp(48px, 6vw, 72px) clamp(20px, 4vw, 48px)',
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden',
          borderBottom: '1px solid rgba(255, 255, 255, 0.12)',
        }}
      >
        <div style={{ position: 'relative', zIndex: 2, maxWidth: '920px', margin: '0 auto' }}>
          <h1
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(34px, 5vw, 56px)',
              fontWeight: 400,
              lineHeight: 1.15,
              color: '#FFFFFF',
              letterSpacing: '-0.01em',
              marginBottom: '18px',
            }}
          >
            Let&apos;s Get This Party Started
          </h1>

          <p
            style={{
              fontSize: 'clamp(15px, 1.8vw, 17.5px)',
              lineHeight: 1.75,
              color: 'rgba(255, 255, 255, 0.94)',
              marginBottom: '16px',
              maxWidth: '780px',
              margin: '0 auto 16px',
            }}
          >
            Whatever the occasion, we&apos;re ready to bring your vision to life. Drop us a line or give us a ring, and let&apos;s talk all things food, catering, and event planning.
          </p>

          <p
            style={{
              fontSize: '14.5px',
              color: '#FAF5FC',
              opacity: 0.92,
            }}
          >
            Fill out the form below to get started, or give us a call Monday through Friday, 9 AM to 5 PM at{' '}
            <a href="tel:+13016521515" style={{ color: '#FFFFFF', fontWeight: 700, textDecoration: 'underline' }}>
              (301) 652-1515
            </a>.
          </p>
        </div>
      </div>

      {/* 4. Full-Width Natural Partitioned Form & Concierge Window Section */}
      <div className="inquire-partition-container">
        <div className="inquire-partition-grid">
          {/* Left Column: Natural, Clean, Full Editorial Form (Dominant ~70%) */}
          <div style={{ minWidth: 0 }}>
            <BespokeInquiryForm />
          </div>

          {/* Right Column: Refined Luxury Side Window (Sticky Concierge ~30%) */}
          <InquiryConciergeSidebar />
        </div>
      </div>

      {/* 5. Signature Appetizer Cones Parallax Reveal Curtain */}
      <ParallaxRevealSection
        imageSrc="https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=1920&q=90"
        imageAlt="Ridgewells Artisanal Canapés & Gourmet Passed Hors d'oeuvres"
        height="55vh"
        eyebrow="CULINARY PERFECTION IN EVERY BITE • EST. 1928"
        title="Artisanal Flavors & Theatrical Plating"
        description="Every hors d’oeuvre, wine pairing, and multi-course menu crafted with precision by Executive Chef Kashif Browne and our dedicated culinary brigades."
        showSealBadge={true}
      />

      {/* 6. Footer */}
      <Footer />

      {/* 7. Live Concierge Floating Widget */}
      <LiveConciergeWidget />
    </main>
  );
}

