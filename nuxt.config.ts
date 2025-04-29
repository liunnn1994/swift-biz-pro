// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-04-29',
  devtools: { enabled: true },
  eslint: {
    config: {
      standalone: false,
    },
  },
  modules: ['@nuxt/eslint', '@nuxt/content', '@nuxt/icon', '@nuxt/image', '@nuxt/scripts'],
});
