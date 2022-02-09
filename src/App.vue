<script setup lang="ts">
import { NMessageProvider } from 'naive-ui'
import RoomManage from '@/components/RoomManage.vue'
</script>

<template>
  <n-message-provider>
    <section id="app">
      <div class="router-wrapper">
        <router-link to="minesweeper">扫雷</router-link>
        <router-link to="fiveinarow">五子棋</router-link>
      </div>
      <RoomManage />
      <router-view></router-view>
    </section>
  </n-message-provider>
</template>

<style>
#app {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}

.router-wrapper {
  width: 100%;
}

a {
  margin: 10px;
  text-decoration: none;
}
</style>
