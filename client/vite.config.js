import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import VueRouter from 'unplugin-vue-router/vite'
// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
"/news/scrape": "http://localhost:3002/",
"/news/get": "http://localhost:3002/"
    }
  },
  plugins: [VueRouter({
    /* options */
  }),vue()],
  build: {
    outDir: "../server/public/"
  }
 
});
