import Marquee from "react-fast-marquee";
import { Asterisk } from "lucide-react";

const ITEMS = [
  "Brand Strategy",
  "Performance Ads",
  "PR & Press",
  "Social Media",
  "SEO & Content",
  "Retention & CRM",
  "ML Models",
  "Customer Segmentation",
];

export default function TickerMarquee() {
  return (
    <section data-testid="ticker-marquee" className="border-y border-line bg-white py-6" aria-hidden>
      <Marquee speed={30} pauseOnHover gradient={false}>
        {ITEMS.map((item) => (
          <span
            key={item}
            className="mx-10 flex items-center gap-20 font-display text-2xl italic text-inkSoft md:text-3xl"
          >
            {item}
            <Asterisk size={22} strokeWidth={1} className="text-blushHover" />
          </span>
        ))}
      </Marquee>
    </section>
  );
}
