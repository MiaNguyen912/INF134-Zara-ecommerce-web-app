"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

export type SortOption = {
  label: string;
  value: string;
};

const sortOptions: SortOption[] = [
  { label: "Newest", value: "newest" },
  { label: "Price: Low to High", value: "price_asc" },
  { label: "Price: High to Low", value: "price_desc" },
  { label: "Most Popular", value: "popular" },
];

interface SortButtonProps {
  onSort: (value: string) => void;
  currentSort: string;
}

export function SortButton({ onSort, currentSort }: SortButtonProps) {
  const [open, setOpen] = useState(false);

  const currentLabel = sortOptions.find((option) => option.value === currentSort)?.label || "Sort by";

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="w-[180px] justify-between">
          {currentLabel}
          <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[180px]">
        {sortOptions.map((option) => (
          <DropdownMenuItem
            key={option.value}
            onClick={() => {
              onSort(option.value);
              setOpen(false);
            }}
            className={currentSort === option.value ? "bg-gray-100" : ""}>
            {option.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
