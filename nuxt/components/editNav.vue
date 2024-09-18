<script setup>
import { store } from "~/store";
</script>
<template>
  <div class="flex-none w-1/5 mr-4 overflow-auto max-h-svh">
    <v-list lines="one" variant="tonal">
      <v-list-item
        v-for="n in store.navItems.filter((x) => (x.category = nav))"
        :value="n.id"
        :key="n.id"
        :title="n.title"
        :subtitle="n.date_source_author"
        @click="getByPk(n.id)"
        rounded
        class="mb-4 px-4 py-2"
      >
        <div class="flex flex-row items-center justify-between w-full py-4">
          <v-btn v-if="n.priority != 1" prepend-icon="mdi-arrow-up"> Up</v-btn>
          <v-btn
            v-if="
              n.priority !=
              store.navItems.filter((x) => x.category == n.category).length
            "
            prepend-icon="mdi-arrow-down"
            >Down
          </v-btn>
        </div>
      </v-list-item>
    </v-list>
  </div>
</template>
