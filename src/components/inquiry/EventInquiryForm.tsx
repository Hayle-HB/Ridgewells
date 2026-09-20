'use client';

import React, { useState, useMemo } from 'react';
import { Button, Badge } from '../ui';
import { EventDateTimePicker } from '../ui/EventDateTimePicker';

interface EventInquiryFormProps {
  initialEventType?: string;
  initialVenue?: string;
  initialGuests?: number;
}

const EVENT_TYPES = [
  {
    id: 'CORPORATE',
    label: 'Corporate Gala & Summit',
    icon: '🏛️',
    desc: 'Annual galas, diplomatic dinners, board meetings & conferences.',
    recommendedBudgetMin: 25000,
  },
  {
    id: 'WEDDING',
    label: 'Wedding & Celebration',
    icon: '💍',
    desc: 'Receptions, rehearsal dinners, ceremonies & bridal milestones.',
    recommendedBudgetMin: 30000,
  },
  {
    id: 'GALA_SOCIAL',
    label: 'Milestone Social Gathering',
    icon: '✨',
    desc: 'Anniversary galas, private estate soirees & holiday celebrations.',
    recommendedBudgetMin: 15000,
  },
  {
    id: 'MAJOR_EVENT',
    label: 'Major Sporting Event',
    icon: '🏆',
    desc: 'Championship hospitality chalets, USGA tourneys & invitational scales.',
    recommendedBudgetMin: 60000,
  },
  {
    id: 'TASTING',
    label: 'Bethesda Tasting Suite',
    icon: '🍷',
    desc: 'Private chef tastings, wine pairings & tablescape consultations.',
    recommendedBudgetMin: 5000,
  },
];

const VENUES = [
  {
    name: 'Andrew W. Mellon Auditorium',
    location: 'Constitution Ave NW, DC',
    capacity: 'Up to 1,000 Guests',
    isExclusive: true,
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=600&q=80',
  },
  {
    name: 'Decatur House on Lafayette Square',
    location: 'Lafayette Square, DC',
    capacity: 'Up to 250 Guests',
    isExclusive: false,
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=600&q=80',
  },
  {
    name: 'Anderson House on Embassy Row',
    location: 'Embassy Row, DC',
    capacity: 'Up to 350 Guests',
    isExclusive: false,
    image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=600&q=80',
  },
  {
    name: 'Smithsonian Institution Museums',
    location: 'National Mall, DC',
    capacity: 'Up to 1,500 Guests',
    isExclusive: false,
    image: 'https://images.unsplash.com/photo-1568832359672-e36cf5d74f54?auto=format&fit=crop&w=600&q=80',
  },
  {
    name: 'Bethesda Flagship Showroom',
    location: '5522 Dorsey Ln, Bethesda, MD',
    capacity: 'Tasting Suites',
    isExclusive: true,
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=600&q=80',
  },
  {
    name: 'Private Estate / Tented Lawn',
    location: 'Host Provided Location',
    capacity: 'Custom Scale',
    isExclusive: false,
    image: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=600&q=80',
  },
  {
    name: 'Other Location in DC / MD / VA',
    location: 'To Be Decided',
    capacity: 'Custom Scale',
    isExclusive: false,
    image: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=600&q=80',
  },
];

const CULINARY_SERVICES = [
  'Synchronized Plated Multi-Course Dinner',
  'Artisanal Passed Hors d’oeuvres & Canapés',
  'Interactive Chef Theatres & Carving Stations',
  'Valrhona Pastry Arts & Flambé Displays',
  'Sommelier Curated Wine & Beverage Pairings',
  'Cocktail Bar & Signature Craft Mixology',
];

const DIETARY_OPTIONS = [
  'Gluten-Free Protocol',
  'Plant-Based Vegan',
  'Vegetarian Gourmet',
  'Halal-Friendly Dining',
  'Kosher-Style Service',
  'Nut Isolation Protocol',
  'Dairy-Free Preparations',
];

const REFERRAL_SOURCES = [
  'Search Engine (Google / Bing)',
  'Andrew W. Mellon Auditorium Referral',
  'Attended a Past Ridgewells Event',
  'Friend / Colleague Recommendation',
  'Social Media (Instagram / LinkedIn)',
  'Venue / Event Planner Referral',
  'Other',
];

export function EventInquiryForm({
  initialEventType = 'CORPORATE',
  initialVenue = 'Andrew W. Mellon Auditorium',
  initialGuests = 150,
}: EventInquiryFormProps) {
  const [formData, setFormData] = useState({
    // Step 1: Occasion & Vision
    eventType: initialEventType,
    venuePreference: initialVenue,
    selectedServices: ['Synchronized Plated Multi-Course Dinner', 'Artisanal Passed Hors d’oeuvres & Canapés'],

    // Step 2: Scale & Schedule
    eventDate: '',
    startTime: '6:00 PM (Evening Reception)',
    endTime: '10:00 PM (Standard Evening)',
    estimatedGuestCount: initialGuests,
    estimatedBudget: 35000,
    dietaryRestrictions: ['Gluten-Free Protocol'] as string[],

    // Step 3: Contact & Logistics
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    organization: '',
    referralSource: 'Search Engine (Google / Bing)',
    notes: '',
  });

  const [fieldErrors, setFieldErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitResult, setSubmitResult] = useState<any | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Dynamic Average Cost Per Guest calculation
  const perGuestEstimate = useMemo(() => {
    if (!formData.estimatedGuestCount || formData.estimatedGuestCount <= 0) return 0;
    return Math.round(formData.estimatedBudget / formData.estimatedGuestCount);
  }, [formData.estimatedBudget, formData.estimatedGuestCount]);

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

  const handleServiceToggle = (service: string) => {
    setFormData((prev) => ({
      ...prev,
      selectedServices: prev.selectedServices.includes(service)
        ? prev.selectedServices.filter((s) => s !== service)
        : [...prev.selectedServices, service],
    }));
  };

  const handleDietaryToggle = (diet: string) => {
    setFormData((prev) => ({
      ...prev,
      dietaryRestrictions: prev.dietaryRestrictions.includes(diet)
        ? prev.dietaryRestrictions.filter((d) => d !== diet)
        : [...prev.dietaryRestrictions, diet],
    }));
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
      errors.phone = 'Please enter your direct phone number.';
    } else if (formData.phone.trim().length < 7) {
      errors.phone = 'Please enter a valid telephone number (e.g. 301-652-1515).';
    }
    if (!formData.email.trim()) {
      errors.email = 'Please enter your email address.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      errors.email = 'Please enter a valid email address.';
    }
    if (!formData.eventDate.trim()) {
      errors.eventDate = 'Please select your target event date.';
    }

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);

      const focusOrder = ['eventDate', 'firstName', 'lastName', 'email', 'phone'];
      for (const key of focusOrder) {
        if (errors[key]) {
          const targetId = key === 'eventDate' ? 'event-date' : `event-${key}`;
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
          estimatedGuestCount: Number(formData.estimatedGuestCount),
          estimatedBudget: Number(formData.estimatedBudget),
          venuePreference: formData.venuePreference,
          dietaryRestrictions: formData.dietaryRestrictions,
          notes: `[Timeline: ${formData.startTime} to ${formData.endTime}] [Services: ${formData.selectedServices.join(', ')}] [Referral: ${formData.referralSource}] ${formData.notes}`.trim(),
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
        window.scrollTo({ top: 300, behavior: 'smooth' });
      } else {
        setErrorMessage(json.error || 'Failed to submit proposal request. Please verify your fields.');
      }
    } catch {
      setErrorMessage('Network connection error. Please verify backend is running on port 4000.');
    } finally {
      setIsSubmitting(false);
    }
  };


  return (
    <div style={{ width: '100%' }}>
      {submitResult ? (
        /* SUCCESS CONFIRMATION VIEW */
        <div
          style={{
            maxWidth: '820px',
            margin: '0 auto',
            backgroundColor: '#FFFFFF',
            borderRadius: '12px',
            boxShadow: '0 20px 50px rgba(89, 35, 103, 0.15)',
            border: '1px solid rgba(89, 35, 103, 0.2)',
            padding: 'clamp(32px, 6vw, 64px)',
            textAlign: 'center',
          }}
        >
          <div
            style={{
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              backgroundColor: '#FAF5FB',
              color: '#592367',
              fontSize: '28px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 20px',
              border: '2px solid #592367',
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
              marginBottom: '8px',
            }}
          >
            PROPOSAL REQUEST RECEIVED • REF #{submitResult.inquiryId?.slice(0, 8).toUpperCase() || 'RG-2026'}
          </span>

          <h2
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(28px, 4vw, 42px)',
              fontWeight: 400,
              color: '#592367',
              lineHeight: 1.15,
              marginBottom: '16px',
            }}
          >
            Thank You, {submitResult.customer?.fullName || formData.firstName}!
          </h2>

          <p
            style={{
              fontSize: 'clamp(15px, 1.8vw, 17px)',
              color: '#47434B',
              lineHeight: 1.7,
              maxWidth: '640px',
              margin: '0 auto 32px',
            }}
          >
            Your bespoke catering vision for{' '}
            <strong>{submitResult.eventDetails?.estimatedGuestCount || formData.estimatedGuestCount} guests</strong> at{' '}
            <strong>{submitResult.eventDetails?.venuePreference || formData.venuePreference}</strong> has been logged in
            our Bethesda Director system.
          </p>

          {/* Details Card */}
          <div
            style={{
              backgroundColor: '#FAF5FB',
              border: '1px solid rgba(89, 35, 103, 0.15)',
              borderRadius: '8px',
              padding: '24px 28px',
              textAlign: 'left',
              maxWidth: '640px',
              margin: '0 auto 36px',
              fontSize: '14px',
              lineHeight: 1.8,
              color: '#181519',
            }}
          >
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '14px' }}>
              <div>
                <strong style={{ color: '#592367' }}>Division Assigned:</strong>
                <p>{submitResult.brandDivision || 'Ridgewells Executive Catering'}</p>
              </div>
              <div>
                <strong style={{ color: '#592367' }}>Priority Tier:</strong>
                <p>{submitResult.isVip ? '★ VIP Executive Priority' : 'Standard Bespoke Priority'}</p>
              </div>
              <div>
                <strong style={{ color: '#592367' }}>Direct Contact:</strong>
                <p>{formData.email} • {formData.phone}</p>
              </div>
              <div>
                <strong style={{ color: '#592367' }}>Next Step:</strong>
                <p>{submitResult.recommendedNextAction || 'Senior Catering Director Consultation Call'}</p>
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
            <Button
              variant="purple"
              onClick={() => {
                setSubmitResult(null);
                window.location.href = '/';
              }}
            >
              Return to Homepage ➔
            </Button>
            <Button
              variant="outline"
              onClick={() => {
                setSubmitResult(null);
              }}
            >
              Submit Another Event Inquiry
            </Button>
          </div>
        </div>
      ) : (
        /* MASTER INTERACTIVE CONFIGURATOR & FORM */
        <form onSubmit={handleSubmit} style={{ width: '100%' }}>
          {errorMessage && (
            <div
              style={{
                backgroundColor: '#FEF2F2',
                border: '1px solid #F87171',
                color: '#991B1B',
                padding: '14px 20px',
                borderRadius: '6px',
                fontSize: '14px',
                marginBottom: '28px',
                maxWidth: '1280px',
                margin: '0 auto 28px',
              }}
            >
              ⚠️ {errorMessage}
            </div>
          )}

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 360px), 1fr))',
              gap: 'clamp(32px, 5vw, 48px)',
              alignItems: 'start',
            }}
          >
            {/* LEFT COLUMN: The Interactive Event Configurator Form (Takes 2/3 space on large desktop) */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '48px' }}>
              {/* ---------------------------------------------------- */}
              {/* SECTION 1: EVENT TYPE SELECTION */}
              {/* ---------------------------------------------------- */}
              <div
                style={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: '8px',
                  padding: 'clamp(24px, 4vw, 36px)',
                  border: '1px solid rgba(89, 35, 103, 0.12)',
                  boxShadow: '0 8px 30px rgba(89, 35, 103, 0.04)',
                }}
              >
                <div style={{ marginBottom: '20px' }}>
                  <span
                    style={{
                      fontSize: '11px',
                      fontWeight: 800,
                      letterSpacing: '0.18em',
                      textTransform: 'uppercase',
                      color: '#9F8055',
                      display: 'block',
                      marginBottom: '4px',
                    }}
                  >
                    STEP 1 • SELECT OCCASION
                  </span>
                  <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '24px', fontWeight: 500, color: '#592367' }}>
                    What style of celebration are you creating?
                  </h3>
                </div>

                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 200px), 1fr))',
                    gap: '12px',
                  }}
                >
                  {EVENT_TYPES.map((type) => {
                    const isSelected = formData.eventType === type.id;
                    return (
                      <div
                        key={type.id}
                        onClick={() => setFormData({ ...formData, eventType: type.id })}
                        style={{
                          padding: '16px',
                          borderRadius: '6px',
                          border: isSelected ? '2px solid #592367' : '1px solid rgba(89, 35, 103, 0.15)',
                          backgroundColor: isSelected ? '#FAF5FB' : '#FFFFFF',
                          cursor: 'pointer',
                          transition: 'all 0.25s ease',
                          display: 'flex',
                          flexDirection: 'column',
                          gap: '6px',
                          boxShadow: isSelected ? '0 4px 14px rgba(89, 35, 103, 0.12)' : 'none',
                        }}
                      >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <span style={{ fontSize: '22px' }}>{type.icon}</span>
                          {isSelected && (
                            <span style={{ fontSize: '11px', fontWeight: 800, color: '#592367', backgroundColor: '#FFFFFF', padding: '2px 8px', borderRadius: '999px', border: '1px solid #592367' }}>
                              SELECTED
                            </span>
                          )}
                        </div>
                        <h4 style={{ fontSize: '14.5px', fontWeight: 700, color: '#592367', marginTop: '4px' }}>
                          {type.label}
                        </h4>
                        <p style={{ fontSize: '12px', color: '#736D78', lineHeight: 1.5 }}>
                          {type.desc}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* ---------------------------------------------------- */}
              {/* SECTION 2: VENUE SELECTION */}
              {/* ---------------------------------------------------- */}
              <div
                style={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: '8px',
                  padding: 'clamp(24px, 4vw, 36px)',
                  border: '1px solid rgba(89, 35, 103, 0.12)',
                  boxShadow: '0 8px 30px rgba(89, 35, 103, 0.04)',
                }}
              >
                <div style={{ marginBottom: '20px' }}>
                  <span
                    style={{
                      fontSize: '11px',
                      fontWeight: 800,
                      letterSpacing: '0.18em',
                      textTransform: 'uppercase',
                      color: '#9F8055',
                      display: 'block',
                      marginBottom: '4px',
                    }}
                  >
                    STEP 2 • DESTINATION & VENUE
                  </span>
                  <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '24px', fontWeight: 500, color: '#592367' }}>
                    Where will your guests gather?
                  </h3>
                </div>

                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 220px), 1fr))',
                    gap: '14px',
                  }}
                >
                  {VENUES.map((venue, idx) => {
                    const isSelected = formData.venuePreference === venue.name;
                    return (
                      <div
                        key={idx}
                        onClick={() => setFormData({ ...formData, venuePreference: venue.name })}
                        style={{
                          borderRadius: '6px',
                          border: isSelected ? '2px solid #592367' : '1px solid rgba(89, 35, 103, 0.15)',
                          backgroundColor: isSelected ? '#FAF5FB' : '#FFFFFF',
                          overflow: 'hidden',
                          cursor: 'pointer',
                          transition: 'all 0.25s ease',
                          display: 'flex',
                          flexDirection: 'column',
                          boxShadow: isSelected ? '0 4px 16px rgba(89, 35, 103, 0.12)' : 'none',
                        }}
                      >
                        <div
                          style={{
                            height: '110px',
                            backgroundImage: `url('${venue.image}')`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            position: 'relative',
                          }}
                        >
                          {venue.isExclusive && (
                            <div style={{ position: 'absolute', top: '8px', left: '8px' }}>
                              <Badge variant="purple" size="sm">
                                ✦ EXCLUSIVE
                              </Badge>
                            </div>
                          )}
                        </div>
                        <div style={{ padding: '12px 14px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                          <h4 style={{ fontSize: '14px', fontWeight: 700, color: '#592367', lineHeight: 1.3 }}>
                            {venue.name}
                          </h4>
                          <p style={{ fontSize: '11.5px', color: '#736D78', marginTop: '4px' }}>
                            📍 {venue.location}
                          </p>
                          <div style={{ marginTop: 'auto', paddingTop: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '11px', fontWeight: 600, color: '#9F8055' }}>
                            <span>{venue.capacity}</span>
                            {isSelected && <span style={{ color: '#592367', fontWeight: 800 }}>✓ SELECTED</span>}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* ---------------------------------------------------- */}
              {/* SECTION 3: CULINARY EXPERIENCES & SERVICES */}
              {/* ---------------------------------------------------- */}
              <div
                style={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: '8px',
                  padding: 'clamp(24px, 4vw, 36px)',
                  border: '1px solid rgba(89, 35, 103, 0.12)',
                  boxShadow: '0 8px 30px rgba(89, 35, 103, 0.04)',
                }}
              >
                <div style={{ marginBottom: '20px' }}>
                  <span
                    style={{
                      fontSize: '11px',
                      fontWeight: 800,
                      letterSpacing: '0.18em',
                      textTransform: 'uppercase',
                      color: '#9F8055',
                      display: 'block',
                      marginBottom: '4px',
                    }}
                  >
                    STEP 3 • CULINARY EXPERIENCES
                  </span>
                  <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '24px', fontWeight: 500, color: '#592367' }}>
                    Select desired catering & service formats:
                  </h3>
                </div>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                  {CULINARY_SERVICES.map((service, idx) => {
                    const isChecked = formData.selectedServices.includes(service);
                    return (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => handleServiceToggle(service)}
                        style={{
                          padding: '10px 18px',
                          borderRadius: '4px',
                          fontSize: '13px',
                          fontWeight: 600,
                          backgroundColor: isChecked ? '#592367' : '#FAF5FB',
                          color: isChecked ? '#FFFFFF' : '#592367',
                          border: isChecked ? '1px solid #592367' : '1px solid rgba(89, 35, 103, 0.2)',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '8px',
                          cursor: 'pointer',
                          transition: 'all 0.2s ease',
                        }}
                      >
                        <span>{isChecked ? '✓' : '+'}</span>
                        <span>{service}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* ---------------------------------------------------- */}
              {/* SECTION 4: SCALE, DATE & BUDGET ESTIMATION */}
              {/* ---------------------------------------------------- */}
              <div
                style={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: '8px',
                  padding: 'clamp(24px, 4vw, 36px)',
                  border: '1px solid rgba(89, 35, 103, 0.12)',
                  boxShadow: '0 8px 30px rgba(89, 35, 103, 0.04)',
                }}
              >
                <div style={{ marginBottom: '24px' }}>
                  <span
                    style={{
                      fontSize: '11px',
                      fontWeight: 800,
                      letterSpacing: '0.18em',
                      textTransform: 'uppercase',
                      color: '#9F8055',
                      display: 'block',
                      marginBottom: '4px',
                    }}
                  >
                    STEP 4 • TIMELINE, SCALE & BUDGET
                  </span>
                  <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '24px', fontWeight: 500, color: '#592367' }}>
                    Event parameters & guest estimates
                  </h3>
                </div>

                {/* Timeline Grid with Reusable EventDateTimePicker */}
                <div style={{ marginBottom: '28px' }}>
                  <EventDateTimePicker
                    date={formData.eventDate}
                    startTime={formData.startTime}
                    endTime={formData.endTime}
                    onDateChange={(d) => handleFieldChange('eventDate', d)}
                    onStartTimeChange={(t) => handleFieldChange('startTime', t)}
                    onEndTimeChange={(t) => handleFieldChange('endTime', t)}
                    dateError={fieldErrors.eventDate}
                    idPrefix="event"
                  />
                </div>

                {/* Guest Count & Budget Slider */}
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
                    gap: '24px',
                    marginBottom: '28px',
                    backgroundColor: '#FAF5FB',
                    padding: '20px',
                    borderRadius: '8px',
                    border: '1px solid rgba(89, 35, 103, 0.12)',
                  }}
                >
                  {/* Guest Count */}
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                      <label htmlFor="event-guestCount" style={{ fontSize: '13px', fontWeight: 700, color: '#592367' }}>
                        Number of Guests:
                      </label>
                      <span style={{ fontSize: '16px', fontWeight: 800, color: '#592367' }}>
                        {formData.estimatedGuestCount} Guests
                      </span>
                    </div>
                    <input
                      id="event-guestCount"
                      type="range"
                      min={10}
                      max={1000}
                      step={10}
                      value={formData.estimatedGuestCount}
                      onChange={(e) => handleFieldChange('estimatedGuestCount', Number(e.target.value))}
                      style={{ width: '100%', accentColor: '#592367' }}
                    />
                  </div>

                  {/* Estimated Total Budget */}
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                      <label htmlFor="event-budget" style={{ fontSize: '13px', fontWeight: 700, color: '#592367' }}>
                        Estimated Budget ($):
                      </label>
                      <span style={{ fontSize: '16px', fontWeight: 800, color: '#592367' }}>
                        ${formData.estimatedBudget.toLocaleString()}
                      </span>
                    </div>
                    <input
                      id="event-budget"
                      type="range"
                      min={5000}
                      max={150000}
                      step={2500}
                      value={formData.estimatedBudget}
                      onChange={(e) => handleFieldChange('estimatedBudget', Number(e.target.value))}
                      style={{ width: '100%', accentColor: '#592367' }}
                    />
                    <p style={{ fontSize: '11.5px', color: '#736D78', marginTop: '6px' }}>
                      Approx. <strong>${perGuestEstimate} / guest</strong> average catering investment.
                    </p>
                  </div>
                </div>

                {/* Dietary Inclusivity */}
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#592367', marginBottom: '8px' }}>
                    Dietary Protocols & Allergen Inclusivity:
                  </label>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                    {DIETARY_OPTIONS.map((diet, idx) => {
                      const isDietActive = formData.dietaryRestrictions.includes(diet);
                      return (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => handleDietaryToggle(diet)}
                          style={{
                            padding: '6px 12px',
                            borderRadius: '4px',
                            fontSize: '12px',
                            fontWeight: 600,
                            backgroundColor: isDietActive ? '#592367' : '#FFFFFF',
                            color: isDietActive ? '#FFFFFF' : '#592367',
                            border: isDietActive ? '1px solid #592367' : '1px solid rgba(89, 35, 103, 0.2)',
                            cursor: 'pointer',
                            transition: 'all 0.2s',
                          }}
                        >
                          {isDietActive ? '✓ ' : '+ '}
                          {diet}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* ---------------------------------------------------- */}
              {/* SECTION 5: CONTACT INFORMATION */}
              {/* ---------------------------------------------------- */}
              <div
                style={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: '8px',
                  padding: 'clamp(24px, 4vw, 36px)',
                  border: '1px solid rgba(89, 35, 103, 0.12)',
                  boxShadow: '0 8px 30px rgba(89, 35, 103, 0.04)',
                }}
              >
                <div style={{ marginBottom: '24px' }}>
                  <span
                    style={{
                      fontSize: '11px',
                      fontWeight: 800,
                      letterSpacing: '0.18em',
                      textTransform: 'uppercase',
                      color: '#9F8055',
                      display: 'block',
                      marginBottom: '4px',
                    }}
                  >
                    STEP 5 • CONTACT DETAILS
                  </span>
                  <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '24px', fontWeight: 500, color: '#592367' }}>
                    Where should our Senior Catering Director send your proposal?
                  </h3>
                </div>

                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 240px), 1fr))',
                    gap: '16px',
                    marginBottom: '16px',
                  }}
                >
                  <div>
                    <label htmlFor="event-firstName" style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#592367', marginBottom: '6px' }}>
                      First Name *
                    </label>
                    <input
                      id="event-firstName"
                      type="text"
                      placeholder="Jane"
                      value={formData.firstName}
                      onChange={(e) => handleFieldChange('firstName', e.target.value)}
                      style={{
                        width: '100%',
                        padding: '12px 14px',
                        borderRadius: '4px',
                        border: fieldErrors.firstName ? '1.5px solid #DC2626' : '1.5px solid rgba(89, 35, 103, 0.25)',
                        boxShadow: fieldErrors.firstName ? '0 0 0 3px rgba(220, 38, 38, 0.12)' : undefined,
                        fontSize: '15px',
                        outline: 'none',
                      }}
                    />
                    {fieldErrors.firstName && (
                      <p style={{ color: '#DC2626', fontSize: '12px', marginTop: '4px', fontWeight: 500 }}>
                        ⚠️ {fieldErrors.firstName}
                      </p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="event-lastName" style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#592367', marginBottom: '6px' }}>
                      Last Name *
                    </label>
                    <input
                      id="event-lastName"
                      type="text"
                      placeholder="Doe"
                      value={formData.lastName}
                      onChange={(e) => handleFieldChange('lastName', e.target.value)}
                      style={{
                        width: '100%',
                        padding: '12px 14px',
                        borderRadius: '4px',
                        border: fieldErrors.lastName ? '1.5px solid #DC2626' : '1.5px solid rgba(89, 35, 103, 0.25)',
                        boxShadow: fieldErrors.lastName ? '0 0 0 3px rgba(220, 38, 38, 0.12)' : undefined,
                        fontSize: '15px',
                        outline: 'none',
                      }}
                    />
                    {fieldErrors.lastName && (
                      <p style={{ color: '#DC2626', fontSize: '12px', marginTop: '4px', fontWeight: 500 }}>
                        ⚠️ {fieldErrors.lastName}
                      </p>
                    )}
                  </div>
                </div>

                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 240px), 1fr))',
                    gap: '16px',
                    marginBottom: '16px',
                  }}
                >
                  <div>
                    <label htmlFor="event-email" style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#592367', marginBottom: '6px' }}>
                      Email Address *
                    </label>
                    <input
                      id="event-email"
                      type="email"
                      placeholder="jane.doe@organization.com"
                      value={formData.email}
                      onChange={(e) => handleFieldChange('email', e.target.value)}
                      style={{
                        width: '100%',
                        padding: '12px 14px',
                        borderRadius: '4px',
                        border: fieldErrors.email ? '1.5px solid #DC2626' : '1.5px solid rgba(89, 35, 103, 0.25)',
                        boxShadow: fieldErrors.email ? '0 0 0 3px rgba(220, 38, 38, 0.12)' : undefined,
                        fontSize: '15px',
                        outline: 'none',
                      }}
                    />
                    {fieldErrors.email && (
                      <p style={{ color: '#DC2626', fontSize: '12px', marginTop: '4px', fontWeight: 500 }}>
                        ⚠️ {fieldErrors.email}
                      </p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="event-phone" style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#592367', marginBottom: '6px' }}>
                      Phone Number *
                    </label>
                    <input
                      id="event-phone"
                      type="tel"
                      placeholder="(301) 652-1515"
                      value={formData.phone}
                      onChange={(e) => handleFieldChange('phone', e.target.value)}
                      style={{
                        width: '100%',
                        padding: '12px 14px',
                        borderRadius: '4px',
                        border: fieldErrors.phone ? '1.5px solid #DC2626' : '1.5px solid rgba(89, 35, 103, 0.25)',
                        boxShadow: fieldErrors.phone ? '0 0 0 3px rgba(220, 38, 38, 0.12)' : undefined,
                        fontSize: '15px',
                        outline: 'none',
                      }}
                    />
                    {fieldErrors.phone && (
                      <p style={{ color: '#DC2626', fontSize: '12px', marginTop: '4px', fontWeight: 500 }}>
                        ⚠️ {fieldErrors.phone}
                      </p>
                    )}
                  </div>
                </div>

                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 240px), 1fr))',
                    gap: '16px',
                    marginBottom: '16px',
                  }}
                >
                  <div>
                    <label htmlFor="event-organization" style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#592367', marginBottom: '6px' }}>
                      Host Organization / Company (Optional)
                    </label>
                    <input
                      id="event-organization"
                      type="text"
                      placeholder="e.g. Smithsonian, USGA, Private Family"
                      value={formData.organization}
                      onChange={(e) => handleFieldChange('organization', e.target.value)}
                      style={{
                        width: '100%',
                        padding: '12px 14px',
                        borderRadius: '4px',
                        border: '1.5px solid rgba(89, 35, 103, 0.25)',
                        fontSize: '15px',
                        outline: 'none',
                      }}
                    />
                  </div>


                  <div>
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#592367', marginBottom: '6px' }}>
                      How did you hear about Ridgewells?
                    </label>
                    <select
                      value={formData.referralSource}
                      onChange={(e) => setFormData({ ...formData, referralSource: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '12px 14px',
                        borderRadius: '4px',
                        border: '1.5px solid rgba(89, 35, 103, 0.25)',
                        fontSize: '15px',
                        outline: 'none',
                        backgroundColor: '#FFFFFF',
                      }}
                    >
                      {REFERRAL_SOURCES.map((src, idx) => (
                        <option key={idx} value={src}>
                          {src}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Additional Vision Notes */}
                <div style={{ marginBottom: '24px' }}>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#592367', marginBottom: '6px' }}>
                    Any other details or vision elements we should know?
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Tell us about your theme, color palettes, special culinary cravings, or specific floral/tablescape requirements..."
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '12px 14px',
                      borderRadius: '4px',
                      border: '1.5px solid rgba(89, 35, 103, 0.25)',
                      fontSize: '15px',
                      outline: 'none',
                      fontFamily: 'inherit',
                    }}
                  />
                </div>

                {/* Submit Action */}
                <Button
                  type="submit"
                  variant="purple"
                  fullWidth
                  arrow
                  disabled={isSubmitting}
                  style={{ padding: '18px 36px', fontSize: '14px' }}
                >
                  {isSubmitting ? 'Transmitting Custom Vision...' : 'Submit Bespoke Event Proposal ➔'}
                </Button>

                <p style={{ fontSize: '12px', color: '#736D78', textAlign: 'center', marginTop: '12px' }}>
                  🔒 Direct white-glove confidentiality. Response guaranteed within 1 business day.
                </p>
              </div>
            </div>

            {/* RIGHT COLUMN: Live Real-Time Event Vision Summary Card (Sticky on desktop) */}
            <div
              style={{
                position: 'sticky',
                top: '90px',
                display: 'flex',
                flexDirection: 'column',
                gap: '20px',
              }}
            >
              <div
                style={{
                  backgroundColor: '#FAF5FB',
                  borderRadius: '8px',
                  padding: '28px',
                  border: '1px solid rgba(89, 35, 103, 0.2)',
                  boxShadow: '0 12px 35px rgba(89, 35, 103, 0.08)',
                }}
              >
                <div style={{ borderBottom: '1px solid rgba(89, 35, 103, 0.15)', paddingBottom: '16px', marginBottom: '20px' }}>
                  <span
                    style={{
                      fontSize: '10.5px',
                      fontWeight: 800,
                      letterSpacing: '0.2em',
                      textTransform: 'uppercase',
                      color: '#9F8055',
                      display: 'block',
                      marginBottom: '4px',
                    }}
                  >
                    LIVE PROPOSAL SUMMARY
                  </span>
                  <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '20px', fontWeight: 600, color: '#592367' }}>
                    Your Event Blueprint
                  </h4>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', fontSize: '13.5px' }}>
                  <div>
                    <span style={{ fontSize: '11px', textTransform: 'uppercase', color: '#736D78', fontWeight: 700 }}>
                      Selected Occasion:
                    </span>
                    <p style={{ fontWeight: 700, color: '#592367' }}>
                      {EVENT_TYPES.find((e) => e.id === formData.eventType)?.label || formData.eventType}
                    </p>
                  </div>

                  <div>
                    <span style={{ fontSize: '11px', textTransform: 'uppercase', color: '#736D78', fontWeight: 700 }}>
                      Venue / Destination:
                    </span>
                    <p style={{ fontWeight: 600, color: '#181519' }}>
                      {formData.venuePreference}
                    </p>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                    <div>
                      <span style={{ fontSize: '11px', textTransform: 'uppercase', color: '#736D78', fontWeight: 700 }}>
                        Estimated Guests:
                      </span>
                      <p style={{ fontWeight: 700, color: '#592367' }}>
                        {formData.estimatedGuestCount} Guests
                      </p>
                    </div>

                    <div>
                      <span style={{ fontSize: '11px', textTransform: 'uppercase', color: '#736D78', fontWeight: 700 }}>
                        Budget Range:
                      </span>
                      <p style={{ fontWeight: 700, color: '#592367' }}>
                        ${formData.estimatedBudget.toLocaleString()}
                      </p>
                    </div>
                  </div>

                  {formData.eventDate && (
                    <div>
                      <span style={{ fontSize: '11px', textTransform: 'uppercase', color: '#736D78', fontWeight: 700 }}>
                        Target Timeline:
                      </span>
                      <p style={{ fontWeight: 600, color: '#181519' }}>
                        {formData.eventDate} ({formData.startTime} – {formData.endTime})
                      </p>
                    </div>
                  )}

                  <div>
                    <span style={{ fontSize: '11px', textTransform: 'uppercase', color: '#736D78', fontWeight: 700 }}>
                      Selected Formats ({formData.selectedServices.length}):
                    </span>
                    <ul style={{ paddingLeft: '18px', marginTop: '4px', fontSize: '12.5px', color: '#47434B', lineHeight: 1.5 }}>
                      {formData.selectedServices.map((s, i) => (
                        <li key={i}>{s}</li>
                      ))}
                    </ul>
                  </div>

                  {formData.dietaryRestrictions.length > 0 && (
                    <div>
                      <span style={{ fontSize: '11px', textTransform: 'uppercase', color: '#736D78', fontWeight: 700 }}>
                        Dietary Protocols:
                      </span>
                      <p style={{ fontSize: '12px', color: '#592367', fontWeight: 600, marginTop: '2px' }}>
                        {formData.dietaryRestrictions.join(' • ')}
                      </p>
                    </div>
                  )}
                </div>

                {/* Director Routing Badge */}
                <div
                  style={{
                    marginTop: '24px',
                    padding: '14px',
                    backgroundColor: '#FFFFFF',
                    borderRadius: '6px',
                    border: '1px solid rgba(89, 35, 103, 0.15)',
                    fontSize: '12px',
                    color: '#47434B',
                    lineHeight: 1.5,
                  }}
                >
                  <p style={{ fontWeight: 700, color: '#592367', marginBottom: '2px' }}>
                    🏛️ Bethesda Director Assignment:
                  </p>
                  <p>
                    {formData.eventType === 'WEDDING'
                      ? 'Executive Wedding Producer'
                      : formData.eventType === 'MAJOR_EVENT'
                      ? 'Tournament Operations Director'
                      : 'Senior Director of Corporate & Diplomatic Galas'}
                  </p>
                </div>
              </div>

              {/* Quick Contact & Bethesda Showroom Card */}
              <div
                style={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: '8px',
                  padding: '20px',
                  border: '1px solid rgba(89, 35, 103, 0.12)',
                  fontSize: '13px',
                  color: '#47434B',
                }}
              >
                <h5 style={{ fontWeight: 700, color: '#592367', marginBottom: '6px', fontSize: '14px' }}>
                  Prefer to speak immediately?
                </h5>
                <p style={{ fontSize: '12.5px', color: '#736D78', marginBottom: '10px' }}>
                  Our concierge team is available Monday through Friday, 9:00 AM to 5:00 PM.
                </p>
                <p style={{ fontWeight: 700, color: '#592367' }}>
                  <a href="tel:+13016521515" style={{ color: '#592367' }}>📞 (301) 652-1515</a>
                </p>
                <p style={{ fontSize: '12px', color: '#736D78', marginTop: '4px' }}>
                  5522 Dorsey Lane, Bethesda, MD 20816
                </p>
              </div>
            </div>
          </div>
        </form>
      )}
    </div>
  );
}
