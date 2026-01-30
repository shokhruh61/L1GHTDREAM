import React from "react";
import YouTubeVideos from "../components/music/YouTubeVideos.jsx";
import { usePlayer } from "../context/PlayerContext";

function Music() {
  const { playlist, playTrack, toggleFavorite, isFavorite } = usePlayer();

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-gray-100 text-gray-900 py-12 border-b border-gray-200">
        <div className="container mx-auto px-4">
          <h1 className="text-5xl font-bold mb-2">🎵 Music Channel</h1>
          <p className="text-lg text-gray-700">
            Discover the latest music videos from your favorite channels
          </p>
        </div>
      </div>

      {/* YouTube Videos Component */}
      <div className="container mx-auto px-4 py-12 space-y-12">
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Featured Tracks</h2>
            <span className="text-sm text-gray-500">Listen with the mini player</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {playlist.map((track) => {
              const favoriteActive = isFavorite(track.id, "track");
              return (
                <div
                  key={track.id}
                  className="bg-white border border-gray-200 rounded-2xl p-4 shadow-sm hover:shadow-lg transition"
                >
                  <img
                    src={track.thumbnail}
                    alt={track.title}
                    className="w-full h-40 object-cover rounded-xl mb-4"
                  />
                  <h3 className="text-lg font-semibold text-gray-900">{track.title}</h3>
                  <p className="text-sm text-gray-600">{track.artist}</p>
                  <div className="flex items-center gap-2 mt-4">
                    <button
                      onClick={() => playTrack(track)}
                      className="flex-1 bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700"
                    >
                      Play
                    </button>
                    <button
                      onClick={() =>
                        toggleFavorite({
                          id: track.id,
                          type: "track",
                          title: track.title,
                          subtitle: track.artist,
                          thumbnail: track.thumbnail,
                          meta: "Audio",
                        })
                      }
                      className={`px-3 py-2 rounded-lg border text-sm font-semibold ${
                        favoriteActive
                          ? "border-red-500 text-red-600 bg-red-50"
                          : "border-gray-300 text-gray-600"
                      }`}
                    >
                      {favoriteActive ? "❤️" : "🤍"}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        <YouTubeVideos channelIds="UCcSWtzdfWI77YBl7vTV83OA" />
      </div>
    </div>
  );
}

export default Music;
