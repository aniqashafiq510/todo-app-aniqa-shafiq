"use client";

import { useEffect, useState } from "react";
import { SearchTasks } from "@/serverActions/tasks/searchTasks";
import type { Filters, Task } from "@/types/types";

type SortField = "createdAt" | "dueDate" | "title";
type SortOrder = "asc" | "desc";

export function useTasksManage(userId?: string) {
  const [filters, setFilters] = useState<Filters>({
    query: "",
    status: "all",
    dateType: "createdAt",
    date: "",
  });

  const [sortField, setSortField] = useState<SortField>("createdAt");
  const [sortOrder, setSortOrder] = useState<SortOrder>("desc");

  const [page, setPage] = useState(1);
  const [limit] = useState(5);

  const [searchedTasks, setSearchedTasks] = useState<Task[]>(
    []
  );

  useEffect(() => {
    if (!userId) return;

    const timer = setTimeout(async () => {
      const data = await SearchTasks({
        userId,
        filters,
        sortField,
        sortOrder,
        page,
        limit,
      });
      console.log({
  sortField,
  sortOrder,
  page
})

      setSearchedTasks(data);
    }, 500);

    return () => clearTimeout(timer);
  }, [filters, userId, sortField, sortOrder, page,limit]);

  return {
    filters,
    setFilters,
    sortField,
    setSortField,
    sortOrder,
    setSortOrder,
    page,
    setPage,
    limit,
    searchedTasks,
  };
}
