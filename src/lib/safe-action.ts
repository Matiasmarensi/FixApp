import { createSafeActionClient } from "next-safe-action";

import { z } from "zod";
import * as Sentry from "@sentry/nextjs";

export const actionClient = createSafeActionClient({
  defineMetadataSchema() {
    return z.object({
      actionName: z.string(),
    });
  },
  handleServerError(e, utils) {
    const { clientInput, metadata } = utils;
    console.log("Server Errorconstructor:", e.constructor.name);
    Sentry.captureException(e, (scope) => {
      scope.clear();
      scope.setContext("serverError", { message: e.message });
      scope.setContext("metadata", { actionName: metadata?.actionName });
      scope.setContext("clientInput", { clientInput });
      return scope;
    });
    if (e.constructor.name === "DrizzleQueryError") {
      return "Database error occurred. Please try again later.";
    }
    console.error("Error in action:", e);
    return "error occurred while processing your request. Please try again later.";
  },
});
