"use client";

import { usePathname } from "next/navigation";
import Logo from "./header/logo";

export default function Footer() {
    const currentPath = usePathname();

    return (
        <footer className="mb-12 mt-24 flex w-full justify-center border-t border-t-gray-300 py-4">
            <div className="flex w-3/4 flex-row justify-start gap-8">
                <Logo
                    label="Project Scorpion"
                    linkTo={currentPath === "/" ? "/" : "/dashboard"}
                />
                <div className="pt-4 text-sm">
                    Some footer text goes here...
                </div>
            </div>
        </footer>
    );
}
