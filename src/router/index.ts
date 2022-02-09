
import { createRouter, createWebHashHistory } from 'vue-router'
import { useRoomStore } from "@/store/useRoomStore"

const router = createRouter({
  history: createWebHashHistory(),
  routes: [{
    path: '/minesweeper',
    name: 'minesweeper',
    component: () => import('../views/mine-sweeper/index.vue'),
  }, {
    path: '/fiveinarow',
    name: 'fiveinarow',
    component: () => import('../views/five-in-a-row/index.vue'),
  }]
})


router.beforeEach(() => {
  const { clearRoom } = useRoomStore()

  // 离开房间

  clearRoom()
})

export default router