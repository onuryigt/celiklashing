import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@emailjs/browser': '/node_modules/@emailjs/browser/dist/email.js'
    }
  }
}) 