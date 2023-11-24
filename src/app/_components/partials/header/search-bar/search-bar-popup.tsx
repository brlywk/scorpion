import { useEffect } from "react";

type SearchBarPopupProps = {
    isOpen: boolean;
    toggleOpen: (open: boolean) => void;
};

export default function SearchBarPopup({
    isOpen,
    toggleOpen,
}: SearchBarPopupProps) {
    // hide scrollbars while popup is open
    useEffect(() => {
        const bodyClasses = document.body.classList;

        if (isOpen) {
            bodyClasses.add("overflow-hidden");
        } else {
            bodyClasses.remove("overflow-hidden");
        }
    }, [isOpen]);

    return (
        <>
            {isOpen && (
                <div
                    className="absolute inset-0 z-30 flex h-screen w-full justify-center bg-black/25 transition-all"
                    onClick={() => toggleOpen(false)}
                >
                    <div
                        className="relative top-1/4 z-40 h-max w-1/4 -translate-y-full overflow-hidden rounded-lg border border-gray-300 bg-white shadow-lg"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <form
                            id="search-bar-form"
                            onSubmit={(e) => e.preventDefault()}
                            onKeyDown={(e) => {
                                if (e.key === "Escape") {
                                    toggleOpen(false);
                                }
                            }}
                        >
                            <input
                                type="text"
                                id="search-bar-input"
                                className="w-full p-4 text-lg placeholder:italic focus-visible:outline-0"
                                placeholder="Type to search..."
                                autoFocus
                            />
                        </form>
                        {/* TODO: Search results will show up here! */}
                    </div>
                </div>
            )}
        </>
    );
}
