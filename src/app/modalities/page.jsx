'use client';

import { useState } from 'react';
import Link from 'next/link';

// Integrated live pricing details into the core headless architecture structure
const MODALITIES = [
  {
    id: 'reiki',
    title: 'Energy Reiki',
    shortDesc: 'Restore your natural energetic balance and clear deep emotional blockages.',
    longDesc: 'Reiki is a gentle, non-invasive subtle energy therapy that promotes deep relaxation, stress reduction, and holistic healing. By channeling universal life force energy, this practice works directly on your subtle energetic body to release stagnant patterns and accelerate physical and emotional wellness.',
    experience: 'You will remain fully clothed while relaxing on a comfortable massage table. The practitioner will place their hands gently on or just above specific energy centers (chakras) to facilitate a warm, radiating flow of restorative energy.',
    tags: ['Burned Out', 'Heavy Heart', 'Low Energy'],
    animType: 'glow',
    price: 'R450' // Mapped cleanly to system context matrix
  },
  {
    id: 'breathwork',
    title: 'Somatic Breathwork',
    shortDesc: 'Regulate your nervous system and release stored trauma through conscious breathing.',
    longDesc: 'Somatic Breathwork utilizes conscious, connected breathing rhythms to bypass the analytical mind and access the subconscious body. This deep somatic release allows for the safe processing of accumulated stress, emotional residue, and physical tension.',
    experience: 'Lying down comfortably, you will be guided through a sustained, continuous breathing pattern accompanied by curated acoustic frequencies. It is common to experience profound physical releases, emotional clarity, or deep meditative states.',
    tags: ['Overthinking', 'Burned Out', 'Seeking Clarity'],
    animType: 'breath',
    price: 'R550'
  },
  {
    id: 'sound-therapy',
    title: 'Acoustic Sound Therapy',
    shortDesc: 'Calm brainwave frequencies into deep meditation using therapeutic soundscapes.',
    longDesc: 'Sound Therapy utilizes vibrational frequencies from crystal singing bowls, gongs, and tuning forks to down-regulate your nervous system. The sound waves pull your brain into slow, deeply restorative theta and delta brainwave states, clearing cognitive chatter instantly.',
    experience: 'An immersive sound bath experience where you lie down under a warm blanket. The room is filled with acoustic vibrations that you don’t just hear, but actively feel vibrating through your body, inducing absolute stillness.',
    tags: ['Overthinking', 'Burned Out'],
    animType: 'wave',
    price: 'R450'
  },
  {
    id: 'angel-oracle',
    title: 'Angel Oracle Reading',
    shortDesc: 'Receive celestial guidance and vibrational alignment via sacred oracle cards.',
    longDesc: 'Angel Oracle readings bridge earthly awareness with transcendent spiritual support. Using intuitive layouts, this modality decodes subtle energetic frequencies and messages to bring peace, reassurance, and validation to your current life phase.',
    experience: 'A deeply collaborative and peaceful session where intentions are set before drawing from targeted oracle decks. Every card drawn acts as a reflective lens for your highest emotional well-being.',
    tags: ['Seeking Clarity', 'Overthinking'],
    animType: 'glow',
    price: 'R300'
  },
  {
    id: 'mini-insight',
    title: 'Mini Insight Reading',
    shortDesc: 'A swift, targeted energetic check-in covering 1 question via 1-3 cards.',
    longDesc: 'Perfect for quick alignment updates or an immediate spiritual barometer check. This focused single-question intake parses archetypal motifs to clarify rapid choices.',
    experience: 'Delivered seamlessly with a dynamic, short accompanying voice note breaking down your exact focal draw.',
    tags: ['Seeking Clarity'],
    animType: 'wave',
    price: 'Free - R99'
  },
  {
    id: 'three-card-clarity',
    title: '3-Card Clarity Reading',
    shortDesc: 'Focused guidance on a specific situation using a past, present, future matrix.',
    longDesc: 'A classical elemental reading structure formulated to isolate the immediate core tensions, surrounding blocks, and paths forward for any single life scenario.',
    experience: 'You will choose a core focus area. The layout targets immediate external influences and inner psychological currents for an immediate strategic snapshot.',
    tags: ['Overthinking', 'Seeking Clarity'],
    animType: 'breath',
    price: 'R250'
  },
  {
    id: 'numerology-basic',
    title: 'Numerology Report (Basic)',
    shortDesc: 'Core numerology profile and insights derived from mathematical natal patterns.',
    longDesc: 'Unlock your fundamental vibrational signatures. This assessment maps structural core configurations to trace the underlying archetypal themes of your lifestyle geometry.',
    experience: 'A complete breakdown of your essential energetic numbers, mapping key cosmic markers directly related to your name and birth date calculations.',
    tags: ['Seeking Clarity'],
    animType: 'glow',
    price: 'R350'
  },
  {
    id: 'numerology-detailed',
    title: 'Numerology Report (Detailed)',
    shortDesc: 'Comprehensive life path analysis and evolutionary timeline parsing.',
    longDesc: 'A profound mathematical deep-dive into your cosmic timeline cycles, minor expressions, soul urges, and advanced destiny blueprints.',
    experience: 'An extensive, personalized profile handbook outlining evolutionary trends, core lessons, and timing cycles over your entire lifecycle blueprint.',
    tags: ['Seeking Clarity', 'Low Energy'],
    animType: 'breath',
    price: 'R500'
  },
  {
    id: 'tarot-numerology-pkg',
    title: 'Tarot + Numerology Package',
    shortDesc: 'The definitive insight pairing matching structural matrices with intuitive layouts.',
    longDesc: 'The ultimate integrative reading. By synthesizing your core structural life path numbers with a live, responsive cartomancy spread, we capture both your cosmic roadmap and immediate fluid energies.',
    experience: 'An intensive dual-modality consultation designed to provide extensive cross-verified clarity across your historical patterns, present crossroads, and future potentials.',
    tags: ['Seeking Clarity', 'Burned Out', 'Heavy Heart'],
    animType: 'wave',
    price: 'R600'
  },
  {
    id: 'follow-up',
    title: 'Follow-Up Reading',
    shortDesc: 'A vital client check-in session to reassess active energetic shifts.',
    longDesc: 'Designed exclusively for returning clients to track the unfolding integration of themes from previous readings, adjust strategies, and verify tracking path alignment.',
    experience: 'An open-ended, fluid session reviewing updates on active crossroads and tuning into the practical results of your integration process.',
    tags: ['Seeking Clarity'],
    animType: 'glow',
    price: 'R250'
  },
  {
    id: 'love-relationship',
    title: 'Love & Relationship Reading',
    shortDesc: 'Heart-centered structural guidance for emotional alignment and core intimacy.',
    longDesc: 'A target layout exploring active romance currents, underlying blockages, attachment cycles, and the deeper spiritual lessons present within your connections.',
    experience: 'We look deeply at internal emotional archetypes to build a supportive map toward deeper security, communicative clarity, and healing.',
    tags: ['Heavy Heart', 'Seeking Clarity'],
    animType: 'breath',
    price: 'R450'
  },
  {
    id: 'compatibility',
    title: 'Compatibility Reading',
    shortDesc: 'In-depth comparative mapping of relational dynamics and shared vectors.',
    longDesc: 'An evaluation analyzing the meeting points, complementary strengths, and inevitable frictional friction points between two individuals\' cosmic and psychological configurations.',
    experience: 'Perfect for couples or close partners looking to understand emotional communication styles, subconscious friction triggers, and foundational developmental paths.',
    tags: ['Seeking Clarity', 'Overthinking'],
    animType: 'wave',
    price: 'R600'
  },
  {
    id: 'career-purpose',
    title: 'Career & Purpose Reading',
    shortDesc: 'Vocation analysis focusing on work, prosperity paths, and soul-level mission design.',
    longDesc: 'Cut through professional fog. This targeted mapping uncovers natural skill structures, optimal professional environments, and upcoming vocational turning points.',
    experience: 'A precise layout evaluating hidden talents, blocks to financial flow, and actionable steps to bring your labor into alignment with your spiritual blueprint.',
    tags: ['Seeking Clarity', 'Burned Out'],
    animType: 'glow',
    price: 'R450'
  },
  {
    id: 'annual-forecast',
    title: 'Annual Forecast Reading',
    shortDesc: 'A complete 12-month energetic layout mapping upcoming macro cycles.',
    longDesc: 'Your personal energetic weather report for the entire year ahead. This overview tracks overarching lunar themes, changing seasons, and major card/number markers month by month.',
    experience: 'Provides an expansive structural layout detailing exactly when to build, when to rest, when to execute changes, and when to sit in introspection.',
    tags: ['Seeking Clarity'],
    animType: 'breath',
    price: 'R600'
  },
  {
    id: 'monthly-forecast',
    title: 'Monthly Forecast Reading',
    shortDesc: 'Focused, detailed guidance for the immediate 30-day structural cycle.',
    longDesc: 'A tight micro-reading focused on breaking down the immediate planetary currents, obstacles, and opportunities taking root over your current month.',
    experience: 'Ideal for short-term tactical alignment and identifying practical focus areas for your current lunar framework.',
    tags: ['Seeking Clarity', 'Overthinking'],
    animType: 'wave',
    price: 'R300'
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

            <h3 style={{ fontSize: '1.25rem', fontWeight: '600', color: '#111827', marginBottom: '4px' }}>{item.title}</h3>
            
            {/* Elegant Price Indicator Badge */}
            <span style={{ fontSize: '0.85rem', fontWeight: '600', color: '#8B3D54', marginBottom: '12px', display: 'block' }}>
              {item.price}
            </span>

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
            <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
              <h2 style={{ fontSize: '1.5rem', fontWeight: '700', color: '#111827' }}>{selectedModality.title}</h2>
              <button onClick={() => setSelectedModality(null)} style={closeButtonStyle}>✕</button>
            </header>
            
            <span style={{ fontSize: '1.1rem', fontWeight: '700', color: '#8B3D54', marginBottom: '24px', display: 'block' }}>
              Value: {selectedModality.price}
            </span>

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