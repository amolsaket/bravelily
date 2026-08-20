import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, ArrowDown } from "lucide-react";
import { Sparkle, CurlyArrow, Lily } from "@/components/Doodles";
import { scrollToId } from "@/lib/lenis";

const EASE = [0.16, 1, 0.3, 1];

const Line = ({ children, delay = 0 }) => (
  <span className="block overflow-hidden pb-1">
    <motion.span
      className="block"
      initial={{ y: "115%" }}
      animate={{ y: 0 }}
      transition={{ duration: 1.1, delay, ease: EASE }}
    >
      {children}
    </motion.span>
  </span>
);

const Squiggle = () => (
  <svg viewBox="0 0 220 14" fill="none" className="mt-1 w-40 md:w-56" aria-hidden>
    <path
      d="M3 10 C 40 2, 70 12, 110 7 S 180 3, 217 8"
      stroke="#EBBABF"
      strokeWidth="3"
      strokeLinecap="round"
    />
  </svg>
);

export default function Hero() {
  const { scrollYProgress } = useScroll();
  const ySlow = useTransform(scrollYProgress, [0, 0.35], [0, -90]);
  const yFast = useTransform(scrollYProgress, [0, 0.35], [0, 110]);

  return (
    <section
      data-testid="hero-section"
      className="relative grid min-h-[92vh] grid-cols-1 items-center gap-12 px-6 pt-32 pb-16 md:pt-36 lg:grid-cols-12 lg:gap-8 mx-auto max-w-7xl"
    >
      <motion.div
        aria-hidden
        style={{ y: ySlow }}
        className="absolute -top-10 right-[8%] h-72 w-72 rounded-full bg-blush opacity-60 blur-3xl md:h-96 md:w-96"
      />
      <motion.div aria-hidden style={{ y: yFast }} className="absolute bottom-8 left-[40%] hidden lg:block">
        <Lily className="h-44 w-28 text-blushHover" />
      </motion.div>

      <div className="relative z-10 lg:col-span-8">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE }}
          className="mb-8 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.25em] text-inkFaint"
          data-testid="hero-eyebrow"
        >
          <span className="h-2 w-2 rounded-full bg-blushHover" />
          BravelilyStudios · Bengaluru
        </motion.p>

        <Sparkle className="absolute right-4 top-14 h-6 w-6 text-blushHover md:right-20" />
        <h1
          data-testid="hero-headline"
          className="font-display text-5xl font-medium leading-[0.98] tracking-tight md:text-7xl"
        >
          <Line delay={0.15}>Great fashion brands</Line>
          <Line delay={0.3}>aren&apos;t born trending.</Line>
          <Line delay={0.45}>
            <span className="inline-block italic text-ink">
              They&apos;re fed.
              <Squiggle />
            </span>
          </Line>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.75, ease: EASE }}
          className="mt-8 max-w-xl text-base leading-relaxed text-inkSoft md:text-lg"
          data-testid="hero-subhead"
        >
          I&apos;m Shreya — brand, marketing &amp; data consultant for fashion and lifestyle brands.
          The kind of consulting that comes from actually working inside them, not advising from the sidelines.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.9, ease: EASE }}
          className="mt-10 flex flex-wrap items-center gap-6"
        >
          <button
            data-testid="hero-cta-talk"
            onClick={() => scrollToId("#contact")}
            className="group flex items-center gap-2 rounded-full bg-blush px-7 py-3.5 text-sm font-semibold text-ink transition-colors hover:bg-blushHover"
          >
            Let&apos;s talk
            <ArrowRight size={16} strokeWidth={1.5} className="transition-transform group-hover:translate-x-1" />
          </button>
          <button
            data-testid="hero-cta-services"
            onClick={() => scrollToId("#services")}
            className="group flex items-center gap-2 text-sm font-semibold text-ink underline decoration-blushHover decoration-2 underline-offset-8 transition-colors hover:text-inkSoft"
          >
            See what I do
            <ArrowDown size={16} strokeWidth={1.5} className="transition-transform group-hover:translate-y-0.5" />
          </button>
          <span className="hidden items-center gap-2 md:flex" aria-hidden>
            <CurlyArrow className="h-9 w-14 -scale-x-100 text-blushHover" />
            <span className="font-display text-lg italic text-inkFaint">go on, say hi</span>
          </span>
        </motion.div>
      </div>

      <div className="relative hidden lg:col-span-4 lg:block" aria-hidden>
        <motion.svg
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.4, delay: 1 }}
          viewBox="0 0 320 420"
          fill="none"
          className="ml-auto w-full max-w-sm"
        >
          <path d="M60 400 V180 A100 100 0 0 1 260 180 V400" stroke="#EBBABF" strokeWidth="1.5" />
          <path d="M100 400 V210 A60 60 0 0 1 220 210 V400" stroke="#E8DFDF" strokeWidth="1.5" />
          <circle cx="160" cy="120" r="34" stroke="#EBBABF" strokeWidth="1.5" />
          <path d="M30 60 C 90 20, 150 90, 220 45 S 300 80, 315 40" stroke="#F7D6D9" strokeWidth="2" strokeLinecap="round" />
          <path d="M20 340 C 70 310, 120 360, 180 330 S 280 355, 305 320" stroke="#E8DFDF" strokeWidth="2" strokeLinecap="round" />
        </motion.svg>
      </div>
    </section>
  );
}
