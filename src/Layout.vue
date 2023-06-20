<script setup>
import CHeader from './components/CHeader.vue';
import CFooter from './components/CFooter.vue';
</script>
<template>
  <div class="layout">
    <CHeader />
    <div class="main-view">
      <router-view />
    </div>
    <CFooter />
  </div>
</template>
<style scoped>
.layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
.main-view {
  flex-grow: 1;
}
</style>
