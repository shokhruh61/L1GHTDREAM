import { FaInstagram, FaTelegram, FaXTwitter, FaYoutube } from "react-icons/fa6";

const social = [
  { href: "https://www.instagram.com/m1nor_official/", label: "Instagram", icon: FaInstagram },
  { href: "https://www.youtube.com/@M1noRFM", label: "YouTube", icon: FaYoutube },
  { href: "https://t.me/L1GHTDreaM", label: "Telegram", icon: FaTelegram },
  { href: "https://x.com", label: "X", icon: FaXTwitter },
];

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-slate-950">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 py-10 sm:px-6 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-lg font-semibold tracking-[0.16em] text-white">M1NOR FM</p>
          <p className="mt-2 max-w-md text-sm text-slate-400">
            Music, videos, and short-form culture for the next generation.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {social.map(({ href, label, icon: Icon }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noreferrer"
              aria-label={label}
              className="grid h-10 w-10 place-items-center rounded-full border border-white/20 text-slate-300 transition hover:border-cyan-300/80 hover:text-cyan-200"
            >
              <Icon />
            </a>
          ))}
        </div>
      </div>

      <div className="border-t border-white/10 py-4 text-center text-xs text-slate-500">
        © {new Date().getFullYear()} M1NOR FM. All rights reserved.
      </div>
    </footer>
  );
}