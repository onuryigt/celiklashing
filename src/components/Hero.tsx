import { Link } from 'react-router-dom'
import React from 'react'

const Hero: React.FC = () => {
  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="text-center w-full px-2 sm:px-4 md:px-8 max-w-4xl mx-auto pt-32 md:pt-40">
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
          Lashing Hizmeti için Birebir Çözümler
        </h1>
        <p className="text-lg md:text-xl text-gray-600 mb-8">
          2000 yılından bu yana denizcilik ve yük sabitleme alanında profesyonel hizmet veriyoruz
        </p>
        <div className="flex flex-col sm:flex-row justify-center items-center gap-3 mt-8 px-4">
          <Link
            to="/iletisim"
            className="bg-[#4B9CD3] hover:bg-[#4B9CD3]/90 text-white px-6 py-2.5 rounded-full text-sm sm:text-base md:text-lg font-medium transition-colors duration-300 w-full sm:w-auto min-w-[200px]"
          >
            İletişime Geç
          </Link>
          <Link
            to="/hizmetler"
            className="bg-white hover:bg-gray-50 text-[#4B9CD3] border-2 border-[#4B9CD3] px-6 py-2.5 rounded-full text-sm sm:text-base md:text-lg font-medium transition-colors duration-300 w-full sm:w-auto min-w-[200px]"
          >
            Hizmetler
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Hero