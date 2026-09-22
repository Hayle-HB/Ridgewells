'use client';

import React from 'react';
import { Navbar } from '../../components/Navbar';
import { Footer } from '../../components/Footer';
import { LiveConciergeWidget } from '../../components/concierge-widget/LiveConciergeWidget';
import { BespokeInquiryForm } from '../../components/inquiry/BespokeInquiryForm';
import { InquiryConciergeSidebar } from '../../components/inquiry/InquiryConciergeSidebar';

export default function InquirePage() {
  return (
    <main style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: '#FFFFFF' }}>
      {/* 1. Header & Navigation */}
      <Navbar onOpenInquiry={() => window.scrollTo({ top: 400, behavior: 'smooth' })} />

      {/* 2. Sleek Luxury Hero Header */}
      <div
        style={{
          width: '100%',
          height: 'clamp(200px, 26vw, 300px)',
          backgroundImage: `url('https://static.wixstatic.com/media/313fa1_4896d24048fd41e5b4e093be7d56c4e4~mv2.jpg/v1/fill/w_1920,h_750,q_90/313fa1_4896d24048fd41e5b4e093be7d56c4e4~mv2.jpg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center 40%',
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          color: '#FFFFFF',
          padding: '0 20px',
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(180deg, rgba(20, 5, 25, 0.45) 0%, rgba(42, 9, 50, 0.85) 100%)',
          }}
        />

        <div style={{ position: 'relative', zIndex: 2, maxWidth: '820px' }}>
          <span
            style={{
              display: 'inline-block',
              fontSize: '10px',
              fontWeight: 700,
              letterSpacing: '0.24em',
              textTransform: 'uppercase',
              color: '#F0DEC8',
              marginBottom: '12px',
            }}
          >
            ESTABLISHED 1928 • WASHINGTON, D.C.
          </span>
          <h1
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(30px, 4.5vw, 48px)',
              fontWeight: 400,
              lineHeight: 1.18,
              color: '#FFFFFF',
              letterSpacing: '-0.01em',
              margin: '0 0 12px 0',
            }}
          >
            Plan Your Event with Ridgewells
          </h1>
          <p
            style={{
              fontSize: 'clamp(14px, 1.6vw, 16.5px)',
              color: 'rgba(255, 255, 255, 0.92)',
              margin: 0,
              lineHeight: 1.6,
              fontFamily: 'var(--font-sans)',
            }}
          >
            From landmark galas and bespoke weddings to private milestone celebrations, our directors and culinary artisans bring nearly a century of distinction to every occasion.
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



      {/* 6. Footer */}
      <Footer />

      {/* 7. Live Concierge Floating Widget */}
      <LiveConciergeWidget />
    </main>
  );
}

