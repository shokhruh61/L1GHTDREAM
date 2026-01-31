import { useState } from "react";
import mediaData from "../data/media.json";

export default function VideoGallery() {
  const videos = mediaData.videos;
  const [selectedVideo, setSelectedVideo] = useState(null);

  return (
    <section className="py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold mb-12 text-center">M1NOR FM videolari</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {videos.map((video) => (
            <div
              key={video.id}
              className="overflow-hidden rounded-xl shadow-lg transition-all duration-200 hover:shadow-xl hover:scale-[1.02]"
            >
              <div className="block w-full h-48 relative group cursor-pointer overflow-hidden">
                <video 
                  src={video.url} 
                  alt={video.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div 
                  onClick={() => setSelectedVideo(video)}
                  className="absolute inset-0 bg-opacity-40 group-hover:bg-opacity-60 transition-all duration-200 flex items-center justify-center cursor-pointer"
                >
                  <button
                    className="text-white text-4xl cursor-pointer transition-all duration-200 hover:scale-110 active:scale-[0.98]"
                  >
                    ▶
                  </button>
                </div>
                <span className="absolute bottom-2 right-2 bg-black text-white px-2 py-1 rounded text-sm">
                  {video.duration}
                </span>
              </div>

              <div className="p-4 bg-white">
                <h3 className="text-xl font-semibold mb-2">{video.title}</h3>
                <p className="text-gray-600 text-sm mb-3">
                  {video.description}
                </p>
                <div className="flex justify-between items-center text-xs text-gray-500">
                  <span>{video.uploadDate}</span>
                  <span>ID: {video.id}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Video Modal Player */}
      {selectedVideo && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedVideo(null)}
        >
          <div 
            className="bg-black rounded-lg w-full max-w-4xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedVideo(null)}
              className="absolute -top-10 right-0 text-white text-2xl font-bold cursor-pointer transition-all duration-200 hover:text-gray-300 active:scale-[0.98]"
            >
              ✕
            </button>
            
            <div className="aspect-video w-full">
              <iframe
                width="100%"
                height="100%"
                src={selectedVideo.url.includes("youtu") 
                  ? selectedVideo.url.replace("youtu.be/", "youtube.com/embed/").split("?")[0]
                  : selectedVideo.url
                }
                title={selectedVideo.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>

            <div className="p-6 text-white">
              <h3 className="text-2xl font-bold mb-2">{selectedVideo.title}</h3>
              <p className="text-gray-300">{selectedVideo.description}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
