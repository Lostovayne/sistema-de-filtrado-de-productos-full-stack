"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { ChevronDown, Filter } from "lucide-react";
import { useState } from "react";

import type { Product } from "@/db";
import { QueryResult } from "@upstash/vector";
import axios from "axios";

import ProductCard from "@/components/Products/Product";

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
  });

  // usando Tanstack query

  const { data: products } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const { data } = await axios.post<QueryResult<Product>[]>(
        "http://localhost:3000/api/products",
        {
          filter: {
            sort: filter.sort,
          },
        }
      );

      return data;
    },
  });

  console.log(products);

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

      <section className="pt-6 pb-24">
        <div className="gap-x-8 gap-y-10 grid grid-cols-1 lg:grid-cols-4">
          {/* Filters */}
          <div></div>

          {/* Products grid */}
          <ul className="gap-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:col-span-3">
            {products?.map((product) => (
              <ProductCard key={product.id} product={product.metadata! as Product} />
            ))}
          </ul>
        </div>
      </section>
    </main>
  );
}
