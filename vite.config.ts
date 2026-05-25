import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// GitHub Pages: https://danilwayne.github.io/cine-memoravel/
export default defineConfig({
  plugins: [react()],
  base: '/cine-memoravel/',
})
