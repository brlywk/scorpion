import type { Currency } from "~/server/db/schema";

/**
 * Capitalizes a string
 * Used for cases in which the corresponding Tailwind class wouldn't work
 */
export function capitalize(str: string): string {
    if (!str) return "";
    if (str.length === 1) return str.toUpperCase();

    const split = str.split("");

    return split[0]?.toUpperCase() + split.slice(1).join("");
}

/**
 * Returns the correct currency symbol for one of the allowed currencies
 */
export function getCurrencySymbol(currency: Currency): string {
    switch (currency) {
        case "eur":
            return "€";
        case "usd":
            return "$";

        default:
            return "Unknown currency.";
    }
}
