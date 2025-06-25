// next.config.js
const { withSentryConfig } = require("@sentry/nextjs");

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    turbo: {
      // Para desactivar turbopack, lo seteás en false en esta forma:
      // Aunque no está documentado en todos lados, la forma que Next recomienda es usar `turbo: false` o deshabilitar el flag en CLI.
      // Pero si da error, la forma segura es NO poner turbo o manejarlo por CLI.
    },
  },
};

module.exports = withSentryConfig(nextConfig, {
  org: "matias-nu",
  project: "javascript-nextjs",
  silent: !process.env.CI,
  authToken: process.env.SENTRY_AUTH_TOKEN,
  hideSourceMaps: true,
  disableLogger: true,
});
