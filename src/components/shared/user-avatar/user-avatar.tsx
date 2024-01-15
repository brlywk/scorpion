"use client";

import { Menu, Transition } from "@headlessui/react";
import { UserIcon } from "@heroicons/react/24/outline";
import { SessionProvider, useSession } from "next-auth/react";
import Image from "next/image";
import { Fragment } from "react";
import { cn } from "~/utils/generalHelpers";

export function UserAvatar() {
    return (
        <SessionProvider>
            <UserAvatarSession />
        </SessionProvider>
    );
}

export function UserAvatarSession() {
    const { data, status } = useSession();
    const user = data?.user;

    if (status === "loading") {
        return <UserAvatarFallback />;
    }

    return (
        <Menu as="div" className="relative">
            <div>
                <Menu.Button className="relative flex rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2">
                    <span className="absolute -inset-1.5" />
                    <span className="sr-only">Open user menu</span>
                    {user?.image && (
                        <Image
                            className="h-8 w-8 rounded-full"
                            src={user.image}
                            alt=""
                            width={32}
                            height={32}
                        />
                    )}
                </Menu.Button>
            </div>
            <Transition
                as={Fragment}
                enter="transition duration-200 ease-out"
                enterFrom="scale-95 transform opacity-0"
                enterTo="scale-100 transform opacity-100"
                leave="transition duration-75 ease-in"
                leaveFrom="scale-100 transform opacity-100"
                leaveTo="scale-95 transform opacity-0"
            >
                <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <Menu.Item>
                        {({ active }) => (
                            <a
                                href="#"
                                className={cn(
                                    active ? "bg-gray-100" : "",
                                    "block px-4 py-2 text-sm text-gray-700",
                                )}
                            >
                                Your Profile
                            </a>
                        )}
                    </Menu.Item>
                    <Menu.Item>
                        {({ active }) => (
                            <a
                                href="#"
                                className={cn(
                                    active ? "bg-gray-100" : "",
                                    "block px-4 py-2 text-sm text-gray-700",
                                )}
                            >
                                Settings
                            </a>
                        )}
                    </Menu.Item>
                    <Menu.Item>
                        {({ active }) => (
                            <a
                                href="#"
                                className={cn(
                                    active ? "bg-gray-100" : "",
                                    "block px-4 py-2 text-sm text-gray-700",
                                )}
                            >
                                Sign out
                            </a>
                        )}
                    </Menu.Item>
                </Menu.Items>
            </Transition>
        </Menu>
    );
}

function UserAvatarFallback({ label }: { label?: string }) {
    const classes = cn(
        !label && "animate-pulse",
        "flex h-8 w-8 items-center justify-center rounded-full bg-gray-100",
    );

    return (
        <div className={classes}>
            {!label && <UserIcon className="h-6 w-6 text-gray-500" />}
            {label && (
                <span className="text-center text-sm font-bold text-gray-500">
                    {label}
                </span>
            )}
        </div>
    );
}
