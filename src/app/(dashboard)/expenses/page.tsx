import Heading from "~/app/_components/shared/heading";
import ExpenseList from "./_components/expense-list";

export default async function ExpensesPage() {
    return (
        <div>
            <Heading>Expenses</Heading>
            <ExpenseList />
        </div>
    );
}
