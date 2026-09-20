'use client';

import React, { useState } from 'react';
import { Navbar } from '../components/Navbar';
import { HeroSection } from '../components/HeroSection';
import { BrandMarquee } from '../components/BrandMarquee';
import { BrandDivisions } from '../components/BrandDivisions';
import { CulinarySection } from '../components/CulinarySection';
import { ParallaxRevealSection } from '../components/ParallaxRevealSection';
import { VenuesSection } from '../components/VenuesSection';
import { ShowroomMapSection } from '../components/ShowroomMapSection';
import { Footer } from '../components/Footer';
import { LiveConciergeWidget } from '../components/concierge-widget/LiveConciergeWidget';
import { InquiryModal } from '../components/InquiryModal';

export default function HomePage() {
  const [isInquiryModalOpen, setIsInquiryModalOpen] = useState(false);
  const [inquiryInitialData, setInquiryInitialData] = useState<{
    eventType?: string;
    venue?: string;
    guests?: number;
  }>({});

  const handleOpenInquiry = (initialData?: { eventType?: string; venue?: string; guests?: number }) => {
    if (initialData) {
      setInquiryInitialData(initialData);
    } else {
      setInquiryInitialData({});
    }
    setIsInquiryModalOpen(true);
  };

  return (
    <main style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: '#FFFFFF' }}>
      {/* 1. Header & Navigation (Streamlined with dropdown & active action buttons) */}
      <Navbar onOpenInquiry={handleOpenInquiry} />

      {/* 2. Full 100vh Sliding Hero Carousel with 5 Ultra-High-Resolution Catering Photos */}
      <HeroSection onOpenInquiry={handleOpenInquiry} />

      {/* 3. Signature Brand Marquee Ribbon */}
      <BrandMarquee />

      {/* 4. Editorial Magazine Spreads (Corporate, Weddings, Sporting, Social) */}
      <BrandDivisions onOpenInquiry={handleOpenInquiry} />

      {/* 5. Executive Chef Kashif Browne & The Party Kitchen */}
      <CulinarySection onOpenInquiry={handleOpenInquiry} />

      {/* 6. Authentic Ridgewells White-Glove Parallax Curtain Reveal Window */}
      <ParallaxRevealSection
        imageSrc="https://static.wixstatic.com/media/93242c_400c2184082f40c7bcf29cc6af128caf~mv2.jpg/v1/fill/w_1920,h_1080,q_90/93242c_400c2184082f40c7bcf29cc6af128caf~mv2.jpg"
        imageAlt="Ridgewells Synchronized White-Glove Service Banquet"
        height="70vh"
        eyebrow="SYNCHRONIZED WHITE-GLOVE SERVICE • EST. 1928"
        title="Flawless Execution for the Capital’s Most Prestigious Occasions"
        description="Every course orchestrated with synchronized precision, fine china, and custom floral tablescapes inside Washington DC’s grandest historic halls."
        ctaText="Plan Your Custom Gala Experience"
        onCtaClick={() => handleOpenInquiry({ eventType: 'GALA_SOCIAL' })}
      />

      {/* 7. Landmark DC Venues & Andrew W. Mellon Auditorium */}
      <VenuesSection onOpenInquiry={handleOpenInquiry} />

      {/* 7. Bethesda Flagship Tasting Showroom & Google Maps Embed */}
      <ShowroomMapSection onOpenInquiry={handleOpenInquiry} />

      {/* 8. Luxury Editorial Footer with Mailing List Card */}
      <Footer />

      {/* 9. Floating Bottom-Right Live AI Concierge & Phone Assistant Widget */}
      <LiveConciergeWidget />

      {/* 10. Interactive Bespoke Inquiry Modal */}
      <InquiryModal
        isOpen={isInquiryModalOpen}
        onClose={() => setIsInquiryModalOpen(false)}
        initialData={inquiryInitialData}
      />
    </main>
  );
}
