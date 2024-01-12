import { getServerAuthSession } from "~/server/auth";
import { api } from "~/trpc/server";
import ExpenseCard from "./expense-card";

export default async function ExpenseList() {
    const session = await getServerAuthSession();
    if (!session?.user) return null;

    const userExpenses = await api.expenses.getAll.query();
    const userCategories = await api.categories.getUserCatgories.query();

    return (
        <div className="flex w-full flex-col gap-8">
            {userExpenses?.map((e) => (
                <ExpenseCard
                    key={e.id}
                    expense={e}
                    category={userCategories.get(e.categoryId ?? 1)!}
                />
            ))}
        </div>
    );
}
