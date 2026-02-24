import { useState } from "react";
import { FaInstagram, FaTelegram, FaYoutube } from "react-icons/fa6";
import SectionHeading from "../components/ui/SectionHeading";
import { usePageMeta } from "../hooks/usePageMeta";

const socialLinks = [
  { href: "https://www.instagram.com/m1nor_official/", label: "Instagram", icon: FaInstagram },
  { href: "https://www.youtube.com/@M1noRFM", label: "YouTube", icon: FaYoutube },
  { href: "https://t.me/L1GHTDreaM", label: "Telegram", icon: FaTelegram },
];

export default function Contact() {
  usePageMeta("Contact", "Contact M1NOR FM and follow on social channels.");

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmitted(true);
  };

  return (
    <section className="grid gap-8 lg:grid-cols-[1.05fr_1fr]">
      <div>
        <SectionHeading
          eyebrow="Contact"
          title="Stay Connected"
          description="Reach out for collaborations, drops, and updates from M1NOR FM."
        />

        <div className="flex items-center gap-3">
          {socialLinks.map(({ href, label, icon: Icon }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noreferrer"
              className="grid h-11 w-11 place-items-center rounded-full border border-white/20 text-slate-200 transition hover:border-cyan-300/80 hover:text-cyan-200"
              aria-label={label}
            >
              <Icon />
            </a>
          ))}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="rounded-2xl border border-white/10 bg-slate-900/70 p-5">
        <div className="space-y-4">
          <label className="block text-sm text-slate-200">
            Name
            <input
              required
              type="text"
              className="mt-1 w-full rounded-xl border border-white/15 bg-slate-950/80 px-3 py-2 text-sm text-white placeholder:text-slate-500"
              placeholder="Your name"
            />
          </label>

          <label className="block text-sm text-slate-200">
            Email
            <input
              required
              type="email"
              className="mt-1 w-full rounded-xl border border-white/15 bg-slate-950/80 px-3 py-2 text-sm text-white placeholder:text-slate-500"
              placeholder="you@email.com"
            />
          </label>

          <label className="block text-sm text-slate-200">
            Message
            <textarea
              required
              rows="5"
              className="mt-1 w-full rounded-xl border border-white/15 bg-slate-950/80 px-3 py-2 text-sm text-white placeholder:text-slate-500"
              placeholder="Tell us what you need..."
            />
          </label>

          <button type="submit" className="w-full rounded-full bg-cyan-300 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-cyan-200">
            Send Message
          </button>

          {submitted && <p className="text-sm text-cyan-200">Message sent. We will reply soon.</p>}
        </div>
      </form>
    </section>
  );
}