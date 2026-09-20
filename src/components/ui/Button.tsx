'use client';

import React from 'react';

export type ButtonVariant = 'purple' | 'outline' | 'white' | 'outline-white' | 'link';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  arrow?: boolean;
  icon?: React.ReactNode;
  isLoading?: boolean;
}

/**
 * Reusable Luxury Button Component
 *
 * Implements the signature Ridgewells hover color inversions with no upward movement:
 * - 'purple': Solid purple (#592367) -> inverts to white on hover
 * - 'outline': Purple outline -> inverts to solid purple on hover
 * - 'white': Solid white -> inverts to solid purple on hover
 * - 'outline-white': White outline -> inverts to solid white on hover
 */
export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      variant = 'purple',
      size = 'md',
      fullWidth = false,
      arrow = false,
      icon,
      isLoading = false,
      className = '',
      style,
      disabled,
      ...props
    },
    ref
  ) => {
    // Map variant to class names
    let variantClass = 'btn-luxury-purple';
    if (variant === 'outline') variantClass = 'btn-luxury-outline';
    if (variant === 'white') variantClass = 'btn-luxury-white';
    if (variant === 'outline-white') variantClass = 'btn-luxury-outline-white';
    if (variant === 'link') variantClass = 'editorial-link';

    // Size adjustments
    const sizeStyles: Record<ButtonSize, React.CSSProperties> = {
      sm: { padding: '8px 18px', fontSize: '11px' },
      md: { padding: '13px 30px', fontSize: '12px' },
      lg: { padding: '16px 36px', fontSize: '13px' },
    };

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={`${variantClass} ${className}`.trim()}
        style={{
          ...sizeStyles[size],
          width: fullWidth ? '100%' : undefined,
          opacity: disabled || isLoading ? 0.6 : 1,
          cursor: disabled || isLoading ? 'not-allowed' : 'pointer',
          ...style,
        }}
        {...props}
      >
        {icon && <span style={{ display: 'inline-flex', alignItems: 'center' }}>{icon}</span>}
        <span>{isLoading ? 'Processing...' : children}</span>
        {arrow && !isLoading && (
          <span style={{ transition: 'transform 0.2s', display: 'inline-block' }}>➔</span>
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';
