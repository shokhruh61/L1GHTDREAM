import { usePlayer } from "../../context/PlayerContext";

const formatTime = (time) => {
  if (!Number.isFinite(time)) return "0:00";
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60)
    .toString()
    .padStart(2, "0");
  return `${minutes}:${seconds}`;
};

export default function MiniPlayer() {
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
  } = usePlayer();

  if (!currentTrack) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-white/15 bg-slate-950/95 backdrop-blur-xl">
      <div className="mx-auto grid w-full max-w-7xl gap-3 px-4 py-3 sm:px-6 md:grid-cols-[1fr_auto_1fr] md:items-center">
        <div className="flex items-center gap-3">
          <img src={currentTrack.thumbnail} alt={currentTrack.title} className="h-12 w-12 rounded-xl object-cover" />
          <div>
            <p className="text-sm font-semibold text-white">{currentTrack.title}</p>
            <p className="text-xs text-slate-400">{currentTrack.artist}</p>
          </div>
        </div>

        <div className="flex items-center justify-center gap-3 text-sm">
          <button type="button" onClick={prevTrack} className="rounded-full border border-white/20 px-2 py-1 text-slate-200 transition hover:border-cyan-300/80 hover:text-cyan-100">
            Prev
          </button>
          <button type="button" onClick={togglePlay} className="rounded-full bg-cyan-300 px-4 py-1.5 font-semibold text-slate-950 transition hover:bg-cyan-200">
            {isPlaying ? "Pause" : "Play"}
          </button>
          <button type="button" onClick={nextTrack} className="rounded-full border border-white/20 px-2 py-1 text-slate-200 transition hover:border-cyan-300/80 hover:text-cyan-100">
            Next
          </button>
        </div>

        <div className="flex items-center gap-2 text-xs text-slate-400">
          <span>{formatTime(currentTime)}</span>
          <input
            type="range"
            min="0"
            max={duration || 0}
            value={currentTime}
            onChange={(event) => seekTo(parseFloat(event.target.value))}
            className="flex-1"
          />
          <span>{formatTime(duration)}</span>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={(event) => setVolume(parseFloat(event.target.value))}
            className="w-16"
            aria-label="Volume"
          />
        </div>
      </div>
      <audio ref={audioRef} onTimeUpdate={handleTimeUpdate} onEnded={handleEnded} preload="metadata" />
    </div>
  );
}