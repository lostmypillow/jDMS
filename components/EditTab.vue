<script setup>
import { store } from '~/store';
</script>
<template>
    <div class="flex flex-row w-full h-full p-6" v-if="store.tab == 'edit'"  >
      <v-list
        class="w-1/5 border-red-500 border-2"
        v-for="i in store.navCategories"
      >
        <v-list-subheader>{{ i }}</v-list-subheader>
        <v-list-item><v-btn>I am a button</v-btn></v-list-item>
      </v-list>
    </div>
</template>