import { createTRPCRouter } from "~/server/api/trpc";
import { expensesRouter } from "./routers/expenses";
import { categoriesRouter } from "./routers/categories";

// Main tRPC router
export const appRouter = createTRPCRouter({
    expenses: expensesRouter,
    categories: categoriesRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
