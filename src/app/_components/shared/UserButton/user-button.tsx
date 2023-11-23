"use client";

import { SessionProvider } from "next-auth/react";
import UserButtonClient from "./user-button-client";

export default function UserButton() {
    return (
        <SessionProvider>
            <UserButtonClient />
        </SessionProvider>
    );
}
