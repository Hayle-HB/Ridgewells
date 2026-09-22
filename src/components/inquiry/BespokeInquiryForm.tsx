'use client';

import React, { useState } from 'react';
import { EventDateTimePicker } from '../ui/EventDateTimePicker';

interface BespokeInquiryFormProps {
  initialEventType?: string;
  initialVenue?: string;
  initialGuests?: number;
}

const EVENT_CATEGORIES = [
  { id: 'CORPORATE', label: 'Corporate Gala' },
  { id: 'WEDDING', label: 'Bespoke Wedding' },
  { id: 'GALA_SOCIAL', label: 'Social Milestone' },
  { id: 'MAJOR_EVENT', label: 'Major Sporting Event' },
  { id: 'TASTING', label: 'Bethesda Tasting Suite' },
];

const BUDGET_TIERS = [
  { id: '$10,000 – $25,000', label: '$10K – $25K' },
  { id: '$25,000 – $50,000', label: '$25K – $50K' },
  { id: '$50,000 – $100,000', label: '$50K – $100K' },
  { id: '$100,000 – $250,000', label: '$100K – $250K' },
  { id: '$250,000+', label: '$250K+' },
  { id: 'Custom / To Be Determined', label: 'Custom / TBD' },
];

const REFERRAL_OPTIONS = [
  'Select how you heard about us...',
  'Andrew W. Mellon Auditorium',
  'Attended a Past Ridgewells Event',
  'Venue / Event Planner Referral',
  'Friend or Colleague Recommendation',
  'Search (Google / Bing)',
  'Social Media (Instagram / LinkedIn)',
  'Other',
];

export function BespokeInquiryForm({
  initialEventType = 'CORPORATE',
  initialVenue = 'Andrew W. Mellon Auditorium',
  initialGuests = 150,
}: BespokeInquiryFormProps) {
  const [formData, setFormData] = useState({
    eventType: initialEventType,
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    organization: '',
    eventDate: '',
    venuePreference: initialVenue,
    startTime: '6:00 PM',
    endTime: '10:30 PM',
    guestCount: initialGuests,
    budgetRange: '$25,000 – $50,000',
    dietaryNotes: '',
    referralSource: 'Select how you heard about us...',
    notes: '',
  });

  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState<any | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleFieldChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (fieldErrors[field]) {
      setFieldErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    const errors: { [key: string]: string } = {};

    if (!formData.firstName.trim()) {
      errors.firstName = 'First name is required.';
    }
    if (!formData.lastName.trim()) {
      errors.lastName = 'Last name is required.';
    }
    if (!formData.phone.trim()) {
      errors.phone = 'Phone number is required.';
    } else if (formData.phone.trim().length < 7) {
      errors.phone = 'Please provide a valid phone number.';
    }
    if (!formData.email.trim()) {
      errors.email = 'Email address is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      errors.email = 'Please provide a valid email address.';
    }
    if (!formData.eventDate.trim()) {
      errors.eventDate = 'Please select a target event date.';
    }
    if (!formData.guestCount || Number(formData.guestCount) <= 0) {
      errors.guestCount = 'Please indicate estimated guest count.';
    }

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);

      const focusOrder = ['firstName', 'lastName', 'phone', 'email', 'eventDate', 'guestCount'];
      for (const key of focusOrder) {
        if (errors[key]) {
          const targetId = key === 'eventDate' ? 'inquiry-date' : `inquiry-${key}`;
          const targetEl = document.getElementById(targetId);
          if (targetEl) {
            targetEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
            targetEl.focus();
          }
          break;
        }
      }
      return;
    }

    setIsSubmitting(true);

    try {
      const budgetClean = parseInt(formData.budgetRange.replace(/[^0-9]/g, ''), 10) || 35000;
      const fullName = `${formData.firstName} ${formData.lastName}`.trim();

      const payload = {
        customer: {
          fullName,
          email: formData.email.trim(),
          phone: formData.phone.trim(),
          organization: formData.organization.trim() || undefined,
        },
        eventDetails: {
          eventType: formData.eventType,
          eventDate: formData.eventDate.trim() || undefined,
          estimatedGuestCount: Number(formData.guestCount),
          estimatedBudget: budgetClean,
          venuePreference: formData.venuePreference,
          dietaryRestrictions: formData.dietaryNotes ? [formData.dietaryNotes] : [],
          notes: `[Schedule: ${formData.startTime || 'TBD'} - ${formData.endTime || 'TBD'}] [Referral: ${formData.referralSource}] ${formData.notes}`.trim(),
        },
      };

      const res = await fetch('http://localhost:4000/api/v1/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const json = await res.json();
      if (res.ok && json.success) {
        setSubmitSuccess(json.data);
        window.scrollTo({ top: 250, behavior: 'smooth' });
      } else {
        setErrorMessage(json.error || 'Unable to submit your inquiry. Please review your details.');
      }
    } catch {
      setErrorMessage('Network connection error. Please call our concierge team at (301) 652-1515.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div style={{ width: '100%' }}>
      {submitSuccess ? (
        /* MINIMALIST BLACK & WHITE SUCCESS CONFIRMATION */
        <div
          style={{
            padding: 'clamp(40px, 5vw, 64px) clamp(24px, 4vw, 40px)',
            textAlign: 'center',
            maxWidth: '640px',
            margin: '0 auto',
            backgroundColor: '#FFFFFF',
            border: '1px solid #000000',
          }}
        >
          <div
            style={{
              width: '48px',
              height: '48px',
              border: '1px solid #000000',
              color: '#000000',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '18px',
              margin: '0 auto 20px',
              fontFamily: 'var(--font-editorial)',
            }}
          >
            ✦
          </div>

          <span
            style={{
              fontSize: '9.5px',
              fontWeight: 700,
              letterSpacing: '0.24em',
              textTransform: 'uppercase',
              color: '#666666',
              display: 'block',
              marginBottom: '10px',
            }}
          >
            INQUIRY RECEIVED • REF #{submitSuccess.inquiryId?.slice(0, 8).toUpperCase() || 'RG-1928'}
          </span>

          <h2
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(26px, 3.5vw, 36px)',
              fontWeight: 400,
              color: '#000000',
              marginBottom: '14px',
              letterSpacing: '-0.01em',
            }}
          >
            Thank You, {submitSuccess.customer?.fullName || formData.firstName}
          </h2>

          <p
            style={{
              fontSize: '14.5px',
              color: '#444444',
              lineHeight: 1.7,
              maxWidth: '480px',
              margin: '0 auto 32px',
              fontFamily: 'var(--font-sans)',
            }}
          >
            We have received your event vision for <strong>{formData.guestCount} guests</strong>. A Senior Catering Director has been assigned to personally review your culinary specifications and connect with you within one business day.
          </p>

          <button
            type="button"
            onClick={() => (window.location.href = '/')}
            style={{
              backgroundColor: '#000000',
              color: '#FFFFFF',
              border: '1px solid #000000',
              padding: '14px 36px',
              fontSize: '11px',
              fontWeight: 700,
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              cursor: 'pointer',
              transition: 'background-color 0.2s ease',
            }}
          >
            Return to Homepage
          </button>
        </div>
      ) : (
        /* MINIMALIST ALL-WHITE & BLACK LUXURY CONSULTATION FORM */
        <form onSubmit={handleSubmit} noValidate style={{ width: '100%' }}>
          {errorMessage && (
            <div
              style={{
                backgroundColor: '#FFFFFF',
                border: '1px solid #B91C1C',
                color: '#B91C1C',
                padding: '12px 16px',
                fontSize: '13px',
                lineHeight: 1.5,
                marginBottom: '16px',
              }}
            >
              {errorMessage}
            </div>
          )}

          <div
            style={{
              backgroundColor: '#FFFFFF',
              border: '1px solid #E5E5E5',
              padding: 'clamp(20px, 3.5vw, 32px)',
            }}
          >
            {/* ═══════════════════════════════════════════
                PART 1: THE OCCASION (COMPACT TILES & TIMING)
            ═══════════════════════════════════════════ */}
            <div className="inquiry-section-header">
              <h3 className="inquiry-section-title">The Occasion</h3>
              <span className="inquiry-section-step">Specifications</span>
            </div>

            {/* Event Choice (Concise, no descriptions, all-white bg with black active) */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 140px), 1fr))',
                gap: '8px',
                marginBottom: '18px',
              }}
            >
              {EVENT_CATEGORIES.map((cat) => {
                const isSelected = formData.eventType === cat.id;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => handleFieldChange('eventType', cat.id)}
                    style={{
                      padding: '11px 8px',
                      border: isSelected ? '1px solid #000000' : '1px solid #E5E5E5',
                      backgroundColor: isSelected ? '#000000' : '#FFFFFF',
                      color: isSelected ? '#FFFFFF' : '#000000',
                      cursor: 'pointer',
                      textAlign: 'center',
                      fontFamily: 'var(--font-serif)',
                      fontSize: '13px',
                      fontWeight: isSelected ? 600 : 400,
                      transition: 'all 0.15s ease',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                    }}
                  >
                    {cat.label}
                  </button>
                );
              })}
            </div>

            {/* Date & Timing Row (Clean times, no extra text) */}
            <div style={{ marginBottom: '14px' }}>
              <EventDateTimePicker
                date={formData.eventDate}
                startTime={formData.startTime}
                endTime={formData.endTime}
                onDateChange={(d) => handleFieldChange('eventDate', d)}
                onStartTimeChange={(t) => handleFieldChange('startTime', t)}
                onEndTimeChange={(t) => handleFieldChange('endTime', t)}
                dateError={fieldErrors.eventDate}
                idPrefix="inquiry"
              />
            </div>

            {/* Venue & Guest Count (Floating Labels Side by Side) */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 240px), 1fr))',
                gap: '12px 16px',
                marginBottom: '24px',
              }}
            >
              <div
                className={`floating-field-wrapper ${
                  focusedField === 'venuePreference' || formData.venuePreference ? 'is-floating' : ''
                } ${formData.venuePreference ? 'has-value' : ''} ${
                  focusedField === 'venuePreference' ? 'is-focused' : ''
                }`}
              >
                <input
                  id="inquiry-venuePreference"
                  type="text"
                  className="floating-field-input"
                  value={formData.venuePreference}
                  onFocus={() => setFocusedField('venuePreference')}
                  onBlur={() => setFocusedField(null)}
                  onChange={(e) => handleFieldChange('venuePreference', e.target.value)}
                />
                <label htmlFor="inquiry-venuePreference" className="floating-field-label">
                  Venue or Location Preference
                </label>
              </div>

              <div
                className={`floating-field-wrapper ${
                  focusedField === 'guestCount' || formData.guestCount ? 'is-floating' : ''
                } ${formData.guestCount ? 'has-value' : ''} ${
                  focusedField === 'guestCount' ? 'is-focused' : ''
                } ${fieldErrors.guestCount ? 'has-error' : ''}`}
              >
                <input
                  id="inquiry-guestCount"
                  type="number"
                  min={1}
                  className="floating-field-input"
                  value={formData.guestCount || ''}
                  onFocus={() => setFocusedField('guestCount')}
                  onBlur={() => setFocusedField(null)}
                  onChange={(e) => handleFieldChange('guestCount', Number(e.target.value))}
                />
                <label htmlFor="inquiry-guestCount" className="floating-field-label">
                  Estimated Guest Count <span>*</span>
                </label>
                {fieldErrors.guestCount && (
                  <p className="floating-field-error-text">{fieldErrors.guestCount}</p>
                )}
              </div>
            </div>

            {/* ═══════════════════════════════════════════
                PART 2: HOST CONTACT (FLOATING LABELS)
            ═══════════════════════════════════════════ */}
            <div className="inquiry-section-header">
              <h3 className="inquiry-section-title">Host Details</h3>
              <span className="inquiry-section-step">Contact</span>
            </div>

            {/* First Name & Last Name (Floating Labels) */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 220px), 1fr))',
                gap: '12px 16px',
                marginBottom: '12px',
              }}
            >
              <div
                className={`floating-field-wrapper ${
                  focusedField === 'firstName' || formData.firstName ? 'is-floating' : ''
                } ${formData.firstName ? 'has-value' : ''} ${
                  focusedField === 'firstName' ? 'is-focused' : ''
                } ${fieldErrors.firstName ? 'has-error' : ''}`}
              >
                <input
                  id="inquiry-firstName"
                  type="text"
                  className="floating-field-input"
                  value={formData.firstName}
                  onFocus={() => setFocusedField('firstName')}
                  onBlur={() => setFocusedField(null)}
                  onChange={(e) => handleFieldChange('firstName', e.target.value)}
                />
                <label htmlFor="inquiry-firstName" className="floating-field-label">
                  First Name <span>*</span>
                </label>
                {fieldErrors.firstName && (
                  <p className="floating-field-error-text">{fieldErrors.firstName}</p>
                )}
              </div>

              <div
                className={`floating-field-wrapper ${
                  focusedField === 'lastName' || formData.lastName ? 'is-floating' : ''
                } ${formData.lastName ? 'has-value' : ''} ${
                  focusedField === 'lastName' ? 'is-focused' : ''
                } ${fieldErrors.lastName ? 'has-error' : ''}`}
              >
                <input
                  id="inquiry-lastName"
                  type="text"
                  className="floating-field-input"
                  value={formData.lastName}
                  onFocus={() => setFocusedField('lastName')}
                  onBlur={() => setFocusedField(null)}
                  onChange={(e) => handleFieldChange('lastName', e.target.value)}
                />
                <label htmlFor="inquiry-lastName" className="floating-field-label">
                  Last Name <span>*</span>
                </label>
                {fieldErrors.lastName && (
                  <p className="floating-field-error-text">{fieldErrors.lastName}</p>
                )}
              </div>
            </div>

            {/* Telephone & Email (Floating Labels) */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 220px), 1fr))',
                gap: '12px 16px',
                marginBottom: '12px',
              }}
            >
              <div
                className={`floating-field-wrapper ${
                  focusedField === 'phone' || formData.phone ? 'is-floating' : ''
                } ${formData.phone ? 'has-value' : ''} ${
                  focusedField === 'phone' ? 'is-focused' : ''
                } ${fieldErrors.phone ? 'has-error' : ''}`}
              >
                <input
                  id="inquiry-phone"
                  type="tel"
                  className="floating-field-input"
                  value={formData.phone}
                  onFocus={() => setFocusedField('phone')}
                  onBlur={() => setFocusedField(null)}
                  onChange={(e) => handleFieldChange('phone', e.target.value)}
                />
                <label htmlFor="inquiry-phone" className="floating-field-label">
                  Telephone Number <span>*</span>
                </label>
                {fieldErrors.phone && (
                  <p className="floating-field-error-text">{fieldErrors.phone}</p>
                )}
              </div>

              <div
                className={`floating-field-wrapper ${
                  focusedField === 'email' || formData.email ? 'is-floating' : ''
                } ${formData.email ? 'has-value' : ''} ${
                  focusedField === 'email' ? 'is-focused' : ''
                } ${fieldErrors.email ? 'has-error' : ''}`}
              >
                <input
                  id="inquiry-email"
                  type="email"
                  className="floating-field-input"
                  value={formData.email}
                  onFocus={() => setFocusedField('email')}
                  onBlur={() => setFocusedField(null)}
                  onChange={(e) => handleFieldChange('email', e.target.value)}
                />
                <label htmlFor="inquiry-email" className="floating-field-label">
                  Email Address <span>*</span>
                </label>
                {fieldErrors.email && (
                  <p className="floating-field-error-text">{fieldErrors.email}</p>
                )}
              </div>
            </div>

            {/* Organization & Referral Source (Floating Labels) */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 220px), 1fr))',
                gap: '12px 16px',
                marginBottom: '24px',
              }}
            >
              <div
                className={`floating-field-wrapper ${
                  focusedField === 'organization' || formData.organization ? 'is-floating' : ''
                } ${formData.organization ? 'has-value' : ''} ${
                  focusedField === 'organization' ? 'is-focused' : ''
                }`}
              >
                <input
                  id="inquiry-organization"
                  type="text"
                  className="floating-field-input"
                  value={formData.organization}
                  onFocus={() => setFocusedField('organization')}
                  onBlur={() => setFocusedField(null)}
                  onChange={(e) => handleFieldChange('organization', e.target.value)}
                />
                <label htmlFor="inquiry-organization" className="floating-field-label">
                  Company, Organization, or Family (Optional)
                </label>
              </div>

              <div className="floating-field-wrapper is-floating has-value">
                <select
                  id="inquiry-referralSource"
                  className="floating-field-select"
                  value={formData.referralSource}
                  onChange={(e) => handleFieldChange('referralSource', e.target.value)}
                >
                  {REFERRAL_OPTIONS.map((r, i) => (
                    <option key={i} value={r}>
                      {r}
                    </option>
                  ))}
                </select>
                <label htmlFor="inquiry-referralSource" className="floating-field-label">
                  How Did You Hear About Us?
                </label>
              </div>
            </div>

            {/* ═══════════════════════════════════════════
                PART 3: CULINARY & BUDGET VISION
            ═══════════════════════════════════════════ */}
            <div className="inquiry-section-header">
              <h3 className="inquiry-section-title">Budget & Notes</h3>
              <span className="inquiry-section-step">Parameters</span>
            </div>

            {/* Minimalist Compact Budget Tiers */}
            <div style={{ marginBottom: '14px' }}>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 1fr))',
                  gap: '6px',
                }}
              >
                {BUDGET_TIERS.map((tier) => {
                  const isSelected = formData.budgetRange === tier.id;
                  return (
                    <button
                      key={tier.id}
                      type="button"
                      onClick={() => handleFieldChange('budgetRange', tier.id)}
                      style={{
                        padding: '9px 6px',
                        fontSize: '12px',
                        fontWeight: isSelected ? 600 : 400,
                        border: isSelected ? '1px solid #000000' : '1px solid #E5E5E5',
                        backgroundColor: isSelected ? '#000000' : '#FFFFFF',
                        color: isSelected ? '#FFFFFF' : '#000000',
                        cursor: 'pointer',
                        transition: 'all 0.15s ease',
                        textAlign: 'center',
                      }}
                    >
                      {tier.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Special Requests Floating Textarea */}
            <div
              className={`floating-field-wrapper ${
                focusedField === 'notes' || formData.notes ? 'is-floating' : ''
              } ${formData.notes ? 'has-value' : ''} ${focusedField === 'notes' ? 'is-focused' : ''}`}
              style={{ marginBottom: '24px' }}
            >
              <textarea
                id="inquiry-notes"
                rows={2}
                className="floating-field-textarea"
                value={formData.notes}
                onFocus={() => setFocusedField('notes')}
                onBlur={() => setFocusedField(null)}
                onChange={(e) => handleFieldChange('notes', e.target.value)}
              />
              <label htmlFor="inquiry-notes" className="floating-field-label">
                Culinary Preferences or Special Notes (Optional)
              </label>
            </div>

            {/* ═══════════════════════════════════════════
                SUBMIT ACTION (SOLID BLACK LUXURY BUTTON)
            ═══════════════════════════════════════════ */}
            <div style={{ textAlign: 'center', maxWidth: '480px', margin: '0 auto' }}>
              <button
                type="submit"
                disabled={isSubmitting}
                style={{
                  width: '100%',
                  backgroundColor: '#000000',
                  color: '#FFFFFF',
                  border: '1px solid #000000',
                  padding: '16px 32px',
                  fontSize: '11px',
                  fontWeight: 700,
                  letterSpacing: '0.22em',
                  textTransform: 'uppercase',
                  cursor: isSubmitting ? 'not-allowed' : 'pointer',
                  transition: 'background-color 0.2s ease, color 0.2s ease',
                }}
                onMouseEnter={(e) => {
                  if (!isSubmitting) {
                    e.currentTarget.style.backgroundColor = '#222222';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isSubmitting) {
                    e.currentTarget.style.backgroundColor = '#000000';
                  }
                }}
              >
                {isSubmitting ? 'SUBMITTING...' : 'REQUEST CONSULTATION ➔'}
              </button>

              <p
                style={{
                  marginTop: '10px',
                  fontSize: '11.5px',
                  color: '#777777',
                  letterSpacing: '0.01em',
                  lineHeight: 1.5,
                }}
              >
                An event director will review your specifications and contact you within one business day.
              </p>
            </div>
          </div>
        </form>
      )}
    </div>
  );
}
