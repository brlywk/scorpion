import Footer from "../_components/partials/footer";
import Header from "../_components/partials/header";

export default async function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <Header />
            <main className="mt-12 flex w-full justify-center">
                <div className="flex w-3/4 justify-center">{children}</div>
            </main>
            <Footer />
        </>
    );
}
