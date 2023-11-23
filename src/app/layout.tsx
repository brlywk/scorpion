import "~/styles/globals.css";

import { Noto_Sans } from "next/font/google";
import { cookies } from "next/headers";

import { TRPCReactProvider } from "~/trpc/react";

const defaultFont = Noto_Sans({
    subsets: ["latin"],
    weight: ["400", "700"],
});

export const metadata = {
    title: "Project Scorpion 🦂",
    description: "Come over here!",
    icons: [{ rel: "icon", url: "/favicon.svg" }],
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body className={defaultFont.className}>
                <TRPCReactProvider cookies={cookies().toString()}>
                    {children}
                </TRPCReactProvider>
            </body>
        </html>
    );
}
