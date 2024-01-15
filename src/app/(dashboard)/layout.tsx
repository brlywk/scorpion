import Footer from "@/partials/footer/footer";
import Header from "@/partials/header/header";
import { redirect } from "next/navigation";
import { getServerAuthSession } from "~/server/auth";

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
            <main className="mx-auto mt-8 max-w-screen-xl px-2 md:px-4 2xl:px-0">
                {children}
            </main>
            <Footer />
            {/* <NotificiationPopup /> */}
        </>
    );
}
