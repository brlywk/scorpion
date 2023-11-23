import type { SelectExpense } from "~/server/db/schema";
import Heading from "../shared/heading";

type ExpenseCardProps = {
    expense: SelectExpense;
};

export default async function ExpenseCard({ expense }: ExpenseCardProps) {
    return (
        <div className="border-black-10 flex flex-col gap-2 rounded-lg border p-4">
            <Heading level={3} classMod="mt-0">
                {expense.name}
            </Heading>
            <span>
                {expense.price} {expense.currency}
            </span>
            <span>{expense.billingCycle}</span>
            <span>{expense.created?.toISOString()}</span>
        </div>
    );
}
