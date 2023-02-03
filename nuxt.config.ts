// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt',
    'nuxt-icon',
    'nuxt-headlessui'
  ],
  runtimeConfig: {
    MONGO_URI: process.env.MONGO_URI,
  },
  nitro: {
    plugins: ['@/server/db/connect.ts']
  },
  build: {
    transpile: [
      'vue-toastification',
      '@headlessui/tailwindcss'
    ]
  }
})
