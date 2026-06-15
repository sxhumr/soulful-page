'use client';

import { useState } from 'react';
import Link from 'next/link';

/* ── Shared design tokens (mirrors homepage) ── */
const theme = {
  platinum:  '#F7F8FA',
  paleSilver:'#EDF0F4',
  silver:    '#C8CDD6',
  silverDark:'#9BA3AF',
  blush:     '#F9D4DC',
  rose:      '#E8A8B5',
  roseDark:  '#C47F92',
  deepRose:  '#8B3D54',
  textDark:  '#2D1B23',
  textMid:   '#6B4D57',
  textMuted: '#9B8089',
  white:     '#FFFFFF',
};

const globalStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=Inter:wght@300;400;500&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  html, body {
    min-height: 100%;
    background: ${theme.platinum};
    font-family: 'Inter', sans-serif;
    color: ${theme.textDark};
    -webkit-font-smoothing: antialiased;
  }

  .display { font-family: 'Cormorant Garamond', serif; }

  /* ── Orb ambience ── */
  @keyframes orb-pulse {
    0%, 100% { opacity: 0.15; transform: scale(1); }
    50%       { opacity: 0.25; transform: scale(1.04); }
  }
  .hero-orb { animation: orb-pulse 7s ease-in-out infinite; }

  /* ── CTA pulse (matches homepage primary CTA) ── */
  @keyframes cta-pulse {
    0%, 100% { box-shadow: 0 8px 24px rgba(196,127,146,0.40); }
    50%       { box-shadow: 0 8px 36px rgba(196,127,146,0.65); }
  }
  .cta-btn-primary {
    animation: cta-pulse 3s ease-in-out infinite;
    transition: background 0.25s ease, transform 0.25s ease, box-shadow 0.25s ease;
  }
  .cta-btn-primary:hover {
    background: ${theme.deepRose} !important;
    transform: translateY(-2px);
    animation: none;
  }
  .cta-btn-primary:disabled {
    animation: none;
    opacity: 0.65;
    cursor: not-allowed;
    transform: none !important;
  }

  /* ── Focus ring on every input/select/textarea ── */
  .sh-input:focus {
    outline: none;
    border-color: ${theme.roseDark} !important;
    box-shadow: 0 0 0 3px ${theme.blush} !important;
  }

  /* ── Responsive grid ── */
  .responsive-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px;
  }

  /* ── Mobile breakpoint ── */
  @media (max-width: 560px) {
    .responsive-grid {
      grid-template-columns: 1fr !important;
      gap: 0 !important;
    }
    .page-wrapper {
      padding: 0 1rem 3rem !important;
    }
    .form-card {
      padding: 1.75rem 1.25rem !important;
      border-radius: 16px !important;
    }
    .page-header {
      padding: 5rem 1rem 2rem !important;
    }
    .hero-title {
      font-size: clamp(2.4rem, 9vw, 3.5rem) !important;
    }
  }
`;

/* ── Input style object (kept as JS for inline application) ── */
const inputStyle = {
  width: '100%',
  padding: '12px 14px',
  borderRadius: '10px',
  border: `1.5px solid ${theme.silver}`,
  fontSize: '16px',          /* iOS Safari zoom prevention */
  fontFamily: "'Inter', sans-serif",
  color: theme.textDark,
  background: theme.platinum,
  outline: 'none',
  boxSizing: 'border-box',
  WebkitAppearance: 'none',
  transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
};

const labelStyle = {
  fontSize: '0.75rem',
  fontWeight: 500,
  letterSpacing: '0.1em',
  textTransform: 'uppercase',
  color: theme.textMid,
  marginBottom: '6px',
  display: 'block',
};

const fieldStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '6px',
};

export default function BookingPage() {
  const [formData, setFormData] = useState({
    name:     '',
    email:    '',
    phone:    '',
    date:     '',
    timeSlot: '',
    message:  '',
  });
  const [status, setStatus] = useState({ loading: false, success: null, error: null });

  /* ── Unchanged handlers ── */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, success: null, error: null });

    try {
      const response = await fetch('/api/book', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify(formData),
      });

      let data = {};
      const contentType = response.headers.get('content-type');

      if (contentType && contentType.includes('application/json')) {
        data = await response.json();
      } else {
        await response.text();
        throw new Error(`Server Error (${response.status}). Please try again.`);
      }

      if (!response.ok) {
        throw new Error(data.error || 'Failed to submit request');
      }

      setStatus({ loading: false, success: true, error: null });
      setFormData({ name: '', email: '', phone: '', date: '', timeSlot: '', message: '' });
    } catch (err) {
      setStatus({
        loading: false,
        success:  false,
        error:    err.message || 'Connection timed out. Please check your network.',
      });
    }
  };

  return (
    <>
      <style>{globalStyles}</style>

      {/* ── Page wrapper ── */}
      <div style={{
        minHeight:       '100vh',
        background:      `linear-gradient(160deg, ${theme.white} 0%, ${theme.platinum} 55%, ${theme.paleSilver} 100%)`,
        display:         'flex',
        flexDirection:   'column',
        alignItems:      'center',
      }}>

        {/* ── Ambient orb ── */}
        <div className="hero-orb" style={{
          position:     'fixed',
          width:        '520px',
          height:       '520px',
          borderRadius: '50%',
          background:   `radial-gradient(circle at 40% 40%, ${theme.blush}, ${theme.rose}44 50%, transparent 70%)`,
          top:          '10%',
          left:         '50%',
          transform:    'translateX(-42%)',
          pointerEvents:'none',
          zIndex:       0,
        }} />

        {/* ── Minimal nav ── */}
        <nav style={{
          width:          '100%',
          display:        'flex',
          alignItems:     'center',
          justifyContent: 'space-between',
          padding:        '1.25rem 2rem',
          background:     'rgba(247,248,250,0.82)',
          backdropFilter: 'blur(16px)',
          borderBottom:   `0.5px solid ${theme.silver}40`,
          position:       'sticky',
          top:            0,
          zIndex:         100,
        }}>
          <Link href="/" style={{ textDecoration: 'none' }}>
            <span className="display" style={{
              fontSize:      '1.35rem',
              fontWeight:    400,
              letterSpacing: '0.08em',
              color:         theme.deepRose,
            }}>
              Soulful Healing
            </span>
          </Link>

          <Link href="/" style={{ textDecoration: 'none' }}>
            <button style={{
              fontSize:       '0.72rem',
              fontWeight:     500,
              letterSpacing:  '0.1em',
              textTransform:  'uppercase',
              padding:        '0.55rem 1.25rem',
              minHeight:      '44px',
              borderRadius:   '50px',
              border:         `1px solid ${theme.rose}`,
              background:     'transparent',
              color:          theme.deepRose,
              cursor:         'pointer',
            }}>
              ← Back
            </button>
          </Link>
        </nav>

        {/* ── Page header ── */}
        <header className="page-header" style={{
          textAlign:    'center',
          padding:      '5.5rem 1.5rem 2.5rem',
          position:     'relative',
          zIndex:       1,
          maxWidth:     '640px',
          width:        '100%',
        }}>
          <p style={{
            fontSize:      '0.65rem',
            fontWeight:    500,
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color:         theme.roseDark,
            marginBottom:  '1rem',
          }}>
            Initiate Alignment · Book a Reading
          </p>

          <h1 className="display hero-title" style={{
            fontSize:      '3.75rem',
            fontWeight:    300,
            lineHeight:    1.1,
            letterSpacing: '-0.02em',
            color:         theme.textDark,
            marginBottom:  '1rem',
          }}>
            Cast your <em style={{ fontStyle: 'italic', color: theme.deepRose }}>session.</em>
          </h1>

          <p style={{
            fontSize:   '0.95rem',
            fontWeight: 300,
            lineHeight: 1.75,
            color:      theme.textMid,
          }}>
            Fill out the details below and I will confirm your slot within the celestial cycle.
          </p>
        </header>

        {/* ── Main content ── */}
        <main className="page-wrapper" style={{
          width:         '100%',
          maxWidth:      '620px',
          padding:       '0 1.5rem 5rem',
          position:      'relative',
          zIndex:        1,
        }}>

          {/* ── SUCCESS STATE ── */}
          {status.success ? (
            <div style={{
              background:   theme.white,
              border:       `1.5px solid ${theme.rose}`,
              padding:      '2.5rem 2rem',
              borderRadius: '20px',
              textAlign:    'center',
              boxShadow:    `0 8px 32px ${theme.blush}80`,
            }}>
              {/* Celestial success icon */}
              <div style={{
                width:          '56px',
                height:         '56px',
                borderRadius:   '50%',
                background:     `linear-gradient(135deg, ${theme.rose}, ${theme.blush})`,
                display:        'flex',
                alignItems:     'center',
                justifyContent: 'center',
                margin:         '0 auto 1.25rem',
                fontSize:       '1.5rem',
              }}>
                ✦
              </div>

              <h3 className="display" style={{
                fontSize:     '2rem',
                fontWeight:   400,
                color:        theme.deepRose,
                marginBottom: '0.75rem',
              }}>
                Alignment Confirmed
              </h3>

              <p style={{
                fontSize:     '0.9rem',
                color:        theme.textMid,
                lineHeight:   1.7,
                marginBottom: '1.75rem',
              }}>
                Your booking has been successfully coordinated with the scheduling system. I will be in touch to confirm your celestial session.
              </p>

              <button
                onClick={() => setStatus({ loading: false, success: null, error: null })}
                style={{
                  background:    'none',
                  border:        `1px solid ${theme.rose}`,
                  color:         theme.deepRose,
                  padding:       '0.65rem 1.75rem',
                  borderRadius:  '50px',
                  fontSize:      '0.78rem',
                  fontWeight:    500,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  cursor:        'pointer',
                  minHeight:     '44px',
                }}
              >
                Submit Another Request
              </button>
            </div>
          ) : (

            /* ── FORM CARD ── */
            <div className="form-card" style={{
              background:   theme.white,
              borderRadius: '24px',
              padding:      '2.5rem 2rem',
              border:       `1px solid ${theme.silver}50`,
              boxShadow:    `0 4px 24px rgba(45,27,35,0.06)`,
            }}>

              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>

                {/* Full Name */}
                <div style={fieldStyle}>
                  <label style={labelStyle}>Full Name</label>
                  <input
                    type="text"
                    name="name"
                    required
                    autoComplete="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your full name"
                    className="sh-input"
                    style={inputStyle}
                  />
                </div>

                {/* Email + Phone */}
                <div className="responsive-grid" style={{ gap: '16px' }}>
                  <div style={fieldStyle}>
                    <label style={labelStyle}>Email Address</label>
                    <input
                      type="email"
                      name="email"
                      required
                      autoComplete="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="you@example.com"
                      className="sh-input"
                      style={inputStyle}
                    />
                  </div>
                  <div style={fieldStyle}>
                    <label style={labelStyle}>Phone Number</label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      autoComplete="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="082 123 4567"
                      className="sh-input"
                      style={inputStyle}
                    />
                  </div>
                </div>

                {/* Date + Time Slot */}
                <div className="responsive-grid" style={{ gap: '16px' }}>
                  <div style={fieldStyle}>
                    <label style={labelStyle}>Preferred Date</label>
                    <input
                      type="date"
                      name="date"
                      required
                      value={formData.date}
                      onChange={handleChange}
                      className="sh-input"
                      style={inputStyle}
                    />
                  </div>
                  <div style={fieldStyle}>
                    <label style={labelStyle}>Preferred Time Slot</label>
                    <select
                      name="timeSlot"
                      required
                      value={formData.timeSlot}
                      onChange={handleChange}
                      className="sh-input"
                      style={inputStyle}
                    >
                      <option value="">Select a time</option>
                      <option value="morning">Morning (09:00 – 12:00)</option>
                      <option value="afternoon">Afternoon (12:00 – 15:00)</option>
                      <option value="late-afternoon">Late Afternoon (15:00 – 18:00)</option>
                    </select>
                  </div>
                </div>

                {/* Notes */}
                <div style={fieldStyle}>
                  <label style={labelStyle}>Focus Area or Notes <span style={{ color: theme.textMuted, textTransform: 'none', letterSpacing: 0, fontSize: '0.7rem' }}>(optional)</span></label>
                  <textarea
                    name="message"
                    rows="4"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Any specific planetary transits, life areas, or intentions you'd like to explore…"
                    className="sh-input"
                    style={{ ...inputStyle, resize: 'vertical', lineHeight: 1.6 }}
                  />
                </div>

                {/* Error state */}
                {status.error && (
                  <div style={{
                    background:   `${theme.blush}60`,
                    border:       `1px solid ${theme.rose}`,
                    padding:      '14px 16px',
                    borderRadius: '10px',
                    color:        theme.deepRose,
                    fontSize:     '0.85rem',
                    lineHeight:   1.5,
                  }}>
                    <strong>Submission Error:</strong> {status.error}
                  </div>
                )}

                {/* Divider */}
                <div style={{ height: '1px', background: `${theme.silver}50`, margin: '0 0 2px' }} />

                {/* Submit CTA */}
                <button
                  type="submit"
                  disabled={status.loading}
                  className="cta-btn-primary"
                  style={{
                    width:         '100%',
                    background:    theme.roseDark,
                    color:         theme.white,
                    padding:       '1rem 2rem',
                    minHeight:     '52px',
                    borderRadius:  '50px',
                    fontSize:      '0.85rem',
                    fontWeight:    600,
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    border:        'none',
                    cursor:        status.loading ? 'not-allowed' : 'pointer',
                  }}
                >
                  {status.loading ? '✦ Aligning with Cal.com…' : '✦ Submit Booking Request'}
                </button>

              </form>
            </div>
          )}

          {/* ── Watermark footer ── */}
          <p style={{
            textAlign:     'center',
            fontSize:      '0.65rem',
            color:         theme.textMuted,
            letterSpacing: '0.06em',
            marginTop:     '2.5rem',
            lineHeight:    1.6,
          }}>
            © 2026 All Rights Reserved.{' '}
            <span style={{ color: theme.silverDark }}>Developed by Nebula Technologies (Pty) Ltd</span>
          </p>
        </main>
      </div>
    </>
  );
}