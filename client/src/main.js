import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";

createApp(App)
  .use(PrimeVue, {
    theme: {
      preset: Aura,
    },
  })
  
  .mount("#app");
