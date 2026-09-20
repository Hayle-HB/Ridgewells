'use client';

import React, { useState } from 'react';
import { EventDateTimePicker } from '../ui/EventDateTimePicker';

interface BespokeInquiryFormProps {
  initialEventType?: string;
  initialVenue?: string;
  initialGuests?: number;
}

const EVENT_RADIO_OPTIONS = [
  { id: 'CORPORATE', label: 'Corporate Event' },
  { id: 'WEDDING', label: 'Wedding' },
  { id: 'GALA_SOCIAL', label: 'Social Event' },
  { id: 'MAJOR_EVENT', label: 'Major Sporting Event' },
  { id: 'TASTING', label: 'Bethesda Tasting Room' },
];

const BUDGET_OPTIONS = [
  'Select estimated budget range...',
  '$10,000 – $25,000',
  '$25,000 – $50,000',
  '$50,000 – $100,000',
  '$100,000 – $250,000',
  '$250,000+',
  'Custom / To Be Determined',
];

const REFERRAL_OPTIONS = [
  'Select how you heard about us...',
  'Search Engine (Google / Bing)',
  'Andrew W. Mellon Auditorium Referral',
  'Attended a Past Ridgewells Event',
  'Friend / Colleague Recommendation',
  'Social Media (Instagram / LinkedIn)',
  'Venue / Event Planner Referral',
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
    startTime: '6:00 PM (Evening Reception)',
    endTime: '10:30 PM',
    guestCount: initialGuests,
    budgetRange: '$25,000 – $50,000',
    dietaryNotes: '',
    referralSource: 'Select how you heard about us...',
    notes: '',
  });

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
      errors.firstName = 'Please enter your first name.';
    }
    if (!formData.lastName.trim()) {
      errors.lastName = 'Please enter your last name.';
    }
    if (!formData.phone.trim()) {
      errors.phone = 'Please enter your phone number.';
    } else if (formData.phone.trim().length < 7) {
      errors.phone = 'Please enter a valid telephone number (e.g. 301-652-1515).';
    }
    if (!formData.email.trim()) {
      errors.email = 'Please enter your email address.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      errors.email = 'Please enter a valid email address (e.g. name@organization.com).';
    }
    if (!formData.eventDate.trim()) {
      errors.eventDate = 'Please select your target event date on the calendar.';
    }
    if (!formData.guestCount || Number(formData.guestCount) <= 0) {
      errors.guestCount = 'Please specify the estimated number of guests.';
    }

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);

      // Smoothly scroll to and focus the first invalid input box
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
        window.scrollTo({ top: 300, behavior: 'smooth' });
      } else {
        setErrorMessage(json.error || 'Unable to submit inquiry. Please verify your details.');
      }
    } catch {
      setErrorMessage('Network error connecting to backend. Please verify server status.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div style={{ width: '100%' }}>
      {submitSuccess ? (
        /* SUCCESS CONFIRMATION */
        <div
          style={{
            padding: 'clamp(48px, 6vw, 80px) 0',
            textAlign: 'center',
            maxWidth: '720px',
            margin: '0 auto',
          }}
        >
          <div
            style={{
              width: '60px',
              height: '60px',
              borderRadius: '50%',
              backgroundColor: '#FAF5FB',
              color: '#592367',
              fontSize: '24px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 20px',
              border: '1.5px solid #592367',
            }}
          >
            ✓
          </div>

          <span
            style={{
              fontSize: '11px',
              fontWeight: 800,
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: '#9F8055',
              display: 'block',
              marginBottom: '10px',
            }}
          >
            INQUIRY RECEIVED • REF #{submitSuccess.inquiryId?.slice(0, 8).toUpperCase() || 'RG-2026'}
          </span>

          <h2
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(32px, 4vw, 44px)',
              fontWeight: 400,
              color: '#592367',
              lineHeight: 1.2,
              marginBottom: '18px',
            }}
          >
            Thank You, {submitSuccess.customer?.fullName || formData.firstName}
          </h2>

          <p
            style={{
              fontSize: '16px',
              color: '#47434B',
              lineHeight: 1.8,
              marginBottom: '32px',
            }}
          >
            We have received your event vision for <strong>{formData.guestCount} guests</strong> at{' '}
            <strong>{formData.venuePreference}</strong>. A Senior Catering Director has been assigned to your date and will contact you within 1 business day.
          </p>

          <div
            style={{
              backgroundColor: '#FAF5FB',
              border: '1px solid rgba(89, 35, 103, 0.15)',
              padding: '24px 32px',
              textAlign: 'left',
              marginBottom: '36px',
              fontSize: '14px',
              lineHeight: 1.8,
            }}
          >
            <p><strong>Division Assigned:</strong> {submitSuccess.brandDivision || 'Ridgewells Executive Catering'}</p>
            <p><strong>Direct Concierge Desk:</strong> (301) 652-1515 • info@ridgewells.com</p>
            <p><strong>Showroom Suites:</strong> 5522 Dorsey Lane, Bethesda, MD 20816</p>
          </div>

          <button
            type="button"
            onClick={() => {
              window.location.href = '/';
            }}
            className="btn-luxury-purple"
            style={{ padding: '16px 48px' }}
          >
            Return to Homepage ➔
          </button>
        </div>
      ) : (
        /* NATURAL FULL-WIDTH EDITORIAL FORM */
        <form onSubmit={handleSubmit} noValidate style={{ width: '100%' }}>
          {errorMessage && (
            <div
              style={{
                backgroundColor: '#FAF5FB',
                border: '1px solid #DC2626',
                color: '#DC2626',
                padding: '14px 20px',
                fontSize: '14px',
                fontWeight: 600,
                marginBottom: '28px',
                borderRadius: '2px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
              }}
            >
              <span>⚠️</span>
              <span>{errorMessage}</span>
            </div>
          )}

          {/* 1. Radio Event Category Bar (Matching Real Website) */}
          <div style={{ marginBottom: '36px' }}>
            <label className="inquiry-field-label" style={{ marginBottom: '14px' }}>
              Select Event Type <span className="required-star">*</span>
            </label>
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '20px 28px',
                alignItems: 'center',
              }}
            >
              {EVENT_RADIO_OPTIONS.map((opt) => {
                const isSelected = formData.eventType === opt.id;
                return (
                  <label
                    key={opt.id}
                    onClick={() => handleFieldChange('eventType', opt.id)}
                    className="inquiry-radio-label"
                    style={{
                      color: isSelected ? '#592367' : '#2B2330',
                      fontWeight: isSelected ? 600 : 400,
                    }}
                  >
                    <span
                      className="inquiry-radio-dot"
                      style={{
                        border: isSelected ? '5px solid #592367' : '1.5px solid #A39EAA',
                      }}
                    />
                    <span>{opt.label}</span>
                  </label>
                );
              })}
            </div>
          </div>

          {/* 2. Personal Contact Fields (2 Columns) */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
              gap: '24px 32px',
              marginBottom: '28px',
            }}
          >
            <div>
              <label htmlFor="inquiry-firstName" className="inquiry-field-label">
                First Name <span className="required-star">*</span>
              </label>
              <input
                id="inquiry-firstName"
                type="text"
                className="inquiry-text-input"
                placeholder="First Name"
                value={formData.firstName}
                onChange={(e) => handleFieldChange('firstName', e.target.value)}
                style={{
                  borderColor: fieldErrors.firstName ? '#DC2626' : undefined,
                  boxShadow: fieldErrors.firstName ? '0 0 0 3px rgba(220, 38, 38, 0.12)' : undefined,
                }}
              />
              {fieldErrors.firstName && (
                <p style={{ color: '#DC2626', fontSize: '12.5px', marginTop: '6px', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <span>⚠️</span> {fieldErrors.firstName}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="inquiry-lastName" className="inquiry-field-label">
                Last Name <span className="required-star">*</span>
              </label>
              <input
                id="inquiry-lastName"
                type="text"
                className="inquiry-text-input"
                placeholder="Last Name"
                value={formData.lastName}
                onChange={(e) => handleFieldChange('lastName', e.target.value)}
                style={{
                  borderColor: fieldErrors.lastName ? '#DC2626' : undefined,
                  boxShadow: fieldErrors.lastName ? '0 0 0 3px rgba(220, 38, 38, 0.12)' : undefined,
                }}
              />
              {fieldErrors.lastName && (
                <p style={{ color: '#DC2626', fontSize: '12.5px', marginTop: '6px', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <span>⚠️</span> {fieldErrors.lastName}
                </p>
              )}
            </div>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
              gap: '24px 32px',
              marginBottom: '28px',
            }}
          >
            <div>
              <label htmlFor="inquiry-phone" className="inquiry-field-label">
                Phone Number <span className="required-star">*</span>
              </label>
              <input
                id="inquiry-phone"
                type="tel"
                className="inquiry-text-input"
                placeholder="(301) 652-1515"
                value={formData.phone}
                onChange={(e) => handleFieldChange('phone', e.target.value)}
                style={{
                  borderColor: fieldErrors.phone ? '#DC2626' : undefined,
                  boxShadow: fieldErrors.phone ? '0 0 0 3px rgba(220, 38, 38, 0.12)' : undefined,
                }}
              />
              {fieldErrors.phone && (
                <p style={{ color: '#DC2626', fontSize: '12.5px', marginTop: '6px', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <span>⚠️</span> {fieldErrors.phone}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="inquiry-email" className="inquiry-field-label">
                Email Address <span className="required-star">*</span>
              </label>
              <input
                id="inquiry-email"
                type="email"
                className="inquiry-text-input"
                placeholder="name@organization.com"
                value={formData.email}
                onChange={(e) => handleFieldChange('email', e.target.value)}
                style={{
                  borderColor: fieldErrors.email ? '#DC2626' : undefined,
                  boxShadow: fieldErrors.email ? '0 0 0 3px rgba(220, 38, 38, 0.12)' : undefined,
                }}
              />
              {fieldErrors.email && (
                <p style={{ color: '#DC2626', fontSize: '12.5px', marginTop: '6px', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <span>⚠️</span> {fieldErrors.email}
                </p>
              )}
            </div>
          </div>

          {/* 3. Reusable Responsive Date & Time Picker */}
          <div style={{ marginBottom: '28px' }}>
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

          {/* 4. Venue & Budget & Guests Details */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
              gap: '24px 32px',
              marginBottom: '28px',
            }}
          >
            <div>
              <label htmlFor="inquiry-venuePreference" className="inquiry-field-label">
                Event Location / Venue Preference
              </label>
              <input
                id="inquiry-venuePreference"
                type="text"
                className="inquiry-text-input"
                placeholder="e.g. Andrew W. Mellon Auditorium, Private Residence..."
                value={formData.venuePreference}
                onChange={(e) => handleFieldChange('venuePreference', e.target.value)}
              />
            </div>

            <div>
              <label htmlFor="inquiry-organization" className="inquiry-field-label">
                Company / Host Organization (Optional)
              </label>
              <input
                id="inquiry-organization"
                type="text"
                className="inquiry-text-input"
                placeholder="e.g. Smithsonian, Embassy, Private Family..."
                value={formData.organization}
                onChange={(e) => handleFieldChange('organization', e.target.value)}
              />
            </div>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
              gap: '24px 32px',
              marginBottom: '28px',
            }}
          >
            <div>
              <label htmlFor="inquiry-guestCount" className="inquiry-field-label">
                Number of Guests <span className="required-star">*</span>
              </label>
              <input
                id="inquiry-guestCount"
                type="number"
                min={1}
                className="inquiry-text-input"
                value={formData.guestCount}
                onChange={(e) => handleFieldChange('guestCount', Number(e.target.value))}
                style={{
                  borderColor: fieldErrors.guestCount ? '#DC2626' : undefined,
                  boxShadow: fieldErrors.guestCount ? '0 0 0 3px rgba(220, 38, 38, 0.12)' : undefined,
                }}
              />
              {fieldErrors.guestCount && (
                <p style={{ color: '#DC2626', fontSize: '12.5px', marginTop: '6px', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <span>⚠️</span> {fieldErrors.guestCount}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="inquiry-budgetRange" className="inquiry-field-label">
                Estimated Total Catering Budget <span className="required-star">*</span>
              </label>
              <select
                id="inquiry-budgetRange"
                className="inquiry-select-input"
                value={formData.budgetRange}
                onChange={(e) => handleFieldChange('budgetRange', e.target.value)}
              >
                {BUDGET_OPTIONS.map((b, i) => (
                  <option key={i} value={b}>
                    {b}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* 5. Notes & Referrals */}
          <div style={{ marginBottom: '28px' }}>
            <label htmlFor="inquiry-notes" className="inquiry-field-label">
              Any other details we should know?
            </label>
            <textarea
              id="inquiry-notes"
              rows={4}
              className="inquiry-textarea"
              placeholder="Tell us about your culinary preferences, theme, dietary requirements, or any special requests..."
              value={formData.notes}
              onChange={(e) => handleFieldChange('notes', e.target.value)}
            />
          </div>

          <div style={{ marginBottom: '40px' }}>
            <label htmlFor="inquiry-referralSource" className="inquiry-field-label">
              How did you hear about us?
            </label>
            <select
              id="inquiry-referralSource"
              className="inquiry-select-input"
              value={formData.referralSource}
              onChange={(e) => handleFieldChange('referralSource', e.target.value)}
            >
              {REFERRAL_OPTIONS.map((r, i) => (
                <option key={i} value={r}>
                  {r}
                </option>
              ))}
            </select>
          </div>

          {/* 6. Submit Button */}
          <div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-luxury-purple"
              style={{
                padding: '16px 56px',
                fontSize: '13px',
                letterSpacing: '0.16em',
                borderRadius: '2px',
              }}
            >
              {isSubmitting ? 'SUBMITTING...' : 'SUBMIT'}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}


