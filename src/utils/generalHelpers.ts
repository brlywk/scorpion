import { twMerge } from "tailwind-merge";
import { clsx, type ClassValue } from "clsx";

// Totally my own idea for a function that helps getting 'clean'
// classes for Tailwind...
// Definitely not stolen from any UI library!
export function cn(...inputs: ClassValue[]): string {
    return twMerge(clsx(inputs));
}
