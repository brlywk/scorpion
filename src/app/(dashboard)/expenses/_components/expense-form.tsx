import {
    FormProvider,
    type FieldValues,
    type UseFormReturn,
} from "react-hook-form";
import Button from "~/app/_components/shared/button";
import FormError from "~/app/_components/shared/forms/form-error-message";
import Input from "~/app/_components/shared/forms/form-input";
import Label from "~/app/_components/shared/forms/form-label";
import { allowedBillingCycles, allowedCurrencies } from "~/server/db/baseInfo";
import {
    type SelectExpense,
    type SelectCategory,
    expenses,
} from "~/server/db/schema";
import { capitalize, getCurrencySymbol } from "~/utils/displayTransformers";
import { CategoryDropdown, Dropdown } from "./form-dropdown";

export type ExpenseFormProps = {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    formMethods: UseFormReturn<FieldValues, any, undefined>;
    submitHandler: (data: FieldValues) => void;
    isSubmitting: boolean;
    categories: SelectCategory[];
    expense?: SelectExpense;
};

export default function ExpenseForm({
    formMethods,
    submitHandler,
    isSubmitting,
    categories,
    expense,
}: ExpenseFormProps) {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = formMethods;

    const submitButtonLabel = expense ? "Save" : "Submit";

    return (
        <FormProvider {...formMethods}>
            <form
                onSubmit={handleSubmit(submitHandler)}
                className="grid w-4/5 grid-cols-[max-content_1fr] items-center gap-4"
            >
                {/* Name */}
                <Label htmlFor="name">Name</Label>
                <Input
                    name="name"
                    register={register}
                    type="text"
                    hasError={Object.hasOwn(errors, "name")}
                    defaultValue={expense?.name ?? ""}
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
                        type="text"
                        hasError={Object.hasOwn(errors, "price")}
                        defaultValue={expense?.price ?? ""}
                        classMod="flex-grow"
                        required
                    />
                    <Dropdown
                        name="currency"
                        options={allowedCurrencies}
                        displayTransformer={
                            getCurrencySymbol as (value: string) => string
                        }
                        defaultValue={
                            expense?.currency ??
                            (allowedCurrencies[0] as string)
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
                    defaultValue={
                        expense?.billingCycle ??
                        (allowedBillingCycles[0] as string)
                    }
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
                    defaultValueId={expense?.categoryId ?? 1}
                    displayTransformer={capitalize}
                />
                <FormError
                    name="categoryId"
                    errors={errors}
                    classMod="col-span-2 justify-center"
                />

                <div className="col-span-2 grid grid-cols-2 gap-4">
                    <Button type="submit" disabled={isSubmitting}>
                        {isSubmitting ? "Submitting..." : submitButtonLabel}
                    </Button>
                    <Button type="reset" theme="warning">
                        Reset
                    </Button>
                </div>
            </form>
        </FormProvider>
    );
}
