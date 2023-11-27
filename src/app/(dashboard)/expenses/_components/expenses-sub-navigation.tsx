import Button from "~/app/_components/shared/button";
import { api } from "~/trpc/server";

export default async function ExpensesSubNavigation() {
    const categories = await api.categories.getDefault.query();

    return (
        <aside className="sticky left-0 top-[130px] flex max-h-[calc(100vh-142px)] w-[15rem] flex-col gap-4">
            <Button
                action="/expenses/new"
                theme="inverted"
                classMod="flex items-center justify-center gap-2 border border-black"
                bold
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    className="h-4 w-4"
                >
                    <path
                        fill="currentColor"
                        d="M13 7h-2v4H7v2h4v4h2v-4h4v-2h-4zm-1-5C6.48 2 2 6.48 2 12s4.48 10 10 10s10-4.48 10-10S17.52 2 12 2m0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8s8 3.59 8 8s-3.59 8-8 8"
                    />
                </svg>
                Add new expense
            </Button>

            <Button action="/expenses" classMod="flex items-center gap-2">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    className="h-4 w-4"
                >
                    <path fill="currentColor" d="M7 5h14v2H7z" />
                    <circle cx="4" cy="6" r="1.5" fill="currentColor" />
                    <path
                        fill="currentColor"
                        d="M7 11h14v2H7zm0 6h14v2H7zm-3 2.5c.82 0 1.5-.68 1.5-1.5s-.67-1.5-1.5-1.5s-1.5.68-1.5 1.5s.68 1.5 1.5 1.5"
                    />
                    <circle cx="4" cy="12" r="1.5" fill="currentColor" />
                </svg>
                Overview
            </Button>

            <hr />

            <div>
                <b>Categories</b>
                {categories.map((c) => (
                    <div>{c.name}</div>
                ))}
            </div>
        </aside>
    );
}
