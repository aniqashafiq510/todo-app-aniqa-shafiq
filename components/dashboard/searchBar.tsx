"use client";

import type { SearchBarProps } from "@/types/types";

export default function SearchBar({ query, setQuery } : SearchBarProps) {
  return (
    <input
      type="text"
      placeholder="Search tasks..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      className="w-full border px-4 py-2 rounded-md mt-3"
    />
  );
}