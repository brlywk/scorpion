"use client";

import clsx from "clsx";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import UserButton from "../shared/UserButton/user-button";
import Logo from "./header/logo";
import Navigation from "./header/navigation";
import SearchBar from "./header/search-bar/search-bar";

export default function Header() {
    const scrollOffset = 42;

    const currentPath = usePathname();
    const [scrolling, setScrolling] = useState(false);

    // Add new style on scrolling
    useEffect(() => {
        const headerElement = document.getElementById("header");
        if (!headerElement) return;

        // a little more verbose so we don't check or set this on EVERY scroll...
        function handleScroll() {
            if (window.scrollY > scrollOffset && !scrolling) {
                setScrolling(true);
            } else {
                setScrolling(false);
            }
        }

        document.addEventListener("scroll", handleScroll);

        return () => document.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <header
            id="header"
            className={clsx(
                "sticky left-0 top-0 z-10 border-b border-b-gray-300 bg-white/75 backdrop-blur transition-all",
                scrolling && "shadow",
            )}
        >
            <div className="mx-auto flex max-w-screen-xl flex-row items-center justify-between gap-8">
                <Logo
                    label="Project Scorpion"
                    linkTo={currentPath === "/" ? "/" : "/dashboard"}
                    alt="Project Scorpion Logo"
                />
                <Navigation activeLink={currentPath} />
                <SearchBar />
                <UserButton />
            </div>
        </header>
    );
}
