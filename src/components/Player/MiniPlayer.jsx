import React from "react";
import { usePlayer } from "../../context/PlayerContext";

const formatTime = (time) => {
  if (!Number.isFinite(time)) return "0:00";
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60).toString().padStart(2, "0");
  return `${minutes}:${seconds}`;
};

function MiniPlayer() {
  const {
    currentTrack,
    isPlaying,
    currentTime,
    duration,
    volume,
    audioRef,
    togglePlay,
    nextTrack,
    prevTrack,
    seekTo,
    setVolume,
    handleTimeUpdate,
    handleEnded,
    toggleFavorite,
    isFavorite,
  } = usePlayer();

  if (!currentTrack) return null;

  const favoriteActive = isFavorite(currentTrack.id, "track");

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-gray-200 bg-white/95 backdrop-blur">
      <div className="container mx-auto px-4 py-3">
        <div className="flex flex-col gap-3">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div className="flex items-center gap-4">
              <img
                src={currentTrack.thumbnail}
                alt={currentTrack.title}
                className="w-14 h-14 rounded-xl object-cover border border-gray-200"
              />
              <div>
                <p className="font-semibold text-gray-900">{currentTrack.title}</p>
                <p className="text-xs text-gray-500">{currentTrack.artist}</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <button
                onClick={prevTrack}
                className="text-xl cursor-pointer transition-all duration-200 hover:scale-110 active:scale-[0.98]"
                aria-label="Oldingi trek"
              >
                ⏮️
              </button>
              <button
                onClick={togglePlay}
                className="bg-blue-600 text-white rounded-full w-12 h-12 flex items-center justify-center shadow cursor-pointer transition-all duration-200 hover:bg-blue-700 hover:scale-110 active:scale-[0.98]"
                aria-label="Ijro yoki pauza"
              >
                {isPlaying ? "⏸️" : "▶️"}
              </button>
              <button
                onClick={nextTrack}
                className="text-xl cursor-pointer transition-all duration-200 hover:scale-110 active:scale-[0.98]"
                aria-label="Keyingi trek"
              >
                ⏭️
              </button>
            </div>

            <div className="flex items-center gap-3 lg:justify-end">
              <button
                onClick={() =>
                  toggleFavorite({
                    id: currentTrack.id,
                    type: "track",
                    title: currentTrack.title,
                    subtitle: currentTrack.artist,
                    thumbnail: currentTrack.thumbnail,
                    meta: "Musiqa",
                  })
                }
                className={`px-3 py-2 rounded-full border text-sm font-semibold cursor-pointer transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] ${
                  favoriteActive
                    ? "border-red-500 text-red-600 bg-red-50"
                    : "border-gray-300 text-gray-600"
                }`}
              >
                {favoriteActive ? "❤️ Sevimlida" : "🤍 Sevimlilarga qo‘shish"}
              </button>
              <div className="flex items-center gap-2">
                <span className="text-sm">🔊</span>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={volume}
                  onChange={(event) => setVolume(parseFloat(event.target.value))}
                  className="w-24 cursor-pointer"
                />
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 text-xs text-gray-600">
            <span>{formatTime(currentTime)}</span>
            <input
              type="range"
              min="0"
              max={duration || 0}
              value={currentTime}
              onChange={(event) => seekTo(parseFloat(event.target.value))}
              className="flex-1 cursor-pointer"
            />
            <span>{formatTime(duration)}</span>
          </div>
        </div>

        <audio
          ref={audioRef}
          onTimeUpdate={handleTimeUpdate}
          onEnded={handleEnded}
          preload="metadata"
        />
      </div>
    </div>
  );
}

export default MiniPlayer;
