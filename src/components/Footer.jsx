import React from "react";
import { Link } from "react-router-dom";
import {
  FaInstagram,
  FaTelegram,
  FaYoutube,
  FaMapMarker,
} from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";

import { IoIosCall } from "react-icons/io";

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
              <span className="text-3xl">Musiqa</span>
              M1NOR FM
            </div>
            <p className="text-gray-400 mt-4 leading-relaxed">
              Musiqa, video va rasmlarni bir joyda jamlagan platforma.
            </p>
            <div className="flex gap-3 mt-4 text-xl ">
              <Link to={"https://www.instagram.com/m1nor_official/"}>
                <FaInstagram
                  style={{ width: "50px", height: "50px" }}
                  className=" p-2 rounded-full"
                  aria-label="Instagram"
                />
              </Link>
              <Link to={"https://t.me/L1GHTDreaM"}>
                <FaTelegram
                  style={{ width: "50px", height: "50px", color: "blue" }}
                  className=" p-2 rounded-full"
                  aria-label="Telegram"
                />
              </Link>
              <Link to={"https://www.youtube.com/@M1noRFM"}>
                <FaYoutube
                  style={{ width: "50px", height: "50px", color: "red" }}
                  className=" p-2 rounded-full"
                  aria-label="YouTube"
                />
              </Link>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4">Tezkor havolalar</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-gray-400 hover:text-white transition-colors"
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
                <span>
                  <FaMapMarker className="text-xl" />
                </span>
                Farg'ona, O'zbekiston
              </li>
              <li className="flex items-center gap-2">
                <span>
                  <MdOutlineEmail className="text-xl" />
                </span>
                m1nor.l1ghtdream@gmail.com
              </li>
              <li className="flex items-center gap-2">
                <IoIosCall className="text-xl" />
                <span>I don't know!</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-800 py-6">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4 text-gray-500 text-sm">
          <p>
            (c) {new Date().getFullYear()} M1NOR FM. Barcha huquqlar
            himoyalangan.
          </p>
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
