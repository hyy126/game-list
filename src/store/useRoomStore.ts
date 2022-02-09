import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useEasyGoStore } from './useEasyGoStore'

export const useRoomStore = defineStore('useRoomStore', () => {
  let listeners: Array<(...args: any) => void> = []

  const room = ref('')
  const { unsubscribe } = useEasyGoStore()
  const setRoom = (payload: string) => {
    room.value = payload
  }

  const clearRoom = () => {
    if (room.value) {
      unsubscribe(room.value)
    }
    listeners = []
    room.value = ''
  }

  // 监听 receive 回调
  const listen = (fn: (...args: any) => void) => {
    listeners.push(fn)
  }

  // 消息分发
  const trigger = (msg: string) => {
    listeners.forEach((fn) => fn(msg))
  }

  return {
    room,
    setRoom,
    clearRoom,
    listen,
    trigger
  }
})