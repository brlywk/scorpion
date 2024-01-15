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

/**
 * Tries to shorten the given input to a two string intial.
 *
 * If that's not possible, take the first two letters...
 */
export function shortenToInitials(input: string): string {
    if (!input || input.length < 2) return "";

    let result = "";
    const tokens = input.split(" ") ?? "";

    // we cannot get initials, return the first two letters
    if (tokens.length < 2) {
        result = input.slice(0, 2);
    } else {
        result =
            tokens[0]!.slice(0, 1) + tokens[tokens.length - 1]!.slice(0, 1);
    }

    return result.toUpperCase();
}
