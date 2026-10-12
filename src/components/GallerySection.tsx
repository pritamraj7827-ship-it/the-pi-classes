import React, { useState, useEffect, useCallback } from 'react';
import { GALLERY_IMAGES, INSTITUTE_INFO } from '../data/instituteData';
import { GalleryImage } from '../types';
import { 
  Camera, 
  Sparkles, 
  X, 
  ChevronLeft, 
  ChevronRight, 
  Calendar, 
  MapPin, 
  ZoomIn, 
  CheckCircle2,
  Image as ImageIcon
} from 'lucide-react';

interface GallerySectionProps {
  onOpenDemoModal: () => void;
}

export const GallerySection: React.FC<GallerySectionProps> = ({ onOpenDemoModal }) => {
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [filter, setFilter] = useState<'All' | 'Classroom' | 'Academic Sessions' | 'Celebrations & Events' | 'Mentorship'>('All');
  const [showAll, setShowAll] = useState<boolean>(false);

  const filteredImages = filter === 'All' 
    ? GALLERY_IMAGES 
    : GALLERY_IMAGES.filter((img) => img.category === filter);

  // Initial display limit if not showing all
  const INITIAL_COUNT = 8;
  const displayedImages = showAll ? filteredImages : filteredImages.slice(0, INITIAL_COUNT);

  // Category counts
  const categoryCounts = {
    All: GALLERY_IMAGES.length,
    Classroom: GALLERY_IMAGES.filter(img => img.category === 'Classroom').length,
    'Academic Sessions': GALLERY_IMAGES.filter(img => img.category === 'Academic Sessions').length,
    'Celebrations & Events': GALLERY_IMAGES.filter(img => img.category === 'Celebrations & Events').length,
    Mentorship: GALLERY_IMAGES.filter(img => img.category === 'Mentorship').length,
  };

  const handleNext = useCallback(() => {
    if (!selectedImage) return;
    const currentIndex = filteredImages.findIndex((img) => img.id === selectedImage.id);
    const nextIndex = (currentIndex + 1) % filteredImages.length;
    setSelectedImage(filteredImages[nextIndex]);
  }, [selectedImage, filteredImages]);

  const handlePrev = useCallback(() => {
    if (!selectedImage) return;
    const currentIndex = filteredImages.findIndex((img) => img.id === selectedImage.id);
    const prevIndex = (currentIndex - 1 + filteredImages.length) % filteredImages.length;
    setSelectedImage(filteredImages[prevIndex]);
  }, [selectedImage, filteredImages]);

  // Keyboard controls for modal navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!selectedImage) return;
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'Escape') setSelectedImage(null);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedImage, handleNext, handlePrev]);

  const currentSelectedIndex = selectedImage
    ? filteredImages.findIndex((img) => img.id === selectedImage.id)
    : -1;

  return (
    <section id="gallery" className="py-20 bg-slate-900 text-white relative overflow-hidden border-b border-slate-800">
      {/* Subtle Background Lighting */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute top-10 left-1/4 w-96 h-96 bg-indigo-600/30 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-amber-500/20 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-400/30 text-amber-300 text-xs font-semibold uppercase tracking-wider">
            <Camera className="w-3.5 h-3.5 text-amber-400" />
            <span>Campus Life & Learning Environment</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white">
            Life at <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-200 to-yellow-400">The PI Classes</span>
          </h2>

          <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Take a visual tour of our classrooms, student interactions, Teachers' Day celebrations, and academic mentorship sessions at our Mirchaibari centre in Katihar.
          </p>

          {/* Filter Pills with Counts */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-4">
            {(['All', 'Classroom', 'Academic Sessions', 'Celebrations & Events', 'Mentorship'] as const).map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setFilter(cat);
                  setShowAll(false);
                }}
                className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer flex items-center gap-2 ${
                  filter === cat
                    ? 'bg-amber-400 text-slate-950 shadow-md shadow-amber-400/20 font-bold'
                    : 'bg-slate-800/80 hover:bg-slate-700/80 text-slate-300 border border-slate-700'
                }`}
              >
                <span>{cat === 'All' ? 'All Institute Moments' : cat}</span>
                <span className={`px-1.5 py-0.2 rounded-full text-[10px] font-bold ${
                  filter === cat ? 'bg-slate-950/20 text-slate-950' : 'bg-slate-700 text-amber-300'
                }`}>
                  {categoryCounts[cat]}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {displayedImages.map((image) => (
            <div
              key={image.id}
              onClick={() => setSelectedImage(image)}
              className="group relative bg-slate-800 rounded-2xl overflow-hidden border border-slate-700/80 shadow-lg hover:shadow-2xl hover:border-amber-400/50 transition-all duration-300 flex flex-col cursor-pointer transform hover:-translate-y-1"
            >
              {/* Image Container with 4:3 Aspect Ratio */}
              <div className="relative aspect-4/3 w-full overflow-hidden bg-slate-950">
                <img
                  src={image.url}
                  alt={image.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />

                {/* Badge on Top Left */}
                <div className="absolute top-3 left-3">
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-slate-900/90 text-amber-300 border border-amber-400/40 backdrop-blur-xs">
                    <Sparkles className="w-3 h-3" />
                    {image.tag}
                  </span>
                </div>

                {/* Hover Zoom Icon */}
                <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="w-8 h-8 rounded-full bg-amber-400 text-slate-950 flex items-center justify-center shadow-lg">
                    <ZoomIn className="w-4 h-4" />
                  </div>
                </div>

                {/* Bottom Overlay Info on Thumbnail */}
                <div className="absolute bottom-3 left-3 right-3 text-left">
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-indigo-300">
                    {image.category}
                  </span>
                  <h3 className="text-sm font-bold text-white line-clamp-1 group-hover:text-amber-300 transition-colors">
                    {image.title}
                  </h3>
                </div>
              </div>

              {/* Card Footer Detail */}
              <div className="p-4 bg-slate-800/90 flex-1 flex flex-col justify-between border-t border-slate-700/60">
                <p className="text-xs text-slate-300 leading-relaxed line-clamp-2">
                  {image.caption}
                </p>
                <div className="mt-3 pt-3 border-t border-slate-700/50 flex items-center justify-between text-[11px] text-slate-400">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-amber-400" />
                    Mirchaibari Centre
                  </span>
                  <span className="text-amber-400 font-semibold group-hover:underline flex items-center gap-1">
                    View Photo →
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Load More / Show All Photos Button */}
        {filteredImages.length > INITIAL_COUNT && (
          <div className="mt-10 text-center">
            <button
              onClick={() => setShowAll(!showAll)}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-300 border border-slate-600 font-bold text-sm shadow-md transition-all cursor-pointer"
            >
              <ImageIcon className="w-4 h-4" />
              <span>
                {showAll 
                  ? `Show Less (Collapse to ${INITIAL_COUNT} Photos)` 
                  : `View All ${filteredImages.length} Photos in ${filter === 'All' ? 'Gallery' : filter}`}
              </span>
            </button>
          </div>
        )}

        {/* Bottom Banner inside Gallery: Experience it yourself */}
        <div className="mt-14 p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-indigo-950 via-slate-800 to-indigo-950 border border-indigo-500/30 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-2 text-center md:text-left">
            <h3 className="text-xl sm:text-2xl font-black text-white">
              Want to experience our classroom atmosphere in person?
            </h3>
            <p className="text-slate-300 text-sm max-w-xl">
              Parents and students are welcome to visit our institute near Indira Gandhi Pustakalay, Mirchaibari, Katihar, meet faculty, and attend 2 free demo classes.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              onClick={onOpenDemoModal}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl text-slate-950 bg-gradient-to-r from-amber-400 to-amber-300 hover:from-amber-300 hover:to-amber-200 font-bold text-sm shadow-md transition-all cursor-pointer"
            >
              <Calendar className="w-4 h-4" />
              <span>Book Free Demo Class</span>
            </button>
            <a
              href={`tel:${INSTITUTE_INFO.cleanPhone}`}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl text-white bg-slate-700/80 hover:bg-slate-700 border border-slate-600 font-semibold text-sm transition-all"
            >
              <span>Call: {INSTITUTE_INFO.phone}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Lightbox / Image Modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/90 backdrop-blur-md animate-in fade-in duration-200"
          onClick={() => setSelectedImage(null)}
        >
          <div 
            className="relative max-w-4xl w-full bg-slate-900 border border-slate-700 rounded-2xl overflow-hidden shadow-2xl flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Top Bar */}
            <div className="flex items-center justify-between px-5 py-3.5 bg-slate-950 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                  The PI Classes • {selectedImage.category}
                </span>
                <span className="text-xs text-slate-400 bg-slate-800 px-2 py-0.5 rounded-full font-mono">
                  {currentSelectedIndex + 1} / {filteredImages.length}
                </span>
              </div>
              <button
                onClick={() => setSelectedImage(null)}
                className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
                title="Close (Esc)"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Image Display with Prev/Next Controls */}
            <div className="relative bg-black flex items-center justify-center min-h-[300px] sm:min-h-[440px] max-h-[65vh]">
              <img
                src={selectedImage.url}
                alt={selectedImage.title}
                referrerPolicy="no-referrer"
                className="max-h-[65vh] w-auto max-w-full object-contain mx-auto"
              />

              {/* Prev / Next Arrows */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handlePrev();
                }}
                className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-slate-900/80 hover:bg-amber-400 hover:text-slate-950 text-white border border-slate-700 flex items-center justify-center transition-colors cursor-pointer shadow-lg"
                title="Previous Photo (Left Arrow)"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleNext();
                }}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-slate-900/80 hover:bg-amber-400 hover:text-slate-950 text-white border border-slate-700 flex items-center justify-center transition-colors cursor-pointer shadow-lg"
                title="Next Photo (Right Arrow)"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>

            {/* Thumbnail Navigation Bar */}
            <div className="bg-slate-950 px-4 py-2 overflow-x-auto flex items-center gap-2 border-t border-slate-800 scrollbar-thin">
              {filteredImages.map((thumb) => (
                <button
                  key={thumb.id}
                  onClick={() => setSelectedImage(thumb)}
                  className={`relative shrink-0 w-12 h-9 rounded-md overflow-hidden border-2 transition-all cursor-pointer ${
                    thumb.id === selectedImage.id 
                      ? 'border-amber-400 scale-105 opacity-100' 
                      : 'border-transparent opacity-50 hover:opacity-80'
                  }`}
                  title={thumb.title}
                >
                  <img
                    src={thumb.url}
                    alt={thumb.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>

            {/* Modal Details Footer */}
            <div className="p-5 sm:p-6 bg-slate-900 border-t border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="inline-flex items-center gap-2 mb-1">
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-400/20 text-amber-300 border border-amber-400/30">
                    {selectedImage.tag}
                  </span>
                  <span className="text-xs text-slate-400 flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-amber-400" />
                    Near Indira Gandhi Pustakalay, Mirchaibari
                  </span>
                </div>
                <h4 className="text-base sm:text-lg font-bold text-white">
                  {selectedImage.title}
                </h4>
                <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl">
                  {selectedImage.caption}
                </p>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => {
                    setSelectedImage(null);
                    onOpenDemoModal();
                  }}
                  className="px-4 py-2.5 rounded-xl text-xs font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 transition-colors cursor-pointer"
                >
                  Book Free Demo
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
