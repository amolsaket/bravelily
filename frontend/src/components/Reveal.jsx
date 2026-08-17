import { motion } from "framer-motion";

const EASE = [0.16, 1, 0.3, 1];

export const Reveal = ({ children, delay = 0, className = "" }) => (
  <motion.div
    className={className}
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 0.9, delay, ease: EASE }}
  >
    {children}
  </motion.div>
);

export const SectionHead = ({ eyebrow, title, testId }) => (
  <Reveal className="mb-14 md:mb-20">
    <p className="mb-4 text-xs font-semibold uppercase tracking-[0.25em] text-inkFaint">{eyebrow}</p>
    <h2
      data-testid={testId}
      className="max-w-3xl font-display text-4xl font-medium leading-none tracking-tight md:text-5xl lg:text-6xl"
    >
      {title}
    </h2>
  </Reveal>
);

export const GhostNumber = ({ num, className = "" }) => (
  <span
    aria-hidden
    className={`pointer-events-none select-none font-display text-[8rem] font-light leading-none text-blush md:text-[12rem] ${className}`}
  >
    {num}
  </span>
);
