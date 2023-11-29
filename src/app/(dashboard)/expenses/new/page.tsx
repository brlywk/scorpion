import { CreatePost } from "~/app/_components/create-post";
import ExpenseForm from "../_components/expense-form";
import { api } from "~/trpc/server";

export default async function NewExpensePage() {
    // TODO: THIS SHOULD CHANGE ONCE USERS ARE ALLOWED TO SPECIFY THEIR OWN CATEGORIES
    const categories = await api.categories.getDefault.query();

    return (
        <div className="flex w-4/5 justify-center">
            <ExpenseForm categories={categories} />
        </div>
    );
}
