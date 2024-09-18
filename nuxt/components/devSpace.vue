<script setup>
import { store } from "~/store";
const oneobj = ref(store.allItems[0])
</script>
<template>
  im a dev

  <p>{{ store.count }}</p>
  <v-btn @click="console.log(store.allItems)">Click</v-btn>

  <v-text-field v-if="store.allItems[0]"  label="Label" v-model="store.allItems[0].title"></v-text-field>

 {{ store.allItems[0]?.title}}
</template>
