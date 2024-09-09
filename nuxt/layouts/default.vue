<script setup>
const route = useRoute();
import { store } from "~/store";
</script>
<template>
  <v-layout class="rounded rounded-md">
    <!-- <v-app-bar :elevation="2" rounded>


      <v-app-bar-title>
        <v-btn prepend-icon="mdi-home" to="/">Home</v-btn>

        <v-btn prepend-icon="mdi-download" to="/import">Import</v-btn>
        <v-btn prepend-icon="mdi-eye" to="/preview">Preview</v-btn>
        <v-btn prepend-icon="mdi-export" to="/export"
          >Export</v-btn
        ></v-app-bar-title
      >
    </v-app-bar> -->
    <v-navigation-drawer class="flex">
      <v-list-item title="JDMS" subtitle="subtitle"></v-list-item>
      <v-divider></v-divider>
      <v-list-item prepend-icon="mdi-home" to="/" title="Home"></v-list-item>
      <v-list-item
        prepend-icon="mdi-download"
        to="/import"
        title="Import"
      ></v-list-item>
 
      <v-list-item
        prepend-icon="mdi-eye"
        to="/preview"
        title="Preview"
      ></v-list-item>
      <v-list-item
        prepend-icon="mdi-export"
        to="/export"
        title="Export"
      ></v-list-item>
      <v-divider></v-divider>

      <v-list v-for="nav in navCategories">
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
    </v-navigation-drawer>
    <v-main height="100vh" class="flex items-start justify-center">
      <slot />
    </v-main>
  </v-layout>
</template>
