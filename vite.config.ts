import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import * as path from "path";
import svgr from 'vite-plugin-svgr';

export default defineConfig({
plugins: [react(), svgr()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@components': path.resolve(__dirname, 'src/components'), 
      '@styles': path.resolve(__dirname, 'src/styles'),
      '@api': path.resolve(__dirname, 'src/api'),  
    },
  },
})
