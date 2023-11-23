import { getServerAuthSession } from "~/server/auth";
import { api } from "~/trpc/server";
import ExpenseCard from "./expense-card";

export default async function ExpenseList() {
    const session = await getServerAuthSession();
    if (!session?.user) return null;

    const allExpenses = await api.expenses.getAll.query();

    return (
        <div className="flex w-full flex-col gap-8">
            {allExpenses?.map((e) => <ExpenseCard key={e.id} expense={e} />)}
        </div>
    );
}
