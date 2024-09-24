<script setup>
import { store } from "~/store";
</script>

<template>
  <div v-if="store.tab == 'export'">I am bottom</div>
</template>
