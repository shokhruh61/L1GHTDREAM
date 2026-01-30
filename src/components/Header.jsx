import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { MdClose, MdMenu, MdSearch } from "react-icons/md";

function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const location = useLocation();

  const navItems = [
    { path: "/", label: "Bosh sahifa" },
    { path: "/music", label: "Musiqa" },
    { path: "/shorts", label: "Videolar" },
    { path: "/pictures", label: "Rasmlar" },
    { path: "/about", label: "Biz haqimizda" },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <header className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4">
        {/* Top Navigation */}
        <nav className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center gap-2 font-bold text-2xl text-gray-900 hover:text-blue-600 transition-colors"
          >
            <span className="text-3xl">🎵</span>
            M1NOR FM
          </Link>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-4 lg:hidden">
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <MdSearch className="text-2xl text-gray-900" />
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              {isOpen ? (
                <MdClose className="text-2xl text-gray-900" />
              ) : (
                <MdMenu className="text-2xl text-gray-900" />
              )}
            </button>
          </div>
        </nav>

        
        <div className="hidden lg:flex items-center justify-between border-t border-gray-200 h-16">
          <div className="flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`text-sm font-medium pb-4 border-b-2 transition-all ${
                  isActive(item.path)
                    ? "border-blue-600 text-blue-600"
                    : "border-transparent text-gray-700 hover:text-gray-900"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>
          <button
            onClick={() => setSearchOpen(!searchOpen)}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <MdSearch className="text-2xl text-gray-900" />
          </button>
        </div>
      </div>

      {/* Search Bar - Desktop */}
      {searchOpen && (
        <div className="border-t border-gray-200 bg-gray-50 py-4 px-4">
          <div className="container mx-auto">
            <input
              type="text"
              placeholder="Qidirish..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  console.log("Search:", searchQuery);
                  setSearchOpen(false);
                }
              }}
              className="w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:border-blue-600"
              autoFocus
            />
          </div>
        </div>
      )}

      {/* Mobile Categories Navigation */}
      {isOpen && (
        <div className="lg:hidden border-t border-gray-200 bg-gray-50 py-4 px-4 space-y-2">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setIsOpen(false)}
              className={`block px-4 py-2 rounded-lg transition-all text-sm font-medium ${
                isActive(item.path)
                  ? "bg-blue-600 text-white"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}

      {/* Mobile Search Bar */}
      {searchOpen && (
        <div className="lg:hidden border-t border-gray-200 bg-gray-50 py-3 px-4">
          <input
            type="text"
            placeholder="Qidirish..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:border-blue-600 text-sm"
            autoFocus
          />
        </div>
      )}
    </header>
  );
}

export default Header;
