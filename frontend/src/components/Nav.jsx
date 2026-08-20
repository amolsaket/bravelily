import { useState } from "react";
import { Menu, X } from "lucide-react";
import { scrollToId } from "@/lib/lenis";

const LINKS = [
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Clients", href: "#clients" },
  { label: "Contact", href: "#contact" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);
  const go = (href) => {
    setOpen(false);
    scrollToId(href);
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-line bg-cream/80 backdrop-blur-md">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <button
          data-testid="nav-logo"
          onClick={() => go("#top")}
          className="font-display text-2xl font-semibold italic tracking-tight"
        >
          Bravelily Studios
        </button>
        <div className="hidden items-center gap-8 md:flex">
          {LINKS.map((l) => (
            <button
              key={l.href}
              data-testid={`nav-link-${l.label.toLowerCase()}`}
              onClick={() => go(l.href)}
              className="text-sm font-medium text-inkSoft transition-colors hover:text-ink"
            >
              {l.label}
            </button>
          ))}
          <button
            data-testid="nav-book-consult-btn"
            onClick={() => go("#contact")}
            className="rounded-full bg-blush px-5 py-2.5 text-sm font-semibold text-ink transition-colors hover:bg-blushHover"
          >
            Book a consult
          </button>
        </div>
        <button
          data-testid="nav-menu-toggle"
          aria-label="Toggle menu"
          className="text-ink md:hidden"
          onClick={() => setOpen(!open)}
        >
          {open ? <X strokeWidth={1.5} /> : <Menu strokeWidth={1.5} />}
        </button>
      </nav>
      {open && (
        <div className="border-t border-line bg-cream px-6 py-6 md:hidden" data-testid="nav-mobile-menu">
          <div className="flex flex-col gap-5">
            {LINKS.map((l) => (
              <button
                key={l.href}
                data-testid={`nav-mobile-link-${l.label.toLowerCase()}`}
                onClick={() => go(l.href)}
                className="text-left font-display text-2xl italic"
              >
                {l.label}
              </button>
            ))}
            <button
              data-testid="nav-mobile-book-consult-btn"
              onClick={() => go("#contact")}
              className="mt-2 w-fit rounded-full bg-blush px-6 py-3 text-sm font-semibold transition-colors hover:bg-blushHover"
            >
              Book a consult
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
