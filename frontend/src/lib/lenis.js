import Lenis from "lenis";

let lenis = null;

export function initLenis() {
  lenis = new Lenis({ lerp: 0.09, smoothWheel: true });
  let rafId;
  const raf = (time) => {
    lenis.raf(time);
    rafId = requestAnimationFrame(raf);
  };
  rafId = requestAnimationFrame(raf);
  return () => {
    cancelAnimationFrame(rafId);
    lenis.destroy();
    lenis = null;
  };
}

export function scrollToId(selector) {
  const el = document.querySelector(selector);
  if (!el) return;
  if (lenis) {
    lenis.scrollTo(el, { offset: -72, duration: 1.4 });
  } else {
    el.scrollIntoView({ behavior: "smooth" });
  }
}
