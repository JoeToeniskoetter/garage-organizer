import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { env } from "~/env.mjs";

export const containerRouter = createTRPCRouter({
  getAll: protectedProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.container.findMany({
      where: { userId: ctx.session.user.id, deletedAt: null },
      include: { items: { where: { deletedAt: null } } },
    });
  }),
  byId: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input, ctx }) => {
      const container = await ctx.prisma.container.findFirst({
        where: { id: input.id, userId: ctx.session.user.id, deletedAt: null },
        include: { items: { where: { deletedAt: null } } },
      });

      if (container?.items) {
        const items = await Promise.all(
          container.items.map(async (item) => {
            if (item.imageData) {
              return {
                ...item,
                imageData: await ctx.s3.presignedGetObject(
                  env.MINIO_BUCKET,
                  item.imageData
                ),
              };
            }
            return item;
          })
        );
        return { ...container, items };
      }
      return container;
    }),
  create: protectedProcedure
    .input(
      z.object({ name: z.string().nonempty(), type: z.string().nonempty() })
    )
    .mutation(async ({ input, ctx }) => {
      const currentNumber = await ctx.prisma.container.aggregate({
        where: { userId: ctx.session.user.id, deletedAt: null },
        _max: { number: true },
      });
      console.log(currentNumber);
      return await ctx.prisma.container.create({
        data: {
          ...input,
          number:
            currentNumber._max.number !== null
              ? currentNumber._max.number + 1
              : 1,
          user: { connect: { id: ctx.session.user.id } },
        },
      });
    }),
  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input, ctx }) => {
      return await ctx.prisma.container.update({
        data: { deletedAt: new Date() },
        where: { id: input.id, userId: ctx.session.user.id },
      });
    }),
});
