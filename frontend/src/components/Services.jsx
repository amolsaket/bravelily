import { ArrowUpRight, TrendingUp, Compass, Users, Layers } from "lucide-react";
import { Reveal, SectionHead, GhostNumber } from "@/components/Reveal";

const MARKETING = [
  { name: "Brand Marketing", desc: "Positioning, brand voice, and campaign strategy — what you stand for, and why anyone should care." },
  { name: "Ads", desc: "Paid campaigns across Meta, Google & beyond that spend smart and sell hard." },
  { name: "PR", desc: "Press, partnerships, and storytelling that gets your brand talked about." },
  { name: "Organic Marketing", desc: "SEO and content that keep bringing customers long after the ad budget sleeps." },
  { name: "Social Media", desc: "Platform strategy, content calendars, and a community that actually talks back." },
  { name: "Retention Marketing", desc: "Email, WhatsApp & CRM that turn one-time buyers into regulars." },
];

const DATA_ML = [
  { name: "Upsell & Cross-sell Models", desc: "A model that tells you which customer to nudge, with what product, and when.", Icon: TrendingUp },
  { name: "Next Best Product", desc: "Recommendations that know what your customer wants next — before they do.", Icon: Compass },
  { name: "Customer Segmentation", desc: "Your customers, sorted by how they actually behave — so every offer feels personal.", Icon: Users },
  { name: "Product Affinity Modeling", desc: "See which products naturally belong together. Smarter bundles, smarter shelves.", Icon: Layers },
];

export default function Services() {
  return (
    <section id="services" data-testid="services-section" className="relative py-24 md:py-32">
      <GhostNumber num="02" className="absolute -top-8 right-0 opacity-50 md:right-6" />
      <div className="mx-auto max-w-7xl px-6">
        <SectionHead
          eyebrow="What I do"
          title={<>Two toolkits. One goal: a brand people <span className="italic">remember</span>.</>}
          testId="services-heading"
        />

        <Reveal>
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.25em] text-inkFaint">
            01 · Marketing &amp; Brand
          </p>
        </Reveal>
        <div data-testid="marketing-services-list">
          {MARKETING.map((s, i) => (
            <Reveal key={s.name} delay={i * 0.05}>
              <div
                data-testid={`marketing-service-${i}`}
                className="group -mx-2 flex items-center justify-between gap-6 rounded-2xl border-b border-line px-4 py-7 transition-colors hover:bg-blushSubtle md:-mx-4 md:px-6"
              >
                <div className="flex items-baseline gap-5">
                  <span className="text-xs font-semibold text-inkFaint">0{i + 1}</span>
                  <div>
                    <h3 className="font-display text-2xl font-medium md:text-3xl">{s.name}</h3>
                    <p className="mt-1 max-w-xl text-sm leading-relaxed text-inkSoft md:text-base">{s.desc}</p>
                  </div>
                </div>
                <ArrowUpRight
                  size={26}
                  strokeWidth={1}
                  className="shrink-0 text-blushHover opacity-0 transition-opacity group-hover:opacity-100"
                />
              </div>
            </Reveal>
          ))}
        </div>

        <div className="mt-24 md:mt-32">
          <Reveal>
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.25em] text-inkFaint">
              02 · Data &amp; ML — in plain English
            </p>
            <p className="mb-10 max-w-xl text-base text-inkSoft md:text-lg" data-testid="data-services-intro">
              No jargon, no black boxes. Just models that tell you who to nudge, with what, and when.
            </p>
          </Reveal>
          <div className="grid gap-4 md:grid-cols-2" data-testid="data-services-grid">
            {DATA_ML.map((s, i) => (
              <Reveal key={s.name} delay={i * 0.08} className="h-full">
                <div
                  data-testid={`data-service-${i}`}
                  className="group h-full rounded-3xl border border-line bg-cardData p-8 transition-colors hover:border-blushHover md:p-10"
                >
                  <span className="mb-6 flex h-12 w-12 items-center justify-center rounded-full bg-blush transition-colors group-hover:bg-blushHover">
                    <s.Icon size={20} strokeWidth={1} />
                  </span>
                  <h3 className="font-display text-2xl font-medium md:text-3xl">{s.name}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-inkSoft md:text-base">{s.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
