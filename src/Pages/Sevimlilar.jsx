import React from "react";
import { Link } from "react-router-dom";
import { usePlayer } from "../context/PlayerContext";

function Sevimlilar() {
  const { favorites, toggleFavorite } = usePlayer();

  return (
    <div className="min-h-screen bg-white">
      <div className="bg-gray-100 text-gray-900 py-12 border-b border-gray-200">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-2">❤️ Sevimlilar</h1>
          <p className="text-gray-600">
            Saqlangan trek va videolaringiz shu yerda. Xohlagan payt o‘chirishingiz yoki qayta ochishingiz mumkin.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-10">
        {favorites.length === 0 ? (
          <div className="bg-gray-50 border border-dashed border-gray-300 rounded-2xl p-10 text-center">
            <div className="text-5xl mb-4">✨</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Sevimlilarda hozircha hech narsa yo‘q
            </h2>
            <p className="text-gray-600 mb-6">
              Kontentni ko‘rib chiqing va yurakcha orqali to‘plam yarating.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                to="/music"
                className="bg-blue-600 text-white font-semibold px-6 py-3 rounded-lg cursor-pointer transition-all duration-200 hover:bg-blue-700 hover:scale-[1.02] active:scale-[0.98]"
              >
                Musiqalarni ko‘rish
              </Link>
              <Link
                to="/shorts"
                className="bg-gray-900 text-white font-semibold px-6 py-3 rounded-lg cursor-pointer transition-all duration-200 hover:bg-black hover:scale-[1.02] active:scale-[0.98]"
              >
                Videolarni ko‘rish
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {favorites.map((item) => (
              <div
                key={`${item.type}-${item.id}`}
                className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm transition-all duration-200 hover:shadow-lg hover:scale-[1.02]"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={item.thumbnail}
                    alt={item.title}
                    className="w-16 h-16 rounded-xl object-cover border border-gray-200"
                    loading="lazy"
                  />
                  <div className="flex-1">
                    <p className="text-sm text-gray-500 uppercase">
                      {item.type === "video" ? "Video" : "Trek"}
                    </p>
                    <h3 className="text-lg font-semibold text-gray-900">{item.title}</h3>
                    <p className="text-sm text-gray-600">{item.subtitle}</p>
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-between">
                  <span className="text-xs text-gray-500">{item.meta}</span>
                  <button
                    onClick={() => toggleFavorite(item)}
                    className="text-sm font-semibold text-red-600 cursor-pointer transition-all duration-200 hover:text-red-700 active:scale-[0.98]"
                  >
                    Olib tashlash
                  </button>
                </div>

                {item.link && (
                  <Link
                    to={item.link}
                    className="mt-4 inline-block text-sm font-semibold text-blue-600 cursor-pointer transition-all duration-200 hover:text-blue-700 active:scale-[0.98]"
                  >
                    Ochish
                  </Link>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Sevimlilar;
