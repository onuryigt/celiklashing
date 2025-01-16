import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { motion } from 'framer-motion'
import { FaWhatsapp } from 'react-icons/fa'

const MainLayout: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />

      {/* WhatsApp Button */}
      <motion.a
        href="https://wa.me/905462553676"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <div className="relative group">
          {/* Pulsing Effect */}
          <div className="absolute inset-0 rounded-full bg-green-500 opacity-20 group-hover:opacity-30 animate-ping" />
          
          {/* Main Button */}
          <div className="relative flex items-center gap-2 bg-green-500 text-white px-4 py-3 rounded-full shadow-lg hover:bg-green-600 transition-colors">
            <FaWhatsapp className="w-6 h-6" />
            <span className="text-sm font-medium hidden group-hover:inline-block whitespace-nowrap">
              WhatsApp İletişim
            </span>
          </div>

          {/* Tooltip */}
          <div className="absolute bottom-full right-0 mb-2 w-auto">
            <div className="bg-gray-900 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              7/24 Destek
            </div>
          </div>
        </div>
      </motion.a>
    </div>
  )
}

export default MainLayout