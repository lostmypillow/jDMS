<script setup>
import { store } from '~/stores/store';
</script>

<template>
  <div
    class="w-full flex items-center justify-center h-14 z-500 absolute"
  >
    <v-btn-toggle
      elevation="10"
      color="primary"
      rounded="xl"
      v-model="store.tab"
      mandatory
    >
      <v-btn value="import">Import</v-btn>
      <v-btn value="edit">Edit</v-btn>
      <v-btn value="export">Export</v-btn>
    </v-btn-toggle>
  </div>
</template>
