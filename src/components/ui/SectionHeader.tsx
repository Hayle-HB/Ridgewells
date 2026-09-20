'use client';

import React from 'react';
import { Badge, BadgeVariant } from './Badge';

export interface SectionHeaderProps {
  badge?: string;
  badgeVariant?: BadgeVariant;
  title: string;
  subtitle?: string;
  align?: 'center' | 'left' | 'right';
  divider?: boolean;
  theme?: 'light' | 'dark';
  className?: string;
  style?: React.CSSProperties;
}

/**
 * Reusable Section Header with luxury serif headline and optional divider
 */
export function SectionHeader({
  badge,
  badgeVariant = 'purple',
  title,
  subtitle,
  align = 'center',
  divider = true,
  theme = 'light',
  className = '',
  style,
}: SectionHeaderProps) {
  const isDark = theme === 'dark';

  return (
    <div
      className={className}
      style={{
        textAlign: align,
        marginBottom: '64px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: align === 'center' ? 'center' : align === 'right' ? 'flex-end' : 'flex-start',
        ...style,
      }}
    >
      {badge && (
        <div style={{ marginBottom: '16px' }}>
          <Badge variant={isDark ? 'dark' : badgeVariant}>
            {badge}
          </Badge>
        </div>
      )}

      <h2
        style={{
          fontFamily: 'var(--font-serif)',
          fontSize: 'clamp(34px, 4.5vw, 54px)',
          fontWeight: 400,
          color: isDark ? '#FFFFFF' : '#592367',
          lineHeight: 1.15,
          marginTop: '4px',
          maxWidth: '900px',
        }}
      >
        {title}
      </h2>

      {subtitle && (
        <p
          style={{
            fontSize: '16px',
            color: isDark ? 'rgba(255, 255, 255, 0.85)' : '#736D78',
            maxWidth: '680px',
            margin: '16px 0 0',
            lineHeight: 1.75,
          }}
        >
          {subtitle}
        </p>
      )}

      {divider && (
        <div
          style={{
            width: '60px',
            height: '2px',
            backgroundColor: isDark ? '#C5A880' : '#592367',
            marginTop: '24px',
            opacity: isDark ? 0.6 : 0.3,
          }}
        />
      )}
    </div>
  );
}
