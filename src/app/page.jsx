"use client";

import { useState } from "react";

const theme = {
  platinum: "#F7F8FA",
  paleSilver: "#EDF0F4",
  silver: "#C8CDD6",
  silverDark: "#9BA3AF",
  blush: "#F9D4DC",
  rose: "#E8A8B5",
  roseDark: "#C47F92",
  deepRose: "#8B3D54",
  textDark: "#2D1B23",
  textMid: "#6B4D57",
  textMuted: "#9B8089",
  white: "#FFFFFF",
};

const fonts = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garant:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=Inter:wght@300;400;500&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  body {
    font-family: 'Inter', sans-serif;
    background: ${theme.platinum};
    color: ${theme.textDark};
    -webkit-font-smoothing: antialiased;
  }

  .display {
    font-family: 'Cormorant Garant', serif;
  }

  @keyframes float {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-12px); }
  }

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(24px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  @keyframes orb-pulse {
    0%, 100% { opacity: 0.18; transform: scale(1); }
    50%       { opacity: 0.28; transform: scale(1.04); }
  }

  .hero-orb {
    animation: orb-pulse 6s ease-in-out infinite;
  }

  .hero-content {
    animation: fadeUp 1s ease both;
  }

  .card:hover {
    transform: translateY(-4px);
    box-shadow: 0 16px 48px rgba(139, 61, 84, 0.10) !important;
    border-color: ${theme.rose} !important;
  }

  .card {
    transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease;
  }

  .cta-btn:hover {
    background: ${theme.deepRose} !important;
    transform: translateY(-2px);
    box-shadow: 0 12px 36px rgba(139, 61, 84, 0.28) !important;
  }

  .cta-btn {
    transition: background 0.25s ease, transform 0.25s ease, box-shadow 0.25s ease;
  }

  .nav-link:hover {
    color: ${theme.deepRose} !important;
  }

  .nav-link {
    transition: color 0.2s ease;
  }

  .testimonial-dot.active {
    background: ${theme.deepRose} !important;
    width: 24px !important;
  }

  .testimonial-dot {
    transition: background 0.3s ease, width 0.3s ease;
    cursor: pointer;
  }

  .pillar-icon {
    animation: float 4s ease-in-out infinite;
  }

  .section-fade {
    animation: fadeUp 0.8s ease both;
  }

  @media (max-width: 768px) {
    .cards-grid {
      grid-template-columns: 1fr !important;
    }
    .hero-title {
      font-size: 3.2rem !important;
    }
    .nav-links {
      display: none !important;
    }
    .testimonials-grid {
      grid-template-columns: 1fr !important;
    }
  }
`;

const testimonials = [
  {
    quote: "A wonderfully grounded experience. The session provided a peaceful space to pause, reflect, and think about my goals from a completely new angle.",
    name: "Amara N.",
    role: "Cape Town",
    initials: "AN",
  },
  {
    quote: "I appreciated how gentle and welcoming the environment was. It felt less like fortune-telling and more like an open, meaningful conversation.",
    name: "Leila M.",
    role: "Johannesburg",
    initials: "LM",
  },
  {
    quote: "Elegant, thoughtful, and highly supportive. A beautiful personal practice to help sort through complex thoughts and find focus.",
    name: "Priya S.",
    role: "Durban",
    initials: "PS",
  },
];

const services = [
  {
    icon: "✦",
    label: "Tarot Exploration",
    tagline: "Intuitive reflection",
    body: "An invitation to pause and look at your current life situations through symbolic card spreads, helping you map out thoughts, choices, and perspectives.",
    accent: theme.blush,
  },
  {
    icon: "◎",
    label: "Numerology Introductions",
    tagline: "Personal blueprints",
    body: "A structured look at how the numbers in your birthdate align with common personality archetypes, offering a fun framework for introspection.",
    accent: theme.paleSilver,
  },
  {
    icon: "◇",
    label: "Guided Reflection Sessions",
    tagline: "Mindful check-ins",
    body: "One-on-one discovery conversations combining intuitive tools with dedicated active listening to help you organize internal goals and priorities.",
    accent: theme.blush,
  },
];

export default function HomePage() {
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  return (
    <>
      <style>{fonts}</style>

      {/* ── NAV ── */}
      <nav style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "1rem 3rem",
        background: "rgba(247, 248, 250, 0.85)",
        backdropFilter: "blur(16px)",
        borderBottom: `0.5px solid ${theme.silver}40`,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          <img 
            src="/logo.jpg" 
            alt="Soulful Healing Logo" 
            style={{ height: "36px", width: "36px", borderRadius: "50%", objectFit: "cover" }}
            onError={(e) => { e.target.style.display = 'none'; }}
          />
          <span className="display" style={{
            fontSize: "1.3rem",
            fontWeight: 400,
            letterSpacing: "0.06em",
            color: theme.deepRose,
          }}>
            Soulful Healing
          </span>
        </div>

        <div className="nav-links" style={{ display: "flex", gap: "2.5rem" }}>
          {["Sessions", "Services", "About", "Contact"].map((item) => (
            <a
              key={item}
              href="#"
              className="nav-link"
              style={{
                fontSize: "0.8rem",
                fontWeight: 400,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                textDecoration: "none",
                color: theme.textMuted,
              }}
            >
              {item}
            </a>
          ))}
        </div>

        <button style={{
          fontSize: "0.75rem",
          fontWeight: 500,
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          padding: "0.6rem 1.5rem",
          borderRadius: "50px",
          border: `1px solid ${theme.rose}`,
          background: "transparent",
          color: theme.deepRose,
          cursor: "pointer",
        }}>
          Book a Session
        </button>
      </nav>

      {/* ── HERO ── */}
      <section style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
        paddingTop: "6rem",
        background: `linear-gradient(160deg, ${theme.white} 0%, ${theme.platinum} 60%, ${theme.paleSilver} 100%)`,
      }}>

        {/* Orb */}
        <div className="hero-orb" style={{
          position: "absolute",
          width: "600px",
          height: "600px",
          borderRadius: "50%",
          background: `radial-gradient(circle at 40% 40%, ${theme.blush}, ${theme.rose}44 50%, transparent 70%)`,
          top: "50%",
          left: "50%",
          transform: "translate(-40%, -52%)",
          pointerEvents: "none",
        }} />

        {/* Decorative elements */}
        <div style={{
          position: "absolute",
          width: "160px",
          height: "160px",
          borderRadius: "50%",
          border: `1px solid ${theme.silver}60`,
          top: "18%",
          right: "14%",
          pointerEvents: "none",
        }} />
        <div style={{
          position: "absolute",
          width: "80px",
          height: "80px",
          borderRadius: "50%",
          border: `1px solid ${theme.rose}50`,
          bottom: "22%",
          left: "10%",
          pointerEvents: "none",
        }} />

        <div className="hero-content" style={{ textAlign: "center", maxWidth: "780px", padding: "0 2rem", position: "relative" }}>

          <p style={{
            fontSize: "0.7rem",
            fontWeight: 500,
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: theme.roseDark,
            marginBottom: "1.75rem",
          }}>
            Mindful Reflection · Cape Town
          </p>

          <h1
            className="display hero-title"
            style={{
              fontSize: "5rem",
              fontWeight: 300,
              lineHeight: 1.1,
              letterSpacing: "-0.01em",
              color: theme.textDark,
              marginBottom: "1.5rem",
            }}
          >
            A gentle space to
            <br />
            <em style={{ fontStyle: "italic", color: theme.deepRose }}>uncover your perspective.</em>
          </h1>

          <p style={{
            fontSize: "1.05rem",
            fontWeight: 300,
            lineHeight: 1.75,
            color: theme.textMid,
            maxWidth: "540px",
            margin: "0 auto 3rem",
          }}>
            Thoughtful tarot consultations, personal numerology overviews, and calm mentorship sessions tailored to support you in finding balance.
          </p>

          <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
            <button className="cta-btn" style={{
              fontSize: "0.8rem",
              fontWeight: 500,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              padding: "1rem 2.5rem",
              borderRadius: "50px",
              border: "none",
              background: theme.roseDark,
              color: theme.white,
              cursor: "pointer",
              boxShadow: `0 8px 24px ${theme.roseDark}40`,
            }}>
              View Sessions
            </button>

            <button style={{
              fontSize: "0.8rem",
              fontWeight: 400,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              padding: "1rem 2.5rem",
              borderRadius: "50px",
              border: `1px solid ${theme.silver}`,
              background: "transparent",
              color: theme.textMid,
              cursor: "pointer",
            }}>
              Our Philosophy
            </button>
          </div>

        </div>

        {/* Scroll indicator */}
        <div style={{
          position: "absolute",
          bottom: "2.5rem",
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "0.5rem",
        }}>
          <p style={{ fontSize: "0.65rem", letterSpacing: "0.18em", textTransform: "uppercase", color: theme.textMuted }}>
            Explore
          </p>
          <div style={{
            width: "1px",
            height: "40px",
            background: `linear-gradient(to bottom, ${theme.silverDark}, transparent)`,
          }} />
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section style={{
        padding: "8rem 3rem",
        background: theme.white,
      }}>
        <div style={{ maxWidth: "1080px", margin: "0 auto" }}>

          <div style={{ marginBottom: "5rem" }}>
            <p style={{
              fontSize: "0.65rem",
              fontWeight: 500,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: theme.roseDark,
              marginBottom: "1rem",
            }}>
              The Focus
            </p>
            <h2 className="display" style={{
              fontSize: "3.25rem",
              fontWeight: 300,
              color: theme.textDark,
              lineHeight: 1.1,
              letterSpacing: "-0.01em",
              maxWidth: "500px",
            }}>
              Three paths toward <em style={{ fontStyle: "italic", color: theme.deepRose }}>mental clarity.</em>
            </h2>
          </div>

          <div
            className="cards-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "1.5rem",
            }}
          >
            {services.map((s) => (
              <div
                key={s.label}
                className="card"
                style={{
                  background: theme.platinum,
                  borderRadius: "20px",
                  padding: "2.5rem 2rem",
                  border: `1px solid ${theme.silver}50`,
                  cursor: "pointer",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                {/* Card accent blob */}
                <div style={{
                  position: "absolute",
                  top: "-40px",
                  right: "-40px",
                  width: "120px",
                  height: "120px",
                  borderRadius: "50%",
                  background: s.accent,
                  opacity: 0.5,
                  pointerEvents: "none",
                }} />

                <div className="pillar-icon" style={{
                  fontSize: "2rem",
                  color: theme.deepRose,
                  marginBottom: "2rem",
                  lineHeight: 1,
                }}>
                  {s.icon}
                </div>

                <p style={{
                  fontSize: "0.6rem",
                  fontWeight: 500,
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: theme.roseDark,
                  marginBottom: "0.6rem",
                }}>
                  {s.tagline}
                </p>

                <h3 className="display" style={{
                  fontSize: "1.6rem",
                  fontWeight: 400,
                  color: theme.textDark,
                  marginBottom: "1rem",
                  lineHeight: 1.15,
                }}>
                  {s.label}
                </h3>

                <p style={{
                  fontSize: "0.9rem",
                  lineHeight: 1.7,
                  color: theme.textMuted,
                  fontWeight: 300,
                }}>
                  {s.body}
                </p>

                <div style={{
                  marginTop: "2rem",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.4rem",
                }}>
                  <span style={{
                    fontSize: "0.72rem",
                    fontWeight: 500,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    color: theme.deepRose,
                  }}>
                    Learn More
                  </span>
                  <span style={{ color: theme.deepRose, fontSize: "0.8rem" }}>→</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRIVACY STRIP ── */}
      <section style={{
        background: `linear-gradient(135deg, ${theme.blush} 0%, ${theme.paleSilver} 100%)`,
        padding: "4.5rem 3rem",
        borderTop: `1px solid ${theme.silver}40`,
        borderBottom: `1px solid ${theme.silver}40`,
      }}>
        <div style={{
          maxWidth: "960px",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "3rem",
          textAlign: "center",
        }}>
          {[
            { num: "Personal", label: "Tailored Spreads" },
            { num: "Comfortable", label: "Open, Calm Space" },
            { num: "Grounded", label: "Practical Frameworks" },
            { num: "100%", label: "Strictly Confidential" },
          ].map(({ num, label }) => (
            <div key={label}>
              <p className="display" style={{
                fontSize: "2.8rem",
                fontWeight: 300,
                color: theme.deepRose,
                letterSpacing: "-0.01em",
                lineHeight: 1,
                marginBottom: "0.5rem",
              }}>
                {num}
              </p>
              <p style={{
                fontSize: "0.72rem",
                fontWeight: 500,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: theme.textMid,
              }}>
                {label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section style={{
        padding: "8rem 3rem",
        background: theme.platinum,
      }}>
        <div style={{ maxWidth: "1080px", margin: "0 auto" }}>

          <div style={{ marginBottom: "4rem" }}>
            <p style={{
              fontSize: "0.65rem",
              fontWeight: 500,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: theme.roseDark,
              marginBottom: "1rem",
            }}>
              Feedback
            </p>
            <h2 className="display" style={{
              fontSize: "3rem",
              fontWeight: 300,
              color: theme.textDark,
              lineHeight: 1.1,
              letterSpacing: "-0.01em",
            }}>
              Experiences from our <em style={{ fontStyle: "italic", color: theme.deepRose }}>community.</em>
            </h2>
          </div>

          <div className="testimonials-grid" style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "1.5rem",
            marginBottom: "2.5rem",
          }}>
            {testimonials.map((t, i) => (
              <div
                key={t.name}
                style={{
                  background: theme.white,
                  borderRadius: "20px",
                  padding: "2rem",
                  border: `1px solid ${i === activeTestimonial ? theme.rose : theme.silver + "40"}`,
                  transition: "border-color 0.3s ease",
                  cursor: "pointer",
                }}
                onClick={() => setActiveTestimonial(i)}
              >
                <p className="display" style={{
                  fontSize: "1.05rem",
                  fontWeight: 300,
                  fontStyle: "italic",
                  color: theme.textMid,
                  lineHeight: 1.65,
                  marginBottom: "1.75rem",
                }}>
                  "{t.quote}"
                </p>

                <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                  <div style={{
                    width: "36px",
                    height: "36px",
                    borderRadius: "50%",
                    background: `linear-gradient(135deg, ${theme.rose}, ${theme.blush})`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "0.65rem",
                    fontWeight: 600,
                    color: theme.deepRose,
                    letterSpacing: "0.05em",
                  }}>
                    {t.initials}
                  </div>
                  <div>
                    <p style={{ fontSize: "0.85rem", fontWeight: 500, color: theme.textDark, lineHeight: 1 }}>
                      {t.name}
                    </p>
                    <p style={{ fontSize: "0.72rem", color: theme.textMuted, marginTop: "2px" }}>
                      {t.role}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Dot indicators */}
          <div style={{ display: "flex", gap: "6px", justifyContent: "center" }}>
            {testimonials.map((_, i) => (
              <button
                key={i}
                className={`testimonial-dot${i === activeTestimonial ? " active" : ""}`}
                onClick={() => setActiveTestimonial(i)}
                style={{
                  height: "6px",
                  width: i === activeTestimonial ? "24px" : "6px",
                  borderRadius: "3px",
                  border: "none",
                  background: i === activeTestimonial ? theme.deepRose : theme.silver,
                  padding: 0,
                }}
                aria-label={`Testimonial ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{
        padding: "8rem 3rem",
        background: theme.textDark,
        position: "relative",
        overflow: "hidden",
        textAlign: "center",
      }}>

        {/* Decorative orb */}
        <div style={{
          position: "absolute",
          width: "500px",
          height: "500px",
          borderRadius: "50%",
          background: `radial-gradient(circle, ${theme.rose}22, transparent 70%)`,
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          pointerEvents: "none",
        }} />

        <div style={{ position: "relative", maxWidth: "600px", margin: "0 auto" }}>
          <p style={{
            fontSize: "0.65rem",
            fontWeight: 500,
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: theme.rose,
            marginBottom: "1.5rem",
          }}>
            Connect
          </p>

          <h2 className="display" style={{
            fontSize: "3.5rem",
            fontWeight: 300,
            color: theme.white,
            lineHeight: 1.1,
            letterSpacing: "-0.01em",
            marginBottom: "1.5rem",
          }}>
            Ready to explore <em style={{ fontStyle: "italic", color: theme.rose }}>your path?</em>
          </h2>

          <p style={{
            fontSize: "1rem",
            fontWeight: 300,
            lineHeight: 1.75,
            color: `${theme.silver}CC`,
            marginBottom: "3rem",
          }}>
            Book a straightforward, relaxed consultation session to evaluate your current life dynamics together.
          </p>

          <button className="cta-btn" style={{
            fontSize: "0.8rem",
            fontWeight: 500,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            padding: "1.1rem 3rem",
            borderRadius: "50px",
            border: "none",
            background: theme.roseDark,
            color: theme.white,
            cursor: "pointer",
            boxShadow: `0 8px 32px ${theme.deepRose}60`,
          }}>
            Book a Session
          </button>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{
        background: theme.textDark,
        borderTop: `1px solid #ffffff10`,
        padding: "2.5rem 3rem",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexWrap: "wrap",
        gap: "1rem",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <img 
            src="/logo.jpeg" 
            alt="Soulful Healing Small Logo" 
            style={{ height: "24px", width: "24px", borderRadius: "50%", objectFit: "cover", opacity: 0.7 }}
            onError={(e) => { e.target.style.display = 'none'; }}
          />
          <span className="display" style={{
            fontSize: "1.1rem",
            fontWeight: 300,
            color: `${theme.white}60`,
            letterSpacing: "0.06em",
          }}>
            Soulful Healing
          </span>
        </div>
        <p style={{ fontSize: "0.72rem", color: `${theme.white}30`, letterSpacing: "0.08em" }}>
          © 2026 · All rights reserved
        </p>
        <div style={{ display: "flex", gap: "2rem" }}>
          {["Privacy", "Terms", "Contact"].map((l) => (
            <a key={l} href="#" style={{
              fontSize: "0.72rem",
              color: `${theme.white}40`,
              textDecoration: "none",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
            }}>
              {l}
            </a>
          ))}
        </div>
      </footer>
    </>
  );
}