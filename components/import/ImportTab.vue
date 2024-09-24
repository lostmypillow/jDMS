<script setup>
import { store } from "~/store";
const errorMsg = ref()
const inputLink = ref()

</script>
<template>
  <div class="flex flex-row h-full w-full" v-if="store.tab == 'import'">
    <div class="flex flex-col items-center justify-center w-1/2">
      <ImportSection
        title="Import via LINE bot"
        subtitle="You don't have to do anything"
        type="half"
      />

      <ImportSection
        title="Import via extension"
        subtitle="List of links to import via browser extension"
        type="half"
      />
    </div>
    <ImportSection title="Import manually" subtitle="import manually" type="full" />
  </div>
</template>
