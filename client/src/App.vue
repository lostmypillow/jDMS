<script setup>
import { RouterView } from "vue-router";
import { onMounted } from "vue";
import { syncDbToStore } from "../lib/syncDbToStore";
import SideBarPreview from "./components/SideBarPreview.vue";
import SidebarNav from "./components/SidebarNav.vue";
import DrawerContent from "./components/DrawerContent.vue";
import DrawerSide from "./components/DrawerSide.vue";
import DrawerMain from "./components/DrawerMain.vue";

onMounted(async () => {
  await syncDbToStore();
});
</script>

<template>
  <DrawerMain>
    <DrawerContent>
      <RouterView />
    </DrawerContent>

    <DrawerSide>
      <SidebarNav />
      <SideBarPreview />
    </DrawerSide>
  </DrawerMain>
</template>
