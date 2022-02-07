
import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [{
    path: '/minesweeper',
    name: 'minesweeper',
    component: () => import('../views/mine-sweeper/index.vue'),
  }]
})

export default router