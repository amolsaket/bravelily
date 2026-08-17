import { useEffect } from "react";
import "@/App.css";
import { initLenis } from "@/lib/lenis";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import TickerMarquee from "@/components/TickerMarquee";
import About from "@/components/About";
import Services from "@/components/Services";
import Clients from "@/components/Clients";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

const NOISE_SVG = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.5'/%3E%3C/svg%3E")`;

function App() {
  useEffect(() => initLenis(), []);

  return (
    <div id="top" className="min-h-screen overflow-x-hidden bg-cream font-sans text-ink antialiased">
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-[60] opacity-[0.05] mix-blend-multiply"
        style={{ backgroundImage: NOISE_SVG }}
      />
      <Nav />
      <main>
        <Hero />
        <TickerMarquee />
        <About />
        <Services />
        <Clients />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;
