<script setup>
const toggle = ref("categorize");
import { store } from '~/store';
</script>
<template>
  <div class="flex flex-col items-center justify-center w-full pt-8 h-full">
    <div class="flex flex-row gap-4 items-center justify-center">
      <p>Mode:</p>
      <v-btn-toggle divided variant="outlined" v-model="toggle" color="primary" mandatory>
        <v-btn value="categorize">Categorize</v-btn>
        <v-btn  value="order">Order</v-btn>
        <v-btn value="edit">Edit Content</v-btn>
      </v-btn-toggle>
    </div>

    <!-- <div class="flex flex-row w-full pt-8 h-full">
      <v-card v-for="nav in navCategories" class="flex items=-center justify-center w-1/5 min-h-full">
         {{nav}}
      </v-card>
    </div> -->
<div class="flex flex-row w-full pt-8 h-full items-center
">
    <v-list class="w-full" v-for="nav in navCategories">
        <v-list-subheader>{{ nav }}</v-list-subheader>
        <v-list-item
          v-for="item in store.navItems.filter((x) => x.category == nav)"
          :title="item.title"
          :subtitle="item.date_source_author"
        >
          <template v-slot:prepend
            ><v-btn
              v-if="item.priority != 1"
              size="x-small"
              icon="mdi-arrow-up"
            ></v-btn
          ></template>
          <template v-slot:append
            ><v-btn
              v-if="
                item.priority !=
                store.navItems.filter((x) => x.category == nav).length
              "
              size="x-small"
              icon="mdi-arrow-down"
            ></v-btn
          ></template>
        </v-list-item>
      </v-list>
      </div>
  </div>
</template>
