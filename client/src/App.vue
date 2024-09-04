<script setup>
import { RouterView } from "vue-router";
import { onMounted } from "vue";
import SideBarPreview from "./components/SideBarPreview.vue";
import SidebarNav from "./components/SidebarNav.vue";
import DrawerContent from "./components/DrawerContent.vue";
import DrawerSide from "./components/DrawerSide.vue";
import DrawerMain from "./components/DrawerMain.vue";
import { importFromFB } from "../lib/importFromFB";
import { store } from "./store";
import { importToDb } from "../lib/importToDb";
onMounted(async () => {
  // await importFromFB();
  store.fromFire = [
    "https://www.cool3c.com/article/223680",
    "https://www.chinatimes.com/realtimenews/20240902002984-260410?chdtv",
  ];
  await importToDb(store.fromFire)
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
