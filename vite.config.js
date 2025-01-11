import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'
import eslint from 'vite-plugin-eslint';
import path from 'path';

// https://vite.dev/config/
export default defineConfig({
    plugins: [react(), eslint()],
    resolve: {
        alias: {
            '@': path.resolve('./src'), // Replace './src' with your source directory
            // Add more aliases as needed:
            // '~': path.resolve(__dirname, './node_modules'),
        },
    },
    server: {
        proxy: {
            '/api': {
                target: 'http://localhost:5047/api/v1',
                changeOrigin: true,
                secure: true,
                rewrite: (path) => path.replace(/^\/api/, ''),
            },
        }
    }
})
