<script setup>
import { store } from "~/store";
</script>

<template>
  <div v-if="store.tab == 'export'" class="w-full h-full flex items-center justify-center">
    <v-btn variant="tonal" @click="exportDocx"> Export </v-btn>
    </div>
</template>
