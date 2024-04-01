"use client";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { ChevronDown, Filter } from "lucide-react";
import { useState } from "react";

import type { Product } from "@/db";
import { QueryResult } from "@upstash/vector";
import axios from "axios";

import ProductCard from "@/components/Products/Product";
import ProductSkeleton from "@/components/Products/ProductSkeleton";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const SORT_OPTIONS = [
  { name: "None", value: "none" },
  { name: "Price: Low to High", value: "price-asc" },
  { name: "Price: High to Low", value: "price-desc" },
] as const;

const COLOR_FILTERS = {
  id: "color",
  name: "Color",
  options: [
    { value: "white", label: "White" },
    { value: "beige", label: "Beige" },
    { value: "blue", label: "Blue" },
    { value: "green", label: "Green" },
    { value: "purple", label: "Purple" },
  ] as const,
};

const SUBCATEGORIES = [
  { name: "T-Shirts", selected: true, href: "#" },
  { name: "Hoodies", selected: false, href: "#" },
  { name: "Sweatshirts", selected: false, href: "#" },
  { name: "Accessories", selected: false, href: "#" },
];

export default function Home() {
  const [filter, setFilter] = useState({
    sort: "none",
  });

  // usando Tanstack query

  const { data: products } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const { data } = await axios.post<QueryResult<Product>[]>("http://localhost:3000/api/products", {
        filter: {
          sort: filter.sort,
        },
      });

      return data;
    },
  });

  return (
    <main className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
      <div className="flex justify-between items-baseline border-gray-200 pt-24 pb-6 border-b">
        <h1 className="font-bold text-4xl text-gray-900 tracking-tight">High-quality cotton selection</h1>
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
          <div className="lg:block hidden">
            <ul className="space-y-4 border-gray-200 pb-6 border-b font-medium text-gray-900 text-sm">
              {SUBCATEGORIES.map((category) => (
                <li key={category.name}>
                  <button disabled={!category.selected} className="disabled:opacity-60 disabled:cursor-not-allowed">
                    {category.name}
                  </button>
                </li>
              ))}
            </ul>

            <Accordion type="multiple" className="animate-none">
              {/* Color filter */}
              <AccordionItem value="color">
                <AccordionTrigger className="py-3 text-gray-400 text-sm hover:text-gray-500 hover:no-underline">
                  <span className="font-medium text-gray-900">Color</span>
                </AccordionTrigger>
                <AccordionContent className="pt-6 animate-none">
                  <ul className="space-y-4">
                    {COLOR_FILTERS.options.map((option, optionIdx) => (
                      <li key={option.value} className="flex items-center">
                        <input
                          type="checkbox"
                          id={`color-${optionIdx}`}
                          className="border-gray-300 text-slate-900 size-4 focus:ring-slate-950 accent-slate-700"
                        />
                        <label htmlFor={`color-${optionIdx}`} className="ml-3 text-gray-600 text-sm">
                          {option.label}
                        </label>
                      </li>
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>

          {/* Products grid */}
          <ul className="gap-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:col-span-3">
            {products
              ? products?.map((product) => <ProductCard key={product.id} product={product.metadata! as Product} />)
              : new Array(12).fill(null).map((_, i) => <ProductSkeleton key={i} />)}
          </ul>
        </div>
      </section>
    </main>
  );
}
