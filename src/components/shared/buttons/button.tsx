import clsx from "clsx";
import Link from "next/link";
import type { MouseEventHandler } from "react";

// NOTE: Yes, this would have been way easier with less code if just split up
// into three different Button components, but let's play around with TypeScript
// a little bit...

interface BaseButton {
    classMod?: string;
    bold?: boolean;
    theme?: "default" | "confirm" | "warning" | "danger" | "inverted";
    children: React.ReactNode;
}

interface LinkButton extends BaseButton {
    action: string;
}

interface ClickButton extends BaseButton {
    action: MouseEventHandler;
    disabled?: boolean;
}

interface SubmitButton extends BaseButton {
    action?: never;
    disabled?: boolean;
    type: "submit" | "reset";
}

type ButtonProps<T extends string | MouseEventHandler | null> = T extends string
    ? LinkButton
    : T extends MouseEventHandler
      ? ClickButton
      : SubmitButton;

// Overcomplicated?! This? Noooooooo...
export default function Button<T extends string | MouseEventHandler | null>(
    props: ButtonProps<T>,
) {
    const {
        action,
        classMod,
        bold = false,
        theme = "default",
        children,
    } = props;

    const classes = clsx(
        "rounded-lg p-2 transition-all",
        bold && "font-bold",
        {
            "text-black hover:bg-gray-100": theme === "default",
            "text-green-400 hover:bg-green-400 hover:text-white":
                theme === "confirm",
            "text-red-400 hover:bg-red-400 hover:text-white":
                theme === "danger",
            "text-amber-400 hover:bg-amber-400 hover:text-white":
                theme === "warning",
            "text-black hover:bg-black hover:text-white": theme === "inverted",
        },
        classMod,
    );

    // LinkButton
    if (typeof action === "string")
        return (
            <Link href={action} className={classes}>
                {children}
            </Link>
        );

    // ClickButton
    const { disabled = false } = props;
    if (typeof action === "function")
        return (
            <button onClick={action} className={classes} disabled={disabled}>
                {children}
            </button>
        );

    // SubmitButton
    const { type } = props;
    return (
        <button className={classes} type={type} disabled={disabled}>
            {children}
        </button>
    );
}
