'use client';

import React, { useState, useEffect } from 'react';
import { Button } from './ui';

interface InquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialData?: {
    eventType?: string;
    venue?: string;
    guests?: number;
  };
}

export function InquiryModal({ isOpen, onClose, initialData }: InquiryModalProps) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    organization: '',
    eventType: 'CORPORATE',
    eventDate: '',
    estimatedGuestCount: 150,
    estimatedBudget: 35000,
    venuePreference: 'Andrew W. Mellon Auditorium',
    dietaryRestrictions: [] as string[],
    notes: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitResult, setSubmitResult] = useState<any | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    if (initialData) {
      setFormData((prev) => ({
        ...prev,
        eventType: initialData.eventType || prev.eventType,
        venuePreference: initialData.venue || prev.venuePreference,
        estimatedGuestCount: initialData.guests || prev.estimatedGuestCount,
      }));
    }
  }, [initialData]);

  if (!isOpen) return null;

  const handleDietaryToggle = (item: string) => {
    setFormData((prev) => ({
      ...prev,
      dietaryRestrictions: prev.dietaryRestrictions.includes(item)
        ? prev.dietaryRestrictions.filter((d) => d !== item)
        : [...prev.dietaryRestrictions, item],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMsg(null);

    try {
      const payload = {
        customer: {
          fullName: formData.fullName.trim(),
          email: formData.email.trim(),
          phone: formData.phone.trim(),
          organization: formData.organization.trim() || undefined,
        },
        eventDetails: {
          eventType: formData.eventType,
          eventDate: formData.eventDate.trim() || undefined,
          estimatedGuestCount: Number(formData.estimatedGuestCount),
          estimatedBudget: Number(formData.estimatedBudget),
          venuePreference: formData.venuePreference,
          dietaryRestrictions: formData.dietaryRestrictions,
          notes: formData.notes.trim() || undefined,
        },
      };

      const res = await fetch('http://localhost:4000/api/v1/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const json = await res.json();
      if (res.ok && json.success) {
        setSubmitResult(json.data);
      } else {
        setErrorMsg(json.error || 'Failed to submit inquiry. Please verify your contact information.');
      }
    } catch (err: any) {
      setErrorMsg('Network error connecting to Ridgewells backend server. Please verify backend is running on port 4000.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetAndClose = () => {
    setSubmitResult(null);
    setErrorMsg(null);
    setStep(1);
    onClose();
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(42, 9, 50, 0.75)',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
        zIndex: 2000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 'clamp(8px, 3vw, 24px)',
        overflowY: 'auto',
      }}
    >
      <div
        style={{
          backgroundColor: '#FFFFFF',
          borderRadius: '12px',
          maxWidth: '640px',
          width: '100%',
          maxHeight: '92vh',
          boxShadow: '0 25px 60px rgba(0, 0, 0, 0.35)',
          border: '1px solid rgba(89, 35, 103, 0.2)',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        {/* Header */}
        <div
          style={{
            backgroundColor: '#592367',
            color: '#FFFFFF',
            padding: 'clamp(16px, 3vw, 22px) clamp(20px, 4vw, 28px)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexShrink: 0,
          }}
        >
          <div>
            <span style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.15em', color: '#FAF5FC', fontWeight: 700 }}>
              BESPOKE EVENT PROPOSAL
            </span>
            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(18px, 2.5vw, 22px)', fontWeight: 700, marginTop: '2px' }}>
              Plan Your Celebration
            </h3>
          </div>
          <button
            type="button"
            onClick={resetAndClose}
            aria-label="Close Proposal Modal"
            style={{
              color: '#FFFFFF',
              fontSize: '22px',
              cursor: 'pointer',
              opacity: 0.9,
              width: '40px',
              height: '40px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: '50%',
              backgroundColor: 'rgba(255, 255, 255, 0.12)',
            }}
          >
            ✕
          </button>
        </div>

        {/* Scrollable Body */}
        <div style={{ padding: 'clamp(18px, 4vw, 28px)', overflowY: 'auto', flex: 1 }}>
          {submitResult ? (
            /* Success View */
            <div style={{ textAlign: 'center', padding: '12px 0' }}>
              <div
                style={{
                  width: '56px',
                  height: '56px',
                  borderRadius: '50%',
                  backgroundColor: '#FAF5FB',
                  color: '#592367',
                  fontSize: '24px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 16px',
                  border: '1px solid #592367',
                }}
              >
                ✓
              </div>
              <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '24px', fontWeight: 700, color: '#592367', marginBottom: '8px' }}>
                Thank You, {submitResult.customer?.fullName}!
              </h4>
              <p style={{ fontSize: '14px', color: '#4A464D', marginBottom: '20px', lineHeight: 1.6 }}>
                Your event inquiry for <strong>{submitResult.eventDetails?.estimatedGuestCount} guests</strong> has been submitted. Our Senior Catering Director will contact you within 1 business day.
              </p>

              <div
                style={{
                  backgroundColor: '#FAF5FB',
                  border: '1px solid rgba(89, 35, 103, 0.15)',
                  borderRadius: '8px',
                  padding: '14px 18px',
                  textAlign: 'left',
                  marginBottom: '24px',
                  fontSize: '13px',
                  lineHeight: 1.6,
                }}
              >
                <p><strong>Division Assigned:</strong> {submitResult.brandDivision}</p>
                <p><strong>Status:</strong> {submitResult.isVip ? '★ VIP Priority' : 'Standard Priority'}</p>
                <p><strong>Next Step:</strong> {submitResult.recommendedNextAction}</p>
              </div>

              <Button variant="purple" fullWidth onClick={resetAndClose}>
                Done
              </Button>
            </div>
          ) : (
            /* Multi-step Form */
            <form onSubmit={handleSubmit}>
              {errorMsg && (
                <div
                  style={{
                    backgroundColor: '#FEF2F2',
                    border: '1px solid #F87171',
                    color: '#991B1B',
                    padding: '10px 14px',
                    borderRadius: '6px',
                    fontSize: '13px',
                    marginBottom: '16px',
                  }}
                >
                  {errorMsg}
                </div>
              )}

              {/* Step 1: Event Vision */}
              {step === 1 && (
                <div>
                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 240px), 1fr))',
                      gap: '14px',
                      marginBottom: '14px',
                    }}
                  >
                    <div>
                      <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#592367', marginBottom: '6px' }}>
                        Event Style
                      </label>
                      <select
                        value={formData.eventType}
                        onChange={(e) => setFormData({ ...formData, eventType: e.target.value })}
                        style={{ width: '100%', padding: '10px 12px', borderRadius: '4px', border: '1px solid #D1D5DB', fontSize: '15px' }}
                      >
                        <option value="CORPORATE">Corporate Events & Galas</option>
                        <option value="WEDDING">Weddings & Social</option>
                        <option value="GALA_SOCIAL">Milestone Celebration</option>
                        <option value="MAJOR_EVENT">Major Sporting Event</option>
                        <option value="TASTING">Bethesda Tasting Suite</option>
                      </select>
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#592367', marginBottom: '6px' }}>
                        Estimated Guest Count
                      </label>
                      <input
                        type="number"
                        min={1}
                        value={formData.estimatedGuestCount}
                        onChange={(e) => setFormData({ ...formData, estimatedGuestCount: Number(e.target.value) })}
                        style={{ width: '100%', padding: '10px 12px', borderRadius: '4px', border: '1px solid #D1D5DB', fontSize: '15px' }}
                      />
                    </div>
                  </div>

                  <div style={{ marginBottom: '14px' }}>
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#592367', marginBottom: '6px' }}>
                      Preferred Venue / Setting
                    </label>
                    <select
                      value={formData.venuePreference}
                      onChange={(e) => setFormData({ ...formData, venuePreference: e.target.value })}
                      style={{ width: '100%', padding: '10px 12px', borderRadius: '4px', border: '1px solid #D1D5DB', fontSize: '15px' }}
                    >
                      <option value="Andrew W. Mellon Auditorium">Andrew W. Mellon Auditorium</option>
                      <option value="Decatur House on Lafayette Square">Decatur House on Lafayette Square</option>
                      <option value="Anderson House">Anderson House</option>
                      <option value="Smithsonian Institution Museum">Smithsonian Institution Museum</option>
                      <option value="Private Estate / Tented Lawn">Private Estate / Tented Lawn</option>
                    </select>
                  </div>

                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 240px), 1fr))',
                      gap: '14px',
                      marginBottom: '22px',
                    }}
                  >
                    <div>
                      <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#592367', marginBottom: '6px' }}>
                        Target Date or Season
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Autumn 2026"
                        value={formData.eventDate}
                        onChange={(e) => setFormData({ ...formData, eventDate: e.target.value })}
                        style={{ width: '100%', padding: '10px 12px', borderRadius: '4px', border: '1px solid #D1D5DB', fontSize: '15px' }}
                      />
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#592367', marginBottom: '6px' }}>
                        Estimated Budget ($)
                      </label>
                      <input
                        type="number"
                        step={1000}
                        value={formData.estimatedBudget}
                        onChange={(e) => setFormData({ ...formData, estimatedBudget: Number(e.target.value) })}
                        style={{ width: '100%', padding: '10px 12px', borderRadius: '4px', border: '1px solid #D1D5DB', fontSize: '15px' }}
                      />
                    </div>
                  </div>

                  <Button
                    type="button"
                    variant="purple"
                    fullWidth
                    arrow
                    onClick={() => setStep(2)}
                  >
                    Next: Contact Details
                  </Button>
                </div>
              )}

              {/* Step 2: Contact Details */}
              {step === 2 && (
                <div>
                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 240px), 1fr))',
                      gap: '14px',
                      marginBottom: '14px',
                    }}
                  >
                    <div>
                      <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#592367', marginBottom: '6px' }}>
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Your name"
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        style={{ width: '100%', padding: '10px 12px', borderRadius: '4px', border: '1px solid #D1D5DB', fontSize: '15px' }}
                      />
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#592367', marginBottom: '6px' }}>
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="your@email.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        style={{ width: '100%', padding: '10px 12px', borderRadius: '4px', border: '1px solid #D1D5DB', fontSize: '15px' }}
                      />
                    </div>
                  </div>

                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 240px), 1fr))',
                      gap: '14px',
                      marginBottom: '14px',
                    }}
                  >
                    <div>
                      <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#592367', marginBottom: '6px' }}>
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="(301) 555-0199"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        style={{ width: '100%', padding: '10px 12px', borderRadius: '4px', border: '1px solid #D1D5DB', fontSize: '15px' }}
                      />
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#592367', marginBottom: '6px' }}>
                        Organization (Optional)
                      </label>
                      <input
                        type="text"
                        placeholder="Company or Organization"
                        value={formData.organization}
                        onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                        style={{ width: '100%', padding: '10px 12px', borderRadius: '4px', border: '1px solid #D1D5DB', fontSize: '15px' }}
                      />
                    </div>
                  </div>

                  {/* Dietary */}
                  <div style={{ marginBottom: '18px' }}>
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#592367', marginBottom: '6px' }}>
                      Dietary Preferences / Notes:
                    </label>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                      {['Gluten-Free', 'Vegan', 'Vegetarian', 'Halal-Friendly', 'Kosher-Style', 'Nut-Free'].map((diet) => (
                        <button
                          key={diet}
                          type="button"
                          onClick={() => handleDietaryToggle(diet)}
                          style={{
                            padding: '6px 12px',
                            borderRadius: '4px',
                            fontSize: '11.5px',
                            fontWeight: 600,
                            backgroundColor: formData.dietaryRestrictions.includes(diet) ? '#592367' : '#FAF5FB',
                            color: formData.dietaryRestrictions.includes(diet) ? '#FFFFFF' : '#592367',
                            border: '1px solid rgba(89, 35, 103, 0.2)',
                            cursor: 'pointer',
                          }}
                        >
                          {formData.dietaryRestrictions.includes(diet) ? '✓ ' : '+ '}{diet}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="mobile-stack" style={{ display: 'flex', gap: '10px' }}>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setStep(1)}
                      style={{ flex: 1 }}
                    >
                      Back
                    </Button>
                    <Button
                      type="submit"
                      variant="purple"
                      disabled={isSubmitting}
                      arrow
                      style={{ flex: 2 }}
                    >
                      {isSubmitting ? 'Submitting...' : 'Submit Inquiry'}
                    </Button>
                  </div>
                </div>
              )}
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
