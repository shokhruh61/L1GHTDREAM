import mediaData from "../data/media.json";

export default function Releases() {
  const releases = mediaData.releases || [];

  return (
    <section className="py-12 px-4 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold mb-12 text-center">New Releases</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {releases.map((release) => (
            <div key={release.id} className="flex flex-col bg-gray-50 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group">
              <div className="relative aspect-square overflow-hidden">
                <img 
                  src={release.coverUrl} 
                  alt={release.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300"></div>
              </div>
              
              <div className="p-6 flex-1 flex flex-col">
                <h3 className="text-2xl font-bold text-gray-900 mb-1">{release.title}</h3>
                <p className="text-blue-600 font-medium mb-4">{release.artist}</p>
                
                <div className="mt-auto space-y-4">
                  <div className="flex justify-between text-sm text-gray-500 border-b border-gray-200 pb-3">
                    <span>Release Date:</span>
                    <span className="font-medium text-gray-700">{release.date}</span>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3">
                    <a href={release.spotify} target="_blank" rel="noreferrer" className="flex items-center justify-center bg-[#1DB954] text-white py-2.5 rounded-lg font-semibold hover:bg-[#1ed760] transition-colors shadow-sm">
                      Spotify
                    </a>
                    <a href={release.apple} target="_blank" rel="noreferrer" className="flex items-center justify-center bg-black text-white py-2.5 rounded-lg font-semibold hover:bg-gray-800 transition-colors shadow-sm">
                      Apple Music
                    </a>
                    <a href={release.youtube} target="_blank" rel="noreferrer" className="col-span-2 flex items-center justify-center bg-red-600 text-white py-2.5 rounded-lg font-semibold hover:bg-red-700 transition-colors shadow-sm">
                      YouTube Music
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}