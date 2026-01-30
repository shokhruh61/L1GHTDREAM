import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";

const navLinks = [
  { path: "/", label: "Home" },
  { path: "/music", label: "Music" },
  { path: "/shorts", label: "Videos" },
  { path: "/about", label: "About" },
  { path: "/favorites", label: "Favorites" },
];

function Navbar() {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (event) => {
    event.preventDefault();
    if (!query.trim()) return;
    navigate(`/search?q=${encodeURIComponent(query.trim())}`);
    setIsSearchOpen(false);
    setIsMobileOpen(false);
  };

  const activeClass = ({ isActive }) =>
    `text-sm font-semibold transition ${
      isActive ? "text-blue-600" : "text-gray-600 hover:text-gray-900"
    }`;

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b border-gray-200">
      <div className="container mx-auto px-4">
        <nav className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2 font-bold text-xl text-gray-900">
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

          <form
            onSubmit={handleSearch}
            className="hidden lg:flex items-center gap-2 bg-gray-100 px-3 py-2 rounded-full border border-gray-200"
          >
            <span className="text-gray-500">🔎</span>
            <input
              type="search"
              placeholder="Search music, videos..."
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              className="bg-transparent outline-none text-sm text-gray-700 w-56"
            />
          </form>

          <div className="flex items-center gap-3 lg:hidden">
            <button
              type="button"
              onClick={() => setIsSearchOpen(true)}
              className="p-2 rounded-full bg-gray-100"
              aria-label="Open search"
            >
              🔍
            </button>
            <button
              type="button"
              onClick={() => setIsMobileOpen((prev) => !prev)}
              className="p-2 rounded-full bg-gray-100"
              aria-label="Toggle menu"
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
                  `rounded-lg px-3 py-2 text-sm font-semibold ${
                    isActive ? "bg-blue-600 text-white" : "text-gray-700 hover:bg-gray-100"
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
              <h3 className="text-lg font-bold text-gray-900">Search</h3>
              <button type="button" onClick={() => setIsSearchOpen(false)}>
                ✖️
              </button>
            </div>
            <form onSubmit={handleSearch} className="flex flex-col gap-4">
              <input
                type="search"
                placeholder="Search music, videos..."
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-blue-600"
              />
              <button
                type="submit"
                className="bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition"
              >
                Search
              </button>
            </form>
            <p className="text-xs text-gray-500 mt-6">
              Try searching for artists, moods, or your saved favorites.
            </p>
          </div>
        </div>
      )}
    </header>
  );
}

export default Navbar;
