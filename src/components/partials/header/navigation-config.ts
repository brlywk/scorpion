export type NavLink = {
    label: string;
    to: string;
};

export const navigationLinks: NavLink[] = [
    {
        label: "Dashboard",
        to: "/dashboard",
    },
    {
        label: "Expenses",
        to: "/expenses",
    },
    {
        label: "Incomes",
        to: "/incomes",
    },
];
