'use client';

import React from 'react';

export interface ParallaxRevealSectionProps {
  /** Image source URL */
  imageSrc?: string;
  /** Alt text for accessibility */
  imageAlt?: string;
  /** Height of the reveal window (e.g. '70vh', '550px', '85vh') */
  height?: string;
  /** Optional overlay dark opacity (0 to 1) */
  overlayOpacity?: number;
  /** Optional top category eyebrow */
  eyebrow?: string;
  /** Optional serif title */
  title?: string;
  /** Optional description text */
  description?: string;
  /** Optional primary CTA button text */
  ctaText?: string;
  /** Optional primary CTA callback */
  onCtaClick?: () => void;
  /** Optional signature floating seal stamp badge */
  showSealBadge?: boolean;
  /** Optional custom inner content */
  children?: React.ReactNode;
  /** Text content alignment */
  alignment?: 'center' | 'left' | 'right' | 'bottom-left';
  /** Optional custom ID for navigation anchor */
  id?: string;
}

/**
 * ParallaxRevealSection
 * 
 * A reusable luxury curtain/window parallax reveal component.
 * As the user scrolls, adjacent sections smoothly slide over the fixed background image.
 * Uses GPU-accelerated clip-path windowing for 60fps cross-device performance.
 */
export function ParallaxRevealSection({
  imageSrc = 'https://static.wixstatic.com/media/93242c_400c2184082f40c7bcf29cc6af128caf~mv2.jpg/v1/fill/w_1920,h_1080,q_90/93242c_400c2184082f40c7bcf29cc6af128caf~mv2.jpg',
  imageAlt = 'Ridgewells White-Glove Synchronized Banquet Gala Service',
  height = '65vh',
  overlayOpacity = 0.32,
  eyebrow = 'THE RIDGEWELLS SIGNATURE EXPERIENCE',
  title = 'White-Glove Synchronized Service & Culinary Artistry',
  description,
  ctaText,
  onCtaClick,
  showSealBadge = true,
  children,
  alignment = 'center',
  id = 'parallax-reveal',
}: ParallaxRevealSectionProps) {
  return (
    <div
      id={id}
      className="parallax-curtain-container"
      style={{
        position: 'relative',
        width: '100%',
        height: height,
        minHeight: '440px',
        overflow: 'hidden',
        clipPath: 'inset(0 0 0 0)',
        WebkitClipPath: 'inset(0 0 0 0)',
        backgroundColor: '#1E0E22',
      }}
    >
      {/* Fixed Fullscreen Background Image */}
      <div
        className="parallax-curtain-fixed-layer"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          backgroundImage: `url('${imageSrc}')`,
          backgroundPosition: 'center 40%',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          pointerEvents: 'none',
          zIndex: 1,
          filter: 'brightness(0.95) contrast(1.02)',
        }}
        role="img"
        aria-label={imageAlt}
      />

      {/* Luxury Vignette & Contrast Overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundColor: `rgba(42, 9, 50, ${overlayOpacity})`,
          background: `linear-gradient(180deg, rgba(20, 5, 25, 0.45) 0%, rgba(42, 9, 50, ${overlayOpacity}) 50%, rgba(20, 5, 25, 0.5) 100%)`,
          zIndex: 2,
          pointerEvents: 'none',
        }}
      />

      {/* Content Layer */}
      <div
        style={{
          position: 'relative',
          zIndex: 5,
          width: '100%',
          height: '100%',
          maxWidth: '1400px',
          margin: '0 auto',
          padding: 'clamp(32px, 6vw, 72px) clamp(18px, 4vw, 36px)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: alignment === 'bottom-left' ? 'flex-end' : 'center',
          alignItems:
            alignment === 'center'
              ? 'center'
              : alignment === 'right'
              ? 'flex-end'
              : 'flex-start',
          textAlign:
            alignment === 'center'
              ? 'center'
              : alignment === 'right'
              ? 'right'
              : 'left',
          color: '#FFFFFF',
        }}
      >
        {children ? (
          children
        ) : (
          <div style={{ maxWidth: '840px', width: '100%' }}>
            {eyebrow && (
              <span
                style={{
                  display: 'inline-block',
                  backgroundColor: 'rgba(89, 35, 103, 0.75)',
                  backdropFilter: 'blur(8px)',
                  WebkitBackdropFilter: 'blur(8px)',
                  border: '1px solid rgba(255, 255, 255, 0.3)',
                  color: '#FFFFFF',
                  fontSize: 'clamp(9.5px, 1.4vw, 11px)',
                  fontWeight: 800,
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  padding: '6px clamp(12px, 2.5vw, 20px)',
                  borderRadius: '999px',
                  marginBottom: 'clamp(12px, 2.5vw, 18px)',
                  boxShadow: '0 4px 16px rgba(0,0,0,0.3)',
                  lineHeight: 1.4,
                  maxWidth: '94vw',
                }}
              >
                {eyebrow}
              </span>
            )}

            {title && (
              <h3
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: 'clamp(28px, 4.4vw, 54px)',
                  fontWeight: 400,
                  color: '#FFFFFF',
                  lineHeight: 1.18,
                  letterSpacing: '-0.01em',
                  textShadow: '0 4px 24px rgba(0, 0, 0, 0.65)',
                  marginBottom: description || ctaText ? '16px' : '0',
                }}
              >
                {title}
              </h3>
            )}

            {description && (
              <p
                style={{
                  fontSize: 'clamp(14.5px, 1.6vw, 17.5px)',
                  lineHeight: 1.7,
                  color: 'rgba(255, 255, 255, 0.95)',
                  marginBottom: ctaText ? '24px' : '0',
                  textShadow: '0 2px 12px rgba(0, 0, 0, 0.6)',
                }}
              >
                {description}
              </p>
            )}

            {ctaText && (
              <div style={{ marginTop: '20px' }}>
                <button
                  type="button"
                  onClick={onCtaClick}
                  className="btn-luxury-white"
                  style={{ padding: '14px 34px', fontSize: '11.5px' }}
                >
                  {ctaText} ➔
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Authentic Ridgewells Signature Circular Seal Badge (Floating bottom-right on Desktop/Tablet) */}
      {showSealBadge && (
        <div
          className="desktop-only"
          style={{
            position: 'absolute',
            bottom: '24px',
            right: '28px',
            zIndex: 6,
            pointerEvents: 'none',
          }}
        >
          <div
            style={{
              width: '105px',
              height: '105px',
              borderRadius: '50%',
              backgroundColor: '#592367',
              border: '2px solid rgba(255, 255, 255, 0.85)',
              boxShadow: '0 12px 30px rgba(0, 0, 0, 0.45)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#FFFFFF',
              textAlign: 'center',
              padding: '10px',
              transform: 'rotate(-6deg)',
            }}
          >
            <span
              style={{
                fontSize: '7.5px',
                fontWeight: 800,
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: '#C5A880',
                marginBottom: '2px',
              }}
            >
              EST. 1928
            </span>
            <span
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '13px',
                fontWeight: 700,
                color: '#FFFFFF',
                lineHeight: 1,
              }}
            >
              ridgewells
            </span>
            <span
              style={{
                fontSize: '7px',
                fontWeight: 800,
                letterSpacing: '0.25em',
                textTransform: 'uppercase',
                color: '#FAF5FC',
                marginTop: '2px',
              }}
            >
              WHITE-GLOVE
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
