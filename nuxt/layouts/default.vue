<script setup>
const route = useRoute();
</script>
<template>
  <v-layout class="rounded rounded-md">
    <!-- <v-navigation-drawer expand-on-hover rail>
      <v-list>
        <v-list-item
          prepend-icon="mdi-home"
          subtitle="sandra_a88@gmailcom"
          title="JDMS"
          nuxt
          to="/"
        ></v-list-item>
      </v-list>

      <v-divider></v-divider>

      <v-list density="compact" nav>
        <v-list-item
          prepend-icon="mdi-folder"
          title="Tabs"
          value="myfiles"
          nuxt
          to="/tabs"
          :active="route.fullPath === '/tabs'"
        ></v-list-item>
        <v-list-item
          prepend-icon="mdi-account-multiple"
          title="Shared with me"
          value="shared"
        ></v-list-item>
        <v-list-item
          prepend-icon="mdi-star"
          title="Starred"
          value="starred"
        ></v-list-item>
      </v-list>
    </v-navigation-drawer> -->

    <!-- <v-app-bar title="Application bar"></v-app-bar> -->
    <v-app-bar :elevation="2" rounded>
      <!-- <template v-slot:prepend>
        <v-app-bar-nav-title>JDMS</v-app-bar-nav-title>
      </template> -->

      <v-app-bar-title>
        <v-btn prepend-icon="mdi-home" to="/">Home</v-btn>

        <v-btn prepend-icon="mdi-download" to="/import">Import</v-btn>
        <v-btn prepend-icon="mdi-eye" to="/preview">Preview</v-btn>
        <v-btn prepend-icon="mdi-export" to="/export"
          >Export</v-btn
        ></v-app-bar-title
      >

      <template v-slot:append>
       
      </template>
    </v-app-bar>
    <v-main height="100vh" class="flex items-start justify-center ">
      <slot />
    </v-main>
  </v-layout>
</template>
