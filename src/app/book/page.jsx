'use client';

import { useState } from 'react';

export default function BookingPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    timeSlot: '',
    message: '',
  });
  const [status, setStatus] = useState({ loading: false, success: null, error: null });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, success: null, error: null });

    try {
      const response = await fetch('/api/booking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      let data = {};
      const contentType = response.headers.get('content-type');
      
      // Safe check: Only parse as JSON if the server actually sent JSON
      if (contentType && contentType.includes('application/json')) {
        data = await response.json();
      } else {
        // If server timed out or returned HTML/Text, capture it safely without crashing
        const textError = await response.text();
        throw new Error(`Server Error (${response.status}). Please try again.`);
      }

      if (!response.ok) {
        throw new Error(data.error || 'Failed to submit request');
      }

      setStatus({ loading: false, success: true, error: null });
      setFormData({ name: '', email: '', phone: '', date: '', timeSlot: '', message: '' });
    } catch (err) {
      // Catch blocks guarantee loading turns off, preventing endless loops
      setStatus({ 
        loading: false, 
        success: false, 
        error: err.message || 'Connection timed out. Please check your network.' 
      });
    }
  };

  return (
    <div className="booking-container" style={{ maxWidth: '600px', margin: '40px auto', padding: '0 20px', fontFamily: 'sans-serif' }}>
      
      {/* Dynamic responsive CSS overrides for mobile screens */}
      <style>{`
        .responsive-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }
        @media (max-width: 520px) {
          .responsive-grid {
            grid-template-columns: 1fr !important;
            gap: 20px !important;
          }
          .booking-container {
            margin: 20px auto !important;
            padding: 0 16px !important;
          }
        }
      `}</style>

      <header style={{ textAlign: 'center', marginBottom: '32px' }}>
        <h1 style={{ fontSize: '1.85rem', fontWeight: '700', color: '#111827', marginBottom: '8px', letterSpacing: '-0.025em' }}>
          Request a Session
        </h1>
        <p style={{ color: '#4B5563', fontSize: '0.95rem', lineHeight: '1.5' }}>
          Fill out the details below, and I will get back to you to confirm your slot.
        </p>
      </header>

      {status.success ? (
        <div style={{ backgroundColor: '#F0FDF4', border: '1px solid #BBF7D0', padding: '24px', borderRadius: '12px', textAlign: 'center' }}>
          <h3 style={{ color: '#166534', fontWeight: '600', marginBottom: '8px', fontSize: '1.1rem' }}>Request Received!</h3>
          <p style={{ color: '#1F2937', fontSize: '0.95rem', lineHeight: '1.5' }}>Thank you. Your booking has been successfully coordinated with the scheduling system.</p>
          <button 
            onClick={() => setStatus({ loading: false, success: null, error: null })}
            style={{ marginTop: '16px', background: 'none', border: 'none', color: '#166534', textDecoration: 'underline', cursor: 'pointer', fontWeight: '500' }}
          >
            Submit another request
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <label style={{ fontSize: '0.875rem', fontWeight: '500', color: '#374151' }}>Full Name</label>
            <input type="text" name="name" required autoComplete="name" value={formData.name} onChange={handleChange} style={inputStyle} placeholder="John Doe" />
          </div>

          <div className="responsive-grid">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label style={{ fontSize: '0.875rem', fontWeight: '500', color: '#374151' }}>Email Address</label>
              <input type="email" name="email" required autoComplete="email" value={formData.email} onChange={handleChange} style={inputStyle} placeholder="john@example.com" />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label style={{ fontSize: '0.875rem', fontWeight: '500', color: '#374151' }}>Phone Number</label>
              <input type="tel" name="phone" required autoComplete="tel" value={formData.phone} onChange={handleChange} style={inputStyle} placeholder="082 123 4567" />
            </div>
          </div>

          <div className="responsive-grid">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label style={{ fontSize: '0.875rem', fontWeight: '500', color: '#374151' }}>Preferred Date</label>
              <input type="date" name="date" required value={formData.date} onChange={handleChange} style={inputStyle} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label style={{ fontSize: '0.875rem', fontWeight: '500', color: '#374151' }}>Preferred Time Slot</label>
              <select name="timeSlot" required value={formData.timeSlot} onChange={handleChange} style={inputStyle}>
                <option value="">Select a time</option>
                <option value="morning">Morning (09:00 - 12:00)</option>
                <option value="afternoon">Afternoon (12:00 - 15:00)</option>
                <option value="late-afternoon">Late Afternoon (15:00 - 18:00)</option>
              </select>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <label style={{ fontSize: '0.875rem', fontWeight: '500', color: '#374151' }}>Any specific focus area or notes?</label>
            <textarea name="message" rows="4" value={formData.message} onChange={handleChange} style={{ ...inputStyle, resize: 'vertical' }} placeholder="Optional details..." />
          </div>

          {status.error && (
            <div style={{ backgroundColor: '#FEF2F2', border: '1px solid #FEE2E2', padding: '14px', borderRadius: '8px', color: '#991B1B', fontSize: '0.875rem', lineHeight: '1.4' }}>
              <strong>Submission Error:</strong> {status.error}
            </div>
          )}

          <button type="submit" disabled={status.loading} style={{ ...buttonStyle, opacity: status.loading ? 0.7 : 1, cursor: status.loading ? 'not-allowed' : 'pointer' }}>
            {status.loading ? 'Processing with Cal.com...' : 'Submit Booking Request'}
          </button>
        </form>
      )}
    </div>
  );
}

// Clean, Zoom-immune Mobile UI Styles
const inputStyle = {
  width: '100%',
  padding: '12px 14px', // Slightly deeper touch-targets for thumbs
  borderRadius: '8px',
  border: '1px solid #D1D5DB',
  fontSize: '16px', // 16px exact is the critical fix for the iOS Safari input zoom issue
  outline: 'none',
  boxSizing: 'border-box',
  WebkitAppearance: 'none', // Normalizes subtle iOS rendering shifts on selectors
};

const buttonStyle = {
  width: '100%',
  backgroundColor: '#111827',
  color: '#FFFFFF',
  padding: '14px',
  borderRadius: '8px',
  fontSize: '1rem',
  fontWeight: '600',
  border: 'none',
  marginTop: '10px',
  transition: 'background-color 0.2s, opacity 0.2s',
};