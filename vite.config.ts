import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  base: `https://hyy126.github.io/game-list/dist`,
  plugins: [vue()]
})
