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

export function LiveConciergeWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [callId, setCallId] = useState<string | null>(null);
  const [, setIsCalling] = useState(false);
  const [turns, setTurns] = useState<VoiceTurn[]>([]);
  const [userInput, setUserInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [capturedDetails, setCapturedDetails] = useState<CapturedDetails>({});
  const [targetLine] = useState<'MAIN' | 'MELLON' | 'DEFENSE'>('MAIN');
  const [activeTab, setActiveTab] = useState<'CHAT' | 'PHONE'>('CHAT');
  const chatBottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [turns]);

  const handleStartSession = async () => {
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
      }
    } catch (err) {
      console.error('Failed to start concierge session:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendTurn = async (textToSend?: string) => {
    const text = (textToSend || userInput).trim();
    if (!text || isLoading) return;

    setUserInput('');
    setIsLoading(true);

    // If session not started, auto start
    if (!callId) {
      try {
        const resStart = await fetch('http://localhost:4000/api/v1/voice/simulate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ targetLine }),
        });
        const startJson = await resStart.json();
        const newCallId = startJson.data?.callId;
        setCallId(newCallId);
        setIsCalling(true);

        // Send utterance
        const resUtter = await fetch('http://localhost:4000/api/v1/voice/simulate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ callId: newCallId, message: text }),
        });
        const utterJson = await resUtter.json();
        if (utterJson.success && utterJson.data) {
          setTurns(utterJson.data.transcript || []);
          setCapturedDetails(utterJson.data.capturedDetails || {});
        }
      } catch (err) {
        console.error('Failed turn:', err);
      } finally {
        setIsLoading(false);
      }
      return;
    }

    // Normal Turn
    setTurns((prev) => [...prev, { speaker: 'caller', text, timestamp: new Date().toISOString() }]);

    try {
      const res = await fetch('http://localhost:4000/api/v1/voice/simulate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ callId, message: text }),
      });
      const json = await res.json();
      if (json.success && json.data) {
        setTurns(json.data.transcript || []);
        setCapturedDetails(json.data.capturedDetails || {});
      }
    } catch (err) {
      console.error('Failed turn:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const samplePrompts = [
    'My name is Hayle',
    'I need wedding catering for 150 guests',
    'Mellon Auditorium capacity',
    'Schedule a tasting in Bethesda',
  ];

  return (
    <>
      {/* Floating Concierge Trigger Button (Bottom-Right) */}
      <div
        style={{
          position: 'fixed',
          bottom: 'clamp(16px, 3vw, 24px)',
          right: 'clamp(16px, 3vw, 24px)',
          zIndex: 1500,
        }}
      >
        {!isOpen && (
          <button
            type="button"
            onClick={() => setIsOpen(true)}
            style={{
              backgroundColor: '#592367',
              color: '#FFFFFF',
              padding: '12px 20px',
              borderRadius: '999px',
              border: '1.5px solid #592367',
              boxShadow: '0 8px 24px rgba(89, 35, 103, 0.35)',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              fontWeight: 700,
              fontSize: '12px',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              cursor: 'pointer',
              transition: 'all 0.25s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#FFFFFF';
              e.currentTarget.style.color = '#592367';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#592367';
              e.currentTarget.style.color = '#FFFFFF';
            }}
          >
            <span className="pulse-dot" />
            <span>🎙️ Live AI Concierge</span>
          </button>
        )}
      </div>

      {/* Popout Chat & Voice Widget Drawer (Responsive Bottom Sheet on Mobile) */}
      {isOpen && (
        <div
          style={{
            position: 'fixed',
            bottom: 'clamp(0px, 2vw, 24px)',
            right: 'clamp(0px, 2vw, 24px)',
            width: 'clamp(320px, 94vw, 390px)',
            maxWidth: '100vw',
            height: 'clamp(480px, 82vh, 580px)',
            maxHeight: '90vh',
            backgroundColor: '#FFFFFF',
            borderRadius: '12px',
            boxShadow: '0 20px 50px rgba(89, 35, 103, 0.35)',
            border: '1px solid rgba(89, 35, 103, 0.2)',
            display: 'flex',
            flexDirection: 'column',
            zIndex: 1600,
            overflow: 'hidden',
            animation: 'fadeInUp 0.3s ease',
          }}
        >
          {/* Header */}
          <div
            style={{
              backgroundColor: '#592367',
              color: '#FFFFFF',
              padding: '14px 18px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              borderBottom: '1px solid rgba(255, 255, 255, 0.15)',
              flexShrink: 0,
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span className="pulse-dot" />
              <div>
                <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '15px', fontWeight: 700 }}>
                  Ridgewells AI Concierge
                </h4>
                <p style={{ fontSize: '10px', color: '#FAF5FC', opacity: 0.9 }}>
                  24/7 Event Intake & Qualification
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setIsOpen(false)}
              aria-label="Close Concierge Widget"
              style={{
                color: '#FFFFFF',
                fontSize: '18px',
                lineHeight: 1,
                padding: '6px 10px',
                borderRadius: '4px',
                backgroundColor: 'rgba(255, 255, 255, 0.15)',
                cursor: 'pointer',
              }}
              title="Minimize"
            >
              ✕
            </button>
          </div>

          {/* Mode Tabs */}
          <div
            style={{
              display: 'flex',
              backgroundColor: '#FAF5FB',
              borderBottom: '1px solid rgba(89, 35, 103, 0.1)',
              flexShrink: 0,
            }}
          >
            <button
              type="button"
              onClick={() => setActiveTab('CHAT')}
              style={{
                flex: 1,
                padding: '10px',
                fontSize: '11px',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                border: 'none',
                borderBottom: activeTab === 'CHAT' ? '2px solid #592367' : 'none',
                backgroundColor: activeTab === 'CHAT' ? '#FFFFFF' : 'transparent',
                color: activeTab === 'CHAT' ? '#592367' : '#736D78',
                cursor: 'pointer',
              }}
            >
              💬 AI Intake Chat
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('PHONE')}
              style={{
                flex: 1,
                padding: '10px',
                fontSize: '11px',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                border: 'none',
                borderBottom: activeTab === 'PHONE' ? '2px solid #592367' : 'none',
                backgroundColor: activeTab === 'PHONE' ? '#FFFFFF' : 'transparent',
                color: activeTab === 'PHONE' ? '#592367' : '#736D78',
                cursor: 'pointer',
              }}
            >
              📞 Direct Phone
            </button>
          </div>

          {/* Tab 1: AI Interactive Chat */}
          {activeTab === 'CHAT' && (
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
              {/* Message scroll list */}
              <div
                style={{
                  flex: 1,
                  padding: '16px',
                  overflowY: 'auto',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '10px',
                  backgroundColor: '#FAF8F6',
                }}
              >
                {turns.length === 0 ? (
                  <div style={{ textAlign: 'center', padding: '24px 8px', color: '#736D78' }}>
                    <div
                      style={{
                        width: '44px',
                        height: '44px',
                        borderRadius: '50%',
                        backgroundColor: '#F3EAF6',
                        color: '#592367',
                        fontSize: '20px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: '0 auto 12px',
                      }}
                    >
                      🎙️
                    </div>
                    <h5 style={{ fontFamily: 'var(--font-serif)', fontSize: '16px', color: '#592367', marginBottom: '4px' }}>
                      How May We Assist You?
                    </h5>
                    <p style={{ fontSize: '12px', lineHeight: 1.5, marginBottom: '16px' }}>
                      Ask about our tasting suites, Andrew W. Mellon Auditorium date holds, or custom menu planning.
                    </p>
                    <button
                      type="button"
                      onClick={handleStartSession}
                      disabled={isLoading}
                      className="btn-luxury-purple"
                      style={{ padding: '9px 20px', fontSize: '11px' }}
                    >
                      {isLoading ? 'Connecting...' : 'Start Conversation ➔'}
                    </button>
                  </div>
                ) : (
                  <>
                    {turns.map((t, idx) => {
                      const isAgent = t.speaker === 'agent';
                      return (
                        <div
                          key={idx}
                          style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: isAgent ? 'flex-start' : 'flex-end',
                          }}
                        >
                          <span style={{ fontSize: '9px', fontWeight: 700, color: '#736D78', marginBottom: '2px', textTransform: 'uppercase' }}>
                            {isAgent ? 'Ridgewells Concierge' : 'You'}
                          </span>
                          <div
                            style={{
                              maxWidth: '85%',
                              padding: '9px 13px',
                              borderRadius: '8px',
                              backgroundColor: isAgent ? '#FFFFFF' : '#592367',
                              color: isAgent ? '#181519' : '#FFFFFF',
                              fontSize: '13px',
                              lineHeight: 1.45,
                              border: isAgent ? '1px solid rgba(89, 35, 103, 0.12)' : 'none',
                              boxShadow: '0 2px 6px rgba(0,0,0,0.04)',
                            }}
                          >
                            {t.text}
                          </div>
                        </div>
                      );
                    })}
                    {isLoading && (
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', color: '#592367', fontStyle: 'italic' }}>
                        <span className="pulse-dot" /> Concierge is formulating response...
                      </div>
                    )}
                    <div ref={chatBottomRef} />
                  </>
                )}
              </div>

              {/* Quick Prompt Chips */}
              <div
                style={{
                  display: 'flex',
                  gap: '6px',
                  padding: '6px 12px',
                  overflowX: 'auto',
                  backgroundColor: '#FFFFFF',
                  borderTop: '1px solid rgba(89, 35, 103, 0.08)',
                  flexShrink: 0,
                }}
              >
                {samplePrompts.map((p, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => handleSendTurn(p)}
                    style={{
                      whiteSpace: 'nowrap',
                      backgroundColor: '#FAF5FB',
                      border: '1px solid rgba(89, 35, 103, 0.14)',
                      color: '#592367',
                      padding: '5px 10px',
                      borderRadius: '4px',
                      fontSize: '10.5px',
                      fontWeight: 600,
                    }}
                  >
                    {p}
                  </button>
                ))}
              </div>

              {/* Input Form */}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSendTurn();
                }}
                style={{
                  padding: '10px 12px',
                  backgroundColor: '#FFFFFF',
                  borderTop: '1px solid rgba(89, 35, 103, 0.1)',
                  display: 'flex',
                  gap: '8px',
                  flexShrink: 0,
                }}
              >
                <input
                  type="text"
                  placeholder="Ask about events, tastings, or venues..."
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  disabled={isLoading}
                  style={{
                    flex: 1,
                    padding: '8px 12px',
                    borderRadius: '4px',
                    border: '1px solid #D1D5DB',
                    fontSize: '14px',
                    outline: 'none',
                  }}
                />
                <button
                  type="submit"
                  disabled={isLoading || !userInput.trim()}
                  className="btn-luxury-purple"
                  style={{ padding: '8px 14px', fontSize: '11px' }}
                >
                  Send
                </button>
              </form>
            </div>
          )}

          {/* Tab 2: Direct Telephony */}
          {activeTab === 'PHONE' && (
            <div style={{ padding: '24px', flex: 1, display: 'flex', flexDirection: 'column', gap: '16px', backgroundColor: '#FAF8F6', overflowY: 'auto' }}>
              <div
                style={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: '8px',
                  border: '1px solid rgba(89, 35, 103, 0.15)',
                  padding: '18px',
                  textAlign: 'center',
                }}
              >
                <span style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#592367' }}>
                  ACTIVE TWILIO PHONE LINE
                </span>
                <p style={{ fontFamily: 'var(--font-serif)', fontSize: '22px', fontWeight: 700, color: '#592367', margin: '8px 0' }}>
                  +1 (737) 258-3742
                </p>
                <p style={{ fontSize: '12px', color: '#736D78', lineHeight: 1.5, marginBottom: '16px' }}>
                  Dial from any mobile phone to test real-world telephone speech qualification and automatic JSON lead storage.
                </p>
                <a
                  href="tel:+17372583742"
                  className="btn-luxury-purple"
                  style={{ width: '100%', padding: '10px', display: 'inline-flex' }}
                >
                  📞 Dial Now
                </a>
              </div>

              {/* Extracted Details Snapshot */}
              <div
                style={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: '8px',
                  border: '1px solid rgba(89, 35, 103, 0.12)',
                  padding: '14px',
                  fontSize: '11.5px',
                }}
              >
                <h6 style={{ fontWeight: 700, color: '#592367', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                  Live Lead Status
                </h6>
                <p><strong>Caller:</strong> {capturedDetails.customerName || 'Pending'}</p>
                <p><strong>Guests:</strong> {capturedDetails.estimatedGuestCount ? `${capturedDetails.estimatedGuestCount} Guests` : 'Pending'}</p>
                <p><strong>Venue:</strong> {capturedDetails.venuePreference || 'Open'}</p>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
}
