import Button from "~/app/_components/shared/button";
import Heading from "~/app/_components/shared/heading";
import { api } from "~/trpc/server";

export default async function ExpensesSubNavigation() {
    const categories = await api.categories.getDefault.query();

    return (
        <aside className="sticky left-0 top-[105px] flex h-[calc(100vh-105px)] w-[15rem] flex-col gap-2">
            <Button
                action="/expenses/new"
                type="inverted"
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
