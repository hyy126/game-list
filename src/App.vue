<script setup lang="ts">
</script>

<template>
  <section id="app">
    <router-link to="minesweeper">扫雷</router-link>
    <router-view></router-view>
  </section>
</template>

<style>
#app {
  display: flex;
  justify-content: center;
}
</style>
