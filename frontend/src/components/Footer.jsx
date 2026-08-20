import { Linkedin, Mail } from "lucide-react";
import { Lily } from "@/components/Doodles";
import { scrollToId } from "@/lib/lenis";

export default function Footer() {
  return (
    <footer data-testid="footer" className="border-t border-line bg-cream py-16">
      <div className="mx-auto flex max-w-7xl flex-col gap-10 px-6 md:flex-row md:items-end md:justify-between">
        <div>
          <span className="flex items-end gap-4">
            <Lily className="h-16 w-10 shrink-0 text-blushHover" />
            <p className="font-display text-4xl font-semibold italic tracking-tight md:text-5xl">BravelilyStudios</p>
          </span>
          <p className="mt-3 max-w-sm text-sm leading-relaxed text-inkSoft">
            Brand, marketing &amp; data consulting for fashion and lifestyle brands. Bengaluru, India.
          </p>
          <p className="mt-2 text-xs font-semibold uppercase tracking-[0.25em] text-inkFaint">
            A Feeding Trends product
          </p>
          <div className="mt-6 flex items-center gap-4">
            <a
              data-testid="footer-linkedin-link"
              href="https://www.linkedin.com/in/shreyasrivastava16/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-line bg-white transition-colors hover:border-blushHover"
            >
              <Linkedin size={16} strokeWidth={1} />
            </a>
            <a
              data-testid="footer-email-link"
              href="mailto:imshreyasrivastava@gmail.com"
              aria-label="Email"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-line bg-white transition-colors hover:border-blushHover"
            >
              <Mail size={16} strokeWidth={1} />
            </a>
          </div>
        </div>
        <div className="flex flex-col gap-3 text-sm text-inkSoft md:items-end">
          {[
            { label: "About", href: "#about" },
            { label: "Services", href: "#services" },
            { label: "Clients", href: "#clients" },
            { label: "Contact", href: "#contact" },
          ].map((l) => (
            <button
              key={l.href}
              data-testid={`footer-link-${l.label.toLowerCase()}`}
              onClick={() => scrollToId(l.href)}
              className="w-fit transition-colors hover:text-ink"
            >
              {l.label}
            </button>
          ))}
        </div>
      </div>
      <div className="mx-auto mt-12 flex max-w-7xl flex-col gap-2 border-t border-line px-6 pt-6 text-xs text-inkFaint md:flex-row md:justify-between">
        <span>© 2026 BravelilyStudios · A Feeding Trends product. All rights reserved.</span>
        <span className="font-display italic">Made with taste, in Bengaluru.</span>
      </div>
    </footer>
  );
}
