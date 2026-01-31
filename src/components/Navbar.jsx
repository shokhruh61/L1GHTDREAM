import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";

const navLinks = [
  { path: "/", label: "Bosh sahifa" },
  { path: "/about", label: "Biz haqimizda" },
  { path: "/music", label: "Musiqa" },
  { path: "/shorts", label: "Videolar" },

];

function Navbar() {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (event) => {
    event.preventDefault();
    if (!query.trim()) return;
    navigate(`/qidiruv?q=${encodeURIComponent(query.trim())}`);
    setIsSearchOpen(false);
    setIsMobileOpen(false);
  };

  const activeClass = ({ isActive }) =>
    `text-sm font-semibold transition-all duration-200 cursor-pointer ${
      isActive
        ? "text-blue-600"
        : "text-gray-600 hover:text-gray-900 hover:scale-[1.02]"
    }`;

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b border-gray-200">
      <div className="container mx-auto px-4">
        <nav className="flex items-center justify-between h-16">
          <Link
            to="/"
            className="flex items-center gap-2 font-bold text-xl text-gray-900 cursor-pointer transition-all duration-200 hover:text-blue-600 active:scale-[0.98]"
          >
            <span className="text-2xl">🎵</span>
            M1NOR FM
          </Link>

          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <NavLink key={link.path} to={link.path} className={activeClass}>
                {link.label}
              </NavLink>
            ))}
          </div>


          <div className="flex items-center gap-3 lg:hidden">
            <button
              type="button"
              onClick={() => setIsSearchOpen(true)}
              className="p-2 rounded-full bg-gray-100 cursor-pointer transition-all duration-200 hover:bg-gray-200 active:scale-[0.98]"
              aria-label="Qidiruvni ochish"
            >
              🔍
            </button>
            <button
              type="button"
              onClick={() => setIsMobileOpen((prev) => !prev)}
              className="p-2 rounded-full bg-gray-100 cursor-pointer transition-all duration-200 hover:bg-gray-200 active:scale-[0.98]"
              aria-label="Menyuni ochish"
            >
              {isMobileOpen ? "✖️" : "☰"}
            </button>
          </div>
        </nav>
      </div>

      {isMobileOpen && (
        <div className="lg:hidden border-t border-gray-200 bg-white">
          <div className="container mx-auto px-4 py-4 flex flex-col gap-3">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                onClick={() => setIsMobileOpen(false)}
                className={({ isActive }) =>
                  `rounded-lg px-3 py-2 text-sm font-semibold cursor-pointer transition-all duration-200 active:scale-[0.98] ${
                    isActive
                      ? "bg-blue-600 text-white"
                      : "text-gray-700 hover:bg-gray-100 hover:scale-[1.02]"
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </div>
        </div>
      )}

      {isSearchOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/40 z-50"
          onClick={() => setIsSearchOpen(false)}
        >
          <div
            className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-xl p-6"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-gray-900">Qidiruv</h3>
              <button
                type="button"
                onClick={() => setIsSearchOpen(false)}
                className="cursor-pointer transition-all duration-200 hover:opacity-70 active:scale-[0.98]"
              >
                ✖️
              </button>
            </div>
            <form onSubmit={handleSearch} className="flex flex-col gap-4">
              <input
                type="search"
                placeholder="Musiqa yoki video qidiring..."
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-blue-600"
              />
              <button
                type="submit"
                className="bg-blue-600 text-white font-semibold py-3 rounded-lg cursor-pointer transition-all duration-200 hover:bg-blue-700 hover:scale-[1.02] active:scale-[0.98]"
              >
                Qidirish
              </button>
            </form>
            <p className="text-xs text-gray-500 mt-6">
              Ijrochi, kayfiyat yoki sevimlilar orqali qidiring.
            </p>
          </div>
        </div>
      )}
    </header>
  );
}

export default Navbar;
