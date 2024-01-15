"use client";

import Logo from "@/shared/logos/logo";
import { UserAvatar } from "@/shared/user-avatar/user-avatar";
import { Disclosure } from "@headlessui/react";
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import { BellIcon } from "@heroicons/react/24/outline";
import { usePathname } from "next/navigation";
import Navigation from "./navigation-main";
import NavigationMobile from "./navigation-mobile";
import NavigationMobileHamburger from "./navigation-mobile-hamburger";

export default function Header() {
    const currentPath = usePathname();

    return (
        <Disclosure
            as="nav"
            className="sticky top-0 bg-white/90 shadow backdrop-blur"
        >
            {({ open }) => (
                <>
                    <div className="mx-auto max-w-screen-xl px-2 md:px-4 2xl:px-0">
                        <div className="flex h-16 justify-between">
                            {/* Logo */}
                            <div className="flex lg:px-0">
                                <div className="flex flex-shrink-0 items-center">
                                    <Logo label="Scorpion" linkTo="dashboard" />
                                </div>
                            </div>
                            {/* Navigation */}
                            <Navigation activeLink={currentPath} />

                            {/* Search */}
                            <div className="flex flex-1 items-center justify-center px-2 lg:ml-6 lg:justify-end">
                                <div className="w-full max-w-lg lg:max-w-xs">
                                    <label htmlFor="search" className="sr-only">
                                        Search
                                    </label>
                                    <div className="relative">
                                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                            <MagnifyingGlassIcon
                                                className="h-5 w-5 text-gray-400"
                                                aria-hidden="true"
                                            />
                                        </div>
                                        <input
                                            id="search"
                                            name="search"
                                            className="block w-full rounded-md border-0 bg-white py-1.5 pl-10 pr-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-amber-600 sm:text-sm sm:leading-6"
                                            placeholder="Search"
                                            type="search"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Mobile Button */}
                            <NavigationMobileHamburger open={open} />

                            {/* Notifications */}
                            <div className="hidden lg:ml-4 lg:flex lg:items-center">
                                <button
                                    type="button"
                                    className="relative flex-shrink-0 rounded-full bg-white p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2"
                                >
                                    <span className="absolute -inset-1.5" />
                                    <span className="sr-only">
                                        View notifications
                                    </span>
                                    <BellIcon
                                        className="h-6 w-6"
                                        aria-hidden="true"
                                    />
                                </button>

                                {/* Profile dropdown */}
                                <UserAvatar />
                            </div>
                        </div>
                    </div>

                    {/* Mobile Navigation */}
                    <NavigationMobile activeLink={currentPath} />
                </>
            )}
        </Disclosure>
    );
}
