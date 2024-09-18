// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/tailwindcss',
    '@vueuse/nuxt',
    'vuetify-nuxt-module',
    '@nuxt/fonts',
    '@pinia/nuxt'
  ],
  fonts: {
    experimental: {
      processCSSVariables: true,
    },
  }
  
})