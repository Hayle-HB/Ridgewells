'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Button } from './ui';

interface NavbarProps {
  onOpenInquiry?: (initialData?: { eventType?: string; venue?: string; guests?: number }) => void;
}

export function Navbar({ onOpenInquiry }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isEventsOpen, setIsEventsOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileEventsExpanded, setIsMobileEventsExpanded] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent background scroll when mobile drawer is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  // Close desktop dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsEventsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    setIsEventsOpen(false);
    setIsMobileMenuOpen(false);
    const element = document.getElementById(targetId);
    if (element) {
      e.preventDefault();
      element.scrollIntoView({ behavior: 'smooth' });
    } else {
      // If element is not on current page, redirect to home with anchor
      window.location.href = `/#${targetId}`;
    }
  };

  const handleInquiryAction = () => {
    setIsMobileMenuOpen(false);
    if (onOpenInquiry) {
      onOpenInquiry();
    } else {
      window.location.href = '/inquire';
    }
  };

  return (
    <>
      {/* 1. Top Contact Ribbon */}
      <div
        style={{
          backgroundColor: '#592367',
          color: '#FFFFFF',
          fontSize: '11px',
          letterSpacing: '0.08em',
          padding: '8px clamp(16px, 4vw, 36px)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          fontWeight: 600,
          textTransform: 'uppercase',
          borderBottom: '1px solid rgba(255, 255, 255, 0.15)',
          zIndex: 1001,
          position: 'relative',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
          <a href="tel:+13016521515" style={{ display: 'inline-flex', alignItems: 'center', gap: '7px', color: '#FFFFFF' }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
            </svg>
            (301) 652-1515
          </a>
          <span className="desktop-only" style={{ opacity: 0.35 }}>|</span>
          <span className="desktop-only" style={{ opacity: 0.9 }}>
            5522 Dorsey Lane, Bethesda, MD
          </span>
          <span className="desktop-only" style={{ opacity: 0.35 }}>|</span>
          <a href="mailto:info@ridgewells.com" className="desktop-only" style={{ opacity: 0.9, textTransform: 'lowercase', color: '#FFFFFF' }}>
            info@ridgewells.com
          </a>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <span style={{ letterSpacing: '0.12em', color: '#FAF5FC', fontSize: '10px' }}>
            EST. 1928
          </span>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noreferrer"
            style={{ color: '#FFFFFF', opacity: 0.9, display: 'flex', alignItems: 'center' }}
            title="Instagram"
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
            </svg>
          </a>
        </div>
      </div>

      {/* 2. Main Luxury Navigation Bar */}
      <header
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 1000,
          backgroundColor: '#FFFFFF',
          borderBottom: '1px solid rgba(89, 35, 103, 0.12)',
          boxShadow: isScrolled ? '0 4px 25px rgba(89, 35, 103, 0.08)' : 'none',
          transition: 'all 0.3s ease',
        }}
      >
        <div
          style={{
            maxWidth: '1440px',
            margin: '0 auto',
            padding: '14px clamp(16px, 4vw, 36px)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '20px',
          }}
        >
          {/* Logo */}
          <Link
            href="/"
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              textDecoration: 'none',
              flexShrink: 0,
            }}
          >
            <span
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(24px, 4vw, 32px)',
                fontWeight: 700,
                letterSpacing: '-0.02em',
                color: '#592367',
                lineHeight: 1,
              }}
            >
              ridgewells
            </span>
            <span
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '8.5px',
                fontWeight: 800,
                letterSpacing: '0.34em',
                textTransform: 'uppercase',
                color: '#592367',
                marginTop: '4px',
                opacity: 0.9,
              }}
            >
              CATERING
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <nav
            className="desktop-only"
            style={{
              alignItems: 'center',
              gap: '28px',
              fontSize: '12px',
              fontWeight: 700,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: '#592367',
            }}
          >
            <a
              href="/#heritage-about"
              onClick={(e) => handleNavClick(e, 'heritage-about')}
              style={{ transition: 'color 0.2s', padding: '6px 0' }}
            >
              About
            </a>

            {/* Events Dropdown */}
            <div
              ref={dropdownRef}
              style={{ position: 'relative' }}
              onMouseEnter={() => setIsEventsOpen(true)}
              onMouseLeave={() => setIsEventsOpen(false)}
            >
              <button
                type="button"
                onClick={() => setIsEventsOpen(!isEventsOpen)}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  fontSize: '12px',
                  fontWeight: 700,
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  color: isEventsOpen ? '#752E87' : '#592367',
                  padding: '6px 0',
                  transition: 'color 0.2s',
                  cursor: 'pointer',
                }}
              >
                <span>Events</span>
                <span style={{ fontSize: '9px', transform: isEventsOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}>▼</span>
              </button>

              {isEventsOpen && (
                <div
                  style={{
                    position: 'absolute',
                    top: '100%',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    paddingTop: '8px',
                    zIndex: 2000,
                  }}
                >
                  <div
                    style={{
                      width: '300px',
                      backgroundColor: '#FFFFFF',
                      border: '1px solid rgba(89, 35, 103, 0.18)',
                      borderRadius: '6px',
                      boxShadow: '0 20px 45px rgba(89, 35, 103, 0.16)',
                      padding: '8px 0',
                      display: 'flex',
                      flexDirection: 'column',
                    }}
                  >
                    <a
                      href="/#corporate"
                      onClick={(e) => handleNavClick(e, 'corporate')}
                      style={{
                        padding: '12px 20px',
                        fontSize: '13px',
                        fontWeight: 600,
                        letterSpacing: '0.04em',
                        textTransform: 'none',
                        color: '#592367',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                      }}
                    >
                      <span style={{ color: '#C5A880' }}>✦</span> Corporate Events & Galas
                    </a>
                    <a
                      href="/#weddings"
                      onClick={(e) => handleNavClick(e, 'weddings')}
                      style={{
                        padding: '12px 20px',
                        fontSize: '13px',
                        fontWeight: 600,
                        letterSpacing: '0.04em',
                        textTransform: 'none',
                        color: '#592367',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                      }}
                    >
                      <span style={{ color: '#C5A880' }}>✦</span> Weddings & Celebrations
                    </a>
                    <a
                      href="/#social"
                      onClick={(e) => handleNavClick(e, 'social')}
                      style={{
                        padding: '12px 20px',
                        fontSize: '13px',
                        fontWeight: 600,
                        letterSpacing: '0.04em',
                        textTransform: 'none',
                        color: '#592367',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                      }}
                    >
                      <span style={{ color: '#C5A880' }}>✦</span> Social Gatherings & Milestones
                    </a>
                    <a
                      href="/#major-events"
                      onClick={(e) => handleNavClick(e, 'major-events')}
                      style={{
                        padding: '12px 20px',
                        fontSize: '13px',
                        fontWeight: 600,
                        letterSpacing: '0.04em',
                        textTransform: 'none',
                        color: '#592367',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                      }}
                    >
                      <span style={{ color: '#C5A880' }}>✦</span> Major Sporting Events
                    </a>
                    <div style={{ height: '1px', backgroundColor: 'rgba(89, 35, 103, 0.1)', margin: '6px 0' }} />
                    <a
                      href="/#venues"
                      onClick={(e) => handleNavClick(e, 'venues')}
                      style={{
                        padding: '12px 20px',
                        fontSize: '13px',
                        fontWeight: 700,
                        letterSpacing: '0.04em',
                        textTransform: 'none',
                        color: '#592367',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                      }}
                    >
                      <span style={{ color: '#9F8055' }}>✦</span> Andrew W. Mellon Auditorium
                    </a>
                  </div>
                </div>
              )}
            </div>

            <a
              href="/#culinary"
              onClick={(e) => handleNavClick(e, 'culinary')}
              style={{ transition: 'color 0.2s', padding: '6px 0' }}
            >
              The Party Kitchen
            </a>

            <a
              href="/#venues"
              onClick={(e) => handleNavClick(e, 'venues')}
              style={{ transition: 'color 0.2s', padding: '6px 0' }}
            >
              Venues
            </a>

            <Link
              href="/inquire"
              style={{
                transition: 'color 0.2s',
                padding: '6px 0',
                color: '#592367',
                fontWeight: 800,
                borderBottom: '2px solid #592367',
              }}
            >
              Book An Event
            </Link>
          </nav>

          {/* Desktop Actions */}
          <div className="desktop-only" style={{ alignItems: 'center', gap: '12px', flexShrink: 0 }}>
            <a
              href="https://ridgewellscatering.gethoneycart.com/"
              target="_blank"
              rel="noopener noreferrer"
              style={{ textDecoration: 'none' }}
            >
              <Button
                variant="outline"
                size="sm"
              >
                Order Now
              </Button>
            </a>
            <Link href="/inquire">
              <Button
                variant="purple"
                size="sm"
              >
                Inquire Now
              </Button>
            </Link>
          </div>

          {/* Mobile Right Controls: Mini CTA + Hamburger Button */}
          <div className="mobile-only" style={{ alignItems: 'center', gap: '8px' }}>
            <a
              href="https://ridgewellscatering.gethoneycart.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-luxury-outline"
              style={{ padding: '7px 11px', fontSize: '10.5px', textDecoration: 'none' }}
            >
              Menu
            </a>
            <Link href="/inquire" className="btn-luxury-purple" style={{ padding: '7px 12px', fontSize: '10.5px' }}>
              Inquire
            </Link>

            {/* Animated Luxury Hamburger Button */}
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle Navigation Menu"
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '4px',
                backgroundColor: '#FAF5FB',
                border: '1px solid rgba(89, 35, 103, 0.2)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '5px',
                padding: 0,
                cursor: 'pointer',
              }}
            >
              <span
                style={{
                  width: '20px',
                  height: '2px',
                  backgroundColor: '#592367',
                  borderRadius: '2px',
                  transition: 'all 0.3s ease',
                  transform: isMobileMenuOpen ? 'translateY(7px) rotate(45deg)' : 'none',
                }}
              />
              <span
                style={{
                  width: '20px',
                  height: '2px',
                  backgroundColor: '#592367',
                  borderRadius: '2px',
                  transition: 'all 0.3s ease',
                  opacity: isMobileMenuOpen ? 0 : 1,
                }}
              />
              <span
                style={{
                  width: '20px',
                  height: '2px',
                  backgroundColor: '#592367',
                  borderRadius: '2px',
                  transition: 'all 0.3s ease',
                  transform: isMobileMenuOpen ? 'translateY(-7px) rotate(-45deg)' : 'none',
                }}
              />
            </button>
          </div>
        </div>
      </header>

      {/* 3. Responsive Mobile Menu Drawer */}
      {isMobileMenuOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 3000,
            display: 'flex',
            justifyContent: 'flex-end',
          }}
        >
          {/* Backdrop Blur */}
          <div
            onClick={() => setIsMobileMenuOpen(false)}
            style={{
              position: 'absolute',
              inset: 0,
              backgroundColor: 'rgba(42, 9, 50, 0.65)',
              backdropFilter: 'blur(6px)',
              WebkitBackdropFilter: 'blur(6px)',
            }}
          />

          {/* Drawer Content */}
          <div
            style={{
              position: 'relative',
              width: '100%',
              maxWidth: '360px',
              height: '100%',
              backgroundColor: '#FFFFFF',
              boxShadow: '-10px 0 35px rgba(0,0,0,0.3)',
              display: 'flex',
              flexDirection: 'column',
              zIndex: 3001,
              overflowY: 'auto',
            }}
          >
            {/* Drawer Header */}
            <div
              style={{
                padding: '20px 24px',
                borderBottom: '1px solid rgba(89, 35, 103, 0.12)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                backgroundColor: '#FAF5FB',
              }}
            >
              <div>
                <span style={{ fontFamily: 'var(--font-serif)', fontSize: '24px', fontWeight: 700, color: '#592367', lineHeight: 1 }}>
                  ridgewells
                </span>
                <span style={{ display: 'block', fontSize: '8px', fontWeight: 800, letterSpacing: '0.3em', textTransform: 'uppercase', color: '#592367', marginTop: '2px' }}>
                  CATERING
                </span>
              </div>

              <button
                type="button"
                onClick={() => setIsMobileMenuOpen(false)}
                aria-label="Close mobile menu"
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  backgroundColor: '#FFFFFF',
                  border: '1px solid rgba(89, 35, 103, 0.2)',
                  color: '#592367',
                  fontSize: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                }}
              >
                ✕
              </button>
            </div>

            {/* Mobile Nav Links */}
            <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '8px', flex: 1 }}>
              <Link
                href="/inquire"
                onClick={() => setIsMobileMenuOpen(false)}
                style={{
                  padding: '12px 14px',
                  fontSize: '15px',
                  fontWeight: 800,
                  backgroundColor: '#FAF5FB',
                  borderRadius: '4px',
                  color: '#592367',
                  border: '1px solid rgba(89, 35, 103, 0.15)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <span>✨ Book An Event (Inquire)</span>
                <span>➔</span>
              </Link>

              <a
                href="/#heritage-about"
                onClick={(e) => handleNavClick(e, 'heritage-about')}
                style={{
                  padding: '12px 14px',
                  fontSize: '15px',
                  fontWeight: 700,
                  color: '#592367',
                  borderBottom: '1px solid rgba(89, 35, 103, 0.08)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <span>About Ridgewells</span>
                <span>➔</span>
              </a>

              {/* Events Accordion */}
              <div>
                <button
                  type="button"
                  onClick={() => setIsMobileEventsExpanded(!isMobileEventsExpanded)}
                  style={{
                    width: '100%',
                    padding: '12px 14px',
                    fontSize: '15px',
                    fontWeight: 700,
                    color: '#592367',
                    borderBottom: '1px solid rgba(89, 35, 103, 0.08)',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    cursor: 'pointer',
                  }}
                >
                  <span>Events & Galas</span>
                  <span style={{ fontSize: '10px', transform: isMobileEventsExpanded ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}>
                    ▼
                  </span>
                </button>

                {isMobileEventsExpanded && (
                  <div style={{ backgroundColor: '#FAF5FB', padding: '8px 16px', borderRadius: '4px', margin: '6px 0', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <a href="/#corporate" onClick={(e) => handleNavClick(e, 'corporate')} style={{ fontSize: '13.5px', color: '#592367', fontWeight: 600 }}>
                      ✦ Corporate Events & Galas
                    </a>
                    <a href="/#weddings" onClick={(e) => handleNavClick(e, 'weddings')} style={{ fontSize: '13.5px', color: '#592367', fontWeight: 600 }}>
                      ✦ Weddings & Celebrations
                    </a>
                    <a href="/#social" onClick={(e) => handleNavClick(e, 'social')} style={{ fontSize: '13.5px', color: '#592367', fontWeight: 600 }}>
                      ✦ Social Gatherings & Milestones
                    </a>
                    <a href="/#major-events" onClick={(e) => handleNavClick(e, 'major-events')} style={{ fontSize: '13.5px', color: '#592367', fontWeight: 600 }}>
                      ✦ Major Sporting Events (USGA)
                    </a>
                    <a href="/#venues" onClick={(e) => handleNavClick(e, 'venues')} style={{ fontSize: '13.5px', color: '#592367', fontWeight: 700 }}>
                      ✦ Mellon Auditorium
                    </a>
                  </div>
                )}
              </div>

              <a
                href="/#culinary"
                onClick={(e) => handleNavClick(e, 'culinary')}
                style={{
                  padding: '12px 14px',
                  fontSize: '15px',
                  fontWeight: 700,
                  color: '#592367',
                  borderBottom: '1px solid rgba(89, 35, 103, 0.08)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <span>The Party Kitchen</span>
                <span>➔</span>
              </a>

              <a
                href="/#venues"
                onClick={(e) => handleNavClick(e, 'venues')}
                style={{
                  padding: '12px 14px',
                  fontSize: '15px',
                  fontWeight: 700,
                  color: '#592367',
                  borderBottom: '1px solid rgba(89, 35, 103, 0.08)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <span>Landmark Venues</span>
                <span>➔</span>
              </a>

              <a
                href="/#showroom"
                onClick={(e) => handleNavClick(e, 'showroom')}
                style={{
                  padding: '12px 14px',
                  fontSize: '15px',
                  fontWeight: 700,
                  color: '#592367',
                  borderBottom: '1px solid rgba(89, 35, 103, 0.08)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <span>Bethesda Tasting Suite</span>
                <span>➔</span>
              </a>

              {/* Mobile Actions in Drawer */}
              <div style={{ marginTop: '24px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <Button
                  variant="purple"
                  fullWidth
                  arrow
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    window.location.href = '/inquire';
                  }}
                >
                  Inquire For Your Event
                </Button>

                <a
                  href="https://ridgewellscatering.gethoneycart.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ textDecoration: 'none', width: '100%' }}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Button
                    variant="outline"
                    fullWidth
                  >
                    View Menu & Order
                  </Button>
                </a>
              </div>

              {/* Direct Call & Address info at bottom of drawer */}
              <div style={{ marginTop: 'auto', paddingTop: '20px', borderTop: '1px solid rgba(89, 35, 103, 0.1)', fontSize: '13px', color: '#736D78' }}>
                <p style={{ fontWeight: 700, color: '#592367', marginBottom: '4px' }}>Bethesda Showroom & Kitchens</p>
                <p>5522 Dorsey Lane, Bethesda, MD</p>
                <p style={{ marginTop: '8px' }}>
                  <a href="tel:+13016521515" style={{ color: '#592367', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                    (301) 652-1515
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
