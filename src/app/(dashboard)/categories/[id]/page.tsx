import { redirect } from "next/navigation";
import { api } from "~/trpc/server";

export default async function CategoryPage({
    params,
}: {
    params: { id: number };
}) {
    const c = await api.categories.getById.query(params.id);

    if (!c) redirect("/dashboard");

    return <div>Welcome to the category page of category {c.name}</div>;
}
