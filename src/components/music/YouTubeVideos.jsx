import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchMusicVideos, getErrorMessage } from "../../lib/youtube";

const YouTubeVideos = ({ channelIds = [], maxResults = 12 }) => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [showAll, setShowAll] = useState(false);
  const [nextPageToken, setNextPageToken] = useState(null);
  const [loadingMore, setLoadingMore] = useState(false);
  const navigate = useNavigate();
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
          setError("No channel IDs provided");
          return;
        }

        if (validChannels.length === 1) {
          const { items, nextPageToken: token } = await fetchMusicVideos({
            channelId: validChannels[0],
            maxResults: pageSize,
          });
          setVideos(items);
          setNextPageToken(token);
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
        setError(getErrorMessage(err, "Failed to fetch videos"));
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, [channelIds, pageSize]);

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
      setError(getErrorMessage(err, "Failed to load more videos"));
    } finally {
      setLoadingMore(false);
    }
  };

  const totalPages = Math.max(1, Math.ceil(videos.length / pageSize));
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const displayedVideos = showAll ? videos : videos.slice(startIndex, endIndex);

  const goToPage = (page) => {
    const next = Math.max(1, Math.min(page, totalPages));
    setCurrentPage(next);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[320px]">
        <div className="text-lg font-semibold text-gray-600">Loading videos...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-[320px]">
        <div className="text-lg font-semibold text-red-600">Error: {error}</div>
      </div>
    );
  }

  if (videos.length === 0) {
    return (
      <div className="flex justify-center items-center min-h-[320px]">
        <div className="text-lg font-semibold text-gray-600">No videos found</div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
        <div className="text-sm text-gray-600">
          Showing {displayedVideos.length} of {videos.length} videos
        </div>
        <button
          onClick={() => setShowAll((v) => !v)}
          className="px-4 py-2 rounded-lg border border-gray-300 bg-white hover:bg-gray-100 text-sm font-semibold"
        >
          {showAll ? "Show paginated" : "Show all"}
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {displayedVideos.map((video) => {
          const id = video?.id?.videoId;
          const t =
            video?.snippet?.thumbnails?.maxres?.url ||
            video?.snippet?.thumbnails?.high?.url ||
            video?.snippet?.thumbnails?.medium?.url ||
            video?.snippet?.thumbnails?.default?.url;

          return (
            <button
              key={id}
              type="button"
              className="text-left bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all overflow-hidden group border border-gray-100"
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

      {!showAll && videos.length > pageSize && (
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
  );
};

export default YouTubeVideos;
