"use client";

import { Disclosure } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/20/solid";

export default function NavigationMobileHamburger({ open }: { open: boolean }) {
    return (
        <div className="flex items-center lg:hidden">
            {/* Mobile menu button */}
            <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-amber-500">
                <span className="absolute -inset-0.5" />
                <span className="sr-only">Open main menu</span>
                {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                )}
            </Disclosure.Button>
        </div>
    );
}
