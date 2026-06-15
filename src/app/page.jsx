"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";


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
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=Inter:wght@300;400;500&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  html, body, #__next {
    min-height: 100%;
  }

  body {
    font-family: 'Inter', sans-serif;
    background: ${theme.platinum};
    color: ${theme.textDark};
    -webkit-font-smoothing: antialiased;
  }

  .display {
    font-family: 'Cormorant Garamond', serif;
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

  /* CTA pulse — draws the eye without overwhelming */
  @keyframes cta-pulse {
    0%, 100% { box-shadow: 0 8px 24px rgba(196, 127, 146, 0.40); }
    50%       { box-shadow: 0 8px 36px rgba(196, 127, 146, 0.65); }
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

  /* Primary CTA: persistent subtle pulse + lift on hover */
  .cta-btn-primary {
    animation: cta-pulse 3s ease-in-out infinite;
    transition: background 0.25s ease, transform 0.25s ease, box-shadow 0.25s ease;
  }

  .cta-btn-primary:hover {
    background: ${theme.deepRose} !important;
    transform: translateY(-2px);
    animation: none;
    box-shadow: 0 12px 36px rgba(139, 61, 84, 0.32) !important;
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

  /* ── Mobile breakpoints ── */
  @media (max-width: 768px) {
    .cards-grid {
      grid-template-columns: 1fr !important;
    }
    .hero-title {
      font-size: clamp(2.75rem, 10vw, 4rem) !important;
    }
    .nav-links {
      display: none !important;
    }
    .nav-book-btn {
      display: none !important;
    }
    .testimonials-grid {
      grid-template-columns: 1fr !important;
    }
    .nova-window {
      width: calc(100vw - 2rem) !important;
      right: 1rem !important;
      bottom: 5rem !important;
      max-height: 70vh !important;
    }
    /* Hero CTAs stack on mobile and go full-width */
    .hero-cta-group {
      flex-direction: column !important;
      align-items: stretch !important;
    }
    .hero-cta-group a,
    .hero-cta-group button {
      width: 100% !important;
      text-align: center !important;
    }
    /* Services section padding tighten */
    .services-section {
      padding: 5rem 1.25rem !important;
    }
    /* Pillars section */
    .pillars-section {
      padding: 4rem 1.25rem !important;
    }
    /* Testimonials section */
    .testimonials-section {
      padding: 5rem 1.25rem !important;
    }
    /* CTA section */
    .cta-section {
      padding: 5rem 1.25rem !important;
    }
    /* Footer */
    .site-footer {
      padding: 2rem 1.25rem !important;
      flex-direction: column !important;
      text-align: center !important;
      gap: 0.75rem !important;
    }
    /* Watermark footer */
    .watermark-footer {
      padding: 1rem 1.25rem !important;
      flex-direction: column !important;
      gap: 0.25rem !important;
      text-align: center !important;
    }
  }

  @media (max-width: 480px) {
    .pillars-grid {
      grid-template-columns: 1fr 1fr !important;
    }
  }

  /* Ensure tap targets meet 44 × 44 px minimum */
  .tap-target {
    min-height: 44px;
    min-width: 44px;
  }
`;

const testimonials = [
  {
    quote: "The natal chart reading unraveled planetary themes in my life I had always felt but never understood. Uncanny precision.",
    name: "Amara N.",
    role: "Cape Town",
    initials: "AN",
  },
  {
    quote: "I sought clarity during a heavy Saturn Return. Her tarot spread and astrological transit insights gave me an absolute roadmap.",
    name: "Leila M.",
    role: "Johannesburg",
    initials: "LM",
  },
  {
    quote: "Elegant, mystical, and deeply practical. Soulful Healing bridges the gap between cosmic architecture and real-world alignment.",
    name: "Priya S.",
    role: "Durban",
    initials: "PS",
  },
];

const services = [
  {
    icon: "☼",
    label: "Astrology & Birth Charts",
    tagline: "Celestial Blueprinting",
    body: "Map the precise alignment of the planets at the exact moment of your birth. Discover your cosmic blueprint, elemental makeup, and your unique destiny path.",
    accent: theme.paleSilver,
  },
  {
    icon: "✦",
    label: "Tarot Readings",
    tagline: "Elemental Cartomancy",
    body: "Navigate life's crossroads with tailored spreads that decode immediate energetic currents, archetypal cycles, and hidden influences surrounding your path.",
    accent: theme.blush,
  },
  {
    icon: "◎",
    label: "Cosmic Numerology",
    tagline: "Vibrational Geometry",
    body: "Your birth details hold key mathematical signatures. We translate these core integers to unlock your Life Path cycles, soul urges, and evolutionary timing.",
    accent: theme.blush,
  },
];

export default function HomePage() {
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  // Ask Nova Chatbot State Controls
  const [isNovaOpen, setIsNovaOpen] = useState(false);
  const [novaMessages, setNovaMessages] = useState([]);
  const [novaInput, setNovaInput] = useState("");
  const [isNovaLoading, setIsNovaLoading] = useState(false);
  const [novaError, setNovaError] = useState(null);
  // Hard lockout flag — set permanently on injection detection (cleared only by page refresh)
  const [isBlocked, setIsBlocked] = useState(false);

  const novaEndRef = useRef(null);

  const scrollNovaToBottom = () => {
    novaEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isNovaOpen) {
      scrollNovaToBottom();
    }
  }, [novaMessages, isNovaLoading, isNovaOpen]);

  const handleSendNovaMessage = async (e) => {
    e.preventDefault();
    // Hard block — once triggered, only a page refresh can clear it
    if (!novaInput.trim() || isNovaLoading || isBlocked) return;

    const currentText = novaInput.trim();
    const updatedPayload = [...novaMessages, { role: "user", content: currentText }];

    setNovaMessages(updatedPayload);
    setNovaInput("");
    setIsNovaLoading(true);
    setNovaError(null);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: updatedPayload }),
      });

      let data;
      try {
        data = await response.json();
      } catch {
        throw new Error("Unable to read streaming cosmic payload.");
      }

      // ── 400 = injection detected by server ──
      // Permanently lock the chat; only a page refresh resets state.
      if (response.status === 400) {
        setIsBlocked(true);
        setNovaError(
          data?.error ||
          "Nova has detected an attempt to alter her cosmic alignment. Please refresh the page to continue."
        );
        return;
      }

      if (!response.ok) {
        throw new Error(data?.error || `Upstream system mismatch (${response.status})`);
      }

      if (data?.error) {
        throw new Error(data.error);
      }

      if (data?.content) {
        setNovaMessages((prev) => [...prev, { role: "assistant", content: data.content }]);
      } else {
        throw new Error("Nova returned an un-interpretable state cycle.");
      }
    } catch (err) {
      console.error("Nova interface failure:", err);
      setNovaError(err.message || "An unexpected planetary cycle disruption occurred.");
    } finally {
      setIsNovaLoading(false);
    }
  };

  return (
    <>
      <style>{fonts}</style>

      {/*
       * Page wrapper: min-h-screen + flex-col ensures the watermark footer
       * is always pushed to the bottom even when content is short.
       */}
      <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>

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
          padding: "1.25rem 3rem",
          background: "rgba(247, 248, 250, 0.82)",
          backdropFilter: "blur(16px)",
          borderBottom: `0.5px solid ${theme.silver}40`,
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
            <img
              src="/logo.svg"
              alt="Soulful Healing Logo"
              style={{
                height: "36px",
                width: "36px",
                borderRadius: "50%",
                objectFit: "cover",
              }}
              onError={(e) => {
                e.target.style.display = "none";
              }}
            />
            <span className="display" style={{
              fontSize: "1.4rem",
              fontWeight: 400,
              letterSpacing: "0.08em",
              color: theme.deepRose,
            }}>
              Soulful Healing
            </span>
          </div>

          <div className="nav-links" style={{ display: "flex", gap: "2.5rem" }}>
            {["Astrology", "Tarot", "Services", "Testimonials"].map((item) => (
              <a
                key={item}
                href="#"
                className="nav-link tap-target"
                style={{
                  fontSize: "0.8rem",
                  fontWeight: 400,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  textDecoration: "none",
                  color: theme.textMuted,
                  display: "flex",
                  alignItems: "center",
                }}
              >
                {item}
              </a>
            ))}
          </div>

          <Link href="/book" style={{ textDecoration: "none" }} className="nav-book-btn">
            <button className="tap-target" style={{
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
              Cast Your Chart
            </button>
          </Link>
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

          <div className="hero-content" style={{
            textAlign: "center",
            maxWidth: "780px",
            padding: "0 1.5rem",
            position: "relative",
            width: "100%",
          }}>
            <p style={{
              fontSize: "0.7rem",
              fontWeight: 500,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: theme.roseDark,
              marginBottom: "1.75rem",
            }}>
              Astrology · Tarot · Celestial Mapping
            </p>

            <h1
              className="display hero-title"
              style={{
                fontSize: "5.5rem",
                fontWeight: 300,
                lineHeight: 1.08,
                letterSpacing: "-0.02em",
                color: theme.textDark,
                marginBottom: "1.5rem",
              }}
            >
              Where the cosmos
              <br />
              <em style={{ fontStyle: "italic", color: theme.deepRose }}>reveals your alignment.</em>
            </h1>

            <p style={{
              fontSize: "1.05rem",
              fontWeight: 300,
              lineHeight: 1.75,
              color: theme.textMid,
              maxWidth: "540px",
              margin: "0 auto 3rem",
            }}>
              Bespoke astrological interpretations, natal chart mapping, and intuitive tarot sessions designed to translate stellar transits into crystalline personal clarity.
            </p>

            {/* Hero CTAs — stack vertically on mobile */}
            <div
              className="hero-cta-group"
              style={{
                display: "flex",
                gap: "1rem",
                justifyContent: "center",
                flexWrap: "wrap",
              }}
            >
              <Link href="/book" style={{ textDecoration: "none" }}>
                <button
                  className="cta-btn-primary tap-target"
                  style={{
                    fontSize: "0.85rem",
                    fontWeight: 600,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    padding: "1.1rem 2.75rem",
                    borderRadius: "50px",
                    border: "none",
                    background: theme.roseDark,
                    color: theme.white,
                    cursor: "pointer",
                    /* Baseline shadow — overridden by the pulse animation */
                    boxShadow: `0 8px 24px ${theme.roseDark}40`,
                  }}
                >
                  ✦ Get Your Insight
                </button>
              </Link>

<Link href="/modalities" style={{ textDecoration: 'none' }}>
              <button
                className="tap-target"
                style={{
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
                }}
              >
                The Modalities
              </button>
            </Link>
          </div>

        </div>

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
          <div style={{
            width: "1px",
            height: "40px",
            background: `linear-gradient(to bottom, ${theme.silverDark}, transparent)`,
          }} />
        </div>
        </section>

        {/* ── SERVICES ── */}
        <section
          className="services-section"
          style={{
            padding: "8rem 3rem",
            background: theme.white,
          }}
        >
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
                The Modalities
              </p>
              <h2 className="display" style={{
                fontSize: "3.25rem",
                fontWeight: 300,
                color: theme.textDark,
                lineHeight: 1.1,
                letterSpacing: "-0.01em",
                maxWidth: "480px",
              }}>
                Three gateways into <em style={{ fontStyle: "italic", color: theme.deepRose }}>divine timing.</em>
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
                <Link key={s.label} href="/book" style={{ textDecoration: "none" }}>
                  <div
                    className="card"
                    style={{
                      background: theme.platinum,
                      borderRadius: "20px",
                      padding: "2.5rem 2rem",
                      border: `1px solid ${theme.silver}50`,
                      cursor: "pointer",
                      position: "relative",
                      overflow: "hidden",
                      height: "100%",
                    }}
                  >
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
                      fontSize: "2.2rem",
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
                        Decode
                      </span>
                      <span style={{ color: theme.deepRose, fontSize: "0.8rem" }}>→</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ── CELESTIAL ALIGNMENT PILLARS ── */}
        <section
          className="pillars-section"
          style={{
            background: `linear-gradient(135deg, ${theme.blush} 0%, ${theme.paleSilver} 100%)`,
            padding: "5rem 3rem",
            borderTop: `1px solid ${theme.silver}40`,
            borderBottom: `1px solid ${theme.silver}40`,
          }}
        >
          <div
            className="pillars-grid"
            style={{
              maxWidth: "1000px",
              margin: "0 auto",
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              gap: "3.5rem",
              textAlign: "center",
            }}
          >
            {[
              { symbol: "☉ ☽ ↗", title: "The Cosmic Triad", desc: "Sun, Moon & Rising Analysis" },
              { symbol: "XII", title: "Astrological Houses", desc: "Life Spheres Deciphered" },
              { symbol: "🜂 🜃 🜁 🜄", title: "Elemental Balance", desc: "Fire, Earth, Air & Water" },
              { symbol: "🪐", title: "Transit Tracking", desc: "Planetary Cycles & Returns" },
            ].map(({ symbol, title, desc }) => (
              <div key={title} style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                <div className="display" style={{
                  fontSize: "2.5rem",
                  fontWeight: 300,
                  color: theme.deepRose,
                  marginBottom: "0.5rem",
                  lineHeight: 1,
                  letterSpacing: "0.05em",
                }}>
                  {symbol}
                </div>
                <h4 style={{
                  fontSize: "0.85rem",
                  fontWeight: 500,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: theme.textDark,
                  marginBottom: "0.25rem",
                }}>
                  {title}
                </h4>
                <p style={{
                  fontSize: "0.75rem",
                  color: theme.textMid,
                  fontWeight: 300,
                  letterSpacing: "0.02em",
                }}>
                  {desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ── TESTIMONIALS ── */}
        <section
          className="testimonials-section"
          style={{
            padding: "8rem 3rem",
            background: theme.platinum,
          }}
        >
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
                Testimonials
              </p>
              <h2 className="display" style={{
                fontSize: "3rem",
                fontWeight: 300,
                color: theme.textDark,
                lineHeight: 1.1,
                letterSpacing: "-0.01em",
              }}>
                Words from those <em style={{ fontStyle: "italic", color: theme.deepRose }}>guided.</em>
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
                  <div style={{ display: "flex", gap: "3px", marginBottom: "1.25rem" }}>
                    {[...Array(5)].map((_, si) => (
                      <span key={si} style={{ color: theme.roseDark, fontSize: "0.75rem" }}>★</span>
                    ))}
                  </div>

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
                      flexShrink: 0,
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

            <div style={{ display: "flex", gap: "6px", justifyContent: "center" }}>
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  className={`testimonial-dot tap-target${i === activeTestimonial ? " active" : ""}`}
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

        {/* ── CTA BANNER ── */}
        <section
          className="cta-section"
          style={{
            padding: "8rem 3rem",
            background: theme.textDark,
            position: "relative",
            overflow: "hidden",
            textAlign: "center",
          }}
        >
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
              Consult the Stars
            </p>

            <h2 className="display" style={{
              fontSize: "3.75rem",
              fontWeight: 300,
              color: theme.white,
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
              marginBottom: "1.5rem",
            }}>
              Ready for your <em style={{ fontStyle: "italic", color: theme.rose }}>reading?</em>
            </h2>

            <p style={{
              fontSize: "1rem",
              fontWeight: 300,
              lineHeight: 1.75,
              color: `${theme.silver}CC`,
              marginBottom: "3rem",
            }}>
              Enter your natal metrics, configure your alignment parameters, and book an intimate, premium reading configured entirely around your planetary transits.
            </p>

            <div style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "1rem",
            }}>
              <Link href="/book" style={{ textDecoration: "none", width: "100%", maxWidth: "320px" }}>
                <button
                  className="cta-btn-primary tap-target"
                  style={{
                    width: "100%",
                    fontSize: "0.85rem",
                    fontWeight: 600,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    padding: "1.15rem 3rem",
                    borderRadius: "50px",
                    border: "none",
                    background: theme.roseDark,
                    color: theme.white,
                    cursor: "pointer",
                    boxShadow: `0 8px 32px ${theme.deepRose}60`,
                  }}
                >
                  ✦ Initiate Alignment Session
                </button>
              </Link>

              {/* Secondary ghost CTA — clearly visible on mobile */}
              <Link href="/book" style={{ textDecoration: "none", width: "100%", maxWidth: "320px" }}>
                <button
                  className="tap-target"
                  style={{
                    width: "100%",
                    fontSize: "0.78rem",
                    fontWeight: 400,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    padding: "1rem 3rem",
                    borderRadius: "50px",
                    border: `1px solid ${theme.rose}80`,
                    background: "transparent",
                    color: theme.rose,
                    cursor: "pointer",
                    transition: "border-color 0.2s ease, color 0.2s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = theme.rose;
                    e.currentTarget.style.color = theme.white;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = `${theme.rose}80`;
                    e.currentTarget.style.color = theme.rose;
                  }}
                >
                  Explore Services
                </button>
              </Link>
            </div>
          </div>
        </section>

        {/* ── SITE FOOTER ── */}
        <footer
          className="site-footer"
          style={{
            background: theme.textDark,
            borderTop: `1px solid #ffffff10`,
            padding: "2.5rem 3rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "1rem",
          }}
        >
          <span className="display" style={{
            fontSize: "1.1rem",
            fontWeight: 300,
            color: `${theme.white}60`,
            letterSpacing: "0.06em",
          }}>
            Soulful Healing
          </span>
          <p style={{ fontSize: "0.72rem", color: `${theme.white}30`, letterSpacing: "0.08em" }}>
            © 2026 · Celestial Architecture · All rights reserved
          </p>
          <div style={{ display: "flex", gap: "2rem", flexWrap: "wrap", justifyContent: "center" }}>
            {["Privacy", "Terms", "Ephemeris"].map((l) => (
              <a
                key={l}
                href="#"
                className="tap-target"
                style={{
                  fontSize: "0.72rem",
                  color: `${theme.white}40`,
                  textDecoration: "none",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                {l}
              </a>
            ))}
          </div>
        </footer>

        {/*
         * ── WATERMARK FOOTER ──
         * mt-auto equivalent via marginTop: "auto" ensures this stays
         * pinned to the bottom when page content is short.
         */}
        <div
          className="watermark-footer"
          style={{
            background: "#1A0F14",
            borderTop: `1px solid #ffffff08`,
            padding: "0.9rem 3rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "0.5rem",
            flexWrap: "wrap",
          }}
        >
          <p style={{
            fontSize: "0.65rem",
            color: `${theme.white}22`,
            letterSpacing: "0.06em",
            textAlign: "center",
            lineHeight: 1.6,
          }}>
            © 2026 All Rights Reserved. Developed by{" "}
            <span style={{ color: `${theme.white}38`, fontWeight: 500 }}>
              Nebula Technologies (Pty) Ltd
            </span>
          </p>
        </div>

      </div>{/* end page wrapper */}

      {/* ── ASK NOVA CHATBOT SECTION (BOTTOM RIGHT) ── */}
      <div style={{ position: "fixed", bottom: "2rem", right: "2rem", zIndex: 1000 }}>
        {/* Toggle Trigger Capsule */}
        {!isNovaOpen && (
          <button
            onClick={() => setIsNovaOpen(true)}
            className="tap-target"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              background: theme.deepRose,
              color: theme.white,
              border: "none",
              padding: "0.85rem 1.6rem",
              borderRadius: "50px",
              cursor: "pointer",
              boxShadow: "0 8px 24px rgba(139, 61, 84, 0.35)",
              fontSize: "0.8rem",
              fontWeight: 500,
              letterSpacing: "0.06em",
              transition: "transform 0.2s ease, background 0.2s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.background = theme.roseDark;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.background = theme.deepRose;
            }}
          >
            <span style={{ fontSize: "1rem" }}>✦</span> Ask Nova
          </button>
        )}

        {/* Dynamic Conversation Window Drawer */}
        {isNovaOpen && (
          <div
            className="nova-window"
            style={{
              position: "absolute",
              bottom: "0",
              right: "0",
              width: "360px",
              height: "460px",
              background: theme.white,
              borderRadius: "20px",
              border: `1px solid ${theme.silver}60`,
              boxShadow: "0 12px 40px rgba(45, 27, 35, 0.12)",
              display: "flex",
              flexDirection: "column",
              overflow: "hidden",
              animation: "fadeUp 0.4s cubic-bezier(0.16, 1, 0.3, 1) both",
            }}
          >
            {/* Header Arena */}
            <div style={{
              background: `linear-gradient(135deg, ${theme.platinum}, ${theme.paleSilver})`,
              padding: "1rem 1.25rem",
              borderBottom: `1px solid ${theme.silver}40`,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexShrink: 0,
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <span style={{ color: theme.deepRose, fontSize: "1.1rem" }}>✦</span>
                <div>
                  <h4 className="display" style={{ fontSize: "1.15rem", fontWeight: 500, color: theme.textDark, lineHeight: 1.1 }}>
                    Nova
                  </h4>
                  <p style={{ fontSize: "0.65rem", color: theme.textMuted, letterSpacing: "0.02em", marginTop: "2px" }}>
                    Celestial Oracle Assistant
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsNovaOpen(false)}
                className="tap-target"
                style={{
                  background: "transparent",
                  border: "none",
                  color: theme.textMuted,
                  fontSize: "1.2rem",
                  cursor: "pointer",
                  padding: "0.25rem",
                  lineHeight: 1,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                ✕
              </button>
            </div>

            {/* Scrollable Message History Pipeline */}
            <div style={{
              flex: 1,
              overflowY: "auto",
              padding: "1.25rem",
              display: "flex",
              flexDirection: "column",
              gap: "0.85rem",
              background: theme.platinum,
            }}>
              {novaMessages.length === 0 && (
                <p style={{
                  fontSize: "0.8rem",
                  color: theme.textMuted,
                  textAlign: "center",
                  marginTop: "2rem",
                  fontStyle: "italic",
                  lineHeight: 1.5,
                  padding: "0 1rem",
                }}>
                  Greetings traveler. I am Nova. Provide your curiosity or transit loops to clarify your current alignment trajectory.
                </p>
              )}

              {novaMessages.map((msg, index) => (
                <div
                  key={index}
                  style={{
                    padding: "0.75rem 1rem",
                    borderRadius: "14px",
                    maxWidth: "85%",
                    fontSize: "0.82rem",
                    lineHeight: 1.5,
                    whiteSpace: "pre-wrap",
                    wordBreak: "break-word",
                    marginLeft: msg.role === "user" ? "auto" : "0",
                    marginRight: msg.role === "user" ? "0" : "auto",
                    background: msg.role === "user" ? theme.deepRose : theme.white,
                    color: msg.role === "user" ? theme.white : theme.textDark,
                    border: msg.role === "user" ? "none" : `1px solid ${theme.silver}30`,
                    boxShadow: msg.role === "user" ? "none" : "0 2px 8px rgba(0,0,0,0.02)",
                  }}
                >
                  {msg.content}
                </div>
              ))}

              {isNovaLoading && (
                <div style={{
                  fontSize: "0.75rem",
                  color: theme.textMuted,
                  fontStyle: "italic",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.25rem",
                  paddingLeft: "0.25rem",
                }}>
                  Nova is translating alignment parameters...
                </div>
              )}

              {/* ── Injection-detected hard block ── */}
              {isBlocked && (
                <div style={{
                  background: `${theme.blush}80`,
                  border: `1.5px solid ${theme.roseDark}`,
                  padding: "0.85rem 1rem",
                  borderRadius: "12px",
                  lineHeight: 1.5,
                  textAlign: "center",
                }}>
                  <div style={{ fontSize: "1.1rem", marginBottom: "0.35rem" }}>⚠️</div>
                  <p style={{ fontSize: "0.75rem", color: theme.deepRose, fontWeight: 600, marginBottom: "0.25rem" }}>
                    Cosmic Alignment Disrupted
                  </p>
                  <p style={{ fontSize: "0.72rem", color: theme.textMid, lineHeight: 1.5 }}>
                    An attempt to override Nova's directives was detected. Please refresh the page to restore your connection.
                  </p>
                </div>
              )}

              {/* ── Standard transient error (non-blocking) ── */}
              {novaError && !isBlocked && (
                <div style={{
                  fontSize: "0.75rem",
                  color: theme.deepRose,
                  background: `${theme.blush}60`,
                  border: `1px solid ${theme.rose}`,
                  padding: "0.6rem 0.85rem",
                  borderRadius: "10px",
                  lineHeight: 1.4,
                }}>
                  {novaError}
                </div>
              )}
              <div ref={novaEndRef} />
            </div>

            {/* Input System Control Drawer */}
            <form
              onSubmit={handleSendNovaMessage}
              style={{
                padding: "0.85rem",
                background: isBlocked ? theme.paleSilver : theme.white,
                borderTop: `1px solid ${isBlocked ? theme.rose : theme.silver}40`,
                display: "flex",
                gap: "0.5rem",
                flexShrink: 0,
                transition: "background 0.3s ease",
              }}
            >
              <input
                type="text"
                value={novaInput}
                onChange={(e) => !isBlocked && setNovaInput(e.target.value)}
                placeholder={isBlocked ? "Session locked — please refresh the page" : "Ask Nova a cosmic tracking question..."}
                disabled={isNovaLoading || isBlocked}
                style={{
                  flex: 1,
                  border: `1px solid ${isBlocked ? theme.rose : theme.silver}`,
                  borderRadius: "10px",
                  padding: "0.6rem 0.85rem",
                  fontSize: "16px", // Keeps iOS from forcing auto-zooms
                  outline: "none",
                  color: isBlocked ? theme.textMuted : theme.textDark,
                  background: isBlocked ? theme.paleSilver : theme.white,
                  cursor: isBlocked ? "not-allowed" : "text",
                }}
              />
              <button
                type="submit"
                disabled={isNovaLoading || !novaInput.trim() || isBlocked}
                className="tap-target"
                style={{
                  background: isBlocked ? theme.silver : theme.deepRose,
                  color: theme.white,
                  border: "none",
                  borderRadius: "10px",
                  padding: "0 1rem",
                  fontSize: "0.8rem",
                  fontWeight: 500,
                  cursor: isBlocked ? "not-allowed" : "pointer",
                  transition: "background 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  if (!e.currentTarget.disabled) e.currentTarget.style.background = theme.roseDark;
                }}
                onMouseLeave={(e) => {
                  if (!e.currentTarget.disabled) e.currentTarget.style.background = theme.deepRose;
                }}
              >
                Send
              </button>
            </form>
          </div>
        )}
      </div>
    </>
  );
}