import { useState } from "react";
import axios from "axios";
import { Mail, MapPin, Linkedin, Loader2, PartyPopper, ArrowRight } from "lucide-react";
import { CurlyArrow, Lily } from "@/components/Doodles";
import { Reveal, GhostNumber } from "@/components/Reveal";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

const SERVICES = [
  "Brand Marketing",
  "Ads",
  "PR",
  "Organic Marketing",
  "Social Media",
  "Retention Marketing",
  "Customer Upsell & Cross-sell Models",
  "Next Best Product",
  "Customer Segmentation",
  "Product Affinity Modeling",
  "Uplift Modelling",
  "Demand Forecasting (Time Series)",
  "Not sure yet",
];

const INITIAL = { name: "", email: "", phone: "", company: "", service: "", message: "" };

const inputCls =
  "rounded-xl border-line bg-cream px-4 py-3 text-sm shadow-none focus-visible:ring-1 focus-visible:ring-ink focus-visible:ring-offset-0";

export default function Contact() {
  const [form, setForm] = useState(INITIAL);
  const [status, setStatus] = useState("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    setStatus("sending");
    setErrorMsg("");
    try {
      await axios.post(`${API}/contact`, form);
      setStatus("success");
    } catch (err) {
      const detail = err.response?.data?.detail;
      setErrorMsg(typeof detail === "string" ? detail : "Something went wrong on our side.");
      setStatus("error");
    }
  };

  return (
    <section id="contact" data-testid="contact-section" className="relative border-t border-line bg-blushSubtle py-24 md:py-32">
      <GhostNumber num="04" className="absolute -top-8 right-0 opacity-60 md:right-6" />
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-16 px-6 lg:grid-cols-2">
        <div>
          <Reveal>
            <p className="mb-4 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.25em] text-inkFaint">
              Say hello
              <Lily className="h-5 w-3 text-blushHover" />
            </p>
            <h2 className="font-display text-4xl font-medium leading-none tracking-tight md:text-6xl" data-testid="contact-heading">
              Tell me about <span className="italic">your brand</span>.
            </h2>
            <p className="mt-6 max-w-md text-base leading-relaxed text-inkSoft md:text-lg">
              Rebrand, launch, retention leak, or a data problem you can&apos;t quite name —
              I&apos;ve probably seen it before. Write to me, and let&apos;s figure it out over (virtual) coffee.
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="mt-10 flex flex-col gap-5 text-sm text-inkSoft">
              <a
                data-testid="contact-email-link"
                href="mailto:imshreyasrivastava@gmail.com"
                className="flex items-center gap-3 transition-colors hover:text-ink"
              >
                <Mail size={16} strokeWidth={1} className="text-blushHover" />
                imshreyasrivastava@gmail.com
              </a>
              <span className="flex items-center gap-3">
                <MapPin size={16} strokeWidth={1} className="text-blushHover" />
                Bengaluru, India
              </span>
              <span className="mt-2 flex items-center gap-4">
                <a
                  data-testid="contact-linkedin-link"
                  href="https://www.linkedin.com/in/shreyasrivastava16/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-line bg-white transition-colors hover:border-blushHover"
                >
                  <Linkedin size={16} strokeWidth={1} />
                </a>
              </span>
              <span className="mt-6 hidden items-center gap-3 lg:flex" aria-hidden>
                <span className="font-display text-lg italic text-inkFaint">this lands straight in my inbox</span>
                <CurlyArrow className="h-12 w-20 text-blushHover" />
              </span>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <div className="rounded-3xl border border-line bg-white p-8 md:p-10">
            {status === "success" ? (
              <div className="flex min-h-[420px] flex-col items-center justify-center text-center" data-testid="contact-success-message">
                <span className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-blush">
                  <PartyPopper size={26} strokeWidth={1} />
                </span>
                <h3 className="font-display text-3xl font-medium italic">Got it — thank you!</h3>
                <p className="mt-4 max-w-sm text-sm leading-relaxed text-inkSoft md:text-base">
                  I&apos;ll get back to you within 1–2 days. Meanwhile, the coffee&apos;s on me (metaphorically).
                </p>
                <button
                  data-testid="contact-send-another-btn"
                  onClick={() => {
                    setForm(INITIAL);
                    setStatus("idle");
                  }}
                  className="group mt-8 flex items-center gap-2 text-sm font-semibold underline decoration-blushHover decoration-2 underline-offset-8"
                >
                  Send another message
                  <ArrowRight size={14} strokeWidth={1.5} className="transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            ) : (
              <form onSubmit={submit} className="flex flex-col gap-6" data-testid="contact-form">
                <div className="grid gap-6 sm:grid-cols-2">
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="contact-name" className="text-xs font-semibold uppercase tracking-widest text-inkFaint">
                      Name *
                    </Label>
                    <Input id="contact-name" data-testid="contact-name-input" required value={form.name} onChange={set("name")} placeholder="Jane Doe" className={inputCls} />
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="contact-email" className="text-xs font-semibold uppercase tracking-widest text-inkFaint">
                      Email *
                    </Label>
                    <Input id="contact-email" data-testid="contact-email-input" type="email" required value={form.email} onChange={set("email")} placeholder="jane@brand.com" className={inputCls} />
                  </div>
                </div>
                <div className="grid gap-6 sm:grid-cols-2">
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="contact-phone" className="text-xs font-semibold uppercase tracking-widest text-inkFaint">
                      Phone
                    </Label>
                    <Input id="contact-phone" data-testid="contact-phone-input" value={form.phone} onChange={set("phone")} placeholder="+91 98765 43210" className={inputCls} />
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="contact-company" className="text-xs font-semibold uppercase tracking-widest text-inkFaint">
                      Company / Brand
                    </Label>
                    <Input id="contact-company" data-testid="contact-company-input" value={form.company} onChange={set("company")} placeholder="ABC Fashion Co." className={inputCls} />
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <Label className="text-xs font-semibold uppercase tracking-widest text-inkFaint">
                    Service you&apos;re interested in
                  </Label>
                  <Select value={form.service} onValueChange={(v) => setForm((f) => ({ ...f, service: v }))}>
                    <SelectTrigger data-testid="contact-service-select" className={`${inputCls} bg-white`}>
                      <SelectValue placeholder="Pick one — or say you're not sure yet" />
                    </SelectTrigger>
                    <SelectContent className="border-line bg-white">
                      {SERVICES.map((s) => (
                        <SelectItem key={s} value={s} data-testid={`contact-service-option-${s.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}>
                          {s}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex flex-col gap-2">
                  <Label htmlFor="contact-message" className="text-xs font-semibold uppercase tracking-widest text-inkFaint">
                    Message *
                  </Label>
                  <Textarea
                    id="contact-message"
                    data-testid="contact-message-input"
                    required
                    rows={4}
                    value={form.message}
                    onChange={set("message")}
                    placeholder="Tell me where your brand is, and where you want it to go."
                    className={`${inputCls} resize-none`}
                  />
                </div>

                {status === "error" && (
                  <p data-testid="contact-error-message" className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                    Hmm, that didn&apos;t go through. {errorMsg} Try again — or email me directly.
                  </p>
                )}

                <button
                  data-testid="contact-submit-button"
                  type="submit"
                  disabled={status === "sending"}
                  className="group mt-2 flex w-fit items-center gap-2 rounded-full bg-blush px-8 py-3.5 text-sm font-semibold text-ink transition-colors hover:bg-blushHover disabled:opacity-60"
                >
                  {status === "sending" ? (
                    <>
                      Sending
                      <Loader2 size={16} strokeWidth={1.5} className="animate-spin" />
                    </>
                  ) : (
                    <>
                      Send it over
                      <ArrowRight size={16} strokeWidth={1.5} className="transition-transform group-hover:translate-x-1" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
