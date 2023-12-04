"use client";

import Heading from "~/app/_components/shared/heading";
import {
    expensesInsertSchema,
    type SelectCategory,
    type SelectExpense,
} from "~/server/db/schema";
import ExpenseForm from "./expense-form";
import { FieldValues, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNotificationStore } from "~/stores/useNotificationstore";
import { api } from "~/trpc/react";
import { useRouter } from "next/navigation";

export type EditExpenseFormProps = {
    categories: SelectCategory[];
    expense: SelectExpense;
};

export default function EditExpenseForm({
    categories,
    expense,
}: EditExpenseFormProps) {
    const methods = useForm({ resolver: zodResolver(expensesInsertSchema) });
    const { reset } = methods;

    // notifications
    const { addNotification } = useNotificationStore();

    // routing
    const router = useRouter();

    // create api client to submit data
    // TODO: Update expense here
    const updateExpense = api.expenses.update.useMutation({
        onSuccess: () => {
            addNotification({
                message: "Expense updated successfully",
                type: "success",
            });
            router.refresh();
        },
        onError: () =>
            addNotification({
                message: "Something went wrong updating your expense",
                type: "danger",
            }),
    });

    // handle form submission
    function onSubmit(data: FieldValues) {
        // TODO: Update expense here
        console.log("Submitted");
        console.log("Data", data);

        const unsafeExpense = expensesInsertSchema.safeParse(data);
        if (!unsafeExpense.success) return;

        const updatedExpense = unsafeExpense.data;
        updatedExpense.id = expense.id;

        updateExpense.mutate(updatedExpense);
    }
    return (
        <div className="flex flex-col gap-4">
            <Heading level={3}>{expense.name}</Heading>
            <ExpenseForm
                categories={categories}
                expense={expense}
                formMethods={methods}
                submitHandler={onSubmit}
                isSubmitting={updateExpense.isLoading}
            />
        </div>
    );
}
