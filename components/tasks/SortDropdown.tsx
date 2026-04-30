"use client";

type SortField = "createdAt" | "dueDate" | "title";
type SortOrder = "asc" | "desc";

type SortingProps = {
  sortField: SortField;
  setSortField: (value: SortField) => void;
  sortOrder: SortOrder;
  setSortOrder: (value: SortOrder) => void;
};

export default function SortDropdown({
  sortField,
  setSortField,
  sortOrder,
  setSortOrder,
}: SortingProps) {
    
  return (
    <div className="flex gap-2 items-center">
      {/* Sort Field */}
      <select
        value={sortField}
        
        onChange={(e) => setSortField(e.target.value as SortField)}
        className="border border-gray-500 p-2 rounded-md"
      >
        <option value="createdAt">Created Date</option>
        <option value="dueDate">Due Date</option>
        <option value="title">Title (A-Z)</option>
      </select>

      {/* Sort Order */}
      <select
        value={sortOrder}
        onChange={(e) => setSortOrder(e.target.value as SortOrder)}
        className="border border-gray-500 p-2 rounded-md"
      >
        <option value="desc">Descending</option>
        <option value="asc">Ascending</option>
      </select>
    </div>
  );
}