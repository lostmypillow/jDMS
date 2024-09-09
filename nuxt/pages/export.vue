<script setup>
import { useClipboard } from "@vueuse/core";
import { store } from "~/store";
const x = store.navItems;
const copyType = ref("All");
const formatSource = copyType == "All"
    ? formatForCopy(store.navItems)
    : formatForCopy(store.navItems.filter((x) => x.category == copyType))
const source = formatForCopy(store.navItems)
const { text, copy, copied, isSupported } = useClipboard({ source });

</script>
<template>
  <!-- <p>i am export</p>
  <button class="btn btn-primary">Get Docx</button> -->

  <div class="flex flex-col items-center justify-center pt-6">
    <div class="text-center font-bold text-xl">Copy Data</div>
    <v-btn-toggle
      v-model="copyType"
      color="deep-purple-accent-3"
      rounded="0"
      group
    >
      <v-btn value="All">All</v-btn>
      <v-btn v-for="nav in navCategories" :value="nav">{{ nav }} </v-btn>
    </v-btn-toggle>
    <div v-if="isSupported">
      <v-btn @click="copy(source)">
        <!-- by default, `copied` will be reset in 1.5s -->
        <span v-if="!copied">Copy</span>
        <span v-else>Copied!</span>
      </v-btn>
      <p>
        Current copied: <code>{{ text || "none" }}</code>
      </p>
    </div>
    <p v-else>Your browser does not support Clipboard API</p>
  </div>
</template>
