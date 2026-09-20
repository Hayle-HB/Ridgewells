'use client';

import React, { useState, useRef, useEffect } from 'react';

interface VoiceTurn {
  speaker: 'agent' | 'caller';
  text: string;
  timestamp: string;
}

interface CapturedDetails {
  customerName?: string;
  eventType?: string;
  eventDate?: string;
  estimatedGuestCount?: number;
  estimatedBudget?: number;
  venuePreference?: string;
}

export function VoiceConciergeSection() {
  const [callId, setCallId] = useState<string | null>(null);
  const [isCalling, setIsCalling] = useState(false);
  const [turns, setTurns] = useState<VoiceTurn[]>([]);
  const [userInput, setUserInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isVip, setIsVip] = useState(false);
  const [capturedDetails, setCapturedDetails] = useState<CapturedDetails>({});
  const [targetLine, setTargetLine] = useState<'MAIN' | 'MELLON' | 'DEFENSE'>('MAIN');
  const chatBottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [turns]);

  const handleStartCall = async () => {
    setIsLoading(true);
    setIsCalling(true);
    try {
      const res = await fetch('http://localhost:4000/api/v1/voice/simulate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          targetLine,
          callerNumber: '(202) 555-0199',
        }),
      });
      const json = await res.json();
      if (json.success && json.data) {
        setCallId(json.data.callId);
        setTurns(json.data.transcript || [
          { speaker: 'agent', text: json.data.agentText, timestamp: new Date().toISOString() },
        ]);
        setCapturedDetails(json.data.capturedDetails || {});
        setIsVip(Boolean(json.data.isVip));
      }
    } catch (err) {
      console.error('Failed to start simulated voice call:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendUtterance = async (messageText: string) => {
    const text = (messageText || userInput).trim();
    if (!text || !callId || isLoading) return;

    setUserInput('');
    setIsLoading(true);
    setTurns((prev) => [...prev, { speaker: 'caller', text, timestamp: new Date().toISOString() }]);

    try {
      const res = await fetch('http://localhost:4000/api/v1/voice/simulate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          callId,
          message: text,
        }),
      });
      const json = await res.json();
      if (json.success && json.data) {
        setTurns(json.data.transcript || []);
        setCapturedDetails(json.data.capturedDetails || {});
        setIsVip(Boolean(json.data.isVip));
      }
    } catch (err) {
      console.error('Failed to process voice turn:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEndCall = () => {
    setIsCalling(false);
    setCallId(null);
    setTurns([]);
    setCapturedDetails({});
    setIsVip(false);
  };

  const samplePrompts = [
    'My name is Hayle',
    'I need catering for 200 guests at the Mellon Auditorium in October',
    'Can you tell me about Chef Kashif Browne?',
    'Schedule a tasting in Bethesda',
  ];

  return (
    <section id="voice-concierge" style={{
      padding: '80px 24px',
      backgroundColor: '#592367',
      color: '#FFFFFF',
    }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <span style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            backgroundColor: 'rgba(255, 255, 255, 0.15)',
            border: '1px solid rgba(255, 255, 255, 0.3)',
            color: '#FFFFFF',
            padding: '5px 16px',
            borderRadius: '999px',
            fontSize: '11px',
            fontWeight: 700,
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            marginBottom: '12px',
          }}>
            <span className="pulse-dot" /> 24/7 LIVE VOICE CONCIERGE & PHONE HOTLINE
          </span>

          <h2 style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(30px, 4vw, 42px)',
            fontWeight: 700,
            color: '#FFFFFF',
            lineHeight: 1.2,
            marginTop: '8px',
          }}>
            Instant Intake & Telephone Assistance
          </h2>
          <p style={{
            fontSize: '15px',
            color: 'rgba(255, 255, 255, 0.88)',
            maxWidth: '640px',
            margin: '12px auto 0',
          }}>
            Try the interactive concierge simulator below, or dial our live phone line at{' '}
            <strong style={{ color: '#F3EAF6' }}>+1 (737) 258-3742</strong>.
          </p>
        </div>

        {/* Live Call Panel */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '32px',
          alignItems: 'start',
        }}>
          {/* Left Column: Interactive Terminal */}
          <div style={{
            backgroundColor: '#441750',
            borderRadius: '12px',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            display: 'flex',
            flexDirection: 'column',
            height: '520px',
            overflow: 'hidden',
          }}>
            {/* Header */}
            <div style={{
              padding: '14px 18px',
              backgroundColor: '#320F3C',
              borderBottom: '1px solid rgba(255, 255, 255, 0.15)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span className="pulse-dot" />
                <span style={{ fontSize: '13px', fontWeight: 700, color: '#FFFFFF' }}>
                  Ridgewells AI Concierge
                </span>
              </div>

              {!isCalling ? (
                <select
                  value={targetLine}
                  onChange={(e) => setTargetLine(e.target.value as any)}
                  style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.15)',
                    border: '1px solid rgba(255, 255, 255, 0.3)',
                    color: '#FFFFFF',
                    borderRadius: '4px',
                    padding: '4px 8px',
                    fontSize: '11px',
                    outline: 'none',
                  }}
                >
                  <option value="MAIN" style={{ background: '#592367' }}>Main Line</option>
                  <option value="MELLON" style={{ background: '#592367' }}>Mellon Auditorium Desk</option>
                  <option value="DEFENSE" style={{ background: '#592367' }}>Haute Defense (PLCC)</option>
                </select>
              ) : (
                <button
                  onClick={handleEndCall}
                  style={{
                    backgroundColor: '#DC2626',
                    color: '#FFFFFF',
                    padding: '4px 10px',
                    borderRadius: '4px',
                    fontSize: '11px',
                    fontWeight: 700,
                  }}
                >
                  End Session ✕
                </button>
              )}
            </div>

            {/* Chat Turns */}
            <div style={{
              flex: 1,
              padding: '18px',
              overflowY: 'auto',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
            }}>
              {!isCalling ? (
                <div style={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  textAlign: 'center',
                  gap: '14px',
                  color: 'rgba(255, 255, 255, 0.8)',
                }}>
                  <div style={{
                    width: '54px',
                    height: '54px',
                    borderRadius: '50%',
                    backgroundColor: 'rgba(255, 255, 255, 0.12)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '24px',
                  }}>
                    🎙️
                  </div>
                  <div>
                    <p style={{ fontFamily: 'var(--font-serif)', fontSize: '18px', color: '#FFFFFF', marginBottom: '4px' }}>
                      Start Voice Intake Session
                    </p>
                    <p style={{ fontSize: '12px', maxWidth: '280px' }}>
                      Experience conversational speech qualification and real-time database storage.
                    </p>
                  </div>
                  <button
                    onClick={handleStartCall}
                    disabled={isLoading}
                    className="btn-white"
                    style={{ padding: '10px 24px', fontSize: '12px' }}
                  >
                    {isLoading ? 'Connecting...' : 'Connect Now ➔'}
                  </button>
                </div>
              ) : (
                <>
                  {turns.map((turn, index) => {
                    const isAgent = turn.speaker === 'agent';
                    return (
                      <div
                        key={index}
                        style={{
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: isAgent ? 'flex-start' : 'flex-end',
                        }}
                      >
                        <span style={{ fontSize: '10px', color: '#F3EAF6', fontWeight: 700, marginBottom: '2px' }}>
                          {isAgent ? 'Ridgewells Concierge' : 'You'}
                        </span>
                        <div style={{
                          maxWidth: '85%',
                          padding: '10px 14px',
                          borderRadius: '8px',
                          backgroundColor: isAgent ? 'rgba(255, 255, 255, 0.12)' : '#FFFFFF',
                          color: isAgent ? '#FFFFFF' : '#592367',
                          fontSize: '13px',
                          lineHeight: 1.5,
                          fontWeight: isAgent ? 400 : 600,
                        }}>
                          {turn.text}
                        </div>
                      </div>
                    );
                  })}
                  {isLoading && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#F3EAF6', fontSize: '12px' }}>
                      <span className="pulse-dot" /> Concierge is qualifying...
                    </div>
                  )}
                  <div ref={chatBottomRef} />
                </>
              )}
            </div>

            {/* Input Bar */}
            {isCalling && (
              <div style={{
                padding: '14px',
                backgroundColor: '#320F3C',
                borderTop: '1px solid rgba(255, 255, 255, 0.15)',
              }}>
                <div style={{ display: 'flex', gap: '6px', overflowX: 'auto', paddingBottom: '8px', marginBottom: '8px' }}>
                  {samplePrompts.map((p, i) => (
                    <button
                      key={i}
                      onClick={() => handleSendUtterance(p)}
                      style={{
                        whiteSpace: 'nowrap',
                        backgroundColor: 'rgba(255, 255, 255, 0.1)',
                        color: '#FFFFFF',
                        padding: '4px 8px',
                        borderRadius: '4px',
                        fontSize: '11px',
                      }}
                    >
                      {p}
                    </button>
                  ))}
                </div>

                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSendUtterance(userInput);
                  }}
                  style={{ display: 'flex', gap: '8px' }}
                >
                  <input
                    type="text"
                    placeholder="Type or speak your event inquiry..."
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                    disabled={isLoading}
                    style={{
                      flex: 1,
                      backgroundColor: 'rgba(255, 255, 255, 0.15)',
                      border: '1px solid rgba(255, 255, 255, 0.3)',
                      borderRadius: '4px',
                      color: '#FFFFFF',
                      padding: '8px 12px',
                      fontSize: '13px',
                      outline: 'none',
                    }}
                  />
                  <button
                    type="submit"
                    disabled={isLoading || !userInput.trim()}
                    className="btn-white"
                    style={{ padding: '8px 16px', fontSize: '12px' }}
                  >
                    Send
                  </button>
                </form>
              </div>
            )}
          </div>

          {/* Right Column: Phone Hotline & Real-Time Data */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{
              backgroundColor: '#441750',
              borderRadius: '12px',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              padding: '24px',
            }}>
              <span style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.12em', color: '#F3EAF6', fontWeight: 700 }}>
                DIRECT PHONE TESTING
              </span>
              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '22px', fontWeight: 700, color: '#FFFFFF', marginTop: '4px', marginBottom: '8px' }}>
                Dial from Your Phone
              </h3>
              <p style={{ fontSize: '13px', color: 'rgba(255, 255, 255, 0.85)', marginBottom: '16px' }}>
                Call our live Twilio hotline to experience real telephone voice recognition and automatic JSON lead persistence.
              </p>
              <div style={{
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                borderRadius: '8px',
                padding: '14px 18px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
                <div>
                  <p style={{ fontSize: '10px', textTransform: 'uppercase', color: '#F3EAF6', letterSpacing: '0.1em' }}>Twilio Hotline</p>
                  <p style={{ fontFamily: 'var(--font-serif)', fontSize: '20px', fontWeight: 800 }}>+1 (737) 258-3742</p>
                </div>
                <a href="tel:+17372583742" className="btn-white" style={{ padding: '8px 16px', fontSize: '12px' }}>
                  📞 Call
                </a>
              </div>
            </div>

            {/* Extracted Details */}
            <div style={{
              backgroundColor: '#441750',
              borderRadius: '12px',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              padding: '24px',
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                <h4 style={{ fontSize: '14px', fontWeight: 700, color: '#FFFFFF' }}>
                  Real-Time Lead Extraction
                </h4>
                {isVip && (
                  <span style={{ backgroundColor: '#FFFFFF', color: '#592367', fontSize: '10px', fontWeight: 800, padding: '2px 8px', borderRadius: '4px' }}>
                    ★ VIP
                  </span>
                )}
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', fontSize: '12px' }}>
                <div style={{ backgroundColor: 'rgba(255,255,255,0.08)', padding: '8px 12px', borderRadius: '4px' }}>
                  <span style={{ color: '#F3EAF6', fontSize: '10px', display: 'block' }}>Caller:</span>
                  <strong>{capturedDetails.customerName || 'Pending'}</strong>
                </div>
                <div style={{ backgroundColor: 'rgba(255,255,255,0.08)', padding: '8px 12px', borderRadius: '4px' }}>
                  <span style={{ color: '#F3EAF6', fontSize: '10px', display: 'block' }}>Guests:</span>
                  <strong>{capturedDetails.estimatedGuestCount ? `${capturedDetails.estimatedGuestCount} Guests` : 'Pending'}</strong>
                </div>
                <div style={{ backgroundColor: 'rgba(255,255,255,0.08)', padding: '8px 12px', borderRadius: '4px' }}>
                  <span style={{ color: '#F3EAF6', fontSize: '10px', display: 'block' }}>Target Date:</span>
                  <strong>{capturedDetails.eventDate || 'Flexible'}</strong>
                </div>
                <div style={{ backgroundColor: 'rgba(255,255,255,0.08)', padding: '8px 12px', borderRadius: '4px' }}>
                  <span style={{ color: '#F3EAF6', fontSize: '10px', display: 'block' }}>Venue:</span>
                  <strong>{capturedDetails.venuePreference || 'Open'}</strong>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
