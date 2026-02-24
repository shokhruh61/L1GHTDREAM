import { useState } from "react";
import mediaData from "../data/media.json";

const IMAGES_PER_PAGE = 8;

export default function Pictures() {
  const images = mediaData.images ?? [];
  const [currentPage, setCurrentPage] = useState(1);
  const [loadedImages, setLoadedImages] = useState(() => new Set());
  const [selectedImage, setSelectedImage] = useState(null);

  const totalPages = Math.ceil(images.length / IMAGES_PER_PAGE);
  const startIndex = (currentPage - 1) * IMAGES_PER_PAGE;
  const paginatedImages = images.slice(startIndex, startIndex + IMAGES_PER_PAGE);

  const handleImageLoad = (id) => {
    setLoadedImages((prev) => new Set(prev).add(id));
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
      console.error("Download error:", error);
    }
  };

  const openImage = (image) => {
    setSelectedImage(image);
    document.body.style.overflow = "hidden";
  };

  const closeImage = () => {
    setSelectedImage(null);
    document.body.style.overflow = "";
  };

  const goToPage = (page) => {
    if (totalPages === 0) return;
    setCurrentPage(Math.max(1, Math.min(page, totalPages)));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <section className="min-h-screen bg-slate-950 text-white">
      <div className="rounded-3xl border border-white/10 bg-slate-900/70 p-6 md:p-8">
        <h2 className="text-3xl font-bold md:text-4xl">Foto galereya</h2>
        <p className="mt-2 text-sm text-slate-300">{images.length} ta rasm</p>
      </div>

      <div className="mx-auto max-w-7xl px-1 py-10 md:px-0">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {paginatedImages.map((image) => {
            const isLoaded = loadedImages.has(image.id);
            return (
              <div
                key={image.id}
                className="group overflow-hidden rounded-2xl border border-white/10 bg-slate-900/70 transition duration-200 hover:-translate-y-1 hover:border-cyan-300/50"
              >
                <div className="relative h-56 w-full overflow-hidden">
                  {!isLoaded && (
                    <div className="absolute inset-0 animate-pulse bg-slate-700/40" />
                  )}

                  <button
                    type="button"
                    onClick={() => openImage(image)}
                    className="absolute inset-0 h-full w-full"
                    aria-label={`${image.title} preview`}
                  >
                    <img
                      src={image.url}
                      alt={image.alt}
                      className={`h-full w-full object-cover transition duration-300 group-hover:scale-105 ${
                        isLoaded ? "opacity-100" : "opacity-0"
                      }`}
                      title={image.title}
                      onLoad={() => handleImageLoad(image.id)}
                      onError={(event) => {
                        handleImageLoad(image.id);
                        event.target.style.display = "none";
                      }}
                    />
                  </button>
                </div>

                <div className="p-4">
                  <h3 className="mb-1 line-clamp-2 text-lg font-semibold text-white">
                    {image.title}
                  </h3>

                  <div className="mb-3 flex gap-2">
                    <button
                      onClick={() => handleDownload(image.url, image.title)}
                      className="flex-1 rounded-lg bg-cyan-300 px-3 py-2 text-sm font-semibold text-slate-950 transition hover:bg-cyan-200"
                      title="Rasmni yuklab olish"
                    >
                      Download
                    </button>
                  </div>

                  <div className="flex items-center justify-between border-t border-white/10 pt-2 text-xs text-slate-400">
                    <span className="rounded bg-slate-800 px-2 py-1">#{image.id}</span>
                    <span>{image.uploadDate}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {images.length === 0 && (
          <div className="py-16 text-center">
            <p className="text-2xl font-semibold text-slate-200">Hech narsa topilmadi</p>
          </div>
        )}

        {images.length > 0 && (
          <>
            <div className="mt-12 flex flex-wrap items-center justify-center gap-2">
              <button
                onClick={() => goToPage(currentPage - 1)}
                disabled={currentPage === 1}
                className="rounded-lg border border-white/20 bg-slate-900 px-4 py-2 font-semibold text-slate-200 transition hover:border-cyan-300/70 hover:text-cyan-200 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Oldingi
              </button>

              <div className="flex flex-wrap justify-center gap-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => goToPage(page)}
                    className={`rounded-lg px-3 py-2 font-semibold transition ${
                      currentPage === page
                        ? "bg-cyan-300 text-slate-950"
                        : "border border-white/20 bg-slate-900 text-slate-200 hover:border-cyan-300/70"
                    }`}
                  >
                    {page}
                  </button>
                ))}
              </div>

              <button
                onClick={() => goToPage(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="rounded-lg border border-white/20 bg-slate-900 px-4 py-2 font-semibold text-slate-200 transition hover:border-cyan-300/70 hover:text-cyan-200 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Keyingi
              </button>
            </div>

            <p className="mt-6 text-center font-semibold text-slate-400">
              {startIndex + 1} - {Math.min(startIndex + IMAGES_PER_PAGE, images.length)} / {images.length}
            </p>
          </>
        )}
      </div>

      {selectedImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 px-4"
          onClick={closeImage}
          onKeyDown={(event) => {
            if (event.key === "Escape") closeImage();
          }}
          role="dialog"
          aria-modal="true"
          tabIndex={-1}
        >
          <div className="relative w-full max-w-4xl" onClick={(event) => event.stopPropagation()}>
            <button
              type="button"
              onClick={closeImage}
              className="absolute -top-10 right-0 text-2xl text-white"
              aria-label="Yopish"
            >
              x
            </button>
            <img
              src={selectedImage.url}
              alt={selectedImage.alt}
              className="max-h-[80vh] w-full rounded-lg bg-black object-contain"
            />
            <div className="mt-3 text-center text-white">
              <div className="font-semibold">{selectedImage.title}</div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
