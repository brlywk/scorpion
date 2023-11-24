"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { api } from "~/trpc/react";

export function CreatePost() {
    const router = useRouter();
    const [name, setName] = useState("");

    const createPost = api.expenses.create.useMutation({
        onSuccess: () => {
            router.refresh();
            setName("");
        },
    });

    return (
        <form
            onSubmit={(e) => {
                e.preventDefault();
                createPost.mutate({ name, price: "42" });
            }}
            className="flex flex-col gap-2"
        >
            <input
                type="text"
                placeholder="Title"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded-full border border-black/10 px-4 py-2 text-black"
            />
            <button
                type="submit"
                className="rounded-full bg-black/10 px-10 py-3 font-semibold transition hover:bg-black/20"
                disabled={createPost.isLoading}
            >
                {createPost.isLoading ? "Submitting..." : "Submit"}
            </button>
        </form>
    );
}