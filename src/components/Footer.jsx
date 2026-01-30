import React from "react";
import { Link } from "react-router-dom";

const quickLinks = [
  { path: "/", label: "Bosh sahifa" },
  { path: "/music", label: "Musiqa" },
  { path: "/shorts", label: "Qisqa videolar" },
  { path: "/pictures", label: "Rasmlar" },
  { path: "/about", label: "Biz haqimizda" },
];

function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-100">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            <div className="flex items-center gap-2 text-2xl font-bold">
              <span className="text-3xl">🎵</span>
              M1NOR FM
            </div>
            <p className="text-gray-400 mt-4 leading-relaxed">
              Musiqa, video va rasmlarni bir joyda jamlagan platforma. Eng yangi
              kontentni kashf qiling va kuningizni ilhom bilan toʻldiring.
            </p>
            <div className="flex gap-3 mt-4 text-xl">
              <span className="bg-gray-800 p-2 rounded-full" aria-label="Instagram">
                📸
              </span>
              <span className="bg-gray-800 p-2 rounded-full" aria-label="Telegram">
                💬
              </span>
              <span className="bg-gray-800 p-2 rounded-full" aria-label="YouTube">
                ▶️
              </span>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4">Tezkor havolalar</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-gray-400 hover:text-white transition-colors cursor-pointer"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4">Aloqa</h3>
            <ul className="space-y-3 text-gray-400">
              <li className="flex items-center gap-2">
                <span>📍</span>
                Toshkent, Oʻzbekiston
              </li>
              <li className="flex items-center gap-2">
                <span>📧</span>
                info@m1norfm.uz
              </li>
              <li className="flex items-center gap-2">
                <span>📞</span>
                +998 (90) 123-45-67
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4">Yangiliklardan xabardor bo‘ling</h3>
            <p className="text-gray-400 mb-4">
              Haftalik yangiliklar va yangi kontent haqida bildirishnomalar oling.
            </p>
            <form className="flex flex-col gap-3">
              <input
                type="email"
                placeholder="Email manzilingiz"
                className="px-4 py-3 rounded-lg bg-gray-800 text-gray-100 border border-gray-700 focus:outline-none focus:border-blue-500"
              />
              <button
                type="button"
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-all duration-200 cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
              >
                Obuna bo‘lish
              </button>
            </form>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-800 py-6">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4 text-gray-500 text-sm">
          <p>© {new Date().getFullYear()} M1NOR FM. Barcha huquqlar himoyalangan.</p>
          <div className="flex gap-4">
            <span>Maxfiylik siyosati</span>
            <span>Foydalanish shartlari</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
