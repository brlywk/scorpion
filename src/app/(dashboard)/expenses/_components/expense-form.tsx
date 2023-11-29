"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm, type FieldValues } from "react-hook-form";
import Button from "~/app/_components/shared/button";
import FormError from "~/app/_components/shared/forms/form-error-message";
import Input from "~/app/_components/shared/forms/form-input";
import Label from "~/app/_components/shared/forms/form-label";
import {
    SelectCategory,
    allowedBillingCycles,
    allowedCurrencies,
    expensesInsertSchema,
} from "~/server/db/schema";
import { api } from "~/trpc/react";
import { capitalize, getCurrencySymbol } from "~/utils/displayTransformers";
import { CategoryDropdown, Dropdown } from "./form-dropdown";

type ExpenseFormProps = {
    categories: SelectCategory[];
};

export default function ExpenseForm({ categories }: ExpenseFormProps) {
    const methods = useForm({ resolver: zodResolver(expensesInsertSchema) });
    const {
        register,
        reset,
        handleSubmit,
        formState: { errors },
    } = methods;

    // create api client to submit data
    const createExpense = api.expenses.create.useMutation({
        onSuccess: () => reset(),
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
        <FormProvider {...methods}>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="grid w-4/5 grid-cols-[max-content_1fr] items-center gap-4"
            >
                {/* Name */}
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

                {/* Price & Currency */}
                <Label htmlFor="price">Price</Label>
                <div className="flex items-center gap-2">
                    <Input
                        name="price"
                        register={register}
                        type="number"
                        hasError={Object.hasOwn(errors, "price")}
                        classMod="flex-grow"
                        required
                    />
                    <Dropdown
                        name="currency"
                        options={allowedCurrencies as string[]}
                        displayTransformer={
                            getCurrencySymbol as (value: string) => string
                        }
                        heightClass="h-[42px]"
                        widthClass="w-[42px]"
                        classMod="justify-center"
                    />
                </div>
                <FormError
                    name="price"
                    errors={errors}
                    classMod="col-span-2 justify-center"
                />
                <FormError
                    name="currency"
                    errors={errors}
                    classMod="col-span-2 justify-center"
                />

                {/* Billing Cycle */}
                <Label htmlFor="billingCycle">Billing Cycle</Label>
                <Dropdown
                    name="billingCycle"
                    options={allowedBillingCycles}
                    displayTransformer={capitalize}
                    widthClass="w-full"
                />
                <FormError
                    name="billingCycle"
                    errors={errors}
                    classMod="col-span-2 justify-center"
                />

                {/* Category */}
                <Label htmlFor="categoryId">Category</Label>
                <CategoryDropdown
                    name="categoryId"
                    options={categories}
                    defaultValueId={1}
                    displayTransformer={capitalize}
                />
                <FormError
                    name="categoryId"
                    errors={errors}
                    classMod="col-span-2 justify-center"
                />

                <div className="col-span-2 grid grid-cols-2 gap-4">
                    <Button type="submit" disabled={createExpense.isLoading}>
                        {createExpense.isLoading ? "Submitting..." : "Submit"}
                    </Button>
                    <Button type="reset" theme="warning">
                        Reset
                    </Button>
                </div>
            </form>
        </FormProvider>
    );
}
