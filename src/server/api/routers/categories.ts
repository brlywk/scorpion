import { SelectCategory, categories, expenses } from "~/server/db/schema";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { and, eq } from "drizzle-orm";
import { z } from "zod";
import { expensesRouter } from "./expenses";
import { api } from "~/trpc/server";

export const categoriesRouter = createTRPCRouter({
    // Get the default categories defined by the system
    getDefault: protectedProcedure.query(({ ctx }) => {
        return ctx.db
            .select()
            .from(categories)
            .where(eq(categories.userId, "DEFAULT_CATEGORY"));
    }),

    // Get a specific category by ID
    getById: protectedProcedure.input(z.string()).query(({ input, ctx }) => {
        const categoryId = parseInt(input);

        if (!categoryId) return null;

        return ctx.db.query.categories.findFirst({
            where: eq(categories.id, categoryId),
        });
    }),

    getUserCatgories: protectedProcedure.query(async ({ ctx }) => {
        const userExpenses = await ctx.db.query.expenses.findMany({
            with: {
                categories: true,
            },
            where: eq(expenses.userId, ctx.session.user.id),
        });

        const categories: SelectCategory[] = [];

        for (const exp of userExpenses) {
            categories.push(exp.categories as SelectCategory);
        }

        // remove all duplicates
        const uniqueCategories = new Map(categories.map((c) => [c.id, c]));

        return uniqueCategories;
    }),
});
