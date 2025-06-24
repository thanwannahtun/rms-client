import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


// Format breadcrumb
export function formatBreadcrumb(slug: string): string {
  return slug
    .replace(/[-_]/g, " ") // handle kebab-case or snake_case
    .replace(/\b\w/g, (c) => c.toUpperCase()); // Capitalize first letters
}
