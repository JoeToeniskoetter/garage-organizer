import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { v4 } from "uuid";

export const uploadRouter = createTRPCRouter({
  getPresignedUrl: protectedProcedure
    .input(z.object({ ext: z.string(), containerId: z.number() }))
    .mutation(({ ctx, input }) => {
      // const url = await ctx.s3.presignedPutObject(
      //   "garage-organizer-dev",
      //   `containers/${input.containerId}/${v4()}.${input.ext}`,
      //   24 * 60 * 60
      // );
      // return { url };
      return {};
    }),
});
