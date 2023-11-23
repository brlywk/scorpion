import { signOut } from "next-auth/react";
import Link from "next/link";
import { UserButtonMenuProps } from "./user-button-menu";

export const UserButtonMenu = React.forwardRef<
    React.ElementRef<"div">,
    UserButtonMenuProps
>(({ userName }, ref) => {
    return (
        <div
            className="absolute bottom-0 right-0 z-10 min-w-max translate-y-[105%] overflow-hidden rounded-lg border border-gray-300 bg-white shadow"
            ref={ref}
        >
            <div className="flex flex-col items-stretch divide-y divide-gray-300">
                <div className="p-4">Welcome, {userName}</div>
                <div className="p-2">
                    <Link
                        href="/preferences"
                        className=" flex flex-row items-center gap-2 rounded-lg p-2 hover:bg-gray-100"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            className="h-4 w-4"
                        >
                            <path
                                fill="currentColor"
                                d="M3 17v2h6v-2H3M3 5v2h10V5H3m10 16v-2h8v-2h-8v-2h-2v6h2M7 9v2H3v2h4v2h2V9H7m14 4v-2H11v2h10m-6-4h2V7h4V5h-4V3h-2v6Z"
                            />
                        </svg>
                        Preferences
                    </Link>
                </div>
                <div className="p-2">
                    <button
                        onClick={() => signOut()}
                        className="flex w-full flex-row items-center gap-2 rounded-lg p-2 text-left text-red-400 hover:bg-gray-100"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            className="h-4 w-4"
                        >
                            <path
                                fill="currentColor"
                                d="m17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5M4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5Z"
                            />
                        </svg>
                        Sign out
                    </button>
                </div>
            </div>
        </div>
    );
});

export default UserButtonMenu;
