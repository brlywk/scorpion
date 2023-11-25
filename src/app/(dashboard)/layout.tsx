import { getServerAuthSession } from "~/server/auth";
import Footer from "../_components/partials/footer";
import Header from "../_components/partials/header";
import { redirect } from "next/navigation";

export default async function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    // If user is not logged in redirect user away from ANY dashboard page
    const session = await getServerAuthSession();

    if (!session) {
        redirect("/redirect");
    }
    return (
        <>
            <Header />
            <main className="mx-auto max-w-screen-xl pt-14">{children}</main>
            <Footer />
        </>
    );
}
