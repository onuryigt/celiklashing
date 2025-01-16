import React, { useState, useEffect } from 'react';
import { ref, listAll, getDownloadURL } from 'firebase/storage';
import { storage } from '../config/firebase';
import { motion, AnimatePresence } from 'framer-motion';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { FiMaximize2, FiX } from 'react-icons/fi';
// @ts-ignore
import Masonry from 'react-masonry-css';

interface GalleryImage {
  url: string;
  name: string;
  category: string;
}

const Gallery: React.FC = () => {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const breakpointColumns = {
    default: 4,
    1100: 3,
    700: 2,
    500: 1
  };

  useEffect(() => {
    loadImages();
  }, []);

  const loadImages = async () => {
    try {
      setLoading(true);
      setError(null);
      console.log('Loading images from Firebase Storage...');
      
      const storageRef = ref(storage, 'gallery');
      const result = await listAll(storageRef);
      
      console.log(`Found ${result.items.length} images`);
      
      const imagePromises = result.items.map(async (item) => {
        try {
          const url = await getDownloadURL(item);
          return {
            url,
            name: item.name,
            category: 'all'
          };
        } catch (error) {
          console.error(`Error getting download URL for ${item.name}:`, error);
          return null;
        }
      });

      const imageList = (await Promise.all(imagePromises))
        .filter((img): img is GalleryImage => img !== null);
      
      console.log(`Successfully loaded ${imageList.length} images`);
      setImages(imageList);
    } catch (error) {
      console.error('Error loading images:', error);
      setError('Görüntüler yüklenirken bir hata oluştu. Lütfen sayfayı yenileyin.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gray-900 py-24 px-6 mb-12">
        <div className="absolute inset-0 bg-black opacity-50" />
        <div className="relative max-w-7xl mx-auto text-center">
          <motion.h1 
            className="text-5xl md:text-6xl font-bold text-white mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            Projelerimiz
          </motion.h1>
          <motion.p 
            className="text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            Tamamladığımız projelerin görselleri ve başarı hikayelerimiz
          </motion.p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        {/* Error State */}
        {error && (
          <div className="text-center text-red-600 mb-8 p-4 bg-red-100 rounded-lg">
            {error}
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="flex flex-col items-center justify-center min-h-[400px]">
            <div className="w-16 h-16 relative">
              <div className="absolute top-0 left-0 w-full h-full border-4 border-gray-200 rounded-full"></div>
              <div className="absolute top-0 left-0 w-full h-full border-4 border-primary rounded-full animate-spin border-t-transparent"></div>
            </div>
            <p className="mt-4 text-gray-600">Görüntüler yükleniyor...</p>
          </div>
        )}

        {/* Gallery Grid */}
        {!loading && images.length > 0 && (
          <Masonry
            breakpointCols={breakpointColumns}
            className="flex -ml-4 w-auto"
            columnClassName="pl-4 bg-clip-padding"
          >
            {images.map((image, index) => (
              <motion.div
                key={image.url}
                className="mb-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div 
                  className="relative group overflow-hidden rounded-lg shadow-lg cursor-pointer"
                  onClick={() => setSelectedImage(image.url)}
                >
                  <LazyLoadImage
                    src={image.url}
                    alt={image.name}
                    effect="blur"
                    className="w-full h-auto transform group-hover:scale-105 transition-transform duration-500"
                    wrapperClassName="w-full"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <p className="text-white text-sm font-medium truncate">{image.name}</p>
                      <FiMaximize2 className="absolute bottom-4 right-4 text-white w-6 h-6" />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </Masonry>
        )}

        {/* No Images State */}
        {!loading && images.length === 0 && !error && (
          <div className="text-center text-gray-600 py-12">
            Henüz görüntü yüklenmemiş.
          </div>
        )}

        {/* Lightbox */}
        <AnimatePresence>
          {selectedImage && (
            <motion.div 
              className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedImage(null)}
            >
              <motion.div
                className="relative max-w-7xl mx-auto px-4"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ type: "spring", damping: 25 }}
                onClick={(e) => e.stopPropagation()}
              >
                <img
                  src={selectedImage}
                  alt="Selected"
                  className="max-h-[90vh] max-w-full object-contain rounded-lg shadow-2xl"
                />
                <button 
                  className="absolute top-4 right-4 text-white p-2 rounded-full hover:bg-white/10 transition-colors"
                  onClick={() => setSelectedImage(null)}
                >
                  <FiX className="w-6 h-6" />
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Gallery; 