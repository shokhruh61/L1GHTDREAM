import React, { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import tracksData from "../data/tracks";

const PlayerContext = createContext(null);

const FAVORITES_KEY = "m1nor_favorites";
const CONTINUE_KEY = "m1nor_continue_listening";

const formatContinuePayload = (track, currentTime, duration) => ({
  id: track.id,
  title: track.title,
  artist: track.artist,
  thumbnail: track.thumbnail,
  audioUrl: track.audioUrl,
  currentTime,
  duration,
  updatedAt: new Date().toISOString(),
});

export function PlayerProvider({ children }) {
  const audioRef = useRef(null);
  const [playlist] = useState(tracksData);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(tracksData[0]?.duration ?? 0);
  const [volume, setVolume] = useState(0.7);
  const [favorites, setFavorites] = useState([]);

  const currentTrack = playlist[currentIndex] || playlist[0];

  useEffect(() => {
    const saved = localStorage.getItem(FAVORITES_KEY);
    if (saved) {
      try {
        setFavorites(JSON.parse(saved));
      } catch (error) {
        console.error("Failed to parse favorites", error);
      }
    }
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  useEffect(() => {
    if (!audioRef.current || !currentTrack) return;
    audioRef.current.src = currentTrack.audioUrl;
    audioRef.current.load();
    setDuration(currentTrack.duration || 0);
    setCurrentTime(0);
    if (isPlaying) {
      audioRef.current.play().catch(() => {
        setIsPlaying(false);
      });
    }
  }, [currentTrack, isPlaying]);

  const toggleFavorite = useCallback(
    (item) => {
      setFavorites((prev) => {
        const exists = prev.some((fav) => fav.id === item.id && fav.type === item.type);
        const next = exists
          ? prev.filter((fav) => !(fav.id === item.id && fav.type === item.type))
          : [...prev, item];
        localStorage.setItem(FAVORITES_KEY, JSON.stringify(next));
        return next;
      });
    },
    []
  );

  const isFavorite = useCallback(
    (id, type) => favorites.some((fav) => fav.id === id && fav.type === type),
    [favorites]
  );

  const playTrack = useCallback(
    (track) => {
      const index = playlist.findIndex((item) => item.id === track.id);
      if (index >= 0) {
        setCurrentIndex(index);
      }
      setIsPlaying(true);
    },
    [playlist]
  );

  const playByIndex = useCallback(
    (index) => {
      const nextIndex = Math.max(0, Math.min(index, playlist.length - 1));
      setCurrentIndex(nextIndex);
      setIsPlaying(true);
    },
    [playlist.length]
  );

  const togglePlay = useCallback(() => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().catch(() => {
        setIsPlaying(false);
      });
      setIsPlaying(true);
    }
  }, [isPlaying]);

  const nextTrack = useCallback(() => {
    playByIndex((currentIndex + 1) % playlist.length);
  }, [currentIndex, playlist.length, playByIndex]);

  const prevTrack = useCallback(() => {
    playByIndex((currentIndex - 1 + playlist.length) % playlist.length);
  }, [currentIndex, playlist.length, playByIndex]);

  const seekTo = useCallback((time) => {
    if (!audioRef.current) return;
    audioRef.current.currentTime = time;
    setCurrentTime(time);
  }, []);

  const handleTimeUpdate = useCallback(() => {
    if (!audioRef.current) return;
    const time = audioRef.current.currentTime;
    const total = audioRef.current.duration || duration;
    setCurrentTime(time);
    setDuration(total);

    if (currentTrack) {
      const payload = formatContinuePayload(currentTrack, time, total);
      localStorage.setItem(CONTINUE_KEY, JSON.stringify(payload));
    }
  }, [currentTrack, duration]);

  const handleEnded = useCallback(() => {
    nextTrack();
  }, [nextTrack]);

  const resumeFromContinue = useCallback((payload) => {
    if (!payload) return;
    const match = playlist.find((item) => item.id === payload.id);
    if (match) {
      setCurrentIndex(playlist.indexOf(match));
    }
    setTimeout(() => {
      if (audioRef.current) {
        audioRef.current.currentTime = payload.currentTime || 0;
        setCurrentTime(payload.currentTime || 0);
        setIsPlaying(true);
        audioRef.current.play().catch(() => {
          setIsPlaying(false);
        });
      }
    }, 0);
  }, [playlist]);

  const value = useMemo(
    () => ({
      playlist,
      currentTrack,
      currentIndex,
      isPlaying,
      currentTime,
      duration,
      volume,
      favorites,
      audioRef,
      setVolume,
      togglePlay,
      nextTrack,
      prevTrack,
      playTrack,
      playByIndex,
      seekTo,
      handleTimeUpdate,
      handleEnded,
      toggleFavorite,
      isFavorite,
      resumeFromContinue,
    }),
    [
      playlist,
      currentTrack,
      currentIndex,
      isPlaying,
      currentTime,
      duration,
      volume,
      favorites,
      togglePlay,
      nextTrack,
      prevTrack,
      playTrack,
      playByIndex,
      seekTo,
      handleTimeUpdate,
      handleEnded,
      toggleFavorite,
      isFavorite,
      resumeFromContinue,
    ]
  );

  return <PlayerContext.Provider value={value}>{children}</PlayerContext.Provider>;
}

export function usePlayer() {
  const context = useContext(PlayerContext);
  if (!context) {
    throw new Error("usePlayer must be used within PlayerProvider");
  }
  return context;
}

export const CONTINUE_LISTENING_KEY = CONTINUE_KEY;
