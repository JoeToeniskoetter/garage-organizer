import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { v4 } from "uuid";
import { env } from "~/env.mjs";

export const uploadRouter = createTRPCRouter({
  getPresignedUrl: protectedProcedure
    .input(z.object({ ext: z.string(), containerId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const key = `containers/${ctx.session.user.id}/${
        input.containerId
      }/${v4()}.${input.ext}`;
      const url = await ctx.s3.presignedPutObject(
        env.MINIO_BUCKET,
        key,
        24 * 60 * 60
      );
      return { url, key };
    }),
});
