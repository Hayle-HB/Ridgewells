'use client';

import React from 'react';

export type BadgeVariant = 'purple' | 'frosted' | 'dark' | 'gold';
export type BadgeSize = 'sm' | 'md';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  size?: BadgeSize;
  dot?: boolean;
  pulseDot?: boolean;
}

/**
 * Reusable Luxury Badge & Pill Component
 */
export function Badge({
  children,
  variant = 'purple',
  size = 'md',
  dot = false,
  pulseDot = false,
  className = '',
  style,
  ...props
}: BadgeProps) {
  // Variant styles
  const variantStyles: Record<BadgeVariant, React.CSSProperties> = {
    purple: {
      backgroundColor: 'var(--brand-purple-soft)',
      color: 'var(--brand-purple)',
      border: '1px solid var(--brand-purple-border)',
    },
    frosted: {
      backgroundColor: 'rgba(255, 255, 255, 0.94)',
      backdropFilter: 'blur(8px)',
      WebkitBackdropFilter: 'blur(8px)',
      color: 'var(--brand-purple)',
      border: '1px solid rgba(89, 35, 103, 0.15)',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
    },
    dark: {
      backgroundColor: 'rgba(42, 9, 50, 0.86)',
      backdropFilter: 'blur(6px)',
      WebkitBackdropFilter: 'blur(6px)',
      color: '#FFFFFF',
      border: '1px solid rgba(255, 255, 255, 0.15)',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.25)',
    },
    gold: {
      backgroundColor: 'var(--brand-gold-light)',
      color: 'var(--brand-gold-dark)',
      border: '1px solid var(--brand-gold-border)',
    },
  };

  const sizeStyles: Record<BadgeSize, React.CSSProperties> = {
    sm: {
      padding: '4px 12px',
      fontSize: '9.5px',
      letterSpacing: '0.14em',
    },
    md: {
      padding: '6px 16px',
      fontSize: '11px',
      letterSpacing: '0.18em',
    },
  };

  return (
    <span
      className={`badge-luxury ${className}`.trim()}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '7px',
        borderRadius: '9999px',
        fontWeight: 700,
        textTransform: 'uppercase',
        lineHeight: 1.2,
        ...variantStyles[variant],
        ...sizeStyles[size],
        ...style,
      }}
      {...props}
    >
      {pulseDot && <span className="pulse-dot" />}
      {dot && !pulseDot && (
        <span
          style={{
            width: '5px',
            height: '5px',
            borderRadius: '50%',
            backgroundColor: 'currentColor',
            opacity: 0.75,
          }}
        />
      )}
      {children}
    </span>
  );
}
