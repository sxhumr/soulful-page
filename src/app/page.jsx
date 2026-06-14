// =============================================================================
// src/app/page.jsx — Soulful Healing · Single-Page Application
// =============================================================================
//
// HOW THIS FILE IS STRUCTURED
// ─────────────────────────────────────────────────────────────────────────────
// Next.js App Router pages are just React components exported as default.
// Because we use "framer-motion" (which needs browser APIs like window),
// we mark the whole file with "use client" at the very top. Without this
// directive, Next.js would try to render the component on the server, where
// framer-motion's animation hooks don't exist and the build would crash.
//
// SECTIONS (in render order):
//   1. <Navbar>         — Fixed logo + nav + CTA
//   2. <HeroSection>    — Full-screen welcome + headline + CTA
//   3. <JourneySection> — "How it works" three-step flow
//   4. <ServicesSection>— Service cards grid with icons + pricing
//   5. <AboutSection>   — Practitioner philosophy bio
//   6. <CtaSection>     — Final booking encouragement
//   7. <Footer>         — Links + copyright
// =============================================================================

"use client"; // Required for framer-motion and any useState/useEffect hooks

// ─── External library imports ─────────────────────────────────────────────────
import { motion, useInView } from "framer-motion"; // Animation primitives
import { useRef } from "react";                     // Needed for useInView refs
import Image from "next/image";                     // Next.js optimised image component
import {
  Sparkles,    // Tarot / intuition icon
  Wind,        // Energy healing icon
  BookOpen,    // Guidance / readings icon
  Star,        // Step decorators
  Heart,       // Bio section warmth
  ArrowRight,  // CTA arrows
  Moon,        // Footer / ambient branding
} from "lucide-react";

// =============================================================================
// DESIGN TOKENS
// =============================================================================
// Keeping colours and fonts in one place means you only change them here
// if you ever want to retheme the site. Think of this as your style guide.
//
// Tailwind does not know about arbitrary hex values by default, so we use
// inline style={{ color: TOKENS.deepRose }} when we need exact values, and
// Tailwind utility classes (text-pink-200, bg-white, etc.) where approximate
// Tailwind colours are close enough.
// =============================================================================

const TOKENS = {
  // Backgrounds
  platinum:   "#F7F8FA", // Near-white cool silver — main page background
  paleSilver: "#EDF0F4", // Section alternating bg
  blush:      "#F9D4DC", // Soft pink for accents / glows
  rose:       "#E8A8B5", // Mid-pink for borders, pills
  white:      "#FFFFFF",
  charcoal:   "#2D1B23", // Dark plum-charcoal for footer + dark sections

  // Text
  deepRose:  "#8B3D54", // Primary accent — buttons, headings emphasis
  roseDark:  "#C47F92", // Secondary accent — labels, eyebrows
  textDark:  "#2D1B23", // Body headings
  textMid:   "#6B4D57", // Body paragraph text
  textMuted: "#9B8089", // Secondary / muted labels

  // Utility
  silver:     "#C8CDD6",
  silverDark: "#9BA3AF",
};

// =============================================================================
// ANIMATION HELPERS
// =============================================================================
// Instead of repeating animation config everywhere, we define reusable
// "variants" — plain objects that framer-motion reads to know what to animate.
//
// fadeUp: element starts 28px below its final position and invisible (opacity 0),
//         then fades in and slides up to natural position (opacity 1, y: 0).
//
// stagger: a parent variant that staggers its children by 0.12s each.
//          The "staggerChildren" property belongs on the parent, and each
//          child will use whichever variant it's given (usually "fadeUp").
// =============================================================================

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] }, // Custom cubic-bezier: feels gentle
  },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

// =============================================================================
// HELPER COMPONENT: <FadeInSection>
// =============================================================================
// Wraps any block of content in a <motion.div> that triggers its animation
// when it enters the viewport. This is the "scroll-reveal" pattern.
//
// How useInView works:
//   1. We attach a ref to the element.
//   2. useInView watches that ref and returns true once 20% of the element
//      is visible on screen (threshold: 0.2).
//   3. "once: true" means the animation plays only the first time — it won't
//      re-animate if you scroll past and back.
// =============================================================================

function FadeInSection({ children, className = "", delay = 0 }) {
  const ref = useRef(null);
  // useInView returns a boolean — true when the element is in the viewport
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <motion.div
      ref={ref}
      variants={fadeUp}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      // delay lets individual elements inside a section stagger manually
      transition={{ delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// =============================================================================
// DATA: SERVICES
// =============================================================================
// Defining data as a plain array outside the component keeps the JSX clean
// and makes it easy to add/remove services without touching layout code.
// Each object has: icon (a Lucide component), title, description, price.
// =============================================================================

const SERVICES = [
  {
    Icon: Sparkles,
    title: "Tarot Reading — Single Card",
    description:
      "A focused one-card pull to illuminate the energy of a specific question or moment. Perfect for a quick, grounded check-in.",
    price: "From R250",
  },
  {
    Icon: BookOpen,
    title: "Tarot Reading — Full Spread",
    description:
      "An in-depth Celtic Cross or custom spread exploring past influences, present energy, and the path unfolding ahead of you.",
    price: "From R550",
  },
  {
    Icon: Wind,
    title: "Energy Clearing Session",
    description:
      "A gentle guided session to identify and release stagnant energy patterns, creating space for clarity, rest, and renewal.",
    price: "From R450",
  },
  {
    Icon: Heart,
    title: "Spiritual Guidance & Mentorship",
    description:
      "An open, unhurried conversation using tarot and intuitive listening to help you reconnect with your own inner knowing.",
    price: "From R600",
  },
  {
    Icon: Star,
    title: "Numerology Blueprint",
    description:
      "Discover the personal numbers encoded in your birthdate and name — a structural map of your natural strengths and cycles.",
    price: "From R350",
  },
  {
    Icon: Moon,
    title: "Monthly Ritual Package",
    description:
      "Three monthly sessions combining tarot, intention-setting, and reflection — a consistent space for growth at your own pace.",
    price: "From R1 200 / month",
  },
];

// =============================================================================
// DATA: JOURNEY STEPS
// =============================================================================
// The "How it works" section is a genuine sequence (1 → 2 → 3), so numbered
// steps here are appropriate — the order matters and carries meaning.
// =============================================================================

const STEPS = [
  {
    number: "01",
    title: "Choose your reading",
    body:
      "Browse the services and select the format that feels right for where you are right now. If you're unsure, the single-card reading is a gentle starting point.",
  },
  {
    number: "02",
    title: "Set your intention",
    body:
      "Before your session, take a quiet moment to hold a question or theme in mind. There are no wrong intentions — only honest ones.",
  },
  {
    number: "03",
    title: "Receive your insight",
    body:
      "Your reading is delivered with care, warmth, and space for you to ask questions. You'll leave with something real to sit with.",
  },
];

// =============================================================================
// COMPONENT: <Navbar>
// =============================================================================
// A fixed navigation bar at the top of the page. "fixed top-0" keeps it
// visible as you scroll. "backdrop-blur-md bg-white/80" creates the frosted-
// glass effect — the nav is slightly transparent and blurs what's behind it.
// "z-50" ensures it sits above all other page content.
// =============================================================================

function Navbar() {
  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 py-4"
      style={{
        background: "rgba(247, 248, 250, 0.88)",
        backdropFilter: "blur(16px)",
        borderBottom: `0.5px solid ${TOKENS.silver}55`,
      }}
    >
      {/* ── Logo + Brand name ───────────────────────────────────────────── */}
      {/* 
        Next.js <Image> requires a width and height (in pixels) for static
        images. Since our logo is circular and small in the nav, 40×40 works.
        The src path "/logo.JPEG" assumes you've placed logo.JPEG inside
        the /public folder at the root of your Next.js project.
        public/logo.JPEG → accessible at URL /logo.JPEG
      */}
      <div className="flex items-center gap-3">
        <div className="relative w-9 h-9 rounded-full overflow-hidden flex-shrink-0"
             style={{ border: `1.5px solid ${TOKENS.rose}` }}>
          <Image
            src="/logo.JPEG"
            alt="Soulful Healing logo"
            fill               // fill = stretch to fill the parent container
            className="object-cover"  // object-cover = no squashing, crops to fit
            priority           // priority = preload this image (important for LCP)
          />
        </div>
        <span
          className="text-lg tracking-wide font-light"
          style={{ fontFamily: "'Cormorant Garant', serif", color: TOKENS.deepRose }}
        >
          Soulful Healing
        </span>
      </div>

      {/* ── Desktop nav links ────────────────────────────────────────────── */}
      {/* hidden md:flex — hidden on mobile, shown as flex row on md and above */}
      <div className="hidden md:flex items-center gap-8">
        {["Journey", "Services", "About", "Contact"].map((label) => (
          <a
            key={label}
            href={`#${label.toLowerCase()}`}
            className="text-xs tracking-widest uppercase transition-colors duration-200"
            style={{ color: TOKENS.textMuted }}
            // Inline hover is not possible in JSX; Tailwind hover: classes handle it
            onMouseEnter={(e) => (e.target.style.color = TOKENS.deepRose)}
            onMouseLeave={(e) => (e.target.style.color = TOKENS.textMuted)}
          >
            {label}
          </a>
        ))}
      </div>

      {/* ── CTA button ───────────────────────────────────────────────────── */}
      <a
        href="#contact"
        className="text-xs tracking-widest uppercase font-medium px-5 py-2.5 rounded-full transition-all duration-200"
        style={{
          border: `1px solid ${TOKENS.rose}`,
          color: TOKENS.deepRose,
          background: "transparent",
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

// =============================================================================
// COMPONENT: <HeroSection>
// =============================================================================
// Full-viewport-height welcome section. "min-h-screen" = at least 100vh tall.
// The orb behind the headline is a decorative div with a radial-gradient and
// a pulsing animation defined via a CSS @keyframes in <GlobalStyles>.
// =============================================================================

function HeroSection() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-24 pb-16"
      style={{
        background: `linear-gradient(160deg, ${TOKENS.white} 0%, ${TOKENS.platinum} 55%, ${TOKENS.paleSilver} 100%)`,
      }}
    >
      {/* ── Decorative ambient orb ──────────────────────────────────────── */}
      {/* 
        This is the "signature" visual element of the design — a glowing blush
        circle that sits behind the text. It pulses gently via CSS animation.
        "pointer-events-none" means mouse clicks pass through it to elements below.
      */}
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

      {/* Small decorative ring — top-right */}
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

      {/* Small decorative ring — bottom-left */}
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

      {/* ── Hero text content ────────────────────────────────────────────── */}
      {/* 
        motion.div with fadeUp variant: this entire block fades up on load.
        "initial" = start state. "animate" = end state. We pass the variant
        names ("hidden", "visible") from our TOKENS above.
      */}
      <motion.div
        className="relative z-10 text-center max-w-3xl px-6"
        variants={stagger}
        initial="hidden"
        animate="visible"
      >
        {/* Eyebrow label */}
        <motion.p
          variants={fadeUp}
          className="text-xs font-medium tracking-widest uppercase mb-7"
          style={{ color: TOKENS.roseDark }}
        >
          Intuitive guidance · Held with care
        </motion.p>

        {/* Main headline */}
        <motion.h1
          variants={fadeUp}
          className="font-light leading-tight mb-6"
          style={{
            fontFamily: "'Cormorant Garant', serif",
            fontSize: "clamp(3rem, 7vw, 5.5rem)", // Fluid type: scales with viewport
            letterSpacing: "-0.02em",
            color: TOKENS.textDark,
          }}
        >
          A quiet space to find{" "}
          <em style={{ fontStyle: "italic", color: TOKENS.deepRose }}>
            your own clarity.
          </em>
        </motion.h1>

        {/* Subheadline / supporting copy */}
        <motion.p
          variants={fadeUp}
          className="text-base md:text-lg font-light leading-relaxed mb-10 mx-auto"
          style={{ color: TOKENS.textMid, maxWidth: "520px" }}
        >
          Personalised tarot readings and spiritual guidance offered with
          warmth, honesty, and deep respect for your journey.
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          variants={fadeUp}
          className="flex flex-wrap items-center justify-center gap-4"
        >
          {/* Primary CTA */}
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-sm font-medium tracking-widest uppercase transition-all duration-250"
            style={{
              background: TOKENS.roseDark,
              color: TOKENS.white,
              boxShadow: `0 8px 24px ${TOKENS.roseDark}44`,
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

          {/* Secondary ghost button */}
          <a
            href="#journey"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-sm font-light tracking-widest uppercase transition-colors duration-200"
            style={{ border: `1px solid ${TOKENS.silver}`, color: TOKENS.textMid }}
            onMouseEnter={(e) => (e.currentTarget.style.borderColor = TOKENS.rose)}
            onMouseLeave={(e) => (e.currentTarget.style.borderColor = TOKENS.silver)}
          >
            How it works
          </a>
        </motion.div>
      </motion.div>

      {/* ── Scroll nudge ─────────────────────────────────────────────────── */}
      <div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <p
          className="text-xs tracking-widest uppercase"
          style={{ color: TOKENS.textMuted }}
        >
          Explore
        </p>
        {/* Animated thin vertical line */}
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

// =============================================================================
// COMPONENT: <JourneySection>
// =============================================================================
// Shows three numbered steps in a clean responsive grid. On mobile (< md),
// the grid collapses to a single column. Each card fades in from below as
// it enters the viewport, staggered so they don't all appear at once.
// =============================================================================

function JourneySection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.15 });

  return (
    <section
      id="journey"
      className="py-28 px-6 md:px-12"
      style={{ background: TOKENS.white }}
    >
      <div className="max-w-5xl mx-auto">

        {/* Section header */}
        <FadeInSection className="mb-20">
          <p
            className="text-xs font-medium tracking-widest uppercase mb-4"
            style={{ color: TOKENS.roseDark }}
          >
            The journey
          </p>
          <h2
            className="font-light leading-tight"
            style={{
              fontFamily: "'Cormorant Garant', serif",
              fontSize: "clamp(2.25rem, 5vw, 3.25rem)",
              color: TOKENS.textDark,
              maxWidth: "460px",
            }}
          >
            How a session{" "}
            <em style={{ fontStyle: "italic", color: TOKENS.deepRose }}>
              unfolds.
            </em>
          </h2>
        </FadeInSection>

        {/* Steps grid */}
        {/* 
          motion.div with stagger variant: this parent staggers each child's
          fadeUp animation by 0.12s. The ref + isInView combination means
          the animation only plays when this grid scrolls into view.
        */}
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
              {/* Large faint step number — purely decorative context */}
              <p
                className="font-light mb-6 leading-none"
                style={{
                  fontFamily: "'Cormorant Garant', serif",
                  fontSize: "4rem",
                  color: TOKENS.rose,          // Soft pink, not distracting
                  opacity: 0.6,
                }}
              >
                {step.number}
              </p>

              <h3
                className="text-xl font-medium mb-3"
                style={{ color: TOKENS.textDark }}
              >
                {step.title}
              </h3>

              <p
                className="text-sm font-light leading-relaxed"
                style={{ color: TOKENS.textMuted }}
              >
                {step.body}
              </p>

              {/* Decorative blush blob — top right corner */}
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

// =============================================================================
// COMPONENT: <ServicesSection>
// =============================================================================
// A 2-column grid on desktop, 1-column on mobile. Each service card shows:
// - A Lucide icon in a soft blush pill
// - Title, description, and price
// Framer-motion stagger plays when the grid scrolls into view.
// =============================================================================

function ServicesSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <section
      id="services"
      className="py-28 px-6 md:px-12"
      style={{ background: TOKENS.paleSilver }}
    >
      <div className="max-w-5xl mx-auto">

        {/* Section header */}
        <FadeInSection className="mb-20">
          <p
            className="text-xs font-medium tracking-widest uppercase mb-4"
            style={{ color: TOKENS.roseDark }}
          >
            What's on offer
          </p>
          <h2
            className="font-light leading-tight"
            style={{
              fontFamily: "'Cormorant Garant', serif",
              fontSize: "clamp(2.25rem, 5vw, 3.25rem)",
              color: TOKENS.textDark,
              maxWidth: "460px",
            }}
          >
            Readings and sessions{" "}
            <em style={{ fontStyle: "italic", color: TOKENS.deepRose }}>
              for every need.
            </em>
          </h2>
        </FadeInSection>

        {/* Services grid */}
        <motion.div
          ref={ref}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
          variants={stagger}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {SERVICES.map((service) => {
            // We destructure the Icon component so we can render it as JSX
            const { Icon, title, description, price } = service;

            return (
              <motion.div
                key={title}
                variants={fadeUp}
                className="group p-8 rounded-2xl transition-all duration-300"
                style={{
                  background: TOKENS.white,
                  border: `1px solid ${TOKENS.silver}50`,
                }}
                // Hover: lift the card and show a rose border
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
                {/* Icon inside a soft blush pill */}
                <div
                  className="inline-flex items-center justify-center w-10 h-10 rounded-xl mb-5"
                  style={{ background: TOKENS.blush }}
                >
                  {/* 
                    Lucide icons are React components. We pass size and color as props.
                    size={18} = 18px × 18px SVG. 
                  */}
                  <Icon size={18} style={{ color: TOKENS.deepRose }} />
                </div>

                {/* Service title */}
                <h3
                  className="text-lg font-medium mb-2"
                  style={{ color: TOKENS.textDark }}
                >
                  {title}
                </h3>

                {/* Description */}
                <p
                  className="text-sm font-light leading-relaxed mb-5"
                  style={{ color: TOKENS.textMuted }}
                >
                  {description}
                </p>

                {/* Price + learn more row */}
                <div className="flex items-center justify-between">
                  <span
                    className="text-sm font-medium"
                    style={{ color: TOKENS.deepRose }}
                  >
                    {price}
                  </span>
                  <span
                    className="flex items-center gap-1 text-xs tracking-widest uppercase transition-colors duration-200"
                    style={{ color: TOKENS.roseDark }}
                  >
                    Enquire <ArrowRight size={12} />
                  </span>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

// =============================================================================
// COMPONENT: <AboutSection>
// =============================================================================
// Two-column layout on desktop: logo/visual on the left, text on the right.
// On mobile it stacks to a single column.
// Philosophy copy focuses entirely on values — no location, no years.
// =============================================================================

function AboutSection() {
  return (
    <section
      id="about"
      className="py-28 px-6 md:px-12"
      style={{ background: TOKENS.white }}
    >
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">

        {/* ── Left column: large logo / image display ───────────────────── */}
        <FadeInSection>
          <div
            className="relative mx-auto md:mx-0"
            style={{ width: "300px", height: "300px" }}
          >
            {/* Decorative ring behind the image */}
            <div
              className="absolute inset-0 rounded-full"
              style={{
                background: `radial-gradient(circle, ${TOKENS.blush} 0%, transparent 70%)`,
                opacity: 0.5,
                transform: "scale(1.2)",
              }}
            />
            {/* Logo displayed large and circular */}
            <div className="relative w-full h-full rounded-full overflow-hidden"
                 style={{ border: `2px solid ${TOKENS.rose}60` }}>
              <Image
                src="/logo.JPEG"
                alt="Soulful Healing — practitioner portrait"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </FadeInSection>

        {/* ── Right column: bio text ────────────────────────────────────── */}
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
              fontFamily: "'Cormorant Garant', serif",
              fontSize: "clamp(2rem, 4vw, 3rem)",
              color: TOKENS.textDark,
            }}
          >
            Guided by{" "}
            <em style={{ fontStyle: "italic", color: TOKENS.deepRose }}>
              intuition and empathy.
            </em>
          </motion.h2>

          {/* Philosophy paragraphs */}
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

          {/* Small decorative divider */}
          <motion.div
            variants={fadeUp}
            className="mt-8 flex items-center gap-3"
          >
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

// =============================================================================
// COMPONENT: <CtaSection>
// =============================================================================
// Dark close section on a deep charcoal background. The rose glow orb stays
// as the only warm element — everything else is white/muted on dark.
// =============================================================================

function CtaSection() {
  return (
    <section
      id="contact"
      className="relative py-32 px-6 text-center overflow-hidden"
      style={{ background: TOKENS.charcoal }}
    >
      {/* Ambient glow behind the CTA text */}
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
        <p
          className="text-xs font-medium tracking-widest uppercase mb-5"
          style={{ color: TOKENS.rose }}
        >
          Begin when you're ready
        </p>

        <h2
          className="font-light leading-tight mb-6"
          style={{
            fontFamily: "'Cormorant Garant', serif",
            fontSize: "clamp(2.5rem, 6vw, 4rem)",
            color: TOKENS.white,
          }}
        >
          Your path{" "}
          <em style={{ fontStyle: "italic", color: TOKENS.rose }}>
            is waiting.
          </em>
        </h2>

        <p
          className="text-base font-light leading-relaxed mb-10"
          style={{ color: `${TOKENS.silver}CC` }}
        >
          Book a reading whenever it feels right. Sessions are held in a
          calm, confidential space, entirely at your own pace.
        </p>

        <a
          href="mailto:hello@soulfulhealing.co.za"
          className="inline-flex items-center gap-2 px-10 py-4 rounded-full text-sm font-medium tracking-widest uppercase transition-all duration-250"
          style={{
            background: TOKENS.roseDark,
            color: TOKENS.white,
            boxShadow: `0 8px 32px ${TOKENS.deepRose}66`,
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = TOKENS.deepRose;
            e.currentTarget.style.transform = "translateY(-2px)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = TOKENS.roseDark;
            e.currentTarget.style.transform = "translateY(0)";
          }}
        >
          Book a Reading
          <ArrowRight size={15} />
        </a>

        <p
          className="mt-5 text-xs"
          style={{ color: `${TOKENS.silverDark}88` }}
        >
          Or email{" "}
          <a
            href="mailto:hello@soulfulhealing.co.za"
            style={{ color: TOKENS.rose, textDecoration: "underline" }}
          >
            hello@soulfulhealing.co.za
          </a>
        </p>
      </FadeInSection>
    </section>
  );
}

// =============================================================================
// COMPONENT: <Footer>
// =============================================================================
// Minimal footer: stays on the dark charcoal background to feel continuous
// with the CTA. Three link columns and a copyright line.
// =============================================================================

function Footer() {
  return (
    <footer
      className="py-8 px-6 md:px-12"
      style={{
        background: TOKENS.charcoal,
        borderTop: "1px solid rgba(255,255,255,0.07)",
      }}
    >
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">

        {/* Brand mark */}
        <div className="flex items-center gap-2.5">
          <div
            className="relative w-7 h-7 rounded-full overflow-hidden"
            style={{ border: `1px solid ${TOKENS.rose}55` }}
          >
            <Image
              src="/logo.JPEG"
              alt="Soulful Healing"
              fill
              className="object-cover"
            />
          </div>
          <span
            className="font-light tracking-wide"
            style={{
              fontFamily: "'Cormorant Garant', serif",
              fontSize: "1rem",
              color: `${TOKENS.white}60`,
            }}
          >
            Soulful Healing
          </span>
        </div>

        {/* Footer links */}
        <div className="flex items-center gap-8">
          {[
            { label: "Privacy Policy", href: "/privacy" },
            { label: "Terms", href: "/terms" },
            { label: "Contact", href: "#contact" },
          ].map(({ label, href }) => (
            <a
              key={label}
              href={href}
              className="text-xs tracking-widest uppercase transition-colors duration-200"
              style={{ color: `${TOKENS.white}35` }}
              onMouseEnter={(e) => (e.target.style.color = TOKENS.rose)}
              onMouseLeave={(e) => (e.target.style.color = `${TOKENS.white}35`)}
            >
              {label}
            </a>
          ))}
        </div>

        {/* Copyright */}
        <p
          className="text-xs"
          style={{ color: `${TOKENS.white}25`, letterSpacing: "0.06em" }}
        >
          © 2026 Soulful Healing. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

// =============================================================================
// GLOBAL STYLES
// =============================================================================
// We inject a small <style> tag for things Tailwind can't do natively:
//   - @import for Google Fonts (Cormorant Garant — the display serif)
//   - @keyframes for the pulsing orb animation
//   - prefers-reduced-motion: users who've opted out of animations see
//     instant, non-animated transitions instead (accessibility best practice)
// =============================================================================

function GlobalStyles() {
  return (
    <style jsx global>{`
      @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garant:ital,wght@0,300;0,400;0,500;1,300;1,400&family=Inter:wght@300;400;500&display=swap');

      /* Smooth scroll: clicking anchor links (#journey, #services etc.)
         scrolls the page smoothly rather than jumping instantly */
      html {
        scroll-behavior: smooth;
      }

      /* The orb-pulse animation for the hero background orb.
         We animate opacity and scale on a 6-second infinite loop. */
      @keyframes orb-pulse {
        0%, 100% { opacity: 0.18; transform: translate(-42%, -52%) scale(1); }
        50%       { opacity: 0.30; transform: translate(-42%, -52%) scale(1.05); }
      }

      .orb-pulse {
        animation: orb-pulse 6s ease-in-out infinite;
      }

      /* Accessibility: if the user has "Reduce Motion" enabled in their OS,
         we disable all animations and transitions site-wide */
      @media (prefers-reduced-motion: reduce) {
        *, *::before, *::after {
          animation-duration: 0.01ms !important;
          transition-duration: 0.01ms !important;
        }
        .orb-pulse {
          animation: none;
        }
      }
    `}</style>
  );
}

// =============================================================================
// DEFAULT EXPORT: <HomePage>
// =============================================================================
// This is the actual page Next.js renders at the "/" route.
// All it does is assemble our components in the right order.
// The <GlobalStyles> component must come first so fonts load early.
// =============================================================================

export default function HomePage() {
  return (
    <>
      {/* Inject fonts and keyframe animations */}
      <GlobalStyles />

      {/* Fixed navigation (sits above all sections via z-50) */}
      <Navbar />

      {/* Main page content — sections scroll in sequence */}
      <main>
        <HeroSection />
        <JourneySection />
        <ServicesSection />
        <AboutSection />
        <CtaSection />
      </main>

      {/* Footer at the very bottom */}
      <Footer />
    </>
  );
}