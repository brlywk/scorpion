import clsx from "clsx";
import Image from "next/image";
import {
    ElementRef,
    MouseEventHandler,
    ReactNode,
    forwardRef,
    useEffect,
    useRef,
    useState,
} from "react";
import { Controller, useFormContext } from "react-hook-form";
import { Currency, SelectCategory } from "~/server/db/schema";
import { findCategoryById } from "~/utils/formHelpers";

interface BaseDropdown {
    name: string;
    widthClass?: string;
    heightClass?: string;
    displayTransformer?: (value: string) => string;
}

type StringDropdownProps = BaseDropdown & {
    options: string[];
    classMod?: string;
    defaultValue?: string;
};

type CategoryDropdownProps = BaseDropdown & {
    options: SelectCategory[];
    defaultValueId: number;
};

// The actual exported dropdown component
export function Dropdown({
    name,
    displayTransformer,
    options,
    defaultValue,
    classMod,
    widthClass,
    heightClass,
}: StringDropdownProps) {
    if (options.length === 0) return null;

    const { control } = useFormContext();
    const [menuOpen, setMenuOpen] = useState(false);

    const initialValue = defaultValue ?? options.at(0)!;
    const transform = displayTransformer ?? ((str: string) => str);

    // handle click outside menu
    const menuRef = useRef<ElementRef<"div">>(null);
    const buttonRef = useRef<ElementRef<"div">>(null);

    function handleClickOutside(event: Event) {
        if (
            menuRef.current &&
            buttonRef.current &&
            (event.target as Node) !== menuRef.current &&
            (event.target as Node) !== buttonRef.current
        ) {
            setMenuOpen(false);
        }
    }

    useEffect(() => {
        window.addEventListener("click", handleClickOutside);

        return () => window.removeEventListener("click", handleClickOutside);
    }, []);

    return (
        <Controller
            name={name}
            control={control}
            defaultValue={initialValue}
            render={({ field: { value, onChange, ref } }) => (
                <>
                    <input
                        type="hidden"
                        name={name}
                        value={value as string}
                        ref={ref}
                        onChange={onChange}
                    />
                    <div className="relative">
                        <DropdownButton
                            onClick={() => setMenuOpen((prev) => !prev)}
                            menuOpen={menuOpen}
                            widthClass={widthClass}
                            heightClass={heightClass}
                            ref={buttonRef}
                            classMod={classMod}
                        >
                            {transform(value as string)}
                        </DropdownButton>
                        <DropdownMenu
                            open={menuOpen}
                            widthClass={widthClass}
                            ref={menuRef}
                        >
                            {options.map((opt, idx) => (
                                <DropdownMenuEntry
                                    key={idx}
                                    value={opt}
                                    onClick={() => {
                                        onChange(opt);
                                        setMenuOpen(false);
                                    }}
                                    classMod={classMod}
                                >
                                    {transform(opt)}
                                </DropdownMenuEntry>
                            ))}
                        </DropdownMenu>
                    </div>
                </>
            )}
        />
    );
}

export function CategoryDropdown({
    name,
    displayTransformer,
    options,
    defaultValueId,
    widthClass,
    heightClass,
}: CategoryDropdownProps) {
    if (options.length === 0) return null;
    const initialCategory = findCategoryById(defaultValueId, options);

    if (!initialCategory)
        throw new ReferenceError(`No category found with ID ${defaultValueId}`);

    const { control } = useFormContext();
    const [menuOpen, setMenuOpen] = useState(false);

    const transform = displayTransformer ?? ((str: string) => str);

    // handle click outside menu
    const menuRef = useRef<ElementRef<"div">>(null);
    const buttonRef = useRef<ElementRef<"div">>(null);
    const imageRef = useRef<ElementRef<"img">>(null);

    function handleClickOutside(event: Event) {
        if (
            menuRef.current &&
            buttonRef.current &&
            imageRef.current &&
            (event.target as Node) !== menuRef.current &&
            (event.target as Node) !== buttonRef.current &&
            (event.target as Node) !== imageRef.current
        ) {
            setMenuOpen(false);
        }
    }

    useEffect(() => {
        window.addEventListener("click", handleClickOutside);

        return () => window.removeEventListener("click", handleClickOutside);
    }, []);

    return (
        <Controller
            name={name}
            control={control}
            defaultValue={initialCategory.id}
            render={({ field: { value, onChange, ref } }) => (
                <>
                    <input
                        type="hidden"
                        name={name}
                        value={value as string}
                        ref={ref}
                        onChange={onChange}
                    />
                    <div className="relative">
                        <DropdownButton
                            onClick={() => setMenuOpen((prev) => !prev)}
                            menuOpen={menuOpen}
                            widthClass={widthClass}
                            heightClass={heightClass}
                            ref={buttonRef}
                            classMod="flex flex-row items-center gap-4"
                        >
                            {initialCategory.image && (
                                <Image
                                    src={initialCategory.image}
                                    width={32}
                                    height={32}
                                    alt={`Image for category ${initialCategory.name}`}
                                    className="h-4 w-4"
                                    ref={imageRef}
                                />
                            )}
                            {transform(
                                findCategoryById(value as number, options)
                                    ?.name ?? "",
                            )}
                        </DropdownButton>
                        <DropdownMenu
                            open={menuOpen}
                            widthClass="w-full"
                            ref={menuRef}
                        >
                            {options.map((opt) => (
                                <DropdownMenuEntry
                                    key={opt.id}
                                    value={opt.id}
                                    onClick={() => {
                                        onChange(opt.id);
                                        setMenuOpen(false);
                                    }}
                                    classMod="flex w-full flex-row items-center gap-4"
                                >
                                    {opt.image && (
                                        <Image
                                            src={opt.image}
                                            width={32}
                                            height={32}
                                            alt={`Image for category ${opt.name}`}
                                            className="h-4 w-4"
                                        />
                                    )}
                                    {transform(opt.name)}
                                </DropdownMenuEntry>
                            ))}
                        </DropdownMenu>
                    </div>
                </>
            )}
        />
    );
}

// Dropdown Button
type DropdownButtonProps = {
    onClick: MouseEventHandler;
    menuOpen: boolean;
    classMod?: string;
    widthClass?: string;
    heightClass?: string;
    children: ReactNode;
};

const DropdownButton = forwardRef<ElementRef<"div">, DropdownButtonProps>(
    (
        { onClick, menuOpen, classMod, heightClass, widthClass, children },
        buttonRef,
    ) => {
        return (
            <div
                onClick={onClick}
                className={clsx(
                    `flex cursor-pointer items-center rounded-lg border p-2`,
                    !menuOpen && "border-gray-300",
                    widthClass,
                    heightClass,
                    classMod,
                )}
                ref={buttonRef}
            >
                {children}
            </div>
        );
    },
);

// Dropdown Menu
type DropdownMenuProps = {
    open: boolean;
    widthClass?: string;
    children: ReactNode;
};

const DropdownMenu = forwardRef<ElementRef<"div">, DropdownMenuProps>(
    ({ open, widthClass, children }, menuRef) => {
        return (
            <>
                {open && (
                    <div
                        className={clsx(
                            "absolute left-0 top-0 z-10 flex flex-col items-center gap-2 rounded-lg border border-gray-500 bg-white p-1 shadow",
                            widthClass,
                        )}
                        ref={menuRef}
                    >
                        {children}
                    </div>
                )}
            </>
        );
    },
);

// Dropdown Menu Entry
type DropdownMenuEntryProps = {
    onClick: (value: string | number) => void;
    classMod?: string;
    value: string | number;
    children: ReactNode;
};

function DropdownMenuEntry({
    onClick,
    classMod,
    value,
    children,
}: DropdownMenuEntryProps) {
    return (
        <div
            onClick={() => onClick(value)}
            className={clsx(
                `flex w-full cursor-pointer rounded-lg p-1 hover:bg-gray-100`,
                classMod,
            )}
        >
            {children}
        </div>
    );
}
