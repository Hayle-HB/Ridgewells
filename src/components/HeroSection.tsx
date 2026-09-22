'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';

interface HeroSectionProps {
  onOpenInquiry: (initialData?: { eventType?: string; venue?: string; guests?: number }) => void;
}

const HERO_SLIDES = [
  {
    id: 1,
    subtitle: 'STUNNING MENUS • IMPECCABLE SERVICE • UNFORGETTABLE MEMORIES',
    title: 'Every event has a story to tell.',
    description: 'Washington DC’s leading high-end catering company with decades of heritage crafting extraordinary corporate galas, bespoke weddings, and milestone celebrations.',
    caption: 'Opulent Candlelit Gala Banquet & Floral Tablescape',
    image: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=2560&q=95',
  },
  {
    id: 2,
    subtitle: 'EXCLUSIVE MANAGER & CATERER • ANDREW W. MELLON AUDITORIUM',
    title: 'Monumental Grandeur on Constitution Avenue.',
    description: 'Neoclassical architectural jewel featuring 65-foot gilded ceilings, fluted limestone columns, and capacity for up to 1,000 guests in the Great Hall.',
    caption: 'Neoclassical Great Hall with Violet Architectural Lighting',
    image: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=2560&q=95',
  },
  {
    id: 3,
    subtitle: 'MICHELIN-CALIBER PLATING • EXECUTIVE CHEF KASHIF BROWNE',
    title: 'Artisanal Flavors & Theatrical Culinary Presentation.',
    description: 'Handcrafted seasonal multi-course dinners and artistic passed hors d’oeuvres created with strict allergen isolation and sommelier wine pairings.',
    caption: 'Bespoke Gourmet Plating & Sommelier Wine Pairings',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=2560&q=95',
  },
  {
    id: 4,
    subtitle: 'ROMANTIC MILESTONES & BESPOKE WEDDINGS',
    title: 'Unforgettable Moments, Crafted to Perfection.',
    description: 'From intimate courtyard ceremonies to blowout tented celebrations, experience private tasting suites at our Bethesda showroom.',
    caption: 'Tented Evening Celebration with Chiffon & Warm Bistro Lighting',
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=2560&q=95',
  },
  {
    id: 5,
    subtitle: 'MAJOR SPORTING EVENTS • 124TH U.S. OPEN CHAMPIONSHIP PARTNER',
    title: 'Championship Precision, Speed, and Scale.',
    description: 'Trusted by the world’s most prestigious sporting organizations and invitationals to cater high-volume luxury VIP chalets.',
    caption: 'Championship Tournament Hospitality & Luxury VIP Chalets',
    image: 'https://images.unsplash.com/photo-1535131749006-b7f58c99034b?auto=format&fit=crop&w=2560&q=95',
  },
];

export function HeroSection({ onOpenInquiry }: HeroSectionProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
  }, []);

  // Automatic slide rotation every 5.5 seconds
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      nextSlide();
    }, 5500);
    return () => clearInterval(timer);
  }, [isPaused, nextSlide]);

  // Touch swipe support for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (diff > 45) nextSlide();
    if (diff < -45) prevSlide();
    touchStartX.current = null;
  };

  return (
    <section
      id="hero-top"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      style={{
        position: 'relative',
        width: '100%',
        height: 'clamp(620px, 92vh, 920px)',
        minHeight: '580px',
        overflow: 'hidden',
        backgroundColor: '#1E0E22',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* 1. HORIZONTAL SLIDING TRACK */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          width: `${HERO_SLIDES.length * 100}%`,
          height: '100%',
          transform: `translateX(-${(currentSlide * 100) / HERO_SLIDES.length}%)`,
          transition: 'transform 0.9s cubic-bezier(0.16, 1, 0.3, 1)',
          zIndex: 1,
        }}
      >
        {HERO_SLIDES.map((slide) => (
          <div
            key={slide.id}
            style={{
              position: 'relative',
              width: `${100 / HERO_SLIDES.length}%`,
              height: '100%',
              flexShrink: 0,
            }}
          >
            {/* Crystal-Clear High-Resolution Photo */}
            <div
              style={{
                width: '100%',
                height: '100%',
                backgroundImage: `url('${slide.image}')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                filter: 'brightness(0.92) contrast(1.04)',
              }}
            />
            {/* Subtle bottom vignette only for text contrast */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(180deg, rgba(0, 0, 0, 0.25) 0%, rgba(20, 5, 25, 0.4) 45%, rgba(42, 9, 50, 0.8) 100%)',
              }}
            />
          </div>
        ))}
      </div>

      {/* 2. Floating Centered Luxury Typography Card */}
      <div
        style={{
          position: 'relative',
          zIndex: 10,
          maxWidth: '1060px',
          width: '100%',
          margin: '0 auto',
          padding: '0 clamp(18px, 4vw, 36px)',
          textAlign: 'center',
          color: '#FFFFFF',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        {/* Animated Subtitle Badge */}
        <div style={{ marginBottom: 'clamp(12px, 2.5vw, 20px)' }}>
          <span
            style={{
              display: 'inline-block',
              backgroundColor: 'rgba(89, 35, 103, 0.7)',
              backdropFilter: 'blur(10px)',
              WebkitBackdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.35)',
              color: '#FFFFFF',
              fontSize: 'clamp(9px, 1.4vw, 12px)',
              fontWeight: 700,
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              padding: '6px clamp(12px, 2.5vw, 22px)',
              borderRadius: '999px',
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.4)',
              maxWidth: '92vw',
              lineHeight: 1.4,
            }}
          >
            {HERO_SLIDES[currentSlide].subtitle}
          </span>
        </div>

        {/* Master Serif Headline */}
        <h1
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(32px, 5.8vw, 68px)',
            fontWeight: 400,
            lineHeight: 1.15,
            letterSpacing: '-0.01em',
            color: '#FFFFFF',
            marginBottom: 'clamp(14px, 2.5vw, 24px)',
            textShadow: '0 4px 30px rgba(0, 0, 0, 0.7)',
            maxWidth: '960px',
            transition: 'opacity 0.4s ease',
          }}
        >
          {HERO_SLIDES[currentSlide].title}
        </h1>

        {/* Narrative Description */}
        <p
          style={{
            fontSize: 'clamp(14.5px, 1.7vw, 18.5px)',
            lineHeight: 1.7,
            color: 'rgba(255, 255, 255, 0.95)',
            maxWidth: '780px',
            margin: '0 auto clamp(24px, 4vw, 40px)',
            fontWeight: 400,
            textShadow: '0 2px 16px rgba(0, 0, 0, 0.7)',
          }}
        >
          {HERO_SLIDES[currentSlide].description}
        </p>

        {/* Luxury Action Buttons */}
        <div
          className="mobile-stack"
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '14px',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            maxWidth: '520px',
          }}
        >
          <button
            type="button"
            onClick={() => onOpenInquiry()}
            className="btn-luxury-white"
            style={{ padding: '15px 32px', fontSize: '11.5px', minWidth: '220px' }}
          >
            Inquire For Your Event
          </button>
          <a
            href="#corporate"
            className="btn-luxury-outline-white"
            style={{ padding: '14px 30px', fontSize: '11.5px', minWidth: '200px' }}
          >
            Explore Our Services
          </a>
        </div>
      </div>

      {/* 3. Bottom Center Swappable Lines (Auto-Swapping & Clickable) */}
      <div
        style={{
          position: 'absolute',
          bottom: 'clamp(20px, 3.5vw, 36px)',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 25,
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          backgroundColor: 'rgba(0, 0, 0, 0.4)',
          backdropFilter: 'blur(8px)',
          WebkitBackdropFilter: 'blur(8px)',
          padding: '6px 14px',
          borderRadius: '999px',
          border: '1px solid rgba(255, 255, 255, 0.25)',
        }}
      >
        {HERO_SLIDES.map((slide, index) => {
          const isActive = index === currentSlide;
          return (
            <button
              key={slide.id}
              type="button"
              onClick={() => setCurrentSlide(index)}
              title={slide.caption}
              style={{
                width: isActive ? '42px' : '18px',
                height: '5px',
                borderRadius: '3px',
                backgroundColor: isActive ? '#FFFFFF' : 'rgba(255, 255, 255, 0.45)',
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                padding: 0,
                boxShadow: isActive ? '0 0 10px rgba(255, 255, 255, 0.9)' : 'none',
              }}
            />
          );
        })}
      </div>

      {/* 4. Left & Right Manual Navigation Chevrons (Desktop Only) */}
      <button
        type="button"
        onClick={prevSlide}
        className="desktop-only"
        style={{
          position: 'absolute',
          left: '24px',
          top: '50%',
          transform: 'translateY(-50%)',
          zIndex: 25,
          backgroundColor: 'rgba(0, 0, 0, 0.35)',
          backdropFilter: 'blur(6px)',
          color: '#FFFFFF',
          border: '1px solid rgba(255, 255, 255, 0.3)',
          borderRadius: '50%',
          width: '48px',
          height: '48px',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '22px',
          cursor: 'pointer',
          transition: 'all 0.25s ease',
        }}
        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'rgba(89, 35, 103, 0.85)')}
        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.35)')}
        title="Previous Slide"
      >
        ‹
      </button>

      <button
        type="button"
        onClick={nextSlide}
        className="desktop-only"
        style={{
          position: 'absolute',
          right: '24px',
          top: '50%',
          transform: 'translateY(-50%)',
          zIndex: 25,
          backgroundColor: 'rgba(0, 0, 0, 0.35)',
          backdropFilter: 'blur(6px)',
          color: '#FFFFFF',
          border: '1px solid rgba(255, 255, 255, 0.3)',
          borderRadius: '50%',
          width: '48px',
          height: '48px',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '22px',
          cursor: 'pointer',
          transition: 'all 0.25s ease',
        }}
        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'rgba(89, 35, 103, 0.85)')}
        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.35)')}
        title="Next Slide"
      >
        ›
      </button>
    </section>
  );
}
