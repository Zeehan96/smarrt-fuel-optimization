import { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { modal_style } from "../../utils/constant";

const ImagePreviewModal = ({ isOpen, imageSrc, onClose }) => {
  const isSlider = imageSrc && typeof imageSrc === "object" && Array.isArray(imageSrc.images);
  const images = isSlider ? imageSrc.images : (imageSrc ? [imageSrc] : []);
  const [currentIndex, setCurrentIndex] = useState(isSlider ? (imageSrc.index ?? 0) : 0);
  const hasMultiple = images.length > 1;

  useEffect(() => {
    if (!isOpen) return;
    setCurrentIndex(isSlider ? (imageSrc?.index ?? 0) : 0);
  }, [isOpen, imageSrc]);

  const prev = useCallback(() => {
    setCurrentIndex((i) => (i > 0 ? i - 1 : images.length - 1));
  }, [images.length]);

  const next = useCallback(() => {
    setCurrentIndex((i) => (i < images.length - 1 ? i + 1 : 0));
  }, [images.length]);

  useEffect(() => {
    if (!isOpen) return;
    const handler = (e) => {
      if (e.key === "ArrowLeft")  prev();
      if (e.key === "ArrowRight") next();
      if (e.key === "Escape")     onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [isOpen, prev, next, onClose]);

  if (!isOpen || !images.length) return null;

  const src = images[currentIndex];

  // ── Single image: original style ──────────────────────────
  if (!hasMultiple) {
    return (
      <div
        style={modal_style}
        className="fixed inset-0 !top-0 bg-black bg-opacity-75 flex items-center justify-center z-[9999] p-4 sm:p-6"
        onClick={onClose}
      >
        <div
          className="relative bg-white dark:bg-gray-800 rounded-lg p-5 sm:p-4 w-full max-w-md mx-auto max-h-[90vh] overflow-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={onClose}
            className="absolute top-2 right-2 bg-red-600 hover:bg-red-700 rounded-full p-1.5 transition-colors z-10"
          >
            <X className="w-4 h-4 text-white" />
          </button>
          <img
            src={src}
            alt="Preview"
            className="w-full h-auto max-h-[80vh] object-contain rounded"
          />
        </div>
      </div>
    );
  }

  // ── Slider: multiple images ────────────────────────────────
  return (
    <div
      style={modal_style}
      className="fixed inset-0 !top-0 bg-black bg-opacity-75 flex items-center justify-center z-[9999] p-4 sm:p-6"
      onClick={onClose}
    >
      <div
        className="relative bg-white dark:bg-gray-800 rounded-lg p-5 sm:p-4 w-full max-w-md mx-auto max-h-[90vh] overflow-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Counter — top left */}
        <div className="absolute top-2 left-2 z-10 bg-black/50 text-white text-xs font-semibold px-2 py-0.5 rounded-full">
          {currentIndex + 1} / {images.length}
        </div>

        {/* Close — top right */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 bg-red-600 hover:bg-red-700 rounded-full p-1.5 transition-colors z-10"
        >
          <X className="w-4 h-4 text-white" />
        </button>

        {/* Image */}
        <img
          key={src}
          src={src}
          alt={`Preview ${currentIndex + 1}`}
          className="w-full h-auto max-h-[80vh] object-contain rounded"
        />

        {/* Prev arrow */}
        <button
          onClick={prev}
          className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-black/40 hover:bg-black/70 text-white rounded-full p-1.5 transition-colors"
        >
          <ChevronLeft size={22} />
        </button>

        {/* Next arrow */}
        <button
          onClick={next}
          className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-black/40 hover:bg-black/70 text-white rounded-full p-1.5 transition-colors"
        >
          <ChevronRight size={22} />
        </button>
      </div>
    </div>
  );
};

export default ImagePreviewModal;
