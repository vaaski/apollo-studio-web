// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  typescript: { strict: true },
  modules: ["@nuxt/content", "nuxt-icon", "vue3-carousel-nuxt"],
  app: {
    pageTransition: { name: "page", mode: "out-in" },
  },
})
