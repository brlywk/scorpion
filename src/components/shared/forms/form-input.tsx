import clsx from "clsx";
import type {
    FieldValues,
    RegisterOptions,
    UseFormRegisterReturn,
} from "react-hook-form";

type InputProps = {
    name: string;
    register: (
        name: string,
        options?: RegisterOptions<FieldValues, string> | undefined,
    ) => UseFormRegisterReturn<string>;
    hasError?: boolean;
    classMod?: string;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, "name"> &
    Omit<React.InputHTMLAttributes<HTMLInputElement>, "id">;

export default function Input({
    name,
    register,
    hasError = false,
    classMod,
    ...rest
}: InputProps) {
    return (
        <input
            {...register(name)}
            {...rest}
            id={name}
            className={clsx(
                "rounded-lg border p-2 focus-visible:shadow focus-visible:outline-0",
                hasError
                    ? "border-red-500 text-red-500 focus-visible:border-red-700"
                    : "border-gray-300 focus-visible:border-gray-500",
                classMod,
            )}
        />
    );
}
