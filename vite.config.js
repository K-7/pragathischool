import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  ssgOptions: {
    entry: 'src/main.jsx',
    formatting: 'minify',
    dirStyle: 'nested',
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./src/test/setup.js'],
    include: ['src/**/*.test.{js,jsx}', 'test/**/*.test.{js,jsx}'],
  },
})
