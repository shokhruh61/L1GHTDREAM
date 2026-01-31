import { useCallback, useEffect, useRef, useState } from "react";
import { fetchShortVideos, getErrorMessage } from "../lib/youtube";
import { usePlayer } from "../context/PlayerContext";

export default function Shorts() {
  const [shorts, setShorts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedShort, setSelectedShort] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [isShortPlaying, setIsShortPlaying] = useState(false);
  const iframeRef = useRef(null);
  const { toggleFavorite, isFavorite } = usePlayer();

  const channelId = "UCcSWtzdfWI77YBl7vTV83OA";

  useEffect(() => {
    const loadShorts = async () => {
      try {
        setLoading(true);
        setError(null);
        const allItems = [];
        let token = null;
        do {
          const response = await fetchShortVideos({
            channelId,
            maxResults: 24,
            pageToken: token || undefined,
          });
          allItems.push(...(response.items || []));
          token = response.nextPageToken || null;
        } while (token);
        setShorts(allItems);
      } catch (err) {
        setError(getErrorMessage(err, "Qisqa videolarni yuklab bo‘lmadi"));
      } finally {
        setLoading(false);
      }
    };

    loadShorts();
  }, []);

  const openShort = useCallback((short, index) => {
    setSelectedShort(short);
    setSelectedIndex(index);
    setIsShortPlaying(true);
  }, []);

  const closeShort = useCallback(() => {
    setSelectedShort(null);
    setSelectedIndex(-1);
    setIsShortPlaying(false);
  }, []);

  const goPrev = useCallback(() => {
    if (selectedIndex <= 0) return;
    const nextIndex = selectedIndex - 1;
    setSelectedIndex(nextIndex);
    setSelectedShort(shorts[nextIndex]);
    setIsShortPlaying(true);
  }, [selectedIndex, shorts]);

  const goNext = useCallback(() => {
    if (selectedIndex >= shorts.length - 1) return;
    const nextIndex = selectedIndex + 1;
    setSelectedIndex(nextIndex);
    setSelectedShort(shorts[nextIndex]);
    setIsShortPlaying(true);
  }, [selectedIndex, shorts]);

  useEffect(() => {
    if (!selectedShort) return;
    const onKeyDown = (e) => {
      if (e.key === "ArrowUp") {
        e.preventDefault();
        goPrev();
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        goNext();
      } else if (e.code === "Space" || e.key === " ") {
        e.preventDefault();
        const nextPlaying = !isShortPlaying;
        setIsShortPlaying(nextPlaying);
        if (iframeRef.current?.contentWindow) {
          iframeRef.current.contentWindow.postMessage(
            JSON.stringify({
              event: "command",
              func: nextPlaying ? "playVideo" : "pauseVideo",
              args: "",
            }),
            "*"
          );
        }
      } else if (e.key === "Escape") {
        e.preventDefault();
        closeShort();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [selectedShort, goPrev, goNext, closeShort, isShortPlaying]);

  const displayedShorts = shorts;

  if (loading) {
    return (
      <section className="min-h-screen bg-white py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="h-8 w-32 bg-gray-200 rounded mb-8 animate-pulse" />
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {Array.from({ length: 8 }).map((_, index) => (
              <div
                key={`short-skeleton-${index}`}
                className="aspect-[9/16] bg-gray-200 rounded-xl animate-pulse"
              />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-lg font-semibold text-red-600">
          Xatolik: {error}
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 px-4 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <h2 className="text-4xl font-bold text-center sm:text-left">
            Qisqa videolar
          </h2>
        </div>

        {shorts.length === 0 && (
          <div className="bg-white border border-dashed border-gray-300 rounded-2xl p-10 text-center">
            <div className="text-5xl mb-4">🎬</div>
            <p className="text-lg font-semibold text-gray-700">
              Hech narsa topilmadi
            </p>
            <p className="text-sm text-gray-500 mt-2">
              Bir necha daqiqadan so‘ng qayta urinib ko‘ring.
            </p>
          </div>
        )}

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {displayedShorts.map((short, index) => {
            const globalIndex = index;
            const thumbnail =
              short.snippet?.thumbnails?.high?.url ||
              short.snippet?.thumbnails?.medium?.url ||
              short.snippet?.thumbnails?.default?.url;
            const favoriteActive = isFavorite(short.id.videoId, "video");
            return (
              <div
                key={short.id.videoId}
                className="relative group cursor-pointer rounded-xl overflow-hidden shadow-md transition-all duration-200 hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] aspect-[9/16] bg-black"
                onClick={() => openShort(short, globalIndex)}
              >
                <img
                  src={thumbnail}
                  alt={short.snippet?.title || "Short"}
                  className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity"
                />

                <div className="absolute inset-0 bg-opacity-20 group-hover:bg-opacity-40 transition-all flex items-center justify-center">
                  <span className="text-white text-3xl opacity-80 group-hover:scale-110 transition-transform">
                    Ijro
                  </span>
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/90 via-black/50 to-transparent text-white">
                  <h3 className="font-semibold text-sm line-clamp-2 mb-1">
                    {short.snippet?.title}
                  </h3>
                  <p className="text-xs text-gray-300">
                    {new Date(short.snippet?.publishedAt).toLocaleDateString(
                      "en-US",
                      { year: "numeric", month: "short", day: "numeric" }
                    )}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={(event) => {
                    event.stopPropagation();
                    toggleFavorite({
                      id: short.id.videoId,
                      type: "video",
                      title: short.snippet?.title || "Nomsiz qisqa video",
                      subtitle: short.snippet?.channelTitle || "YouTube",
                      thumbnail,
                      meta: "Qisqa video",
                      link: `/video/${short.id.videoId}`,
                    });
                  }}
                  className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-semibold cursor-pointer transition-all duration-200 hover:scale-[1.05] active:scale-[0.98] ${
                    favoriteActive
                      ? "bg-red-600 text-white"
                      : "bg-white/90 text-gray-700"
                  }`}
                >
                  {favoriteActive ? "❤️" : "🤍"}
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {selectedShort && (
        <div
          className="fixed inset-0 z-50 bg-black bg-opacity-95 flex items-center justify-center p-4"
          onClick={closeShort}
        >
          <div
            className="relative w-full max-w-sm h-[80vh] bg-black rounded-2xl overflow-hidden shadow-2xl border border-gray-800"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closeShort}
              className="absolute top-4 right-4 text-white z-20 text-2xl bg-black/50 w-8 h-8 rounded-full flex items-center justify-center cursor-pointer transition-all duration-200 hover:bg-black/80 active:scale-[0.98]"
            >
              x
            </button>
            <div className="absolute right-3 top-1/2 -translate-y-1/2 flex flex-col gap-3 z-20">
              <button
                onClick={goPrev}
                disabled={selectedIndex <= 0}
                className="w-10 h-10 rounded-full bg-black/60 text-white flex items-center justify-center cursor-pointer transition-all duration-200 hover:bg-black/80 active:scale-[0.98] disabled:opacity-40 disabled:cursor-not-allowed"
                aria-label="Oldingi short"
              >
                ↑
              </button>
              <button
                onClick={goNext}
                disabled={selectedIndex >= shorts.length - 1}
                className="w-10 h-10 rounded-full bg-black/60 text-white flex items-center justify-center cursor-pointer transition-all duration-200 hover:bg-black/80 active:scale-[0.98] disabled:opacity-40 disabled:cursor-not-allowed"
                aria-label="Keyingi short"
              >
                ↓
              </button>
            </div>
            <iframe
              ref={iframeRef}
              src={`https://www.youtube.com/embed/${selectedShort.id.videoId}?autoplay=1&enablejsapi=1`}
              className="w-full h-full"
              frameBorder="0"
              allow="autoplay; encrypted-media; picture-in-picture"
              allowFullScreen
              title={selectedShort.snippet?.title}
            ></iframe>
          </div>
        </div>
      )}
    </section>
  );
}
