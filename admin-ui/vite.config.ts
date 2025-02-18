// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  test: {
    // Use the jsdom environment to simulate a browser
    environment: 'jsdom',
    // If using TypeScript, include .test.tsx or similar in "include"
    globals: true, // optional: you can use "describe, it" without importing
    setupFiles: [], // optional: path to a test setup file
  },
})