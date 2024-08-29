<script setup>
import { useRouter } from "vue-router";
import { store } from "./store";
import { computed, onMounted, ref } from "vue";
import ImportLinksBtn from "./components/ImportLinksBtn.vue";
const router = useRouter();
import { tellDb } from "../lib/tellDb";
import { syncToStore } from "../lib/syncToStore";
import Sidebar from "./components/Sidebar.vue";
import HomeBtn from "./components/HomeBtn.vue";
import MobileNavBar from "./components/MobileNavBar.vue";
import DrawerOverlay from "./components/DrawerOverlay.vue";
import DrawerContent from "./components/DrawerContent.vue";
import DrawerToggle from "./components/DrawerToggle.vue";
// await syncToStore("sync", await tellDb("sync"));
console.log(store.newsContentsByCat);
</script>

<template>
  <main class="flex flex-col h-screen">
    <MobileNavBar />
    <Drawer>
      <DrawerToggle />
      <DrawerContent>
        <RouterView></RouterView>
      </DrawerContent>

      <Sidebar>
        <!-- Sidebar content here -->
        <DrawerOverlay />
        <HomeBtn />
        <ImportLinksBtn />

        <li v-for="key in Object.keys(store.newsContentsByCat)">
          <h2 class="menu-title">{{ key }}</h2>
          <ul>
            <li v-for="s in store.newsContentsByCat[key]">
              <a @click="router.push({ path: `/edit/${s.id}`, replace: true })">
                {{ s.title }}
              </a>
            </li>
          </ul>
        </li>

        
      </Sidebar>
    </Drawer>
  </main>
</template>
