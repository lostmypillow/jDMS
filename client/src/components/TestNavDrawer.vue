<script setup lang="ts">
import TestNav from './TestNav.vue';
import TestSideBar from './TestSideBar.vue';
</script>

<template>
    <div class="drawer">
  <input id="my-drawer-3" type="checkbox" class="drawer-toggle" />
  <div class="drawer-content flex flex-col">
    <!-- Navbar -->
   <TestNav />
   <div >
    <slot></slot></div>
  </div>
  <div class="drawer-side">
    <label for="my-drawer-3" aria-label="close sidebar" class="drawer-overlay"></label>
    <TestSideBar />
  </div>
</div>
</template>