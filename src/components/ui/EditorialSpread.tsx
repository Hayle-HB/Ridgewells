'use client';

import React from 'react';
import { Button, ButtonVariant } from './Button';
import { Badge } from './Badge';

export interface EditorialSpreadProps {
  id?: string;
  eyebrow?: string;
  title: string;
  description: string;
  image: string;
  imageAlt?: string;
  reversed?: boolean;
  ctaText?: string;
  ctaVariant?: ButtonVariant;
  onCtaClick?: () => void;
  badge?: string;
  imageOverlayContent?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * Reusable Editorial Magazine Spread Component (Deeply Responsive 2-Column)
 */
export function EditorialSpread({
  id,
  eyebrow,
  title,
  description,
  image,
  imageAlt = '',
  reversed = false,
  ctaText,
  ctaVariant = 'purple',
  onCtaClick,
  badge,
  imageOverlayContent,
  children,
  className = '',
  style,
}: EditorialSpreadProps) {
  return (
    <div
      id={id}
      className={`editorial-spread-row ${className}`.trim()}
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))',
        gap: 'clamp(32px, 5vw, 72px)',
        alignItems: 'center',
        ...style,
      }}
    >
      {/* Image Side */}
      <div
        className="image-zoom-container"
        style={{
          order: reversed ? 2 : 1,
          borderRadius: '4px',
          overflow: 'hidden',
          height: 'clamp(280px, 42vw, 520px)',
          boxShadow: 'var(--shadow-card)',
          position: 'relative',
        }}
      >
        <div
          className="zoom-bg"
          style={{
            width: '100%',
            height: '100%',
            backgroundImage: `url('${image}')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
          role="img"
          aria-label={imageAlt || title}
        />

        {badge && (
          <div style={{ position: 'absolute', top: '16px', left: '16px' }}>
            <Badge variant="purple">{badge}</Badge>
          </div>
        )}

        {imageOverlayContent}
      </div>

      {/* Editorial Text Side */}
      <div
        style={{
          order: reversed ? 1 : 2,
          padding: 'clamp(8px, 2vw, 36px) 0',
        }}
      >
        {eyebrow && (
          <span
            style={{
              fontSize: '11px',
              fontWeight: 800,
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: '#592367',
              opacity: 0.85,
              display: 'block',
              marginBottom: '14px',
            }}
          >
            {eyebrow}
          </span>
        )}

        <h3
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(28px, 3.6vw, 42px)',
            fontWeight: 400,
            color: '#592367',
            lineHeight: 1.2,
            marginBottom: '20px',
          }}
        >
          {title}
        </h3>

        <p
          style={{
            fontSize: 'clamp(14.5px, 1.6vw, 16px)',
            lineHeight: 1.75,
            color: '#47434B',
            marginBottom: ctaText || children ? '28px' : '0',
            maxWidth: '560px',
          }}
        >
          {description}
        </p>

        {children}

        {ctaText && (
          <div>
            <Button variant={ctaVariant} arrow onClick={onCtaClick}>
              {ctaText}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
