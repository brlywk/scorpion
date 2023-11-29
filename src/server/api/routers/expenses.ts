import { expenses, expensesInsertSchema } from "~/server/db/schemas/expenses";
import { createTRPCRouter, protectedProcedure } from "../trpc";

export const expensesRouter = createTRPCRouter({
    create: protectedProcedure
        .input(expensesInsertSchema)
        .mutation(async ({ ctx, input }) => {
            // TODO: slow it down a bit
            await new Promise((resolve) => setTimeout(resolve, 2000));

            await ctx.db.insert(expenses).values({
                name: input.name,
                price: input.price,
                currency: input.currency,
                billingCycle: input.billingCycle,
                categoryId: input.categoryId,
                userId: ctx.session.user.id,
            });
        }),

    getLatest: protectedProcedure.query(({ ctx }) => {
        return ctx.db.query.expenses.findFirst({
            orderBy: (expenses, { asc }) => [asc(expenses.name)],
        });
    }),

    getAll: protectedProcedure.query(async ({ ctx }) => {
        // TODO: Slow down request for testing
        await new Promise((resolve) => setTimeout(resolve, 2000));
        return ctx.db.select().from(expenses);
    }),
});
