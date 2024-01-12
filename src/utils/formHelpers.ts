import type { SelectCategory } from "~/server/db/schema";

/**
 * Finds a category by ID and returns it.
 * If no category is found, null is returned.
 */
export function findCategoryById(
    id: number,
    categories: SelectCategory[],
): SelectCategory | null {
    if (!id) throw new Error("Parameter 'id' is required");
    if (id < 0) throw new Error("Parameter 'id' must be > 0");
    if (!categories) throw new Error("Parameter 'categories' must be provided");
    if (categories.length === 0)
        throw new Error(
            "Parameter 'categories' must contain at least one element",
        );

    const category = categories.find((c) => c.id === id);

    return category ?? null;
}
