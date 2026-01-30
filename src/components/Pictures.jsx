import { useState } from "react";
import mediaData from "../data/media.json";

const IMAGES_PER_PAGE = 8;

export default function Pictures() {
  const images = mediaData.images;
  const [currentPage, setCurrentPage] = useState(1);
  const [loadedImages, setLoadedImages] = useState(new Set());
  const [likedImages, setLikedImages] = useState(() => {
    const saved = localStorage.getItem("likedImages");
    return saved ? new Set(JSON.parse(saved)) : new Set();
  });
  const [imageLikes, setImageLikes] = useState(() => {
    const saved = localStorage.getItem("imageLikes");
    if (saved) {
      return JSON.parse(saved);
    }
    // Default: har bir rasm uchun 0 like
    const likes = {};
    images.forEach((img) => {
      likes[img.id] = 0;
    });
    return likes;
  });

  const totalPages = Math.ceil(images.length / IMAGES_PER_PAGE);
  const startIndex = (currentPage - 1) * IMAGES_PER_PAGE;
  const paginatedImages = images.slice(startIndex, startIndex + IMAGES_PER_PAGE);

  const handleImageLoad = (id) => {
    setLoadedImages((prev) => new Set(prev).add(id));
  };

  const handleLike = (id) => {
    const isCurrentlyLiked = likedImages.has(id);

    setLikedImages((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      localStorage.setItem("likedImages", JSON.stringify(Array.from(newSet)));
      return newSet;
    });

    // Like sonini yangilash
    setImageLikes((prev) => {
      const newLikes = { ...prev };
      if (isCurrentlyLiked) {
        // Already liked, so unlike
        newLikes[id] = Math.max(0, newLikes[id] - 1);
      } else {
        // Not liked, so like
        newLikes[id] = (newLikes[id] || 0) + 1;
      }
      localStorage.setItem("imageLikes", JSON.stringify(newLikes));
      return newLikes;
    });
  };

  const handleDownload = async (url, title) => {
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = `${title}.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(blobUrl);
    } catch (error) {
      console.error("Download xatosi:", error);
      alert("Rasm yuklanmadi!");
    }
  };

  const goToPage = (page) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <section className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-gray-100 text-gray-900 py-12 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-5xl font-bold mb-2">📸 Photo Gallery</h2>
          <p className="text-lg text-gray-700">
            Browse our beautiful collection of {images.length} high-quality images
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {paginatedImages.map((image) => {
            const isLoaded = loadedImages.has(image.id);
            return (
              <div
                key={image.id}
                className="group bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105 overflow-hidden animate-fade-in"
              >
                {/* Image Container */}
                <div className="relative w-full h-56 overflow-hidden bg-gray-200">
                  {!isLoaded && (
                    <div className="absolute inset-0 from-gray-300 via-gray-200 to-gray-300 animate-pulse"></div>
                  )}
                  
                  <img
                    src={image.url}
                    alt={image.alt}
                    className={`w-full h-full object-cover group-hover:scale-110 transition-all duration-500 ${
                      isLoaded ? "opacity-100" : "opacity-0"
                    }`}
                    title={image.title}
                    onLoad={() => handleImageLoad(image.id)}
                    onError={(e) => {
                      handleImageLoad(image.id);
                      e.target.style.display = 'none';
                    }}
                  />
                  
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
                    <div className="text-white text-4xl opacity-0 group-hover:opacity-100 transition-opacity">
                      👁️
                    </div>
                  </div>
                </div>

                {/* Info Section */}
                <div className="p-4">
                  <h3 className="text-lg font-bold text-gray-900 mb-1 line-clamp-2 group-hover:text-blue-600 transition-colors">
                    {image.title}
                  </h3>
                  
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2 min-h-[40px]">
                    {image.description}
                  </p>
                  
                  {/* Action Buttons */}
                  <div className="flex gap-2 mb-3">
                    <button
                      onClick={() => handleDownload(image.url, image.title)}
                      className="flex-1 flex items-center justify-center gap-1 bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-lg transition-all font-semibold text-sm"
                      title="Download this image"
                    >
                      ⬇️
                    </button>
                    
                    <button
                      onClick={() => handleLike(image.id)}
                      className={`flex-1 flex items-center justify-center gap-1 px-3 py-2 rounded-lg transition-all font-semibold text-sm ${
                        likedImages.has(image.id)
                          ? "bg-red-600 hover:bg-red-700 text-white"
                          : "bg-gray-200 hover:bg-gray-300 text-gray-900"
                      }`}
                      title="Like this image"
                    >
                      {likedImages.has(image.id) ? "❤️" : "🤍"}
                      <span>{imageLikes[image.id] || 0}</span>
                    </button>
                  </div>
                  
                  {/* Meta Info */}
                  <div className="flex justify-between items-center text-xs text-gray-500 border-t border-gray-200 pt-2">
                    <span className="bg-gray-100 px-2 py-1 rounded">#{image.id}</span>
                    <span className="text-gray-400">{image.uploadDate}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Empty State */}
        {images.length === 0 && (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">📭</div>
            <p className="text-2xl text-gray-600 font-semibold">No images found</p>
          </div>
        )}

        {/* Pagination */}
        <div className="flex justify-center items-center gap-2 mt-12 flex-wrap">
          <button
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white rounded-lg disabled:cursor-not-allowed transition-all font-semibold"
          >
            ← Previous
          </button>

          <div className="flex gap-1 flex-wrap justify-center">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => goToPage(page)}
                className={`px-3 py-2 rounded-lg transition-all font-semibold ${
                  currentPage === page
                    ? "bg-blue-600 text-white shadow-md"
                    : "bg-white text-gray-900 border-2 border-gray-300 hover:border-blue-500 hover:text-blue-600"
                }`}
              >
                {page}
              </button>
            ))}
          </div>

          <button
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white rounded-lg disabled:cursor-not-allowed transition-all font-semibold"
          >
            Next →
          </button>
        </div>

        {/* Stats */}
        <p className="text-center text-gray-600 mt-6 font-semibold">
          Showing {startIndex + 1} - {Math.min(startIndex + IMAGES_PER_PAGE, images.length)} of {images.length} images
        </p>
      </div>

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fadeIn 0.6s ease-out;
        }
      `}</style>
    </section>
  );
}
