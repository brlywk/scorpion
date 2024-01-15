import {
    capitalize,
    getCurrencySymbol,
    shortenToInitials,
} from "../displayTransformers";

describe("shortenToInitals", () => {
    it("should return initials for a valid input", () => {
        const result = shortenToInitials("John Doe");
        expect(result).toBe("JD");
    });

    it("should return empty string for an empty input", () => {
        const result = shortenToInitials("");
        expect(result).toBe("");
    });

    it("should return empty string for undefined input", () => {
        const result = shortenToInitials(undefined);
        expect(result).toBe("");
    });

    it("should return first two letters for single word input", () => {
        const result = shortenToInitials("hello");
        expect(result).toBe("HE");
    });
});

describe("capitalize", () => {
    it("should return an empty string for undefined", () => {
        const result = capitalize(undefined);
        expect(result).toBe("");
    });

    it("should return an empty string for an empty string", () => {
        const result = capitalize("");
        expect(result).toBe("");
    });

    it("should return the first letter capitalized", () => {
        const result = capitalize("hello there");
        expect(result).toBe("Hello there");
    });
});

describe("getCurrencySymbol", () => {
    it("should return the correct symbol for eur", () => {
        const result = getCurrencySymbol("eur");
        expect(result).toBe("€");
    });

    it("should return the correct symbol for usd", () => {
        const result = getCurrencySymbol("usd");
        expect(result).toBe("$");
    });

    it("should return 'unknown currency' for everything else", () => {
        const result = getCurrencySymbol("hello there");
        expect(result).toBe("Unknown currency.");
    });
});
