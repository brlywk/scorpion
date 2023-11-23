import { type ReactNode, createElement } from "react";
import { clsx } from "clsx";

type HeadingProps = {
    level?: number;
    classMod?: string;
    children: ReactNode;
};

export default function Heading({
    level = 1,
    classMod,
    children,
}: HeadingProps) {
    if (level < 1) level = 1;
    if (level > 4) level = 4;

    const classes = clsx(
        "font-bold",
        "my-8",
        {
            "text-4xl": level === 1,
            "text-2xl": level === 2,
            "text-xl": level === 3,
            "text-lg": level === 4,
        },
        classMod,
    );

    return createElement(`h${level}`, { className: classes }, children);
}
