"use client";

import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import {
    expenses,
    type Currency,
    type SelectCategory,
    type SelectExpense,
} from "~/server/db/schema";
import { getCurrencySymbol } from "~/utils/displayTransformers";

type ExpenseCardProps = {
    expense: SelectExpense;
    category: SelectCategory;
};

export default function ExpenseCard({ expense, category }: ExpenseCardProps) {
    const [open, setOpen] = useState(false);

    return (
        <div className="overflow-hidden rounded-lg border border-gray-300 shadow transition-all duration-300 ease-out hover:shadow-lg">
            <div
                className={clsx("flex flex-row divide-x divide-gray-300", {
                    "border-b border-b-gray-300 transition-all": open,
                })}
            >
                <Link
                    className="flex flex-grow items-center text-lg hover:bg-gray-100"
                    href={`/expenses/edit/${expense.id}`}
                >
                    <div className="group flex w-full flex-row items-center gap-2 p-2">
                        {category.image && (
                            <Image
                                src={category.image}
                                alt={`Icon for category ${category.name}`}
                                width="48"
                                height="48"
                                className="ml-2 h-6 w-6"
                            />
                        )}
                        <div className="flex-grow">{expense.name}</div>
                        <div className="opacity-0 transition-all group-hover:opacity-100">
                            <IconEdit />
                        </div>
                    </div>
                </Link>
                <div className="cursor-pointer">
                    <div
                        onClick={() => setOpen((prev) => !prev)}
                        className="flex h-full w-full items-center justify-center p-2 transition-all hover:bg-gray-100"
                    >
                        <IconChevron open={open} />
                    </div>
                </div>
            </div>
            <div
                className={clsx(
                    open
                        ? "block h-full opacity-100"
                        : "invisible h-0 opacity-0",
                    "min-h-0 transition-all",
                )}
            >
                <div className="p-2 pl-4">
                    <div className="grid grid-cols-[max-content_1fr_max-content_1fr] gap-4">
                        {/* Row 1 */}
                        <div className="font-bold">Price</div>
                        <div>
                            {expense.price}{" "}
                            {getCurrencySymbol(expense.currency!)}
                        </div>
                        <div className="font-bold">Category</div>
                        <div>{category.name}</div>

                        {/* Row 2 */}
                        <div className="font-bold">Billing Cycle</div>
                        <div>{expense.billingCycle}</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

// Open / close chevron
// TODO: Move into separate file when it becomes necessary
function IconChevron({ open }: { open: boolean }) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            className={clsx("h-8 w-8 transition-all", open ? "rotate-90" : "")}
        >
            <path
                fill="currentColor"
                d="M8.59 16.58L13.17 12L8.59 7.41L10 6l6 6l-6 6z"
            />
        </svg>
    );
}

function IconEdit() {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
        >
            <g
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
            >
                <path d="m16.475 5.408l2.117 2.117m-.756-3.982L12.109 9.27a2.118 2.118 0 0 0-.58 1.082L11 13l2.648-.53c.41-.082.786-.283 1.082-.579l5.727-5.727a1.853 1.853 0 1 0-2.621-2.621" />
                <path d="M19 15v3a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h3" />
            </g>
        </svg>
    );
}
