import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
}

const Pagination: React.FC<PaginationProps> = ({
  page,
  totalPages,
  onPageChange,
  className = "",
}) => {
  return (
    <div className={`flex justify-between mt-4 gap-2 w-full ${className}`}>
      <p className="text-sm text-gray-500 self-center">
        Page {page} of {totalPages}
      </p>
      <div className="flex gap-2">
        <button
          onClick={() => onPageChange(Math.max(page - 1, 1))}
          disabled={page === 1}
          className="px-2 py-1 bg-layoutDarkBG rounded disabled:opacity-50 flex items-center"
        >
          <ChevronLeft size={20} />
        </button>
        {Array.from({ length: totalPages }).map((_, idx) => {
          if (
            idx === 0 ||
            idx === totalPages - 1 ||
            Math.abs(idx + 1 - page) <= 1
          ) {
            return (
              <button
                key={idx}
                onClick={() => onPageChange(idx + 1)}
                className={`px-3 py-1 rounded ${
                  page === idx + 1
                    ? "bg-layoutDarkBG text-white"
                    : "bg-layoutDarkBG text-black"
                }`}
              >
                {idx + 1}
              </button>
            );
          }
          if (
            (idx === 1 && page > 3) ||
            (idx === totalPages - 2 && page < totalPages - 2)
          ) {
            return (
              <span key={idx} className="px-2">
                ...
              </span>
            );
          }
          return null;
        })}
        <button
          onClick={() => onPageChange(Math.min(page + 1, totalPages))}
          disabled={page === totalPages || totalPages === 0}
          className="px-2 py-1 bg-layoutDarkBG rounded disabled:opacity-50 flex items-center"
        >
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );
};

export default Pagination;
