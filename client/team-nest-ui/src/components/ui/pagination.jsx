import * as React from "react";
import {
  IconChevronLeft,
  IconChevronRight,
  IconChevronsLeft,
  IconChevronsRight,
} from "@tabler/icons-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

/**
 * Pagination component with modern shadcn styling
 */
function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  pageSize = 10,
  onPageSizeChange,
  pageSizeOptions = [5, 10, 20, 50],
  totalItems,
  showPageSize = true,
  showItemCount = true,
  className,
}) {
  const startItem = (currentPage - 1) * pageSize + 1;
  const endItem = Math.min(currentPage * pageSize, totalItems);

  const getPageNumbers = () => {
    const pages = [];
    const showPages = 5;
    let startPage = Math.max(1, currentPage - Math.floor(showPages / 2));
    let endPage = Math.min(totalPages, startPage + showPages - 1);

    if (endPage - startPage + 1 < showPages) {
      startPage = Math.max(1, endPage - showPages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    return pages;
  };

  if (totalPages <= 1 && !showPageSize) return null;

  return (
    <div
      className={cn(
        "flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between",
        className
      )}
    >
      {/* Left side - Item count and page size */}
      <div className="flex items-center gap-4 text-sm text-muted-foreground">
        {showItemCount && totalItems > 0 && (
          <span>
            Showing <span className="font-medium text-foreground">{startItem}</span> to{" "}
            <span className="font-medium text-foreground">{endItem}</span> of{" "}
            <span className="font-medium text-foreground">{totalItems}</span> results
          </span>
        )}
        {showPageSize && (
          <div className="flex items-center gap-2">
            <span className="hidden sm:inline">Rows per page:</span>
            <Select
              value={pageSize.toString()}
              onValueChange={(value) => onPageSizeChange?.(parseInt(value))}
            >
              <SelectTrigger className="h-8 w-[70px]">
                <SelectValue placeholder={pageSize} />
              </SelectTrigger>
              <SelectContent side="top">
                {pageSizeOptions.map((size) => (
                  <SelectItem key={size} value={size.toString()}>
                    {size}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}
      </div>

      {/* Right side - Navigation */}
      <div className="flex items-center gap-1">
        {/* First page */}
        <Button
          variant="outline"
          size="icon"
          className="hidden size-8 sm:flex"
          onClick={() => onPageChange(1)}
          disabled={currentPage === 1}
        >
          <IconChevronsLeft className="size-4" />
          <span className="sr-only">First page</span>
        </Button>

        {/* Previous page */}
        <Button
          variant="outline"
          size="icon"
          className="size-8"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          <IconChevronLeft className="size-4" />
          <span className="sr-only">Previous page</span>
        </Button>

        {/* Page numbers */}
        <div className="flex items-center gap-1">
          {getPageNumbers().map((page) => (
            <Button
              key={page}
              variant={page === currentPage ? "default" : "outline"}
              size="icon"
              className={cn(
                "size-8",
                page === currentPage && "pointer-events-none"
              )}
              onClick={() => onPageChange(page)}
            >
              {page}
            </Button>
          ))}
        </div>

        {/* Next page */}
        <Button
          variant="outline"
          size="icon"
          className="size-8"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          <IconChevronRight className="size-4" />
          <span className="sr-only">Next page</span>
        </Button>

        {/* Last page */}
        <Button
          variant="outline"
          size="icon"
          className="hidden size-8 sm:flex"
          onClick={() => onPageChange(totalPages)}
          disabled={currentPage === totalPages}
        >
          <IconChevronsRight className="size-4" />
          <span className="sr-only">Last page</span>
        </Button>
      </div>
    </div>
  );
}

/**
 * Hook to manage pagination state
 */
function usePagination({ totalItems, initialPageSize = 10 }) {
  const [currentPage, setCurrentPage] = React.useState(1);
  const [pageSize, setPageSize] = React.useState(initialPageSize);

  const totalPages = Math.ceil(totalItems / pageSize);

  const paginatedData = React.useCallback(
    (data) => {
      const start = (currentPage - 1) * pageSize;
      const end = start + pageSize;
      return data.slice(start, end);
    },
    [currentPage, pageSize]
  );

  const handlePageChange = React.useCallback(
    (page) => {
      setCurrentPage(Math.max(1, Math.min(page, totalPages)));
    },
    [totalPages]
  );

  const handlePageSizeChange = React.useCallback((size) => {
    setPageSize(size);
    setCurrentPage(1);
  }, []);

  // Reset to page 1 if current page exceeds total pages
  React.useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(1);
    }
  }, [totalPages, currentPage]);

  return {
    currentPage,
    pageSize,
    totalPages,
    paginatedData,
    onPageChange: handlePageChange,
    onPageSizeChange: handlePageSizeChange,
    paginationProps: {
      currentPage,
      totalPages,
      pageSize,
      totalItems,
      onPageChange: handlePageChange,
      onPageSizeChange: handlePageSizeChange,
    },
  };
}

export { Pagination, usePagination };
