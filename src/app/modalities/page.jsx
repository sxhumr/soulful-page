'use client';

import { useState } from 'react';
import Link from 'next/link';

// Mock data matching the headless architecture framework
const MODALITIES = [
  {
    id: 'reiki',
    title: 'Energy Reiki',
    shortDesc: 'Restore your natural energetic balance and clear deep emotional blockages.',
    longDesc: 'Reiki is a gentle, non-invasive subtle energy therapy that promotes deep relaxation, stress reduction, and holistic healing. By channeling universal life force energy, this practice works directly on your subtle energetic body to release stagnant patterns and accelerate physical and emotional wellness.',
    experience: 'You will remain fully clothed while relaxing on a comfortable massage table. The practitioner will place their hands gently on or just above specific energy centers (chakras) to facilitate a warm, radiating flow of restorative energy.',
    tags: ['Burned Out', 'Heavy Heart', 'Low Energy'],
    animType: 'glow'
  },
  {
    id: 'breathwork',
    title: 'Somatic Breathwork',
    shortDesc: 'Regulate your nervous system and release stored trauma through conscious breathing.',
    longDesc: 'Somatic Breathwork utilizes conscious, connected breathing rhythms to bypass the analytical mind and access the subconscious body. This deep somatic release allows for the safe processing of accumulated stress, emotional residue, and physical tension.',
    experience: 'Lying down comfortably, you will be guided through a sustained, continuous breathing pattern accompanied by curated acoustic frequencies. It is common to experience profound physical releases, emotional clarity, or deep meditative states.',
    tags: ['Overthinking', 'Burned Out', 'Seeking Clarity'],
    animType: 'breath'
  },
  {
    id: 'sound-therapy',
    title: 'Acoustic Sound Therapy',
    shortDesc: 'Calm brainwave frequencies into deep meditation using therapeutic soundscapes.',
    longDesc: 'Sound Therapy utilizes vibrational frequencies from crystal singing bowls, gongs, and tuning forks to down-regulate your nervous system. The sound waves pull your brain into slow, deeply restorative theta and delta brainwave states, clearing cognitive chatter instantly.',
    experience: 'An immersive sound bath experience where you lie down under a warm blanket. The room is filled with acoustic vibrations that you don’t just hear, but actively feel vibrating through your body, inducing absolute stillness.',
    tags: ['Overthinking', 'Burned Out'],
    animType: 'wave'
  }
];

const FILTERS = ['All', 'Overthinking', 'Burned Out', 'Heavy Heart', 'Low Energy', 'Seeking Clarity'];

export default function ModalitiesPage() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [selectedModality, setSelectedModality] = useState(null);

  const filteredModalities = activeFilter === 'All'
    ? MODALITIES
    : MODALITIES.filter(m => m.tags.includes(activeFilter));

  return (
    <div className="modalities-container" style={containerStyle}>
      
      {/* Keyframe & Layout Styles */}
      <style>{`
        /* Micro-Animations */
        @keyframes pulseGlow {
          0% { box-shadow: 0 4px 20px -2px rgba(17, 24, 39, 0.05); }
          50% { box-shadow: 0 4px 30px 4px rgba(16, 185, 129, 0.12); border-color: #A7F3D0; }
          100% { box-shadow: 0 4px 20px -2px rgba(17, 24, 39, 0.05); }
        }
        @keyframes dynamicBreath {
          0% { transform: scale(1); opacity: 0.4; }
          50% { transform: scale(1.3); opacity: 0.8; }
          100% { transform: scale(1); opacity: 0.4; }
        }
        @keyframes gentleWave {
          0%, 100% { transform: translateY(0) scaleY(1); }
          50% { transform: translateY(-4px) scaleY(1.15); }
        }

        /* Hover / Trigger classes */
        .modality-card:hover .anim-glow {
          animation: pulseGlow 3s infinite ease-in-out;
        }
        .modality-card:hover .anim-breath {
          animation: dynamicBreath 4s infinite ease-in-out;
        }
        .modality-card:hover .anim-wave span {
          animation: gentleWave 1.4s infinite ease-in-out;
        }

        /* Responsive Breakpoints */
        .filter-scroll::-webkit-scrollbar { display: none; }
        .modalities-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 24px;
        }
        @media (max-width: 600px) {
          .modalities-container { padding: 30px 16px !important; }
          .filter-scroll {
            display: flex !important;
            overflow-x: auto;
            white-space: nowrap;
            padding-bottom: 8px;
            margin-right: -16px;
            margin-left: -16px;
            padding-left: 16px;
            -webkit-overflow-scrolling: touch;
          }
          .drawer-panel {
            width: 100% !important;
            border-radius: 20px 20px 0 0 !important;
            height: 85vh !important;
            bottom: 0 !important;
            top: auto !important;
            transform: translateY(${selectedModality ? '0' : '100%'}) !important;
          }
        }
      `}</style>

      <header style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h1 style={{ fontSize: '2.25rem', fontWeight: '700', color: '#111827', marginBottom: '12px', letterSpacing: '-0.025em' }}>
          Healing Modalities
        </h1>
        <p style={{ color: '#4B5563', fontSize: '1rem', maxWidth: '500px', margin: '0 auto', lineHeight: '1.6' }}>
          Explore restorative pathways tailored to your current physical and emotional landscape.
        </p>
      </header>

      {/* Horizontal State-of-Being Filter Bar */}
      <div className="filter-scroll" style={filterBarStyle}>
        {FILTERS.map((filter) => (
          <button
            key={filter}
            onClick={() => setActiveFilter(filter)}
            style={{
              ...filterButtonStyle,
              backgroundColor: activeFilter === filter ? '#111827' : '#F3F4F6',
              color: activeFilter === filter ? '#FFFFFF' : '#374151',
            }}
          >
            {filter === 'All' ? 'View All' : filter}
          </button>
        ))}
      </div>

      {/* Modalities Dynamic Grid */}
      <div className="modalities-grid">
        {filteredModalities.map((item) => (
          <div
            key={item.id}
            className="modality-card"
            onClick={() => setSelectedModality(item)}
            style={{
              ...cardStyle,
              animation: item.animType === 'glow' ? 'none' : undefined
            }}
          >
            {/* Sensory Micro-Animation Icons */}
            <div style={iconWrapperStyle} className={item.animType === 'glow' ? 'anim-glow' : ''}>
              {item.animType === 'breath' && (
                <div className="anim-breath" style={{ width: '16px', height: '16px', borderRadius: '50%', backgroundColor: '#10B981' }} />
              )}
              {item.animType === 'wave' && (
                <div className="anim-wave" style={{ display: 'flex', gap: '3px', alignItems: 'center' }}>
                  <span style={{ display: 'block', width: '3px', height: '14px', backgroundColor: '#3B82F6', borderRadius: '2px', animationDelay: '0s' }} />
                  <span style={{ display: 'block', width: '3px', height: '22px', backgroundColor: '#3B82F6', borderRadius: '2px', animationDelay: '0.2s' }} />
                  <span style={{ display: 'block', width: '3px', height: '14px', backgroundColor: '#3B82F6', borderRadius: '2px', animationDelay: '0.4s' }} />
                </div>
              )}
              {item.animType === 'glow' && (
                <div style={{ width: '14px', height: '14px', borderRadius: '50%', backgroundColor: '#F59E0B' }} />
              )}
            </div>

            <h3 style={{ fontSize: '1.25rem', fontWeight: '600', color: '#111827', marginBottom: '10px' }}>{item.title}</h3>
            <p style={{ color: '#4B5563', fontSize: '0.925rem', lineHeight: '1.5', flexGrow: 1 }}>{item.shortDesc}</p>
            
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginTop: '16px' }}>
              {item.tags.map(tag => (
                <span key={tag} style={tagStyle}>{tag}</span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Slide-over Detail Drawer Overlay */}
      {selectedModality && (
        <div 
          onClick={() => setSelectedModality(null)} 
          style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.4)', zIndex: 999, backdropFilter: 'blur(2px)', transition: 'opacity 0.3s' }}
        />
      )}

      <div 
        className="drawer-panel"
        style={{
          ...drawerStyle,
          transform: selectedModality ? 'translateX(0)' : 'translateX(100%)',
        }}
      >
        {selectedModality && (
          <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
              <h2 style={{ fontSize: '1.5rem', fontWeight: '700', color: '#111827' }}>{selectedModality.title}</h2>
              <button onClick={() => setSelectedModality(null)} style={closeButtonStyle}>✕</button>
            </header>

            <div style={{ flexGrow: 1, overflowY: 'auto', paddingRight: '4px' }}>
              <section style={{ marginBottom: '24px' }}>
                <h4 style={drawerSectionHeading}>The Essence</h4>
                <p style={drawerSectionText}>{selectedModality.longDesc}</p>
              </section>

              <section style={{ marginBottom: '24px', backgroundColor: '#F9FAFB', padding: '16px', borderRadius: '12px', border: '1px solid #E5E7EB' }}>
                <h4 style={drawerSectionHeading}>What to Expect</h4>
                <p style={{ ...drawerSectionText, margin: 0 }}>{selectedModality.experience}</p>
              </section>
            </div>

            <footer style={{ marginTop: '20px' }}>
              <Link 
                href={`/book?service=${encodeURIComponent(selectedModality.id)}`}
                style={drawerBookButtonStyle}
              >
                Request This Session
              </Link>
            </footer>
          </div>
        )}
      </div>

    </div>
  );
}

// Minimalist Design Token Layout Styles
const containerStyle = {
  maxWidth: '960px',
  margin: '0 auto',
  padding: '60px 20px',
  fontFamily: 'sans-serif',
};

const filterBarStyle = {
  display: 'flex',
  justifyContent: 'center',
  gap: '10px',
  marginBottom: '40px',
};

const filterButtonStyle = {
  padding: '8px 16px',
  borderRadius: '9999px',
  fontSize: '0.875rem',
  fontWeight: '500',
  border: 'none',
  cursor: 'pointer',
  transition: 'all 0.2s ease',
};

const cardStyle = {
  backgroundColor: '#FFFFFF',
  border: '1px solid #E5E7EB',
  borderRadius: '16px',
  padding: '24px',
  cursor: 'pointer',
  display: 'flex',
  flexDirection: 'column',
  transition: 'transform 0.2s ease, border-color 0.2s ease',
  position: 'relative',
};

const iconWrapperStyle = {
  width: '40px',
  height: '40px',
  borderRadius: '10px',
  backgroundColor: '#F9FAFB',
  border: '1px solid #E5E7EB',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginBottom: '20px',
};

const tagStyle = {
  fontSize: '0.75rem',
  fontWeight: '500',
  color: '#4B5563',
  backgroundColor: '#F3F4F6',
  padding: '4px 10px',
  borderRadius: '6px',
};

const drawerStyle = {
  position: 'fixed',
  top: 0,
  right: 0,
  width: '440px',
  height: '100vh',
  backgroundColor: '#FFFFFF',
  boxShadow: '-10px 0 30px rgba(0,0,0,0.05)',
  zIndex: 1000,
  padding: '32px',
  boxSizing: 'border-box',
  transition: 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
};

const closeButtonStyle = {
  background: 'none',
  border: 'none',
  fontSize: '1.25rem',
  color: '#9CA3AF',
  cursor: 'pointer',
  padding: '4px',
};

const drawerSectionHeading = {
  fontSize: '0.875rem',
  fontWeight: '600',
  textTransform: 'uppercase',
  letterSpacing: '0.05em',
  color: '#6B7280',
  marginBottom: '8px',
};

const drawerSectionText = {
  fontSize: '0.975rem',
  lineHeight: '1.6',
  color: '#374151',
};

const drawerBookButtonStyle = {
  display: 'block',
  width: '100%',
  textAlign: 'center',
  backgroundColor: '#111827',
  color: '#FFFFFF',
  padding: '14px',
  borderRadius: '8px',
  fontSize: '1rem',
  fontWeight: '600',
  textDecoration: 'none',
  boxSizing: 'border-box',
};