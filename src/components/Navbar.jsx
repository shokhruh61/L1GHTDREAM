import { NavLink } from "react-router-dom";

const links = [
  { to: "/", label: "Home" },
  { to: "/music", label: "Music" },
  { to: "/videos", label: "Videos" },
  { to: "/shorts", label: "Shorts" },
  { to: "/pictures", label: "Pictures" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
];

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/85 backdrop-blur-xl">
      <nav className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-4 sm:px-6">
        <NavLink to="/" className="text-lg font-bold tracking-[0.2em] text-white">
          M1NOR FM
        </NavLink>

        <div className="hidden items-center gap-2 md:flex">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `rounded-full px-4 py-1.5 text-sm transition ${
                  isActive
                    ? "bg-cyan-400/20 text-cyan-200"
                    : "text-slate-300 hover:bg-white/10 hover:text-white"
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </div>

        <NavLink
          to="/music"
          className="rounded-full border border-cyan-300/50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-cyan-200 transition hover:bg-cyan-300/10"
        >
          Play Now
        </NavLink>
      </nav>

      <div className="mx-auto flex max-w-7xl items-center gap-2 overflow-x-auto px-4 pb-3 md:hidden sm:px-6">
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) =>
              `shrink-0 rounded-full px-3 py-1 text-xs transition ${
                isActive ? "bg-cyan-300/20 text-cyan-100" : "bg-white/5 text-slate-300"
              }`
            }
          >
            {link.label}
          </NavLink>
        ))}
      </div>
    </header>
  );
}
