type SearchBarButtonProps = {
    keys: string[];
    clickHandler: () => void;
};

export default function SearchBarButton({
    keys,
    clickHandler,
}: SearchBarButtonProps) {
    return (
        <button
            onClick={clickHandler}
            className="flex w-64 flex-row items-center justify-start gap-2 rounded-lg border border-gray-300 p-2 text-gray-300 hover:border-gray-500"
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                className="h-4 w-4"
            >
                <path
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 10a7 7 0 1 0 14 0a7 7 0 1 0-14 0m18 11l-6-6"
                />
            </svg>
            <div className="flex-grow text-left">Search...</div>
            <div className="flex flex-row gap-1 text-xs">
                {keys.map((k) => (
                    <span
                        key={k}
                        className="flex h-6 w-6 items-center justify-center rounded border border-gray-300 p-1 shadow-inner"
                    >
                        {k.toUpperCase()}
                    </span>
                ))}
            </div>
        </button>
    );
}
