"use client";

type PaginationProps = {
  page: number;
  setPage: (value: number) => void;
  hasNextPage?: boolean;
};

export default function Pagination({
  page,
  setPage,
  hasNextPage = true,
}: PaginationProps) {
  return (
    <div className="flex items-center justify-center gap-4 mt-4">
      {/* Previous Button */}
      <button
        onClick={() => setPage(Math.max(page - 1, 1))}
        disabled={page === 1}
        className="px-3 py-1 border rounded-md disabled:opacity-50"
      >
        Prev
      </button>

      {/* Page Info */}
      <span className="text-sm font-medium">
        Page {page}
      </span>

      {/* Next Button */}
      <button
        onClick={() => setPage(page + 1)}
        disabled={!hasNextPage}
        className="px-3 py-1 border rounded-md disabled:opacity-50"
      >
        Next
      </button>
    </div>
  );
}