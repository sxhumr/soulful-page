"use client"; // Required: framer-motion uses browser APIs unavailable on the server

// ─── External library imports ─────────────────────────────────────────────────
import { motion, useInView } from "framer-motion"; // Scroll animations
import { useRef } from "react";                     // For useInView refs
import Image from "next/image";                    // Next.js optimized image
import {
  Sparkles,  // Tarot / intuition
  Wind,      // Energy healing
  BookOpen,  // Full readings
  Star,      // Numerology
  Heart,     // Bio / warmth
  ArrowRight,
  Moon,      // Monthly package
} from "lucide-react";

// =============================================================================
// DESIGN TOKENS (Shared across the page layout)
// =============================================================================
const TOKENS = {
  platinum:   "#F7F8FA", // Near-white cool silver — main page bg
  paleSilver: "#EDF0F4", // Alternating section bg
  blush:      "#F9D4DC", // Soft pink — glows, accents, icon backgrounds
  rose:       "#E8A8B5", // Mid-pink — borders, pills, decorative rings
  white:      "#FFFFFF",
  charcoal:   "#2D1B23", // Deep plum-charcoal — footer + CTA dark section
  deepRose:   "#8B3D54", // Primary accent — buttons, italic heading emphasis
  roseDark:   "#C47F92", // Secondary accent — eyebrow labels
  textDark:   "#2D1B23", // Main headings
  textMid:    "#6B4D57", // Body paragraph copy
  textMuted:  "#9B8089", // Secondary / helper text
  silver:     "#C8CDD6",
};

// =============================================================================
// ANIMATION VARIANTS (framer-motion)
// =============================================================================
const fadeUp = {
  hidden:  { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.215, 0.610, 0.355, 1.000] },
  },
};

const stagger = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.1 } },
};

// =============================================================================
// HELPER: <FadeInSection>
// =============================================================================
function FadeInSection({ children, className = "", delay = 0 }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.15 });

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
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 py-4 border-b transition-all duration-300"
      style={{
        background: "rgba(247, 248, 250, 0.9)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        borderColor: `${TOKENS.silver}33`,
      }}
    >
      <div className="flex items-center gap-3">
        <div
          className="relative w-9 h-9 rounded-full overflow-hidden flex-shrink-0"
          style={{ border: `1.5px solid ${TOKENS.rose}` }}
        >
          <Image
            src="/logo.jpg"
            alt="Soulful Healing logo"
            fill
            sizes="36px"
            className="object-cover"
            priority
          />
        </div>
        <span
          className="text-lg tracking-wide font-light select-none"
          style={{ color: TOKENS.deepRose }}
        >
          Soulful Healing
        </span>
      </div>

      <div className="hidden md:flex items-center gap-8">
        {["Journey", "Services", "About", "Contact"].map((label) => (
          <a
            key={label}
            href={`#${label.toLowerCase()}`}
            className="text-xs tracking-widest uppercase transition-colors duration-200 hover:text-[#8B3D54]"
            style={{ color: TOKENS.textMuted }}
          >
            {label}
          </a>
        ))}
      </div>

      <a
        href="#contact"
        className="text-xs tracking-widest uppercase font-medium px-5 py-2.5 rounded-full border transition-all duration-300 hover:bg-[#8B3D54] hover:text-white"
        style={{
          borderColor: TOKENS.rose,
          color: TOKENS.deepRose,
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
      {/* Soft Ethereal Background Orb */}
      <div
        className="absolute rounded-full pointer-events-none blur-3xl opacity-40"
        style={{
          width: "500px",
          height: "500px",
          background: `radial-gradient(circle, ${TOKENS.blush} 0%, ${TOKENS.rose} 100%)`,
          top: "45%",
          left: "50%",
          transform: "translate(-50%, -50%)",
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
          className="text-xs font-medium tracking-widest uppercase mb-6"
          style={{ color: TOKENS.roseDark }}
        >
          Intuitive guidance · Held with care
        </motion.p>

        <motion.h1
          variants={fadeUp}
          className="font-light leading-tight mb-6 select-none"
          style={{
            fontSize: "clamp(2.5rem, 6vw, 4.75rem)",
            letterSpacing: "-0.01em",
            color: TOKENS.textDark,
          }}
        >
          A quiet space to find{" "}
          <em className="italic" style={{ color: TOKENS.deepRose }}>
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
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-sm font-medium tracking-widest uppercase transition-all duration-300 transform hover:-translate-y-0.5"
            style={{
              background: TOKENS.roseDark,
              color: TOKENS.white,
            }}
          >
            Book a Reading
            <ArrowRight size={15} />
          </a>

          <a
            href="#journey"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-sm font-light tracking-widest uppercase border transition-colors duration-200 hover:border-[#E8A8B5]"
            style={{
              borderColor: TOKENS.silver,
              color: TOKENS.textMid,
            }}
          >
            How it works
          </a>
        </motion.div>
      </motion.div>

      {/* Elegant Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <p className="text-[10px] tracking-widest uppercase select-none animate-pulse" style={{ color: TOKENS.textMuted }}>
          Explore
        </p>
        <div
          className="w-px h-8"
          style={{ background: `linear-gradient(to bottom, ${TOKENS.silver}, transparent)` }}
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
          <p className="text-xs font-medium tracking-widest uppercase mb-3" style={{ color: TOKENS.roseDark }}>
            The journey
          </p>
          <h2
            className="font-light leading-tight"
            style={{
              fontSize: "clamp(2rem, 4vw, 3rem)",
              color: TOKENS.textDark,
              maxWidth: "460px",
            }}
          >
            How a session{" "}
            <em className="italic" style={{ color: TOKENS.deepRose }}>unfolds.</em>
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
              className="relative p-8 rounded-2xl border overflow-hidden"
              style={{
                background: TOKENS.platinum,
                borderColor: `${TOKENS.silver}44`,
              }}
            >
              <p
                className="font-light mb-4 leading-none select-none opacity-20"
                style={{
                  fontSize: "3.5rem",
                  color: TOKENS.rose,
                }}
              >
                {step.number}
              </p>

              <h3 className="text-lg font-medium mb-3" style={{ color: TOKENS.textDark }}>
                {step.title}
              </h3>

              <p className="text-sm font-light leading-relaxed" style={{ color: TOKENS.textMuted }}>
                {step.body}
              </p>
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
          <p className="text-xs font-medium tracking-widest uppercase mb-3" style={{ color: TOKENS.roseDark }}>
            What&apos;s on offer
          </p>
          <h2
            className="font-light leading-tight"
            style={{
              fontSize: "clamp(2rem, 4vw, 3rem)",
              color: TOKENS.textDark,
              maxWidth: "460px",
            }}
          >
            Readings and sessions{" "}
            <em className="italic" style={{ color: TOKENS.deepRose }}>for every need.</em>
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
              className="p-8 rounded-2xl border bg-white transition-all duration-300 hover:shadow-sm hover:border-[#E8A8B5]"
              style={{ borderColor: `${TOKENS.silver}33` }}
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

              <p className="text-sm font-light leading-relaxed mb-6" style={{ color: TOKENS.textMuted }}>
                {description}
              </p>

              <div className="flex items-center justify-between pt-2 border-t" style={{ borderColor: `${TOKENS.silver}22` }}>
                <span className="text-sm font-medium" style={{ color: TOKENS.deepRose }}>
                  {price}
                </span>
                <span
                  className="flex items-center gap-1 text-xs tracking-widest uppercase font-medium"
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
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <FadeInSection className="flex justify-center md:justify-start">
          <div className="relative w-64 h-64 md:w-72 md:h-72">
            {/* Subtle aesthetic backdrop blur element */}
            <div
              className="absolute inset-0 rounded-full blur-xl opacity-30 scale-110"
              style={{ background: TOKENS.blush }}
            />
            <div
              className="relative w-full h-full rounded-full overflow-hidden border-2"
              style={{ borderColor: `${TOKENS.rose}88` }}
            >
              <Image
                src="/logo.jpg"
                alt="Soulful Healing practitioner avatar asset"
                fill
                sizes="(max-width: 768px) 256px, 288px"
                className="object-cover"
              />
            </div>
          </div>
        </FadeInSection>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <motion.p
            variants={fadeUp}
            className="text-xs font-medium tracking-widest uppercase mb-4"
            style={{ color: TOKENS.roseDark }}
          >
            The practitioner
          </motion.p>

          <motion.h2
            variants={fadeUp}
            className="font-light leading-tight mb-6"
            style={{
              fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)",
              color: TOKENS.textDark,
            }}
          >
            Guided by{" "}
            <em className="italic" style={{ color: TOKENS.deepRose }}>
              intuition and empathy.
            </em>
          </motion.h2>

          {[
            "Every reading begins with listening. I believe each person arrives with their own inner wisdom already intact — what tarot offers is a mirror, a set of symbols to help surface what you already sense to be true.",
            "My practice is built on creating a safe, unhurried space where you can show up exactly as you are. There is no judgment here — only curiosity, care, and a commitment to holding your story with respect.",
          ].map((para, i) => (
            <motion.p
              key={i}
              variants={fadeUp}
              className="text-sm font-light leading-loose mb-4 last:mb-0"
              style={{ color: TOKENS.textMid }}
            >
              {para}
            </motion.p>
          ))}
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
      <FadeInSection className="relative z-10 max-w-xl mx-auto">
        <p className="text-xs font-medium tracking-widest uppercase mb-4" style={{ color: TOKENS.rose }}>
          Begin when you&apos;re ready
        </p>

        <h2
          className="font-light leading-tight mb-8"
          style={{
            fontSize: "clamp(2rem, 5vw, 3.5rem)",
            color: TOKENS.white,
          }}
        >
          Your path{" "}
          <em className="italic" style={{ color: TOKENS.rose }}>
            is uniquely yours.
          </em>
        </h2>

        <a
          href="mailto:hello@example.com"
          className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-sm font-medium tracking-widest uppercase bg-white text-[#2D1B23] transition-transform duration-300 hover:scale-[1.02]"
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
      className="py-8 text-center text-[11px] tracking-wider border-t"
      style={{
        background: TOKENS.charcoal,
        color: TOKENS.textMuted,
        borderColor: "#3D2A33",
      }}
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
    <div className="antialiased" style={{ background: TOKENS.platinum, minHeight: "100vh" }}>
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