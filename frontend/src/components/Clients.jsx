import Marquee from "react-fast-marquee";
import { Asterisk } from "lucide-react";
import { Reveal, GhostNumber } from "@/components/Reveal";

const IN_HOUSE = [
  "Kushals Fashion & Silver Jewellery",
  "Suta Bombay",
  "Mysore Saree Udyog",
  "Nalli Silk Sarees",
  "Yes!poho",
];

const CONSULTING = ["Shobitam", "Label By Anchal", "Raaj Raani", "The Organic Wisdom"];

export default function Clients() {
  return (
    <section id="clients" data-testid="clients-section" className="relative border-t border-line">
      <GhostNumber num="03" className="absolute -top-6 left-0 z-10 opacity-50 md:left-6" />

      <div className="border-b border-line bg-white py-16 md:py-20">
        <Reveal className="mx-auto mb-10 max-w-7xl px-6">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-inkFaint">
            Brand experience — teams I&apos;ve worked inside
          </p>
        </Reveal>
        <Marquee speed={30} pauseOnHover gradient={false} data-testid="inhouse-marquee">
          {IN_HOUSE.map((name) => (
            <span
              key={name}
              className="mx-12 flex items-center gap-24 font-display text-3xl italic text-ink md:text-4xl"
            >
              {name}
              <Asterisk size={24} strokeWidth={1} className="text-blushHover" />
            </span>
          ))}
        </Marquee>
      </div>

      <div className="bg-cream py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-6">
          <Reveal className="mb-12 md:mb-16">
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.25em] text-inkFaint">
              Consulting clients — brands I&apos;ve advised
            </p>
            <h2 className="max-w-2xl font-display text-4xl font-medium leading-none tracking-tight md:text-5xl" data-testid="consulting-heading">
              As Brand &amp; Marketing <span className="italic">Consultant</span>
            </h2>
          </Reveal>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4" data-testid="consulting-grid">
            {CONSULTING.map((name, i) => (
              <Reveal key={name} delay={i * 0.08} className="h-full">
                <div
                  data-testid={`consulting-client-${i}`}
                  className="flex h-full flex-col justify-between rounded-3xl border border-line bg-white p-8 transition-colors hover:border-blushHover"
                >
                  <span className="mb-8 h-2 w-2 rounded-full bg-blushHover" />
                  <div>
                    <h3 className="font-display text-2xl font-medium leading-tight md:text-3xl">{name}</h3>
                    <p className="mt-3 text-xs font-semibold uppercase tracking-widest text-inkFaint">
                      Consulting client
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
