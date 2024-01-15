"use client";

import Link from "next/link";
import { cn } from "~/utils/generalHelpers";
import { navigationLinks } from "./navigation-config";
import type { NavigationLinkProps, NavigationProps } from "./navigation-types";

// ----- Main Navigation ---------------------------

export default function Navigation({ activeLink }: NavigationProps) {
    return (
        <nav className="hidden lg:ml-6 lg:flex lg:space-x-8">
            {navigationLinks.map((link, index) => (
                <NavigationLink
                    key={index}
                    label={link.label}
                    to={link.to}
                    active={activeLink.includes(link.to)}
                />
            ))}
        </nav>
    );
}

// ----- Navigation Link -------------------------

function NavigationLink({ label, to, active }: NavigationLinkProps) {
    const navClass = cn(
        "inline-flex items-center border-b-2 border-transparent px-1 pt-1 font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700",
        active && "border-amber-500",
    );

    return (
        <Link href={to} className={navClass}>
            {label}
        </Link>
    );
}
