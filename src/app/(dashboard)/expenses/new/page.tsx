import Heading from "~/app/_components/shared/heading";
import { api } from "~/trpc/server";
import AddExpenseForm from "../_components/add-expense-form";

export default async function NewExpensePage() {
    // TODO: THIS SHOULD CHANGE ONCE USERS ARE ALLOWED TO SPECIFY THEIR OWN CATEGORIES
    const categories = await api.categories.getDefault.query();

    return (
        <div className="flex w-4/5 flex-col items-center">
            <Heading>New Expense</Heading>
            <AddExpenseForm categories={categories} />
        </div>
    );
}
