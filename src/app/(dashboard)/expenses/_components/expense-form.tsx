"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { type FieldValues, useForm } from "react-hook-form";
import Button from "~/app/_components/shared/button";
import FormError from "~/app/_components/shared/forms/form-error-message";
import Input from "~/app/_components/shared/forms/form-input";
import Label from "~/app/_components/shared/forms/form-label";
import { expensesInsertSchema } from "~/server/db/schema";
import { api } from "~/trpc/react";

export default function ExpenseForm() {
    const {
        register,
        reset,
        handleSubmit,
        formState: { errors },
    } = useForm({ resolver: zodResolver(expensesInsertSchema) });

    // create api client to submit data
    const createExpense = api.expenses.create.useMutation({
        onSuccess: () => reset(),
    });

    // handle form submission
    function onSubmit(data: FieldValues) {
        console.log("Submitted");

        const unsafeExpense = expensesInsertSchema.safeParse(data);
        console.log(unsafeExpense);
    }

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="grid w-4/5 grid-cols-[max-content_1fr] items-center gap-4"
        >
            <Label htmlFor="name">Name</Label>
            <Input
                name="name"
                register={register}
                type="text"
                hasError={Object.hasOwn(errors, "name")}
                autoFocus
                required
            />
            <FormError
                name="name"
                errors={errors}
                classMod="col-span-2 justify-center"
            />

            <Label htmlFor="price">Price</Label>
            <Input
                name="price"
                register={register}
                type="number"
                hasError={Object.hasOwn(errors, "price")}
                required
            />
            <FormError
                name="price"
                errors={errors}
                classMod="col-span-2 justify-center"
            />

            {/* TODO: Add currency, billing cycle and category (and create component for it...) */}

            <div className="col-span-2 grid grid-cols-2 gap-4">
                <Button type="submit">Submit</Button>
                <Button type="reset" theme="warning">
                    Reset
                </Button>
            </div>
        </form>
    );
}
