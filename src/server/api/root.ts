import { createTRPCRouter } from "~/server/api/trpc";
import { containerRouter } from "./routers/container";
import { containerItemRouter } from "./routers/containerItem";
import { uploadRouter } from "./routers/upload";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  container: containerRouter,
  containerItem: containerItemRouter,
  upload: uploadRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
