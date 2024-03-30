"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { ChevronDown, Filter } from "lucide-react";
import { useState } from "react";

const SORT_OPTIONS = [
  {
    name: "None",
    value: "none",
  },
  {
    name: "Price: Low to High",
    value: "price-asc",
  },
  {
    name: "Price: High to Low",
    value: "price-desc",
  },
] as const;

export default function Home() {
  const [filter, setFilter] = useState({
    sort: "none",
    size: "all",
  });

  // console.log(filter);

  return (
    <main className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
      <div className="flex justify-between items-baseline border-gray-200 pt-24 pb-6 border-b">
        <h1 className="font-bold text-4xl text-gray-900 tracking-tight">
          High-quality cotton selection
        </h1>
        <div className="flex items-center">
          <DropdownMenu>
            <DropdownMenuTrigger className="inline-flex justify-center font-medium text-gray-700 text-sm hover:text-gray-900 group">
              Sort
              <ChevronDown className="group-hover:text-gray-500 flex-shrink-0 -mr-1 ml-1 w-5 h-5 text-gray-400" />
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end">
              {SORT_OPTIONS.map((option) => (
                <button
                  key={option.name}
                  className={cn("text-left w-full block px-4 py-2 text-sm", {
                    "text-gray-900 bg-gray-100": option.value === filter.sort,
                    "text-gray-500": option.value !== filter.sort,
                  })}
                  onClick={() => {
                    setFilter((prev) => ({ ...prev, sort: option.value }));
                  }}
                >
                  {option.name}
                </button>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          <button className="lg:hidden -m-2 ml-4 sm:ml-6 p-2 text-gray-400 hover:text-gray-500">
            <Filter className="w-5 h-5" />
          </button>
        </div>
      </div>
    </main>
  );
}
