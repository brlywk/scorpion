import ExpensesSubNavigation from "./_components/expenses-sub-navigation";

export default async function ExpensesLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <div className="relative mx-auto mt-8 flex max-w-screen-xl flex-row gap-8">
                <ExpensesSubNavigation />
                <div className="min-h-[calc(100vh-105px)] w-full">
                    {children}
                </div>
            </div>
        </>
    );
}
