import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server:{
    proxy:{
      target: 'http://localhost:5278/',
      changeOrigin: true,
    }
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'), // Replace './src' with your source directory
      // Add more aliases as needed:
      // '~': path.resolve(__dirname, './node_modules'),
    },
  },
})
