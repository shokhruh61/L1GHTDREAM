import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import M1norfm from "../assets/images/m1norfm.jpg";
import { CONTINUE_LISTENING_KEY, usePlayer } from "../context/PlayerContext";

function Home() {
  const { resumeFromContinue } = usePlayer();
  const [continuePayload, setContinuePayload] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem(CONTINUE_LISTENING_KEY);
    if (saved) {
      try {
        setContinuePayload(JSON.parse(saved));
      } catch (error) {
        console.error("Failed to parse continue listening payload", error);
      }
    }
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16 sm:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Left Content */}
          <div className="text-gray-900">
            <h1 className="text-5xl sm:text-6xl font-bold mb-4 leading-tight">
              Welcome to <span className="text-blue-600">M1NOR FM</span>
            </h1>
            <p className="text-lg sm:text-xl mb-6 text-gray-700">
              Your ultimate destination for music, videos, and amazing content. Discover the latest hits and classic favorites all in one place.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/music"
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg transition-all transform hover:scale-105 text-center"
              >
                Explore Music
              </Link>
              <Link
                to="/pictures"
                className="bg-gray-200 hover:bg-gray-300 text-gray-900 font-bold py-3 px-8 rounded-lg transition-all transform hover:scale-105 text-center"
              >
                View Gallery
              </Link>
            </div>
          </div>

          {/* Right Image */}
          <div className="flex justify-center">
            <div className="relative">
              <img 
                src={M1norfm} 
                alt="M1NOR FM" 
                className="rounded-full shadow-lg w-80 h-80 object-cover border-4 border-gray-200"
              />
            </div>
          </div>
        </div>
      </div>

      {continuePayload && (
        <div className="bg-gradient-to-r from-blue-50 via-white to-blue-50 text-gray-900 py-12">
          <div className="container mx-auto px-4">
            <div className="flex flex-col lg:flex-row items-center gap-8 bg-white shadow-lg rounded-2xl p-8 border border-gray-100">
              <img
                src={continuePayload.thumbnail}
                alt={continuePayload.title}
                className="w-28 h-28 rounded-2xl object-cover border border-gray-200"
              />
              <div className="flex-1 text-center lg:text-left">
                <p className="text-sm uppercase tracking-wide text-blue-600 font-semibold">
                  Continue Listening
                </p>
                <h3 className="text-2xl font-bold text-gray-900 mt-1">
                  {continuePayload.title}
                </h3>
                <p className="text-gray-600">{continuePayload.artist}</p>
                <p className="text-xs text-gray-500 mt-2">
                  Last listened at {Math.floor(continuePayload.currentTime)}s of{" "}
                  {Math.floor(continuePayload.duration)}s
                </p>
              </div>
              <button
                onClick={() => resumeFromContinue(continuePayload)}
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg"
              >
                Resume
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Features Section */}
      <div className="bg-gray-50 text-gray-900 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">Why Choose Us?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-white p-8 rounded-lg hover:shadow-md transition-shadow">
              <div className="text-4xl mb-4">🎵</div>
              <h3 className="text-2xl font-bold mb-3">Latest Music</h3>
              <p className="text-gray-600">
                Access thousands of music videos from your favorite channels, updated daily with the latest releases.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white p-8 rounded-lg hover:shadow-md transition-shadow">
              <div className="text-4xl mb-4">🖼️</div>
              <h3 className="text-2xl font-bold mb-3">Photo Gallery</h3>
              <p className="text-gray-600">
                Browse beautiful high-quality images with detailed information and interactive features.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white p-8 rounded-lg hover:shadow-md transition-shadow">
              <div className="text-4xl mb-4">⭐</div>
              <h3 className="text-2xl font-bold mb-3">High Quality</h3>
              <p className="text-gray-600">
                Experience premium content with smooth streaming, detailed descriptions, and like counts.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="bg-white text-gray-900 py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-5xl font-bold mb-2">1000+</div>
              <p className="text-lg text-gray-600">Videos</p>
            </div>
            <div>
              <div className="text-5xl font-bold mb-2">500+</div>
              <p className="text-lg text-gray-600">Images</p>
            </div>
            <div>
              <div className="text-5xl font-bold mb-2">100%</div>
              <p className="text-lg text-gray-600">Free Access</p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gray-50 text-gray-900 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Explore?</h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Join thousands of music lovers and content enthusiasts. Start discovering amazing content today!
          </p>
          <Link
            to="/music"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-12 rounded-lg text-lg transition-all transform hover:scale-105"
          >
            Get Started Now
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Home
