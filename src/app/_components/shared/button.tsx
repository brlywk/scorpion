import clsx from "clsx";
import Link from "next/link";
import type { MouseEventHandler } from "react";

interface BaseButton {
    classMod?: string;
    bold?: boolean;
    type?: "default" | "confirm" | "warning" | "inverted";
}

interface LinkButton extends BaseButton {
    action: string;
    children: React.ReactNode;
}

interface ClickButton extends BaseButton {
    action: MouseEventHandler;
    children: React.ReactNode;
}

type ButtonProps<T extends string | MouseEventHandler> = T extends string
    ? LinkButton
    : ClickButton;

export default function Button<T extends string | MouseEventHandler>({
    action,
    classMod,
    bold = false,
    type = "default",
    children,
}: ButtonProps<T>) {
    const classes = clsx(
        "rounded-lg p-2 transition-all",
        bold && "font-bold",
        {
            "text-black hover:bg-gray-300": type === "default",
            "text-green-400 hover:bg-green-400 hover:text-white":
                type === "confirm",
            "text-red-400 hover:bg-red-400 hover:text-white":
                type === "warning",
            "text-black hover:bg-black hover:text-white": type === "inverted",
        },
        classMod,
    );

    if (typeof action === "string")
        return (
            <Link href={action} className={classes}>
                {children}
            </Link>
        );

    return (
        <button onClick={action} className={classes}>
            {children}
        </button>
    );
}
