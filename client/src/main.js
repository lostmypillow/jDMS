import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import PrimeVue from "primevue/config";
import Aura from "@primevue/themes/aura";
import { createRouter, createWebHistory } from "vue-router";
import { routes } from "vue-router/auto-routes";
import { DataLoaderPlugin } from "unplugin-vue-router/data-loaders";
import { defineBasicLoader } from "unplugin-vue-router/data-loaders/basic";
import { importFromStore } from "../lib/importFromStore";


const router = createRouter({
  history: createWebHistory(),
  // pass the generated routes written by the plugin 🤖
  routes,
});
createApp(App).use(DataLoaderPlugin, { router }).use(router).mount("#app");
// 