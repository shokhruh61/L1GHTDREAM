import React, { useMemo } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { usePlayer } from "../context/PlayerContext";

function Search() {
  const [params] = useSearchParams();
  const query = params.get("q") || "";
  const { playlist } = usePlayer();

  const results = useMemo(() => {
    const term = query.trim().toLowerCase();
    if (!term) return [];
    return playlist.filter(
      (track) =>
        track.title.toLowerCase().includes(term) ||
        track.artist.toLowerCase().includes(term)
    );
  }, [playlist, query]);

  return (
    <div className="min-h-screen bg-white">
      <div className="bg-gray-100 text-gray-900 py-10 border-b border-gray-200">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-2">Search results</h1>
          <p className="text-gray-600">
            {query ? `Results for "${query}"` : "Start typing to discover tracks."}
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-10">
        {query && results.length === 0 && (
          <div className="bg-gray-50 border border-dashed border-gray-300 rounded-2xl p-10 text-center">
            <div className="text-5xl mb-4">🔎</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">No matches found</h2>
            <p className="text-gray-600 mb-6">
              Try a different keyword or explore the latest music.
            </p>
            <Link
              to="/music"
              className="bg-blue-600 text-white font-semibold px-6 py-3 rounded-lg hover:bg-blue-700"
            >
              Explore Music
            </Link>
          </div>
        )}

        {results.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {results.map((track) => (
              <div
                key={track.id}
                className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={track.thumbnail}
                    alt={track.title}
                    className="w-16 h-16 rounded-xl object-cover border border-gray-200"
                  />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{track.title}</h3>
                    <p className="text-sm text-gray-600">{track.artist}</p>
                  </div>
                </div>
                <Link
                  to="/music"
                  className="mt-4 inline-block text-sm font-semibold text-blue-600 hover:text-blue-700"
                >
                  Play in music section
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Search;
