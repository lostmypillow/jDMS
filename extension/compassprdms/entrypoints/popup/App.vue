<script lang="ts" setup>
import HelloWorld from '@/components/HelloWorld.vue';
const tab = ref(null)
</script>

<template>
  <div class="h-full  pt-0">

     <v-card class="w-full">
    <v-tabs
      v-model="tab"
      bg-color="primary"
    >
      <v-tab value="import">Import</v-tab>
      <v-tab value="two">Item Two</v-tab>
      <v-tab value="three">Item Three</v-tab>
    </v-tabs>

    <v-card-text>
      <v-tabs-window v-model="tab">
        <v-tabs-window-item value="one">
          One
        </v-tabs-window-item>

        <v-tabs-window-item value="two">
          Two
        </v-tabs-window-item>

        <v-tabs-window-item value="three">
          Three
        </v-tabs-window-item>
      </v-tabs-window>
    </v-card-text>
  </v-card>
  </div>
 
</template>