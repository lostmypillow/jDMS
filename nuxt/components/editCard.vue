<script setup>
const props = defineProps(["category", "items", "toggle"]);
import { store } from "~/store";
async function moveUp(item) {
  const response = await $fetch("/api/order", {
    method: "POST",
    body: { element: item, direction: "up" },
  });
  await syncData(0);
  return;
}
async function moveDown(item) {
  const response = await $fetch("/api/order", {
    method: "POST",
    body: { element: item, direction: "down" },
  });
  console.log("before sync")
  await syncData(0);
  console.log("after sync")
  return;
}
</script>
<template>
  <v-list class="w-full">
    <v-list-subheader class="flex items-center justify-center">
      {{ props.category }}
    </v-list-subheader>

    <v-list-item
      class="border-2 border-red-600"
      v-for="item in props.items"
      :title="item.title"
      :subtitle="item.date_source_author"
    >
      <template v-slot:prepend>
        <v-btn
          v-if="item.priority != 1 && props.toggle == 'order'"
          size="x-small"
          icon="mdi-arrow-up"
          @click="moveUp(item)"
        ></v-btn>
      </template>

      <template v-slot:append>
        <v-btn
          v-if="
            item.priority !=
              store.navItems.filter((x) => x.category == nav).length &&
            props.toggle == 'order'
          "
          size="x-small"
          icon="mdi-arrow-down"
          @click="moveDown(item)"
        >
        </v-btn>
      </template>
    </v-list-item>
  </v-list>
</template>
