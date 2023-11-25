import ExpensesSubNavigation from "./_components/expenses-sub-navigation";

export default async function ExpensesLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <div className="relative flex flex-row gap-8">
                <ExpensesSubNavigation />
                <div className="w-full">{children}</div>
            </div>
        </>
    );
}
