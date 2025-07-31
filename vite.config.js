import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite' // 1. Importe o plugin

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(), // 2. Adicione o plugin aqui
  ],
})