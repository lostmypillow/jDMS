// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  nitro: {
    firebase: {
      gen: 2,
      nodeVersion: '20',
      httpsOptions: {
        region: 'asia-east1',
        maxInstances: 3,
      },
    },
  },
  compatibilityDate: "2024-04-03",
  devtools: { enabled: true },
  modules: [
    "@nuxtjs/tailwindcss",
    "@vueuse/nuxt",
    "vuetify-nuxt-module",
    "@nuxt/fonts",
    // "nuxt-vuefire",
  ],
  // vuefire: {
  //   config: {
  //     apiKey: "AIzaSyAgzKXjreJUMqEiUNbzUZLhAoiv3KfS8Uk",

  //     authDomain: "compassprdms.firebaseapp.com",

  //     projectId: "compassprdms",

  //     storageBucket: "compassprdms.appspot.com",

  //     messagingSenderId: "189553958868",

  //     appId: "1:189553958868:web:38e313ca61559c42d74041",

  //     // there could be other properties depending on the project
  //   },
  // },
  fonts: {
    experimental: {
      processCSSVariables: true,
    },
  },
});
