import type { NextConfig } from "next";

const { withSentryConfig } = require("@sentry/nextjs");

const nextConfig = {
  // Your existing Next.js configuration
  experimental: {
    instrumentationHook: true,
  },
};

// Make sure adding Sentry options is the last code to run before exporting
module.exports = withSentryConfig(nextConfig, {
  org: "matias-nu",
  project: "javascript-nextjs",

  // Only print logs for uploading source maps in CI
  // Set to `true` to suppress logs
  silent: !process.env.CI,
  authToken: process.env.SENTRY_AUTH_TOKEN,
  hideSourceMaps: true,
  disableLogger: true,

  // Automatically tree-shake Sentry logger statements to reduce bundle size
});

export default nextConfig;
