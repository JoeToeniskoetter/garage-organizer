import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";

export const containerRouter = createTRPCRouter({
  getAll: protectedProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.container.findMany({
      include: { items: true },
    });
  }),
  byId: protectedProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ input, ctx }) => {
      return await ctx.prisma.container.findFirst({
        where: { id: input.id },
        include: { items: true },
      });
    }),
  create: protectedProcedure
    .input(
      z.object({ name: z.string().nonempty(), type: z.string().nonempty() })
    )
    .mutation(async ({ input, ctx }) => {
      return await ctx.prisma.container.create({
        data: input,
      });
    }),
  delete: protectedProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input, ctx }) => {
      return await ctx.prisma.container.delete({
        where: { id: input.id },
      });
    }),
});
