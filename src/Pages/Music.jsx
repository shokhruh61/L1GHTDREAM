import React from "react";
import YouTubeVideos from "../components/music/YouTubeVideos.jsx";

function Music() {
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
      <div className="container mx-auto px-4 py-12">
        <YouTubeVideos channelIds="UCcSWtzdfWI77YBl7vTV83OA" />
      </div>
    </div>
  );
}

export default Music;
