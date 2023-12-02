"use client";

import { useSession } from "next-auth/react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import UserButtonMenu from "./user-button-menu";
import UserButtonFallback from "./user-button-fallback";

export default function UserButtonClient() {
    const { data, status } = useSession();
    const [open, setOpen] = useState(false);
    const menuRef = useRef<React.ElementRef<"div">>(null);
    const buttonRef = useRef<React.ElementRef<"button">>(null);
    const imageRef = useRef<React.ElementRef<"img">>(null);

    function handleClickOutside(event: Event) {
        if (
            menuRef.current &&
            buttonRef.current &&
            imageRef.current &&
            (event.target as Node) !== menuRef.current &&
            (event.target as Node) !== buttonRef.current &&
            (event.target as Node) !== imageRef.current
        ) {
            setOpen(false);
        }
    }

    useEffect(() => {
        window.addEventListener("click", handleClickOutside);

        return () => window.removeEventListener("click", handleClickOutside);
    }, []);

    if (status === "loading") {
        return <UserButtonFallback classMod="animate-pulse" />;
    }

    if (!data?.user) return null;

    return (
        <div className="relative">
            <button
                className="relative flex h-12 w-12 cursor-pointer items-center justify-center  overflow-hidden rounded-full border border-gray-300 transition-all hover:ring-2 hover:ring-gray-300"
                onClick={() => setOpen((prev) => !prev)}
                ref={buttonRef}
            >
                {data.user.image && (
                    <Image
                        src={data.user.image}
                        alt={`Profile picture of ${data.user.name ?? "user"}`}
                        width={48}
                        height={48}
                        className="h-12 w-12"
                        ref={imageRef}
                    />
                )}
                {!data.user.image && <UserButtonFallback />}
            </button>
            {open && (
                <UserButtonMenu
                    ref={menuRef}
                    userName={data.user.name ?? ""}
                    userEmail={data.user.email ?? ""}
                    userImage={data.user.image}
                />
            )}
        </div>
    );
}
