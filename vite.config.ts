import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'

console.log(loadEnv('devlopment', './'))

// https://vitejs.dev/config/

export default ({ mode }) => {
  const __DEV__ = mode === 'development'
  return defineConfig({
    base: __DEV__ ? '/' : `https://hyy126.github.io/game-list/dist`,
    plugins: [vue()]
  })
}
