import clsx from "clsx";
import type { FieldErrors, FieldValues } from "react-hook-form";

type FormErrorProps = {
    name: string;
    errors: FieldErrors<FieldValues>;
    classMod?: string;
};

export default function FormError({ name, errors, classMod }: FormErrorProps) {
    return (
        <>
            {Object.hasOwn(errors, name) && (
                <div
                    className={clsx(
                        "flex flex-row items-center gap-2 text-sm text-red-500",
                        classMod,
                    )}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        className="h-4 w-4"
                    >
                        <path
                            fill="currentColor"
                            fillRule="evenodd"
                            d="M8 14.5a6.5 6.5 0 1 0 0-13a6.5 6.5 0 0 0 0 13ZM8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16Zm1-5a1 1 0 1 1-2 0a1 1 0 0 1 2 0Zm-.25-6.25a.75.75 0 0 0-1.5 0v3.5a.75.75 0 0 0 1.5 0v-3.5Z"
                            clipRule="evenodd"
                        />
                    </svg>
                    {errors[name]?.message?.toString()}
                </div>
            )}
        </>
    );
}
