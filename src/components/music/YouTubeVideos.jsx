import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { fetchMusicVideos, getErrorMessage } from "../../lib/youtube";
import { usePlayer } from "../../context/PlayerContext";

const YouTubeVideos = ({
  channelIds = [],
  maxResults = 12,
  showAllByDefault = false,
  hidePagination = false,
}) => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [showAll, setShowAll] = useState(showAllByDefault);
  const [nextPageToken, setNextPageToken] = useState(null);
  const [loadingMore, setLoadingMore] = useState(false);
  const navigate = useNavigate();
  const { toggleFavorite, isFavorite } = usePlayer();
  const pageSize = maxResults;

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        setLoading(true);
        setError(null);
        setCurrentPage(1);
        setNextPageToken(null);

        const channelArray = Array.isArray(channelIds) ? channelIds : [channelIds];
        const validChannels = channelArray.filter(Boolean);

        if (validChannels.length === 0) {
          setError("Kanal IDlari topilmadi");
          return;
        }

        if (validChannels.length === 1) {
          const allItems = [];
          let token = null;
          do {
            const response = await fetchMusicVideos({
              channelId: validChannels[0],
              maxResults: pageSize,
              pageToken: token || undefined,
            });
            allItems.push(...(response.items || []));
            token = response.nextPageToken || null;
          } while (hidePagination && token);

          if (!hidePagination) {
            setNextPageToken(token);
          }

          setVideos(allItems);
          return;
        }

        const results = await Promise.all(
          validChannels.map((channelId) =>
            fetchMusicVideos({ channelId, maxResults: pageSize })
          )
        );

        const allVideos = results.flatMap((r) => r.items || []);

        // Sort by published date (newest first)
        allVideos.sort(
          (a, b) => new Date(b?.snippet?.publishedAt) - new Date(a?.snippet?.publishedAt)
        );

        setVideos(allVideos);
      } catch (err) {
        setError(getErrorMessage(err, "Videolarni yuklab bo‘lmadi"));
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, [channelIds, pageSize, hidePagination]);

  const loadMore = async () => {
    if (!nextPageToken || loadingMore) return;
    const channelArray = Array.isArray(channelIds) ? channelIds : [channelIds];
    const validChannels = channelArray.filter(Boolean);
    if (validChannels.length !== 1) return;

    try {
      setLoadingMore(true);
      const { items, nextPageToken: token } = await fetchMusicVideos({
        channelId: validChannels[0],
        maxResults: pageSize,
        pageToken: nextPageToken,
      });
      setVideos((prev) => {
        const merged = [...prev, ...items];
        merged.sort(
          (a, b) => new Date(b?.snippet?.publishedAt) - new Date(a?.snippet?.publishedAt)
        );
        return merged;
      });
      setNextPageToken(token);
    } catch (err) {
      setError(getErrorMessage(err, "Ko‘proq videoni yuklab bo‘lmadi"));
    } finally {
      setLoadingMore(false);
    }
  };

  const totalPages = Math.max(1, Math.ceil(videos.length / pageSize));
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const displayedVideos = showAll || hidePagination ? videos : videos.slice(startIndex, endIndex);

  const goToPage = (page) => {
    const next = Math.max(1, Math.min(page, totalPages));
    setCurrentPage(next);
  };

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {Array.from({ length: 8 }).map((_, index) => (
          <div
            key={`skeleton-${index}`}
            className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden animate-pulse"
          >
            <div className="w-full aspect-video bg-gray-200" />
            <div className="p-4 space-y-3">
              <div className="h-4 bg-gray-200 rounded" />
              <div className="h-4 bg-gray-100 rounded w-3/4" />
              <div className="h-3 bg-gray-100 rounded w-1/2" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-[320px]">
        <div className="text-lg font-semibold text-red-600">Xatolik: {error}</div>
      </div>
    );
  }

  if (videos.length === 0) {
    return (
      <div className="bg-gray-50 border border-dashed border-gray-300 rounded-2xl p-10 text-center">
        <div className="text-5xl mb-4">📭</div>
        <div className="text-lg font-semibold text-gray-700">Hech narsa topilmadi</div>
        <p className="text-sm text-gray-500 mt-2">
          Boshqa kanalni sinab ko‘ring yoki keyinroq qayta kiring.
        </p>
        <Link
          to="/"
          className="inline-block mt-5 bg-gray-900 text-white font-semibold px-5 py-2 rounded-lg cursor-pointer transition-all duration-200 hover:bg-black hover:scale-[1.02] active:scale-[0.98]"
        >
          Bosh sahifaga qaytish
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full">
      {!hidePagination && (
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
          <div className="text-sm text-gray-600">
            {displayedVideos.length} ta video ko‘rsatilmoqda (jami {videos.length})
          </div>
          <button
            onClick={() => setShowAll((v) => !v)}
            className="px-4 py-2 rounded-lg border border-gray-300 bg-white text-sm font-semibold cursor-pointer transition-all duration-200 hover:bg-gray-100 hover:scale-[1.02] active:scale-[0.98]"
          >
            {showAll ? "Sahifalab ko‘rsatish" : "Barchasini ko‘rsatish"}
          </button>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {displayedVideos.map((video) => {
          const id = video?.id?.videoId;
          const t =
            video?.snippet?.thumbnails?.maxres?.url ||
            video?.snippet?.thumbnails?.high?.url ||
            video?.snippet?.thumbnails?.medium?.url ||
            video?.snippet?.thumbnails?.default?.url;

          const favoriteItem = {
            id,
            type: "video",
            title: video?.snippet?.title || "Nomsiz video",
            subtitle: video?.snippet?.channelTitle || "YouTube",
            thumbnail: t,
            meta: "Video",
            link: `/video/${id}`,
          };

          const favoriteActive = isFavorite(id, "video");

          return (
            <button
              key={id}
              type="button"
              className="text-left bg-white rounded-2xl shadow-sm transition-all duration-200 overflow-hidden group border border-gray-100 cursor-pointer hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]"
              onClick={() => navigate(`/video/${id}`)}
            >
              <div className="relative w-full aspect-video bg-black overflow-hidden">
                {t ? (
                  <img
                    src={t}
                    alt={video?.snippet?.title || "Video"}
                    className="w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-[1.02] transition"
                    loading="lazy"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-800" />
                )}

                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/30 transition flex items-center justify-center">
                  <div className="w-14 h-14 rounded-full bg-white/90 grid place-items-center group-hover:scale-110 transition">
                    <span className="text-2xl">▶</span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={(event) => {
                    event.stopPropagation();
                    toggleFavorite(favoriteItem);
                  }}
                  className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-semibold cursor-pointer transition-all duration-200 hover:scale-[1.05] active:scale-[0.98] ${
                    favoriteActive
                      ? "bg-red-600 text-white"
                      : "bg-white/90 text-gray-700"
                  }`}
                >
                  {favoriteActive ? "❤️ Sevimlilarda" : "🤍 Sevimlilarga"}
                </button>
              </div>

              <div className="p-4">
                <h3 className="font-semibold text-gray-900 text-sm sm:text-base line-clamp-2">
                  {video?.snippet?.title}
                </h3>

                <div className="mt-2 flex items-center justify-between gap-3 text-xs sm:text-sm text-gray-600">
                  <span className="truncate">{video?.snippet?.channelTitle}</span>
                  <span className="shrink-0">
                    {new Date(video?.snippet?.publishedAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </span>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {!hidePagination && !showAll && videos.length > pageSize && (
        <div className="flex flex-wrap items-center justify-center gap-2 mt-10">
          <button
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 rounded-lg bg-blue-600 text-white cursor-pointer transition-all duration-200 hover:bg-blue-700 active:scale-[0.98] disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            Oldingi
          </button>
          <div className="px-3 py-2 text-sm font-semibold text-gray-700">
            Sahifa {currentPage} / {totalPages}
          </div>
          <button
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-4 py-2 rounded-lg bg-blue-600 text-white cursor-pointer transition-all duration-200 hover:bg-blue-700 active:scale-[0.98] disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            Keyingi
          </button>
        </div>
      )}

      {!hidePagination && nextPageToken && (
        <div className="flex justify-center mt-6">
          <button
            onClick={loadMore}
            disabled={loadingMore}
            className="px-6 py-2 rounded-lg border border-gray-300 bg-white text-sm font-semibold cursor-pointer transition-all duration-200 hover:bg-gray-100 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-60"
          >
            {loadingMore ? "Yuklanmoqda..." : "Yana yuklash"}
          </button>
        </div>
      )}
    </div>
  );
};

export default YouTubeVideos;
