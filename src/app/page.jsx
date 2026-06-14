"use client"; // Required: framer-motion uses browser APIs unavailable on the server

// ─── External library imports ─────────────────────────────────────────────────
import { motion, useInView } from "framer-motion"; // Scroll animations
import { useRef } from "react";                     // For useInView refs
import Image from "next/image";                     // Next.js optimised image
import {
  Sparkles, // Tarot / intuition
  Wind,     // Energy healing
  BookOpen, // Full readings
  Star,     // Numerology
  Heart,    // Bio / warmth
  ArrowRight,
  Moon,     // Monthly package
} from "lucide-react";

// =============================================================================
// DESIGN TOKENS
// =============================================================================
const TOKENS = {
  // ── Backgrounds
  platinum:   "#F7F8FA", // Near-white cool silver — main page bg
  paleSilver: "#EDF0F4", // Alternating section bg
  blush:      "#F9D4DC", // Soft pink — glows, accents, icon backgrounds
  rose:       "#E8A8B5", // Mid-pink — borders, pills, decorative rings
  white:      "#FFFFFF",
  charcoal:   "#2D1B23", // Deep plum-charcoal — footer + CTA dark section

  // ── Text
  deepRose:  "#8B3D54", // Primary accent — buttons, italic heading emphasis
  roseDark:  "#C47F92", // Secondary accent — eyebrow labels
  textDark:  "#2D1B23", // Main headings
  textMid:   "#6B4D57", // Body paragraph copy
  textMuted: "#9B8089", // Secondary / helper text

  // ── Utility
  silver:     "#C8CDD6",
  silverDark: "#9BA3AF",
};

// =============================================================================
// ANIMATION VARIANTS (framer-motion)
// =============================================================================
const fadeUp = {
  hidden:  { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
  },
};

const stagger = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.12 } },
};

// =============================================================================
// HELPER: <FadeInSection>
// =============================================================================
function FadeInSection({ children, className = "", delay = 0 }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <motion.div
      ref={ref}
      variants={fadeUp}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      transition={{ delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// =============================================================================
// DATA CONFIGURATIONS
// =============================================================================
const SERVICES = [
  {
    Icon: Sparkles,
    title: "Tarot Reading — Single Card",
    description: "A focused one-card pull to illuminate the energy of a specific question or moment. Perfect for a quick, grounded check-in.",
    price: "From R250",
  },
  {
    Icon: BookOpen,
    title: "Tarot Reading — Full Spread",
    description: "An in-depth Celtic Cross or custom spread exploring past influences, present energy, and the path unfolding ahead of you.",
    price: "From R550",
  },
  {
    Icon: Wind,
    title: "Energy Clearing Session",
    description: "A gentle guided session to identify and release stagnant energy patterns, creating space for clarity, rest, and renewal.",
    price: "From R450",
  },
  {
    Icon: Heart,
    title: "Spiritual Guidance & Mentorship",
    description: "An open, unhurried conversation using tarot and intuitive listening to help you reconnect with your own inner knowing.",
    price: "From R600",
  },
  {
    Icon: Star,
    title: "Numerology Blueprint",
    description: "Discover the personal numbers encoded in your birthdate and name — a structural map of your natural strengths and cycles.",
    price: "From R350",
  },
  {
    Icon: Moon,
    title: "Monthly Ritual Package",
    description: "Three monthly sessions combining tarot, intention-setting, and reflection — a consistent space for growth at your own pace.",
    price: "From R1 200 / month",
  },
];

const STEPS = [
  {
    number: "01",
    title: "Choose your reading",
    body: "Browse the services and select the format that feels right for where you are right now. If you're unsure, the single-card reading is a gentle starting point.",
  },
  {
    number: "02",
    title: "Set your intention",
    body: "Before your session, take a quiet moment to hold a question or theme in mind. There are no wrong intentions — only honest ones.",
  },
  {
    number: "03",
    title: "Receive your insight",
    body: "Your reading is delivered with care, warmth, and space for you to ask questions. You'll leave with something real to sit with.",
  },
];

// =============================================================================
// SUB-COMPONENTS
// =============================================================================

function Navbar() {
  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 py-4"
      style={{
        background: "rgba(247, 248, 250, 0.88)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        borderBottom: `0.5px solid ${TOKENS.silver}55`,
      }}
    >
      <div className="flex items-center gap-3">
        <div
          className="relative w-9 h-9 rounded-full overflow-hidden flex-shrink-0"
          style={{ border: `1.5px solid ${TOKENS.rose}` }}
        >
          <Image
            src="/logo.jpeg"
            alt="Soulful Healing logo"
            fill
            sizes="36px"
            className="object-cover"
            priority
          />
        </div>
        <span
          className="text-lg tracking-wide font-light"
          style={{ fontFamily: "'Cormorant Garamond', serif", color: TOKENS.deepRose }}
        >
          Soulful Healing
        </span>
      </div>

      <div className="hidden md:flex items-center gap-8">
        {["Journey", "Services", "About", "Contact"].map((label) => (
          <a
            key={label}
            href={`#${label.toLowerCase()}`}
            className="text-xs tracking-widest uppercase transition-colors duration-200"
            style={{ color: TOKENS.textMuted }}
            onMouseEnter={(e) => (e.currentTarget.style.color = TOKENS.deepRose)}
            onMouseLeave={(e) => (e.currentTarget.style.color = TOKENS.textMuted)}
          >
            {label}
          </a>
        ))}
      </div>

      <a
        href="#contact"
        className="text-xs tracking-widest uppercase font-medium px-5 py-2.5 rounded-full"
        style={{
          border: `1px solid ${TOKENS.rose}`,
          color: TOKENS.deepRose,
          background: "transparent",
          transition: "background 0.2s ease, color 0.2s ease, border-color 0.2s ease",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = TOKENS.deepRose;
          e.currentTarget.style.color = TOKENS.white;
          e.currentTarget.style.borderColor = TOKENS.deepRose;
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = "transparent";
          e.currentTarget.style.color = TOKENS.deepRose;
          e.currentTarget.style.borderColor = TOKENS.rose;
        }}
      >
        Book a Reading
      </a>
    </nav>
  );
}

function HeroSection() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-24 pb-16"
      style={{
        background: `linear-gradient(160deg, ${TOKENS.white} 0%, ${TOKENS.platinum} 55%, ${TOKENS.paleSilver} 100%)`,
      }}
    >
      <div
        className="orb-pulse absolute rounded-full pointer-events-none"
        style={{
          width: "580px",
          height: "580px",
          background: `radial-gradient(circle at 40% 40%, ${TOKENS.blush}, ${TOKENS.rose}44 50%, transparent 70%)`,
          top: "50%",
          left: "50%",
          transform: "translate(-42%, -52%)",
        }}
      />

      <div
        className="absolute rounded-full pointer-events-none"
        style={{
          width: "140px",
          height: "140px",
          border: `1px solid ${TOKENS.silver}70`,
          top: "16%",
          right: "12%",
        }}
      />

      <div
        className="absolute rounded-full pointer-events-none"
        style={{
          width: "72px",
          height: "72px",
          border: `1px solid ${TOKENS.rose}60`,
          bottom: "20%",
          left: "8%",
        }}
      />

      <motion.div
        className="relative z-10 text-center max-w-3xl px-6"
        variants={stagger}
        initial="hidden"
        animate="visible"
      >
        <motion.p
          variants={fadeUp}
          className="text-xs font-medium tracking-widest uppercase mb-7"
          style={{ color: TOKENS.roseDark }}
        >
          Intuitive guidance · Held with care
        </motion.p>

        <motion.h1
          variants={fadeUp}
          className="font-light leading-tight mb-6"
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(3rem, 7vw, 5.5rem)",
            letterSpacing: "-0.02em",
            color: TOKENS.textDark,
          }}
        >
          A quiet space to find{" "}
          <em style={{ fontStyle: "italic", color: TOKENS.deepRose }}>
            your own clarity.
          </em>
        </motion.h1>

        <motion.p
          variants={fadeUp}
          className="text-base md:text-lg font-light leading-relaxed mb-10 mx-auto"
          style={{ color: TOKENS.textMid, maxWidth: "520px" }}
        >
          Personalised tarot readings and spiritual guidance offered with
          warmth, honesty, and deep respect for your journey.
        </motion.p>

        <motion.div
          variants={fadeUp}
          className="flex flex-wrap items-center justify-center gap-4"
        >
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-sm font-medium tracking-widest uppercase"
            style={{
              background: TOKENS.roseDark,
              color: TOKENS.white,
              boxShadow: `0 8px 24px ${TOKENS.roseDark}44`,
              transition: "background 0.25s ease, transform 0.25s ease, box-shadow 0.25s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = TOKENS.deepRose;
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.boxShadow = `0 14px 32px ${TOKENS.deepRose}55`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = TOKENS.roseDark;
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = `0 8px 24px ${TOKENS.roseDark}44`;
            }}
          >
            Book a Reading
            <ArrowRight size={15} />
          </a>

          <a
            href="#journey"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-sm font-light tracking-widest uppercase"
            style={{
              border: `1px solid ${TOKENS.silver}`,
              color: TOKENS.textMid,
              transition: "border-color 0.2s ease",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.borderColor = TOKENS.rose)}
            onMouseLeave={(e) => (e.currentTarget.style.borderColor = TOKENS.silver)}
          >
            How it works
          </a>
        </motion.div>
      </motion.div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <p className="text-xs tracking-widest uppercase" style={{ color: TOKENS.textMuted }}>
          Explore
        </p>
        <motion.div
          className="w-px h-10"
          style={{ background: `linear-gradient(to bottom, ${TOKENS.silverDark}, transparent)` }}
          animate={{ scaleY: [0.8, 1, 0.8] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>
    </section>
  );
}

function JourneySection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.15 });

  return (
    <section id="journey" className="py-28 px-6 md:px-12" style={{ background: TOKENS.white }}>
      <div className="max-w-5xl mx-auto">
        <FadeInSection className="mb-20">
          <p className="text-xs font-medium tracking-widest uppercase mb-4" style={{ color: TOKENS.roseDark }}>
            The journey
          </p>
          <h2
            className="font-light leading-tight"
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(2.25rem, 5vw, 3.25rem)",
              color: TOKENS.textDark,
              maxWidth: "460px",
            }}
          >
            How a session{" "}
            <em style={{ fontStyle: "italic", color: TOKENS.deepRose }}>unfolds.</em>
          </h2>
        </FadeInSection>

        <motion.div
          ref={ref}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          variants={stagger}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {STEPS.map((step) => (
            <motion.div
              key={step.number}
              variants={fadeUp}
              className="relative p-8 rounded-2xl"
              style={{
                background: TOKENS.platinum,
                border: `1px solid ${TOKENS.silver}50`,
              }}
            >
              <p
                className="font-light mb-6 leading-none select-none"
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "4rem",
                  color: TOKENS.rose,
                  opacity: 0.6,
                }}
              >
                {step.number}
              </p>

              <h3 className="text-xl font-medium mb-3" style={{ color: TOKENS.textDark }}>
                {step.title}
              </h3>

              <p className="text-sm font-light leading-relaxed" style={{ color: TOKENS.textMuted }}>
                {step.body}
              </p>

              <div
                className="absolute top-0 right-0 rounded-full pointer-events-none"
                style={{
                  width: "80px",
                  height: "80px",
                  background: TOKENS.blush,
                  opacity: 0.35,
                  transform: "translate(30%, -30%)",
                }}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function ServicesSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <section id="services" className="py-28 px-6 md:px-12" style={{ background: TOKENS.paleSilver }}>
      <div className="max-w-5xl mx-auto">
        <FadeInSection className="mb-20">
          <p className="text-xs font-medium tracking-widest uppercase mb-4" style={{ color: TOKENS.roseDark }}>
            What&apos;s on offer
          </p>
          <h2
            className="font-light leading-tight"
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(2.25rem, 5vw, 3.25rem)",
              color: TOKENS.textDark,
              maxWidth: "460px",
            }}
          >
            Readings and sessions{" "}
            <em style={{ fontStyle: "italic", color: TOKENS.deepRose }}>for every need.</em>
          </h2>
        </FadeInSection>

        <motion.div
          ref={ref}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
          variants={stagger}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {SERVICES.map(({ Icon, title, description, price }) => (
            <motion.div
              key={title}
              variants={fadeUp}
              className="p-8 rounded-2xl"
              style={{
                background: TOKENS.white,
                border: `1px solid ${TOKENS.silver}50`,
                transition: "transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-4px)";
                e.currentTarget.style.boxShadow = `0 16px 48px ${TOKENS.deepRose}14`;
                e.currentTarget.style.borderColor = TOKENS.rose;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "none";
                e.currentTarget.style.borderColor = `${TOKENS.silver}50`;
              }}
            >
              <div
                className="inline-flex items-center justify-center w-10 h-10 rounded-xl mb-5"
                style={{ background: TOKENS.blush }}
              >
                <Icon size={18} style={{ color: TOKENS.deepRose }} />
              </div>

              <h3 className="text-lg font-medium mb-2" style={{ color: TOKENS.textDark }}>
                {title}
              </h3>

              <p className="text-sm font-light leading-relaxed mb-5" style={{ color: TOKENS.textMuted }}>
                {description}
              </p>

              <div className="flex items-center justify-between">
                <span className="text-sm font-medium" style={{ color: TOKENS.deepRose }}>
                  {price}
                </span>
                <span
                  className="flex items-center gap-1 text-xs tracking-widest uppercase"
                  style={{ color: TOKENS.roseDark }}
                >
                  Enquire <ArrowRight size={12} />
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function AboutSection() {
  return (
    <section id="about" className="py-28 px-6 md:px-12" style={{ background: TOKENS.white }}>
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        <FadeInSection>
          <div className="relative mx-auto md:mx-0" style={{ width: "300px", height: "300px" }}>
            <div
              className="absolute inset-0 rounded-full pointer-events-none"
              style={{
                background: `radial-gradient(circle, ${TOKENS.blush} 0%, transparent 70%)`,
                opacity: 0.5,
                transform: "scale(1.2)",
              }}
            />
            <div
              className="relative w-full h-full rounded-full overflow-hidden"
              style={{ border: `2px solid ${TOKENS.rose}60` }}
            >
              <Image
                src="/logo.jpeg"
                alt="Soulful Healing practitioner"
                fill
                sizes="300px"
                className="object-cover"
              />
            </div>
          </div>
        </FadeInSection>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.p
            variants={fadeUp}
            className="text-xs font-medium tracking-widest uppercase mb-5"
            style={{ color: TOKENS.roseDark }}
          >
            The practitioner
          </motion.p>

          <motion.h2
            variants={fadeUp}
            className="font-light leading-tight mb-7"
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(2rem, 4vw, 3rem)",
              color: TOKENS.textDark,
            }}
          >
            Guided by{" "}
            <em style={{ fontStyle: "italic", color: TOKENS.deepRose }}>
              intuition and empathy.
            </em>
          </motion.h2>

          {[
            "Every reading begins with listening. I believe each person arrives with their own inner wisdom already intact — what tarot offers is a mirror, a set of symbols to help surface what you already sense to be true.",
            "My practice is built on creating a safe, unhurried space where you can show up exactly as you are. There is no judgment here — only curiosity, care, and a commitment to holding your story with respect.",
            "Whether you're navigating change, searching for direction, or simply wanting to pause and reflect, I am here to walk alongside you.",
          ].map((para, i) => (
            <motion.p
              key={i}
              variants={fadeUp}
              className="text-sm font-light leading-loose mb-5 last:mb-0"
              style={{ color: TOKENS.textMid }}
            >
              {para}
            </motion.p>
          ))}

          <motion.div variants={fadeUp} className="mt-8 flex items-center gap-3">
            <div
              className="h-px flex-1"
              style={{ background: `linear-gradient(to right, ${TOKENS.rose}80, transparent)` }}
            />
            <Heart size={14} style={{ color: TOKENS.rose }} />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

function CtaSection() {
  return (
    <section
      id="contact"
      className="relative py-32 px-6 text-center overflow-hidden"
      style={{ background: TOKENS.charcoal }}
    >
      <div
        className="absolute rounded-full pointer-events-none"
        style={{
          width: "480px",
          height: "480px",
          background: `radial-gradient(circle, ${TOKENS.rose}28, transparent 70%)`,
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      />

      <FadeInSection className="relative z-10 max-w-xl mx-auto">
        <p className="text-xs font-medium tracking-widest uppercase mb-5" style={{ color: TOKENS.rose }}>
          Begin when you&apos;re ready
        </p>

        <h2
          className="font-light leading-tight mb-6"
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(2.5rem, 6vw, 4rem)",
            color: TOKENS.white,
          }}
        >
          Your path{" "}
          <em style={{ fontStyle: "italic", color: TOKENS.rose }}>
            is uniquely yours.
          </em>
        </h2>

        <a
          href="mailto:hello@example.com"
          className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-sm font-medium tracking-widest uppercase mt-4"
          style={{
            background: TOKENS.white,
            color: TOKENS.charcoal,
            transition: "transform 0.2s ease",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-2px)")}
          onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0)")}
        >
          Get In Touch
        </a>
      </FadeInSection>
    </section>
  );
}

function Footer() {
  return (
    <footer
      className="py-8 text-center text-xs tracking-wider"
      style={{ background: TOKENS.charcoal, color: TOKENS.textMuted, borderTop: `1px solid ${TOKENS.textDark}` }}
    >
      <p>&copy; {new Date().getFullYear()} Soulful Healing. All rights reserved.</p>
    </footer>
  );
}

// =============================================================================
// MAIN ENTRY WRAPPER EXPORT
// =============================================================================
export default function Page() {
  return (
    <div style={{ background: TOKENS.platinum, minHeight: "100vh" }}>
      <Navbar />
      <HeroSection />
      <JourneySection />
      <ServicesSection />
      <AboutSection />
      <CtaSection />
      <Footer />
    </div>
  );
}