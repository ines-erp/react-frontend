import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve('./src'), // Replace './src' with your source directory
      // Add more aliases as needed:
      // '~': path.resolve(__dirname, './node_modules'),
    },
  },
})
