
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [{
    path: '/minesweeper',
    name: 'minesweeper',
    component: () => import('../views/mine-sweeper/index.vue'),
  }]
})

export default router