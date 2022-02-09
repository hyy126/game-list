<template>
  <section class="room-manage-wrapper">
    <p>当前所在房间: {{ roomStore.room }}</p>
    <section class="action-wrapper">
      <n-button type="info" @click="showCreateRoomModal = true">创建房间</n-button>
      <n-button type="info" @click="showJoinRoomModal = true">加入房间</n-button>
    </section>
    <n-modal v-model:show="showCreateRoomModal" :on-after-leave="handleModalLeave">
      <n-card style="width: 300px;" title="创建房间">
        <n-input v-model:value="roomName" type="text" placeholder="请输入房间名" />
        <template #footer>
          <n-button type="primary" :disabled="!roomName" @click="createRoom">确认</n-button>
        </template>
      </n-card>
    </n-modal>
    <n-modal v-model:show="showJoinRoomModal" :on-after-leave="handleModalLeave">
      <n-card style="width: 300px;" title="加入房间">
        <n-input v-model:value="roomName" type="text" placeholder="请输入房间名" />
        <template #footer>
          <n-button type="primary" :disabled="!roomName" @click="joinRoom">确认</n-button>
        </template>
      </n-card>
    </n-modal>
  </section>
</template>

<script setup lang="ts">
import { NButton, NModal, NCard, NInput } from 'naive-ui'
import { ref } from 'vue';
import { useEasyGoStore } from "@/store/useEasyGoStore"
import { useRoomStore } from "@/store/useRoomStore"

const roomStore = useRoomStore()

const showCreateRoomModal = ref(false)
const showJoinRoomModal = ref(false)

// 房间名
const roomName = ref('')

const handleModalLeave = () => {
  roomName.value = ''
}

const { receive } = useEasyGoStore()

// 创建房间
const createRoom = () => {
  receiveMsg()
  showCreateRoomModal.value = false
}

// 加入房间
const joinRoom = () => {
  receiveMsg()
  showJoinRoomModal.value = false
}

const receiveMsg = () => {
  receive(roomName.value, {
    onSuccess(channel) {
      roomStore.setRoom(channel)
    },
    onMessage(msg) {
      roomStore.trigger(msg)
    }
  })
}

</script>

<style lang="less">
.room-manage-wrapper {
  width: 100%;
  .action-wrapper {
    & > * {
      margin-right: 10px;
    }
  }
}
</style>