"use client";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

interface FilterDropdownProps {
  label?: string;
  filters: string[];
  onSelect: (filter: string) => void;
}

export function FilterDropdown({ label = "Filter", filters, onSelect }: FilterDropdownProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">{label}</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {filters.map((filter) => (
          <DropdownMenuItem key={filter} onClick={() => onSelect(filter)}>
            {filter}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
