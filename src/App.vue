<template>
  <!-- <RouterView /> -->
  <!-- <RouterView v-slot="{ Component,route }">
      <KeepAlive  :include="['Index']">
        <component :is="Component" :key="route.fullPath" />
      </KeepAlive >
  </RouterView> -->
  <router-view v-slot="{ Component }">
    <keep-alive include="Index">
      <component :is="Component" />
    </keep-alive>
  </router-view>
</template>
<script setup lang="ts"></script>
<style scoped lang="less"></style>
