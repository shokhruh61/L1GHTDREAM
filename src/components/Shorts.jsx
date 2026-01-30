import { useEffect, useState } from "react";
import { fetchShortVideos, getErrorMessage } from "../lib/youtube";
import { usePlayer } from "../context/PlayerContext";

export default function Shorts() {
  const [shorts, setShorts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedShort, setSelectedShort] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [currentPage, setCurrentPage] = useState(1);
  const [showAll, setShowAll] = useState(false);
  const [nextPageToken, setNextPageToken] = useState(null);
  const [loadingMore, setLoadingMore] = useState(false);
  const { toggleFavorite, isFavorite } = usePlayer();

  const channelId = "UCcSWtzdfWI77YBl7vTV83OA";
  const pageSize = 12;

  useEffect(() => {
    const loadShorts = async () => {
      try {
        setLoading(true);
        setError(null);
        const { items, nextPageToken } = await fetchShortVideos({
          channelId,
          maxResults: 24,
        });
        setShorts(items);
        setNextPageToken(nextPageToken);
        setCurrentPage(1);
      } catch (err) {
        setError(getErrorMessage(err, "Failed to load shorts"));
      } finally {
        setLoading(false);
      }
    };

    loadShorts();
  }, []);

  const loadMore = async () => {
    if (!nextPageToken || loadingMore) return;
    try {
      setLoadingMore(true);
      const { items, nextPageToken: token } = await fetchShortVideos({
        channelId,
        maxResults: 24,
        pageToken: nextPageToken,
      });
      setShorts((prev) => [...prev, ...items]);
      setNextPageToken(token);
    } catch (err) {
      setError(getErrorMessage(err, "Failed to load more shorts"));
    } finally {
      setLoadingMore(false);
    }
  };

  const openShort = (short, index) => {
    setSelectedShort(short);
    setSelectedIndex(index);
  };

  const closeShort = () => {
    setSelectedShort(null);
    setSelectedIndex(-1);
  };

  const goPrev = () => {
    if (selectedIndex <= 0) return;
    const nextIndex = selectedIndex - 1;
    setSelectedIndex(nextIndex);
    setSelectedShort(shorts[nextIndex]);
  };

  const goNext = () => {
    if (selectedIndex >= shorts.length - 1) return;
    const nextIndex = selectedIndex + 1;
    setSelectedIndex(nextIndex);
    setSelectedShort(shorts[nextIndex]);
  };

  useEffect(() => {
    if (!selectedShort) return;
    const onKeyDown = (e) => {
      if (e.key === "ArrowUp") {
        e.preventDefault();
        goPrev();
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        goNext();
      } else if (e.key === "Escape") {
        e.preventDefault();
        closeShort();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [selectedShort, selectedIndex, shorts]);

  const totalPages = Math.max(1, Math.ceil(shorts.length / pageSize));
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const displayedShorts = showAll ? shorts : shorts.slice(startIndex, endIndex);

  const goToPage = (page) => {
    const next = Math.max(1, Math.min(page, totalPages));
    setCurrentPage(next);
  };

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
        <div className="text-lg font-semibold text-red-600">Error: {error}</div>
      </section>
    );
  }

  return (
    <section className="py-12 px-4 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <h2 className="text-4xl font-bold text-center sm:text-left">
            Shorts
          </h2>
          <div className="flex items-center gap-2 justify-center sm:justify-end">
            <button
              onClick={() => setShowAll((v) => !v)}
              className="px-4 py-2 rounded-lg border border-gray-300 bg-white hover:bg-gray-100 text-sm font-semibold"
            >
              {showAll ? "Show paginated" : "Show all"}
            </button>
          </div>
        </div>

        {shorts.length === 0 && (
          <div className="bg-white border border-dashed border-gray-300 rounded-2xl p-10 text-center">
            <div className="text-5xl mb-4">🎬</div>
            <p className="text-lg font-semibold text-gray-700">No shorts found</p>
            <p className="text-sm text-gray-500 mt-2">Try again in a few minutes.</p>
          </div>
        )}

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {displayedShorts.map((short, index) => {
            const globalIndex = showAll ? index : startIndex + index;
            const thumbnail =
              short.snippet?.thumbnails?.high?.url ||
              short.snippet?.thumbnails?.medium?.url ||
              short.snippet?.thumbnails?.default?.url;
            const favoriteActive = isFavorite(short.id.videoId, "video");
            return (
              <div
                key={short.id.videoId}
                className="relative group cursor-pointer rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all aspect-[9/16] bg-black"
                onClick={() => openShort(short, globalIndex)}
              >
                <img
                  src={thumbnail}
                  alt={short.snippet?.title || "Short"}
                  className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity"
                />

                <div className="absolute inset-0 bg-opacity-20 group-hover:bg-opacity-40 transition-all flex items-center justify-center">
                  <span className="text-white text-3xl opacity-80 group-hover:scale-110 transition-transform">
                    Play
                  </span>
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/90 via-black/50 to-transparent text-white">
                  <h3 className="font-semibold text-sm line-clamp-2 mb-1">
                    {short.snippet?.title}
                  </h3>
                  <p className="text-xs text-gray-300">
                    {new Date(short.snippet?.publishedAt).toLocaleDateString(
                      "en-US",
                      { year: "numeric", month: "short", day: "numeric" },
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
                      title: short.snippet?.title || "Untitled short",
                      subtitle: short.snippet?.channelTitle || "YouTube",
                      thumbnail,
                      meta: "Shorts",
                      link: `/video/${short.id.videoId}`,
                    });
                  }}
                  className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-semibold ${
                    favoriteActive ? "bg-red-600 text-white" : "bg-white/90 text-gray-700"
                  }`}
                >
                  {favoriteActive ? "❤️" : "🤍"}
                </button>
              </div>
            );
          })}
        </div>

        {!showAll && shorts.length > pageSize && (
          <div className="flex flex-wrap items-center justify-center gap-2 mt-10">
            <button
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-4 py-2 rounded-lg bg-blue-600 text-white disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              Prev
            </button>
            <div className="px-3 py-2 text-sm font-semibold text-gray-700">
              Page {currentPage} of {totalPages}
            </div>
            <button
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-4 py-2 rounded-lg bg-blue-600 text-white disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        )}

        {nextPageToken && (
          <div className="flex justify-center mt-6">
            <button
              onClick={loadMore}
              disabled={loadingMore}
              className="px-6 py-2 rounded-lg border border-gray-300 bg-white hover:bg-gray-100 text-sm font-semibold disabled:opacity-60"
            >
              {loadingMore ? "Loading..." : "Load more"}
            </button>
          </div>
        )}
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
              className="absolute top-4 right-4 text-white z-20 text-2xl bg-black/50 w-8 h-8 rounded-full flex items-center justify-center hover:bg-black/80"
            >
              x
            </button>
            <div className="absolute right-3 top-1/2 -translate-y-1/2 flex flex-col gap-3 z-20">
              <button
                onClick={goPrev}
                disabled={selectedIndex <= 0}
                className="w-10 h-10 rounded-full bg-black/60 text-white flex items-center justify-center disabled:opacity-40 disabled:cursor-not-allowed hover:bg-black/80"
                aria-label="Previous short"
              >
                ↑
              </button>
              <button
                onClick={goNext}
                disabled={selectedIndex >= shorts.length - 1}
                className="w-10 h-10 rounded-full bg-black/60 text-white flex items-center justify-center disabled:opacity-40 disabled:cursor-not-allowed hover:bg-black/80"
                aria-label="Next short"
              >
                ↓
              </button>
            </div>
            <iframe
              src={`https://www.youtube.com/embed/${selectedShort.id.videoId}?autoplay=1`}
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
