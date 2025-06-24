"use client";

import { Input } from "@/components/ui/input";

interface SearchInputProps {
    placeholder?: string;
    value?: string;
    onChange?: (value: string) => void;
}

export function SearchInput({ placeholder = "Search...", value, onChange }: SearchInputProps) {
    return (
        <Input
            placeholder={placeholder}
            value={value}
            onChange={(e) => onChange?.(e.target.value)}
            className="w-full max-w-sm"
        />
    );
}
