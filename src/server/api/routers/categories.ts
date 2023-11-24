import { categories } from "~/server/db/schema";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { eq } from "drizzle-orm";

export const categoriesRouter = createTRPCRouter({
    getDefault: protectedProcedure.query(({ ctx }) => {
        return ctx.db
            .select()
            .from(categories)
            .where(eq(categories.userId, "DEFAULT_CATEGORY"));
    }),
});
