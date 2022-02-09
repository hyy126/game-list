import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from "path"

// https://vitejs.dev/config/

export default ({ mode }) => {
  const __DEV__ = mode === 'development'
  return defineConfig({
    base: __DEV__ ? '/' : `https://hyy126.github.io/game-list/dist`,
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "src")
      }
    },
    plugins: [vue()]
  })
}
