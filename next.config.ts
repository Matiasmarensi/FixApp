const { withSentryConfig } = require("@sentry/nextjs");

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Si NO usás Turbopack, dejá esto vacío
  // Si SÍ lo usás, podés agregar: turbopack: true
  // turbopack: true,
};

module.exports = withSentryConfig(nextConfig, {
  org: "matias-nu",
  project: "javascript-nextjs",
  silent: !process.env.CI,
  authToken: process.env.SENTRY_AUTH_TOKEN,
  hideSourceMaps: true,
  disableLogger: true,
});
