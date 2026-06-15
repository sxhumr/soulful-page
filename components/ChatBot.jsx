'use client';

import React, { useState, useRef, useEffect } from 'react';

/* ── Design tokens — mirrors homepage/booking theme exactly ── */
const t = {
  platinum:   '#F7F8FA',
  paleSilver: '#EDF0F4',
  silver:     '#C8CDD6',
  blush:      '#F9D4DC',
  rose:       '#E8A8B5',
  roseDark:   '#C47F92',
  deepRose:   '#8B3D54',
  textDark:   '#2D1B23',
  textMid:    '#6B4D57',
  textMuted:  '#9B8089',
  white:      '#FFFFFF',
};

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=Inter:wght@300;400;500&display=swap');

  .nova-display { font-family: 'Cormorant Garamond', serif; }
  .nova-body    { font-family: 'Inter', sans-serif; }

  /* Typing bounce dots */
  @keyframes nova-bounce {
    0%, 80%, 100% { transform: translateY(0);    opacity: 0.4; }
    40%            { transform: translateY(-5px); opacity: 1;   }
  }
  .nova-dot { animation: nova-bounce 1.2s ease-in-out infinite; }
  .nova-dot:nth-child(2) { animation-delay: 0.15s; }
  .nova-dot:nth-child(3) { animation-delay: 0.30s; }

  /* Message fade-in */
  @keyframes nova-fadein {
    from { opacity: 0; transform: translateY(6px); }
    to   { opacity: 1; transform: translateY(0);   }
  }
  .nova-msg { animation: nova-fadein 0.25s ease both; }

  /* Focus ring on input */
  .nova-input:focus {
    outline: none;
    border-color: ${t.roseDark} !important;
    box-shadow: 0 0 0 3px ${t.blush} !important;
    background: ${t.white} !important;
  }

  /* Blocked input */
  .nova-input:disabled {
    cursor: not-allowed;
    background: ${t.paleSilver} !important;
    color: ${t.textMuted} !important;
  }

  /* Send button hover/active — only when enabled */
  .nova-send:not(:disabled):hover  { background: ${t.deepRose} !important; }
  .nova-send:not(:disabled):active { transform: scale(0.97); }
  .nova-send:disabled { background: ${t.silver} !important; cursor: not-allowed; }
`;

export default function ChatBot() {
  const [messages,  setMessages]  = useState([]);
  const [input,     setInput]     = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error,     setError]     = useState(null);
  // Hard lockout — set permanently on injection detection (only a page refresh clears it)
  const [isBlocked, setIsBlocked] = useState(false);

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading || isBlocked) return;

    const currentInput     = input.trim();
    const updatedMessages  = [...messages, { role: 'user', content: currentInput }];

    setMessages(updatedMessages);
    setInput('');
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/chat', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ messages: updatedMessages }),
      });

      let responseData;
      try {
        responseData = await response.json();
      } catch {
        throw new Error('Response format invalid. Could not parse payload.');
      }

      // ── 400 = injection detected server-side → permanent lockout ──
      if (response.status === 400) {
        setIsBlocked(true);
        setError(
          responseData?.error ||
          'Nova has detected an attempt to alter her cosmic alignment. Please refresh the page to restore your connection.'
        );
        return;
      }

      if (!response.ok) {
        throw new Error(responseData?.error || `Server returned unhealthy status: ${response.status}`);
      }

      if (responseData?.error) {
        throw new Error(responseData.error);
      }

      if (responseData?.content) {
        setMessages((prev) => [...prev, { role: 'assistant', content: responseData.content }]);
      } else {
        throw new Error('Received an empty response from the healing assistant.');
      }

    } catch (err) {
      console.error('Chat interface failure:', err);
      setError(err.message || 'An error occurred. Please try your request again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <style>{styles}</style>

      <div
        className="nova-body"
        style={{
          width:         '100%',
          maxWidth:      '520px',
          margin:        '0 auto',
          display:       'flex',
          flexDirection: 'column',
          /* Full viewport height on mobile, fixed height on larger screens */
          height:        'clamp(400px, 85dvh, 600px)',
          background:    t.white,
          borderRadius:  'clamp(0px, 2vw, 16px)', /* Edge-to-edge on very small screens */
          border:        `1px solid ${t.silver}60`,
          boxShadow:     '0 4px 24px rgba(45,27,35,0.07)',
          overflow:      'hidden',
        }}
      >

        {/* ── Header ── */}
        <div style={{
          background:     `linear-gradient(135deg, ${t.platinum}, ${t.paleSilver})`,
          borderBottom:   `1px solid ${t.silver}50`,
          padding:        '1rem 1.25rem',
          display:        'flex',
          alignItems:     'center',
          gap:            '0.6rem',
          flexShrink:     0,
        }}>
          {/* Nova avatar orb */}
          <div style={{
            width:          '36px',
            height:         '36px',
            borderRadius:   '50%',
            background:     `linear-gradient(135deg, ${t.rose}, ${t.blush})`,
            display:        'flex',
            alignItems:     'center',
            justifyContent: 'center',
            fontSize:       '1rem',
            color:          t.deepRose,
            flexShrink:     0,
          }}>
            ✦
          </div>

          <div style={{ flex: 1, minWidth: 0 }}>
            <h4
              className="nova-display"
              style={{
                fontSize:      '1.15rem',
                fontWeight:    500,
                color:         t.textDark,
                lineHeight:    1.1,
                letterSpacing: '0.02em',
              }}
            >
              Nova
            </h4>
            <p style={{
              fontSize:      '0.65rem',
              color:         t.textMuted,
              letterSpacing: '0.06em',
              marginTop:     '2px',
            }}>
              Celestial Oracle Assistant
            </p>
          </div>

          {/* Live indicator */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
            <div style={{
              width:        '7px',
              height:       '7px',
              borderRadius: '50%',
              background:   isBlocked ? t.silver : t.roseDark,
              flexShrink:   0,
            }} />
            <span style={{ fontSize: '0.62rem', color: t.textMuted, letterSpacing: '0.06em' }}>
              {isBlocked ? 'LOCKED' : 'ONLINE'}
            </span>
          </div>
        </div>

        {/* ── Scrollable message arena ── */}
        {/* overscroll-contain prevents bounce scroll from shifting parent layout on iOS */}
        <div
          style={{
            flex:             1,
            overflowY:        'auto',
            overscrollBehavior: 'contain',
            padding:          '1.25rem 1rem 1.5rem',
            display:          'flex',
            flexDirection:    'column',
            gap:              '0.75rem',
            background:       t.platinum,
          }}
        >
          {/* Empty state */}
          {messages.length === 0 && !isBlocked && (
            <div style={{
              display:        'flex',
              flexDirection:  'column',
              alignItems:     'center',
              justifyContent: 'center',
              flex:           1,
              textAlign:      'center',
              padding:        '0 1.5rem',
            }}>
              <div style={{
                fontSize:     '2rem',
                color:        t.roseDark,
                marginBottom: '0.75rem',
                lineHeight:   1,
              }}>
                ✦
              </div>
              <p
                className="nova-display"
                style={{
                  fontSize:   '1.1rem',
                  fontWeight: 300,
                  fontStyle:  'italic',
                  color:      t.textMid,
                  lineHeight: 1.6,
                  maxWidth:   '260px',
                }}
              >
                Greetings, traveler. How may Nova illuminate your path today?
              </p>
            </div>
          )}

          {/* Messages */}
          {messages.map((msg, index) => (
            <div
              key={index}
              className="nova-msg"
              style={{
                padding:     '0.75rem 1rem',
                borderRadius: '14px',
                maxWidth:    '88%',
                fontSize:    '0.875rem',
                lineHeight:  1.6,
                whiteSpace:  'pre-wrap',
                wordBreak:   'break-word',
                /* User: right-aligned deepRose bubble */
                ...(msg.role === 'user' ? {
                  marginLeft:             'auto',
                  background:             t.deepRose,
                  color:                  t.white,
                  borderBottomRightRadius:'4px',
                } : {
                  /* Assistant: left-aligned white bubble */
                  marginRight:           'auto',
                  background:            t.white,
                  color:                 t.textDark,
                  border:                `1px solid ${t.silver}40`,
                  boxShadow:             '0 1px 4px rgba(45,27,35,0.05)',
                  borderBottomLeftRadius:'4px',
                }),
              }}
            >
              {msg.content}
            </div>
          ))}

          {/* Typing indicator */}
          {isLoading && (
            <div style={{
              display:    'flex',
              alignItems: 'center',
              gap:        '5px',
              paddingLeft:'0.25rem',
            }}>
              {[0, 1, 2].map((i) => (
                <span
                  key={i}
                  className="nova-dot"
                  style={{
                    display:      'inline-block',
                    width:        '7px',
                    height:       '7px',
                    borderRadius: '50%',
                    background:   t.roseDark,
                  }}
                />
              ))}
              <span style={{
                fontSize:   '0.7rem',
                color:      t.textMuted,
                fontStyle:  'italic',
                marginLeft: '4px',
              }}>
                Nova is channeling…
              </span>
            </div>
          )}

          {/* ── Injection hard-block card ── */}
          {isBlocked && (
            <div style={{
              background:   `${t.blush}80`,
              border:       `1.5px solid ${t.roseDark}`,
              borderRadius: '14px',
              padding:      '1rem 1.1rem',
              textAlign:    'center',
              lineHeight:   1.5,
            }}>
              <div style={{ fontSize: '1.25rem', marginBottom: '0.4rem' }}>⚠️</div>
              <p style={{
                fontSize:     '0.8rem',
                fontWeight:   600,
                color:        t.deepRose,
                marginBottom: '0.3rem',
                letterSpacing:'0.02em',
              }}>
                Cosmic Alignment Disrupted
              </p>
              <p style={{ fontSize: '0.75rem', color: t.textMid }}>
                An attempt to override Nova's directives was detected. Please refresh the page to restore your connection.
              </p>
            </div>
          )}

          {/* ── Transient error (non-blocking) ── */}
          {error && !isBlocked && (
            <div style={{
              background:   `${t.blush}60`,
              border:       `1px solid ${t.rose}`,
              borderRadius: '10px',
              padding:      '0.65rem 0.85rem',
              fontSize:     '0.78rem',
              color:        t.deepRose,
              lineHeight:   1.5,
            }}>
              {error}
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* ── Input tray ── */}
        {/* Border-t gives clean separation on edge-to-edge mobile screens */}
        <form
          onSubmit={handleSendMessage}
          style={{
            padding:       '0.75rem',
            background:    isBlocked ? t.paleSilver : t.white,
            borderTop:     `1px solid ${isBlocked ? t.rose : t.silver}40`,
            display:       'flex',
            gap:           '0.5rem',
            alignItems:    'center',
            flexShrink:    0,
            transition:    'background 0.3s ease',
            /* iOS safe-area inset so the form clears the home indicator */
            paddingBottom: 'calc(0.75rem + env(safe-area-inset-bottom, 0px))',
          }}
        >
          <input
            type="text"
            value={input}
            onChange={(e) => !isBlocked && setInput(e.target.value)}
            placeholder={
              isBlocked
                ? 'Session locked — please refresh the page'
                : 'Ask Nova a cosmic question…'
            }
            disabled={isLoading || isBlocked}
            className="nova-input"
            style={{
              flex:         1,
              border:       `1.5px solid ${isBlocked ? t.rose : t.silver}`,
              borderRadius: '12px',
              padding:      '0.7rem 0.9rem',
              fontSize:     '16px', /* Critical — prevents iOS Safari auto-zoom */
              fontFamily:   'Inter, sans-serif',
              color:        t.textDark,
              background:   isBlocked ? t.paleSilver : `${t.platinum}`,
              minHeight:    '44px', /* WCAG touch target */
              transition:   'border-color 0.2s ease, box-shadow 0.2s ease',
            }}
          />
          <button
            type="submit"
            disabled={isLoading || !input.trim() || isBlocked}
            className="nova-send"
            style={{
              background:    isBlocked ? t.silver : t.roseDark,
              color:         t.white,
              border:        'none',
              borderRadius:  '12px',
              padding:       '0 1.1rem',
              minHeight:     '44px', /* WCAG touch target */
              minWidth:      '64px',
              fontSize:      '0.82rem',
              fontWeight:    600,
              letterSpacing: '0.04em',
              flexShrink:    0,
              transition:    'background 0.2s ease, transform 0.15s ease',
            }}
          >
            Send
          </button>
        </form>

      </div>
    </>
  );
}