import Image from "next/image";
import Link from "next/link";

import { CreatePost } from "~/app/_components/create-post";
import { getServerAuthSession } from "~/server/auth";
import { api } from "~/trpc/server";
import Heading from "../_components/shared/heading";
import UserButton from "../_components/shared/UserButton/user-button";

export default async function Home() {
    const session = await getServerAuthSession();

    return (
        <main className="flex min-h-screen flex-col items-center justify-center">
            <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
                <Heading>Project Scorpion</Heading>
                <UserButton />
                <div className="flex flex-col items-center gap-2">
                    <div className="flex flex-col items-center justify-center gap-4">
                        <div className="flex flex-col gap-8 text-center">
                            {session && (
                                <>
                                    <p>
                                        <span>
                                            Logged in as {session.user?.name}
                                        </span>
                                    </p>
                                    <CrudShowcase />
                                    <Link
                                        href="/dashboard"
                                        className="rounded-full border border-black/10 p-2"
                                    >
                                        Go to the dashboard
                                    </Link>
                                </>
                            )}
                        </div>
                        <Link
                            href={
                                session
                                    ? "/api/auth/signout"
                                    : "/api/auth/signin"
                            }
                            className="rounded-full bg-white/10 px-10 py-3 font-semibold no-underline transition hover:bg-white/20"
                        >
                            {session ? "Sign out" : "Sign in"}
                        </Link>
                    </div>
                </div>
            </div>
        </main>
    );
}

async function CrudShowcase() {
    const session = await getServerAuthSession();
    if (!session?.user) return null;

    const latestPost = await api.expenses.getLatest.query();

    return (
        <div className="w-full max-w-xs">
            {latestPost ? (
                <p className="truncate">
                    Your most recent post: {latestPost.name}
                    <br />
                    Price: {latestPost.price} {latestPost.currency}
                </p>
            ) : (
                <p>You have no posts yet.</p>
            )}

            <CreatePost />
        </div>
    );
}
