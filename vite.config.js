import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: "/",
  server: {
    historyApiFallback: true, // <-- ensures React Router works on refresh/back
  },
  build: {
    // Optimize for production
    minify: 'terser',
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
        },
      },
    },
  },
  // SEO: Ensure proper meta tags are preserved
  html: {
    minify: false, // Keep HTML readable for SEO
  },
});