import Button from "~/app/_components/shared/button";
import { api } from "~/trpc/server";

export default async function ExpensesSubNavigation() {
    const categories = await api.categories.getDefault.query();

    return (
        <aside className="sticky left-0 top-[130px] flex max-h-[calc(100vh-142px)] w-[15rem] flex-col gap-2">
            <Button
                action="/expenses/new"
                theme="inverted"
                classMod="w-full border border-black text-center"
                bold
            >
                Add new expense
            </Button>
            <div>
                <b>Categories</b>
                {categories.map((c) => (
                    <div>{c.name}</div>
                ))}
            </div>
        </aside>
    );
}
