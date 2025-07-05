import { createSafeActionClient } from "next-safe-action";

import { z } from "zod";
import * as Sentry from "@sentry/nextjs";
import type { NeonDbError } from "@neondatabase/serverless";

export const actionClient = createSafeActionClient({
  defineMetadataSchema() {
    return z.object({
      actionName: z.string(),
    });
  },
  handleServerError(e, utils) {
    const { clientInput, metadata } = utils;

    const originalError = e.cause ?? e;

    if (originalError.constructor.name === "NeonDbError") {
      const { code, detail } = originalError as NeonDbError;

      if (code === "23505") {
        return `Unique entry already exists. ${detail}`;
      }
      return "Database error occurred. Please try again later.";
    }

    console.log("Server Errorconstructor:", e.constructor.name);
    Sentry.captureException(e, (scope) => {
      scope.clear();
      scope.setContext("serverError", { message: e.message });
      scope.setContext("metadata", { actionName: metadata?.actionName });
      scope.setContext("clientInput", { clientInput });
      return scope;
    });

    return "An error occurred while processing your request. Please try again later.";
  },
});
