// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  runtimeConfig: {
    // Private keys are only available on the server
    apiBaseUrl: process.env.API_BASE_URL || "https://api.singa.com/v1.4", // I'm keeping this for backward compatibility
  },
  modules: ["@nuxt/icon", "@nuxt/ui"],
  css: ["~/assets/styles/main.css"],
});
