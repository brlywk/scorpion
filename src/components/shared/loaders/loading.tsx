import { ArrowPathIcon } from "@heroicons/react/24/outline";
import { cn } from "~/utils/generalHelpers";

type LoadingProps = {
    size?: "tiny" | "small" | "medium" | "large" | "wtf";
};

export default function Loading({ size = "medium" }: LoadingProps) {
    const defaultClass = cn("animate-spin", {
        "h-4 w-4": size === "tiny",
        "h-10 w-10": size === "small",
        "h-16 w-16": size === "medium",
        "h-32 w-32": size === "large",
        "h-64 w-64": size === "wtf",
    });

    return (
        <div className="flex items-center justify-center">
            <ArrowPathIcon className={defaultClass} />
        </div>
    );
}
