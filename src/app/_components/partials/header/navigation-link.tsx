import clsx from "clsx";
import Link from "next/link";

type NavigationLinkProps = {
    label: string;
    to: string;
    active: boolean;
};

export default function NavigationLink({
    label,
    to,
    active,
}: NavigationLinkProps) {
    return (
        <Link href={to} className="group relative py-6">
            <span className="rounded-lg px-4 py-2 transition-all group-hover:bg-gray-100">
                {label}
            </span>
            <div
                className={clsx(
                    "absolute bottom-0 h-[3px] w-full translate-y-[1px]",
                    !active && "bg-transparent",
                    active && "bg-black",
                )}
            ></div>
        </Link>
    );
}
