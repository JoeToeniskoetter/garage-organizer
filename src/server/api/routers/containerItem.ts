import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";

export const containerItemRouter = createTRPCRouter({
  getAll: protectedProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.containerItem.findMany();
  }),
  byId: protectedProcedure
    .input(z.object({ id: z.string().nonempty() }))
    .query(async ({ input, ctx }) => {
      return await ctx.prisma.containerItem.findFirst({
        where: { id: input.id },
      });
    }),
  create: protectedProcedure
    .input(
      z.object({
        name: z.string().nonempty(),
        imageData: z.string().optional(),
        containerId: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      return await ctx.prisma.containerItem.create({
        data: { ...input, imageData: input.imageData ? input.imageData : null },
      });
    }),
  delete: protectedProcedure
    .input(z.object({ id: z.string().nonempty() }))
    .mutation(async ({ input, ctx }) => {
      return await ctx.prisma.containerItem.update({
        where: { id: input.id },
        data: { deletedAt: new Date() },
      });
    }),
});
