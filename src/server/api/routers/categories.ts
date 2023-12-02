import { categories } from "~/server/db/schema";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { eq } from "drizzle-orm";
import { z } from "zod";

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
});
