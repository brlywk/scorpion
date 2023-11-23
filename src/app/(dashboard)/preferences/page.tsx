import { getServerAuthSession } from "~/server/auth";

export default async function PreferencesPage() {
    const session = await getServerAuthSession();

    if (!session?.user.id) return null;

    return <div>No preferences for you, {session.user.name}</div>;
}
