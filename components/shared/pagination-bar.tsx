"use client";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
} from "@/components/ui/pagination";

interface PaginationBarProps {
  onPrevious?: () => void;
  onNext?: () => void;
}

export function PaginationBar({ onPrevious, onNext }: PaginationBarProps) {
  return (
    <div className="flex justify-end">
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious href="#" onClick={onPrevious} />
          </PaginationItem>
          <PaginationItem>
            <PaginationNext href="#" onClick={onNext} />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
