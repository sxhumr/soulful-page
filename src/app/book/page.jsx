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

      const data = await response.json();

      // If the Next.js API route returns an error, catch and display it
      if (!response.ok) {
        throw new Error(data.error || 'Failed to submit request');
      }

      setStatus({ loading: false, success: true, error: null });
      setFormData({ name: '', email: '', phone: '', date: '', timeSlot: '', message: '' });
    } catch (err) {
      setStatus({ loading: false, success: false, error: err.message || 'Something went wrong.' });
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: '40px auto', padding: '0 20px', fontFamily: 'sans-serif' }}>
      <header style={{ textAlign: 'center', marginBottom: '32px' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: '700', color: '#111827', marginBottom: '8px' }}>
          Request a Session
        </h1>
        <p style={{ color: '#4B5563', fontSize: '0.95rem' }}>
          Fill out the details below, and I will get back to you to confirm your slot.
        </p>
      </header>

      {status.success ? (
        <div style={{ backgroundColor: '#F0FDF4', border: '1px solid #BBF7D0', padding: '24px', borderRadius: '12px', textAlign: 'center' }}>
          <h3 style={{ color: '#166534', fontWeight: '600', marginBottom: '8px' }}>Request Received!</h3>
          <p style={{ color: '#1F2937', fontSize: '0.9rem' }}>Thank you. Your booking has been successfully coordinated with the scheduling system.</p>
          <button 
            onClick={() => setStatus({ loading: false, success: null, error: null })}
            style={{ marginTop: '16px', background: 'none', border: 'none', color: '#166534', textDecoration: 'underline', cursor: 'pointer' }}
          >
            Submit another request
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <label style={{ fontSize: '0.875rem', fontWeight: '500', color: '#374151' }}>Full Name</label>
            <input type="text" name="name" required value={formData.name} onChange={handleChange} style={inputStyle} placeholder="John Doe" />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label style={{ fontSize: '0.875rem', fontWeight: '500', color: '#374151' }}>Email Address</label>
              <input type="email" name="email" required value={formData.email} onChange={handleChange} style={inputStyle} placeholder="john@example.com" />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label style={{ fontSize: '0.875rem', fontWeight: '500', color: '#374151' }}>Phone Number</label>
              <input type="tel" name="phone" required value={formData.phone} onChange={handleChange} style={inputStyle} placeholder="082 123 4567" />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
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
            <div style={{ backgroundColor: '#FEF2F2', border: '1px solid #FEE2E2', padding: '12px', borderRadius: '8px', color: '#991B1B', fontSize: '0.875rem' }}>
              <strong>Error:</strong> {status.error}
            </div>
          )}

          <button type="submit" disabled={status.loading} style={buttonStyle}>
            {status.loading ? 'Processing with Cal.com...' : 'Submit Booking Request'}
          </button>
        </form>
      )}
    </div>
  );
}

// Clean UI Styles
const inputStyle = {
  width: '100%',
  padding: '10px 14px',
  borderRadius: '8px',
  border: '1px solid #D1D5DB',
  fontSize: '0.95rem',
  outline: 'none',
  boxSizing: 'border-box',
};

const buttonStyle = {
  width: '100%',
  backgroundColor: '#111827',
  color: '#FFFFFF',
  padding: '12px',
  borderRadius: '8px',
  fontSize: '1rem',
  fontWeight: '600',
  border: 'none',
  cursor: 'pointer',
  marginTop: '10px',
  transition: 'background-color 0.2s',
};