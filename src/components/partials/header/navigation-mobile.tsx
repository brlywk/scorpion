"use client";

import { Disclosure } from "@headlessui/react";
import { cn } from "~/utils/generalHelpers";
import { navigationLinks } from "./navigation-config";
import type { NavigationLinkProps, NavigationProps } from "./navigation-types";

// ----- Mobile Navigation -----------------------

export default function NavigationMobile({ activeLink }: NavigationProps) {
    return (
        <Disclosure.Panel className="lg:hidden">
            <div className="space-y-1 pb-3 pt-2">
                {navigationLinks.map((link, index) => (
                    <NavigationMobileLink
                        key={index}
                        label={link.label}
                        to={link.to}
                        active={activeLink.includes(link.to)}
                    />
                ))}
            </div>

            {/* User Avatar Mobile */}
            {/* <div className="border-t border-gray-200 pb-3 pt-4"> */}
            {/*     <div className="flex items-center px-4"> */}
            {/*         <div className="flex-shrink-0"> */}
            {/*             <img */}
            {/*                 className="h-10 w-10 rounded-full" */}
            {/*                 src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" */}
            {/*                 alt="" */}
            {/*             /> */}
            {/*         </div> */}
            {/*         <div className="ml-3"> */}
            {/*             <div className="text-base font-medium text-gray-800"> */}
            {/*                 Tom Cook */}
            {/*             </div> */}
            {/*             <div className="text-sm font-medium text-gray-500"> */}
            {/*                 tom@example.com */}
            {/*             </div> */}
            {/*         </div> */}
            {/*         <button */}
            {/*             type="button" */}
            {/*             className="relative ml-auto flex-shrink-0 rounded-full bg-white p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2" */}
            {/*         > */}
            {/*             <span className="absolute -inset-1.5" /> */}
            {/*             <span className="sr-only"> */}
            {/*                 View notifications */}
            {/*             </span> */}
            {/*             <BellIcon */}
            {/*                 className="h-6 w-6" */}
            {/*                 aria-hidden="true" */}
            {/*             /> */}
            {/*         </button> */}
            {/*     </div> */}
            {/*     <div className="mt-3 space-y-1"> */}
            {/*         <Disclosure.Button */}
            {/*             as="a" */}
            {/*             href="#" */}
            {/*             className="block px-4 py-2 text-base font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-800" */}
            {/*         > */}
            {/*             Your Profile */}
            {/*         </Disclosure.Button> */}
            {/*         <Disclosure.Button */}
            {/*             as="a" */}
            {/*             href="#" */}
            {/*             className="block px-4 py-2 text-base font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-800" */}
            {/*         > */}
            {/*             Settings */}
            {/*         </Disclosure.Button> */}
            {/*         <Disclosure.Button */}
            {/*             as="a" */}
            {/*             href="#" */}
            {/*             className="block px-4 py-2 text-base font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-800" */}
            {/*         > */}
            {/*             Sign out */}
            {/*         </Disclosure.Button> */}
            {/*     </div> */}
            {/* </div> */}
        </Disclosure.Panel>
    );
}

// ----- Mobile Navigation Link ------------------

function NavigationMobileLink({ label, to, active }: NavigationLinkProps) {
    const navClass = cn(
        "block border-l-4 py-2 pl-3 pr-4 text-base font-medium hover:bg-gray-100",
        active && "border-amber-500 bg-amber-50 text-amber-700",
    );

    return (
        <Disclosure.Button as="a" href={to} className={navClass}>
            {label}
        </Disclosure.Button>
    );
}
