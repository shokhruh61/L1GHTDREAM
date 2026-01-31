import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchVideoDetails, getErrorMessage } from "../lib/youtube";
import { usePlayer } from "../context/PlayerContext";

const VideoPlayer = () => {
  const { videoId } = useParams();
  const navigate = useNavigate();
  const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { toggleFavorite, isFavorite } = usePlayer();

  useEffect(() => {
    const loadVideoDetails = async () => {
      try {
        setLoading(true);
        const items = await fetchVideoDetails(videoId);

        if (items.length > 0) {
          setVideo(items[0]);
        } else {
          setError("Video topilmadi");
        }
      } catch (err) {
        setError(getErrorMessage(err, "Video ma’lumotlarini yuklab bo‘lmadi"));
      } finally {
        setLoading(false);
      }
    };

    loadVideoDetails();
  }, [videoId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <div className="max-w-6xl mx-auto px-4 py-6 animate-pulse">
          <div className="h-6 w-40 bg-gray-200 rounded mb-6" />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <div className="w-full aspect-video bg-gray-200 rounded-lg mb-6" />
              <div className="bg-gray-50 rounded-lg p-6 space-y-4">
                <div className="h-6 bg-gray-200 rounded w-3/4" />
                <div className="h-4 bg-gray-200 rounded w-1/2" />
                <div className="h-4 bg-gray-100 rounded w-full" />
              </div>
            </div>
            <div className="lg:col-span-1">
              <div className="bg-gray-50 rounded-lg p-6 space-y-4">
                <div className="h-5 bg-gray-200 rounded w-1/2" />
                <div className="h-3 bg-gray-200 rounded w-full" />
                <div className="h-3 bg-gray-200 rounded w-3/4" />
                <div className="h-9 bg-gray-200 rounded w-full" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center">
          <div className="text-lg font-semibold text-red-600 mb-4">Xatolik: {error}</div>
          <button
            onClick={() => navigate('/music')}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg cursor-pointer transition-all duration-200 hover:bg-blue-700 hover:scale-[1.02] active:scale-[0.98]"
          >
            Musiqaga qaytish
          </button>
        </div>
      </div>
    );
  }

  if (!video) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center">
          <div className="text-lg font-semibold text-gray-600 mb-4">Video topilmadi</div>
          <button
            onClick={() => navigate('/music')}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg cursor-pointer transition-all duration-200 hover:bg-blue-700 hover:scale-[1.02] active:scale-[0.98]"
          >
            Musiqaga qaytish
          </button>
        </div>
      </div>
    );
  }

  const snippet = video.snippet;
  const stats = video.statistics;
  const thumbnail =
    snippet?.thumbnails?.maxres?.url ||
    snippet?.thumbnails?.high?.url ||
    snippet?.thumbnails?.medium?.url ||
    snippet?.thumbnails?.default?.url;
  const favoriteActive = isFavorite(videoId, "video");

  return (
    <div className="bg-white min-h-screen text-gray-900">
      <div className="max-w-6xl mx-auto px-4 py-6">
        {/* Back Button */}
        <button
          onClick={() => navigate('/music')}
          className="mb-6 flex items-center text-blue-600 font-semibold cursor-pointer transition-all duration-200 hover:text-blue-700 active:scale-[0.98]"
        >
          ← Videolarga qaytish
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Video Player Column */}
          <div className="lg:col-span-2">
            {/* Main Video */}
            <div className="relative w-full pt-[56.25%] bg-black rounded-lg overflow-hidden mb-6">
              <iframe
                className="absolute top-0 left-0 w-full h-full"
                src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
                title={snippet.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>

            {/* Video Info */}
            <div className="bg-gray-50 rounded-lg p-6">
              <h1 className="text-3xl font-bold mb-4">{snippet.title}</h1>

              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 pb-6 border-b border-gray-300">
                <div className="flex items-center gap-4">
                  <div>
                    <p className="font-semibold text-lg">{snippet.channelTitle}</p>
                    <p className="text-gray-600 text-sm">
                      {new Date(snippet.publishedAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </p>
                  </div>
                </div>

                {/* Stats */}
                <div className="flex gap-6 items-center">
                  <div className="text-center">
                    <p className="text-lg font-semibold">
                      {parseInt(stats.viewCount || 0).toLocaleString()}
                    </p>
                    <p className="text-gray-600 text-sm">Ko‘rishlar</p>
                  </div>
                  <div className="text-center">
                    <p className="text-lg font-semibold">
                      {parseInt(stats.likeCount || 0).toLocaleString()}
                    </p>
                    <p className="text-gray-600 text-sm">Yoqtirishlar</p>
                  </div>
                  <button
                    onClick={() =>
                      toggleFavorite({
                        id: videoId,
                        type: "video",
                        title: snippet.title,
                        subtitle: snippet.channelTitle,
                        thumbnail,
                        meta: "Video",
                        link: `/video/${videoId}`,
                      })
                    }
                    className={`px-4 py-2 rounded-full text-sm font-semibold border cursor-pointer transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] ${
                      favoriteActive
                        ? "border-red-500 text-red-600 bg-red-50"
                        : "border-gray-300 text-gray-600 bg-white"
                    }`}
                  >
                    {favoriteActive ? "❤️ Sevimlida" : "🤍 Sevimlilarga qo‘shish"}
                  </button>
                </div>
              </div>

              {/* Description */}
              <div className="mb-6">
                <h2 className="text-xl font-semibold mb-3">Tavsif</h2>
                <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">
                  {snippet.description}
                </p>
              </div>

              {/* Tags */}
              {snippet.tags && snippet.tags.length > 0 && (
                <div className="mb-6">
                  <h2 className="text-xl font-semibold mb-3">Teglar</h2>
                  <div className="flex flex-wrap gap-2">
                    {snippet.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="bg-gray-300 px-3 py-1 rounded-full text-sm cursor-pointer transition-all duration-200 hover:bg-gray-400 active:scale-[0.98]"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-gray-50 rounded-lg p-6 sticky top-6">
              <h2 className="text-xl font-semibold mb-4">Video ma’lumoti</h2>
              <div className="space-y-4 text-sm">
                <div>
                  <p className="text-gray-600">Kanal</p>
                  <p className="font-semibold text-gray-900">{snippet.channelTitle}</p>
                </div>
                <div>
                  <p className="text-gray-600">Chiqarilgan sana</p>
                  <p className="font-semibold text-gray-900">
                    {new Date(snippet.publishedAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </p>
                </div>
                <div>
                  <p className="text-gray-600">Kategoriya</p>
                  <p className="font-semibold text-gray-900">{snippet.categoryId}</p>
                </div>
                <div className="pt-4 border-t border-gray-300">
                  <button
                    onClick={() => navigate('/music')}
                    className="w-full bg-blue-600 text-white font-semibold py-2 rounded-lg cursor-pointer transition-all duration-200 hover:bg-blue-700 hover:scale-[1.02] active:scale-[0.98]"
                  >
                    Barcha videolarni ko‘rish
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;
