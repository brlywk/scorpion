"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type FieldValues } from "react-hook-form";
import { type SelectCategory } from "~/server/db/schemas/categories";
import { expensesInsertSchema } from "~/server/db/schemas/expenses";
import { useNotificationStore } from "~/stores/useNotificationstore";
import { api } from "~/trpc/react";
import ExpenseForm from "./expense-form";

export type AddExpenseFormProps = {
    categories: SelectCategory[];
};

export default function AddExpenseForm({ categories }: AddExpenseFormProps) {
    const methods = useForm({ resolver: zodResolver(expensesInsertSchema) });
    const { reset } = methods;

    // notifications
    const { addNotification } = useNotificationStore();

    // create api client to submit data
    const createExpense = api.expenses.create.useMutation({
        onSuccess: () => {
            reset();
            addNotification({
                message: "Expense created successfully",
                type: "success",
            });
        },
        onError: () =>
            addNotification({
                message: "Something went wrong creating your expense",
                type: "danger",
            }),
    });

    // handle form submission
    function onSubmit(data: FieldValues) {
        console.log("Submitted");
        console.log("Data", data);

        const unsafeExpense = expensesInsertSchema.safeParse(data);
        if (!unsafeExpense.success) return;

        createExpense.mutate(unsafeExpense.data);
    }

    return (
        <ExpenseForm
            formMethods={methods}
            categories={categories}
            submitHandler={onSubmit}
            isSubmitting={createExpense.isLoading}
        />
    );
}
