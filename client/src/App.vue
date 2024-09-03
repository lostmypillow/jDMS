<script setup>
import { RouterView } from "vue-router";
import { onMounted } from "vue";
import SideBarPreview from "./components/SideBarPreview.vue";
import SidebarNav from "./components/SidebarNav.vue";
import DrawerContent from "./components/DrawerContent.vue";
import DrawerSide from "./components/DrawerSide.vue";
import DrawerMain from "./components/DrawerMain.vue";
import { importFromFB } from "../lib/importFromFB";

onMounted(async () => {
  await importFromFB()
});
</script>

<template>
  {{ links }}

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
