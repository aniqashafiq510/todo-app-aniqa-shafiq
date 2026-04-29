"use client";

import type { SearchBarProps } from "@/types/types";

export default function SearchBar({
  filters,
  setFilters,
}: SearchBarProps) {
  return (
    <div className="space-y-4 mt-5">

      {/* Search Input */}
      <input
        type="text"
        value={filters.query}
        onChange={(e) =>
          setFilters((prev) => ({
            ...prev,
            query: e.target.value,
          }))
        }
        className="border w-full p-2 rounded-md"
        placeholder="Search Tasks..."
      />

      {/* Filters Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">

        {/* Status Filter */}
        <select
          value={filters.status}
          onChange={(e) =>
            setFilters((prev) => ({
              ...prev,
              status: e.target.value as
                | "all"
                | "completed"
                | "pending",
            }))
          }
          className="border p-2 rounded-md"
        >
          <option value="all">All Tasks</option>
          <option value="pending">Pending</option>
          <option value="completed">Completed</option>
        </select>

        {/* Date Type */}
        <select
          value={filters.dateType}
          onChange={(e) =>
            setFilters((prev) => ({
              ...prev,
              dateType: e.target.value as
                | "createdAt"
                | "dueDate",
            }))
          }
          className="border p-2 rounded-md"
        >
          <option value="createdAt">Created Date</option>
          <option value="dueDate">Due Date</option>
        </select>

        {/* Date Picker */}
        <input
          type="date"
          value={filters.date}
          onChange={(e) =>
            setFilters((prev) => ({
              ...prev,
              date: e.target.value,
            }))
          }
          className="border p-2 rounded-md"
        />
      </div>

      {/* Reset Button */}
      <button
        onClick={() =>
          setFilters({
            query: "",
            status: "all",
            dateType: "createdAt",
            date: "",
          })
        }
        className="bg-black text-white px-4 py-2 rounded-md"
      >
        Reset Filters
      </button>
    </div>
  );
}