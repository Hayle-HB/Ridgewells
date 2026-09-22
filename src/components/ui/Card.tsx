'use client';

import React from 'react';
import { Button } from './Button';
import { Badge } from './Badge';

export type CardVariant = 'white' | 'lilac' | 'cream' | 'dark';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: CardVariant;
  bordered?: boolean;
  hoverEffect?: boolean;
}

/**
 * Base Luxury Card Container
 */
export function Card({
  children,
  variant = 'white',
  bordered = true,
  hoverEffect = false,
  className = '',
  style,
  ...props
}: CardProps) {
  const bgColors: Record<CardVariant, string> = {
    white: '#FFFFFF',
    lilac: '#FAF5FB',
    cream: '#FAF8F6',
    dark: '#2A0932',
  };

  const textColors: Record<CardVariant, string> = {
    white: '#181519',
    lilac: '#181519',
    cream: '#181519',
    dark: '#FFFFFF',
  };

  return (
    <div
      className={className}
      style={{
        backgroundColor: bgColors[variant],
        color: textColors[variant],
        borderRadius: '4px',
        border: bordered ? '1px solid rgba(89, 35, 103, 0.12)' : 'none',
        boxShadow: '0 12px 36px rgba(89, 35, 103, 0.07)',
        transition: hoverEffect ? 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)' : 'none',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        ...style,
      }}
      {...props}
    >
      {children}
    </div>
  );
}

export interface ImageCardProps {
  image: string;
  imageAlt?: string;
  imageHeight?: string;
  categoryBadge?: string;
  capacityBadge?: string;
  eyebrow?: string;
  title: string;
  address?: string;
  description: string;
  features?: string[];
  ctaText?: string;
  onCtaClick?: () => void;
  ctaVariant?: 'purple' | 'outline';
  className?: string;
  style?: React.CSSProperties;
}

/**
 * Reusable Luxury Image Card (Used for Venues, Showcase items, Event Types)
 */
export function ImageCard({
  image,
  imageAlt = '',
  imageHeight = '280px',
  categoryBadge,
  capacityBadge,
  eyebrow,
  title,
  address,
  description,
  features = [],
  ctaText = 'Check Date Availability',
  onCtaClick,
  ctaVariant = 'outline',
  className = '',
  style,
}: ImageCardProps) {
  return (
    <div
      className={`image-zoom-container ${className}`.trim()}
      style={{
        borderRadius: '4px',
        overflow: 'hidden',
        backgroundColor: '#FFFFFF',
        border: '1px solid rgba(197, 168, 128, 0.3)',
        boxShadow: '0 12px 36px rgba(89, 35, 103, 0.07)',
        display: 'flex',
        flexDirection: 'column',
        transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
        ...style,
      }}
    >
      {/* Image Container with Zoom */}
      <div style={{ height: imageHeight, position: 'relative', overflow: 'hidden' }}>
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

        {/* Floating Top Category Badge */}
        {categoryBadge && (
          <div style={{ position: 'absolute', top: '16px', left: '16px' }}>
            <Badge variant="frosted" size="sm">
              {categoryBadge}
            </Badge>
          </div>
        )}

        {/* Floating Bottom Capacity Badge */}
        {capacityBadge && (
          <div style={{ position: 'absolute', bottom: '16px', right: '16px' }}>
            <Badge variant="dark" size="sm">
              ✦ {capacityBadge}
            </Badge>
          </div>
        )}
      </div>

      {/* Content Body */}
      <div style={{ padding: '30px 28px', flex: 1, display: 'flex', flexDirection: 'column' }}>
        {eyebrow && (
          <span
            style={{
              fontSize: '10.5px',
              fontWeight: 800,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: '#9F8055',
              display: 'block',
              marginBottom: '8px',
            }}
          >
            {eyebrow}
          </span>
        )}

        <h4
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: '24px',
            fontWeight: 500,
            color: '#592367',
            lineHeight: 1.2,
            marginBottom: address ? '6px' : '14px',
          }}
        >
          {title}
        </h4>

        {address && (
          <div
            style={{
              fontSize: '12.5px',
              color: '#736D78',
              marginBottom: '16px',
              paddingBottom: '12px',
              borderBottom: '1px solid rgba(89, 35, 103, 0.08)',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#592367" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            {address}
          </div>
        )}

        <p
          style={{
            fontSize: '14px',
            color: '#47434B',
            lineHeight: 1.7,
            marginBottom: '20px',
            flex: 1,
          }}
        >
          {description}
        </p>

        {/* Features Tag Chips */}
        {features.length > 0 && (
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '7px',
              marginBottom: '24px',
            }}
          >
            {features.map((feat, idx) => (
              <span
                key={idx}
                style={{
                  fontSize: '11px',
                  fontWeight: 600,
                  color: '#592367',
                  backgroundColor: '#FAF5FB',
                  border: '1px solid rgba(89, 35, 103, 0.12)',
                  padding: '3px 9px',
                  borderRadius: '2px',
                  letterSpacing: '0.04em',
                }}
              >
                {feat}
              </span>
            ))}
          </div>
        )}

        {/* Bottom Action CTA */}
        {ctaText && (
          <div style={{ marginTop: 'auto' }}>
            <Button
              variant={ctaVariant}
              fullWidth
              arrow
              onClick={onCtaClick}
              size="sm"
            >
              {ctaText}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
