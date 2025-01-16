import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const CookieConsent: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookieConsent');
    if (!consent) {
      setIsVisible(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookieConsent', 'true');
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className="fixed bottom-4 left-4 right-4 md:left-8 md:right-auto md:max-w-lg bg-white rounded-2xl shadow-2xl border border-gray-100 z-50 backdrop-blur-lg bg-white/90"
        >
          <div className="p-6">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <svg className="w-6 h-6 text-primary" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2C6.477 2 2 6.477 2 12C2 17.523 6.477 22 12 22C17.523 22 22 17.523 22 12C22 6.477 17.523 2 12 2ZM12 20C7.589 20 4 16.411 4 12C4 7.589 7.589 4 12 4C16.411 4 20 7.589 20 12C20 16.411 16.411 20 12 20ZM11 7H13V9H11V7ZM11 11H13V17H11V11Z" fill="currentColor"/>
                  </svg>
                </div>
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Çerez Kullanımı
                </h3>
                <p className="text-gray-600 mb-4 leading-relaxed">
                  Size daha iyi bir deneyim sunmak için çerezler kullanıyoruz. Sitemizi kullanmaya devam ederek, çerez kullanımımızı kabul etmiş olursunuz.
                </p>
                <div className="flex flex-wrap items-center gap-3">
                  <button
                    onClick={handleAccept}
                    className="bg-primary text-white px-6 py-2.5 rounded-lg hover:bg-primary/90 transition-colors text-sm font-medium shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30"
                  >
                    Kabul Et
                  </button>
                  <div className="text-sm text-gray-500">
                    <Link to="/cerez-politikasi" className="text-primary hover:text-primary/80 font-medium hover:underline">
                      Çerez Politikası
                    </Link>
                    {' '} ve {' '}
                    <Link to="/kvkk" className="text-primary hover:text-primary/80 font-medium hover:underline">
                      KVKK Aydınlatma Metni
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CookieConsent; 