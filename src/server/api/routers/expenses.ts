import { expenses, expensesInsertSchema } from "~/server/db/schemas/expenses";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { eq } from "drizzle-orm";
import { z } from "zod";

export const expensesRouter = createTRPCRouter({
    create: protectedProcedure
        .input(expensesInsertSchema)
        .mutation(async ({ input, ctx }) => {
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

    update: protectedProcedure
        .input(expensesInsertSchema)
        .mutation(async ({ input, ctx }) => {
            console.log("Expense ID:", input.id);
            if (!input.id) return;

            console.log("Expense received:", input);

            await ctx.db
                .update(expenses)
                .set({
                    categoryId: input.categoryId,
                    name: input.name,
                    price: input.price,
                    billingCycle: input.billingCycle,
                    currency: input.currency,
                })
                .where(eq(expenses.id, input.id));
        }),

    getById: protectedProcedure.input(z.string()).query(({ input, ctx }) => {
        const expenseId = parseInt(input);

        if (!expenseId) return null;

        return ctx.db.query.expenses.findFirst({
            where: eq(expenses.id, expenseId),
        });
    }),

    getAll: protectedProcedure.query(async ({ ctx }) => {
        // TODO: Slow down request for testing
        await new Promise((resolve) => setTimeout(resolve, 2000));
        return ctx.db
            .select()
            .from(expenses)
            .where(eq(expenses.userId, ctx.session.user.id));
    }),
});
