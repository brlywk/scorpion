import Heading from "~/app/_components/shared/heading";
import { api } from "~/trpc/server";
import EditExpenseForm from "../../_components/edit-expense-form";
import { redirect } from "next/navigation";

export default async function EditExpensePage({
    params,
}: {
    params: { id: string };
}) {
    const expense = await api.expenses.getById.query(params.id);

    // TODO: This should redirect to an informational page telling the user
    // what went wrong
    if (!expense) redirect("/dashboard");

    // TODO: THIS SHOULD CHANGE ONCE USERS ARE ALLOWED TO SPECIFY THEIR OWN CATEGORIES
    const categories = await api.categories.getDefault.query();

    return (
        <div>
            <Heading>Edit Expense</Heading>
            <EditExpenseForm categories={categories} expense={expense} />
        </div>
    );
}
