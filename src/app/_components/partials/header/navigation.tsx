import NavigationLink from "./navigation-link";

type NavigationProps = {
    activeLink: string;
};

type NavLink = {
    label: string;
    to: string;
};

export default function Navigation({ activeLink }: NavigationProps) {
    const navLinks: NavLink[] = [
        {
            label: "Dashboard",
            to: "/dashboard",
        },
        {
            label: "Expenses",
            to: "/expenses",
        },
    ];

    return (
        <nav className="flex flex-grow flex-row items-center justify-center gap-4">
            {navLinks.map((link, index) => (
                <NavigationLink
                    key={index}
                    label={link.label}
                    to={link.to}
                    active={activeLink === link.to}
                />
            ))}
        </nav>
    );
}
