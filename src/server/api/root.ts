import { createTRPCRouter } from "~/server/api/trpc";
import { expensesRouter } from "./routers/expenses";

// Main tRPC router
export const appRouter = createTRPCRouter({
    expenses: expensesRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
