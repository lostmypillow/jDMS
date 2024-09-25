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
  ],

  fonts: {
    experimental: {
      processCSSVariables: true,
    },
  },
});
