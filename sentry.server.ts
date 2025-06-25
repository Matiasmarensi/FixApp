import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: "https://364ef47796a0d1a1071d4765afd3266c@o4509458536202240.ingest.us.sentry.io/4509458567528448",

  // Adds request headers and IP for users, for more info visit:
  // https://docs.sentry.io/platforms/javascript/guides/nextjs/configuration/options/#sendDefaultPii
  sendDefaultPii: true,

  // ...

  // Note: if you want to override the automatic release value, do not set a
  // `release` value here - use the environment variable `SENTRY_RELEASE`, so
  // that it will also get attached to your source maps
});
