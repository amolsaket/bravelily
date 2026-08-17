import { Reveal, GhostNumber } from "@/components/Reveal";

const CHIPS = ["6+ years in-house", "Fashion Design × Sociology", "Bengaluru, India"];

export default function About() {
  return (
    <section id="about" data-testid="about-section" className="relative border-b border-line py-24 md:py-32">
      <GhostNumber num="01" className="absolute -top-8 left-0 opacity-50 md:left-6" />
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-6 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-3">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-inkFaint">The founder</p>
          </Reveal>
        </div>
        <div className="lg:col-span-8 lg:col-start-4">
          <Reveal>
            <p className="font-display text-2xl leading-relaxed md:text-3xl" data-testid="about-para-1">
              I&apos;m <span className="italic">Shreya Srivastava</span>. For 6+ years I&apos;ve worked inside
              fashion and lifestyle brands, building the campaigns, content, and growth strategy that most
              consultants only advise on from the outside. I was the one accountable for the numbers.
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="mt-8 font-display text-2xl leading-relaxed text-inkSoft md:text-3xl" data-testid="about-para-2">
              My background is a bit of a cocktail — a Fashion Design &amp; Garment Technology diploma,
              a Sociology degree, and years of hands-on brand marketing. Design sense, consumer psychology,
              and performance-marketing rigor, all in one brain.
            </p>
          </Reveal>
          <Reveal delay={0.25}>
            <div className="mt-12 flex flex-wrap gap-3">
              {CHIPS.map((chip) => (
                <span
                  key={chip}
                  className="rounded-full border border-line bg-white px-5 py-2 text-xs font-semibold uppercase tracking-widest text-inkSoft"
                >
                  {chip}
                </span>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
