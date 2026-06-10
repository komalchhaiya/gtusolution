import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ isSsrBuild }) => ({
  plugins: [react()],
  base: "/",
  server: {
    historyApiFallback: true, // <-- ensures React Router works on refresh/back
  },
  build: {
    minify: 'esbuild',
    rollupOptions: isSsrBuild
      ? {}
      : {
          output: {
            manualChunks: {
              vendor: ['react', 'react-dom', 'react-router-dom'],
            },
          },
        },
  },
  html: {
    minify: false,
  },
}));