"use client";

import { useEffect, useState } from "react";
import SearchBarButton from "./search-bar-button";
import SearchBarPopup from "./search-bar-popup";

export default function SearchBar() {
    const searchKey = "k";
    const macKey = "⌘";
    const theOthersKey = "ctrl";

    const [open, setOpen] = useState(false);
    const [keys, setKeys] = useState([macKey, searchKey]);

    useEffect(() => {
        const isMac = navigator.userAgent.toLowerCase().includes("mac");
        setKeys([isMac ? macKey : theOthersKey, searchKey]);

        function handleKeyDown(event: KeyboardEvent) {
            const modKey = isMac ? event.metaKey : event.ctrlKey;

            if (modKey && event.key === "k") {
                console.log("Search Shortcut pressed");
                setOpen((prev) => !prev);
            }
        }

        document.addEventListener("keydown", handleKeyDown);

        return () => document.removeEventListener("keydown", handleKeyDown);
    }, []);

    // handle button clicks of the button that is clicked when the button is clicked... maybe
    function clickHandler() {
        console.log("Search Button clicked");
        setOpen(true);
    }

    return (
        <>
            <SearchBarButton keys={keys} clickHandler={clickHandler} />
            <SearchBarPopup isOpen={open} toggleOpen={setOpen} />
        </>
    );
}
