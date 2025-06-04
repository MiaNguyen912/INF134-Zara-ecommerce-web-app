"use client";

import { useState } from "react";
import { SlidersHorizontal, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuCheckboxItem, DropdownMenuTrigger, DropdownMenuLabel, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";

export type FilterOption = {
  label: string;
  value: string;
  type: "price" | "size" | "color";
};

const priceRanges: FilterOption[] = [
  { label: "Under $50", value: "under_50", type: "price" },
  { label: "$50 - $100", value: "50_100", type: "price" },
  { label: "$100 - $200", value: "100_200", type: "price" },
  { label: "Over $200", value: "over_200", type: "price" },
];

const sizes: FilterOption[] = [
  { label: "XS", value: "XS", type: "size" },
  { label: "S", value: "S", type: "size" },
  { label: "M", value: "M", type: "size" },
  { label: "L", value: "L", type: "size" },
  { label: "XL", value: "XL", type: "size" },
  { label: "32", value: "32", type: "size" },
  { label: "34", value: "34", type: "size" },
  { label: "36", value: "36", type: "size" },
  { label: "38", value: "38", type: "size" },
  { label: "40", value: "40", type: "size" },
  { label: "42", value: "42", type: "size" },
  { label: "44", value: "44", type: "size" },
  { label: "46", value: "46", type: "size" },
];

const colors: FilterOption[] = [
  { label: "Black", value: "black", type: "color" },
  { label: "White", value: "white", type: "color" },
  { label: "Red", value: "red", type: "color" },
  { label: "Blue", value: "blue", type: "color" },
  { label: "Green", value: "green", type: "color" },
];

interface FilterButtonProps {
  onFilterChange: (filters: { [key: string]: string[] }) => void;
  activeFilters: { [key: string]: string[] };
}

export function FilterButton({ onFilterChange, activeFilters }: FilterButtonProps) {
  const [open, setOpen] = useState(false);

  const handleFilterChange = (type: string, value: string, checked: boolean) => {
    const newFilters = { ...activeFilters };

    if (checked) {
      newFilters[type] = [...(newFilters[type] || []), value];
    } else {
      newFilters[type] = (newFilters[type] || []).filter((v) => v !== value);
    }

    onFilterChange(newFilters);
  };

  const handleClearFilters = () => {
    onFilterChange({});
    setOpen(false);
  };

  const hasActiveFilters = Object.values(activeFilters).flat().length > 0;

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" className="relative">
          <SlidersHorizontal className="h-5 w-5" />
          {hasActiveFilters && (
            <span className="absolute -top-1 -right-1 bg-black text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">{Object.values(activeFilters).flat().length}</span>
          )}
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-56">
        {hasActiveFilters && (
          <>
            <DropdownMenuSeparator />
            <div className="p-2">
              <Button variant="ghost" className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50" onClick={handleClearFilters}>
                <X className="mr-2 h-4 w-4" />
                Clear all filters
              </Button>
            </div>
          </>
        )}
        <DropdownMenuLabel>Price Range</DropdownMenuLabel>
        {priceRanges.map((option) => (
          <DropdownMenuCheckboxItem key={option.value} checked={activeFilters.price?.includes(option.value)} onCheckedChange={(checked) => handleFilterChange("price", option.value, checked)}>
            {option.label}
          </DropdownMenuCheckboxItem>
        ))}

        <DropdownMenuSeparator />
        <DropdownMenuLabel>Sizes</DropdownMenuLabel>
        {sizes.map((option) => (
          <DropdownMenuCheckboxItem key={option.value} checked={activeFilters.size?.includes(option.value)} onCheckedChange={(checked) => handleFilterChange("size", option.value, checked)}>
            {option.label}
          </DropdownMenuCheckboxItem>
        ))}

        <DropdownMenuSeparator />
        <DropdownMenuLabel>Colors</DropdownMenuLabel>
        {colors.map((option) => (
          <DropdownMenuCheckboxItem key={option.value} checked={activeFilters.color?.includes(option.value)} onCheckedChange={(checked) => handleFilterChange("color", option.value, checked)}>
            {option.label}
          </DropdownMenuCheckboxItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
