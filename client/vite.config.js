import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import VueRouter from 'unplugin-vue-router/vite'
// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
"/scrape": "http://localhost:3002/",
"/update": "http://localhost:3002/",
"/get": "http://localhost:3002/"
    }
  },
  plugins: [VueRouter({
    /* options */
  }),vue()],
  build: {
    outDir: "../server/public/"
  }
 
});
