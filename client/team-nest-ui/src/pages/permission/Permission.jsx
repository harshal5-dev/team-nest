import { Input } from "@base-ui/react";
import {
  IconBriefcase,
  IconCheck,
  IconCopy,
  IconKey,
  IconLoader,
  IconLock,
  IconSearch,
  IconShield,
  IconUsers,
  IconX,
} from "@tabler/icons-react";
import { useMemo, useState } from "react";
import { useGetPermissionsQuery } from "./permissionApi";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { Pagination } from "@/components/ui/pagination";
import { showToast } from "@/components/ui/sonner";

const MODULE_COLORS = {
  ROLE: {
    badge: "bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200",
  },
  USER: {
    badge:
      "bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200",
  },
  PROJECT: {
    badge: "bg-amber-100 dark:bg-amber-900 text-amber-800 dark:text-amber-200",
  },
  TASK: {
    badge: "bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200",
  },
  PERMISSION: {
    badge: "bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200",
  },
  TENANT: {
    badge:
      "bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-200",
  },
};

const MODULE_ICONS = {
  ROLE: IconShield,
  USER: IconUsers,
  PROJECT: IconBriefcase,
  TASK: IconCheck,
  PERMISSION: IconLock,
  TENANT: IconKey,
};

const Permission = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(5);

  const { data, isLoading: isLoadingPerms } = useGetPermissionsQuery({
    name: searchQuery,
    page,
    size,
  });

  // Derive pagination data from API response
  const totalElements = useMemo(
    () => data?.pagination?.totalElements || 0,
    [data],
  );
  const totalPages = useMemo(() => data?.pagination?.totalPages || 0, [data]);

  // Get permissions data
  const permissions = useMemo(() => data?.data || [], [data]);

  const handlePageChange = (selectedPage) => {
    setPage(selectedPage);
  };

  const handlePageSizeChange = (newSize) => {
    setSize(newSize);
    setPage(0);
  };

  const clearSearch = () => {
    setSearchQuery("");
    setPage(0);
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    showToast.success("Permission code copied!");
  };

  return (
    <div className="flex flex-1 flex-col min-h-0 bg-background">
      {/* Header Section */}
      <div className="flex-none border-b bg-background">
        <div className="p-4 sm:p-6 flex flex-col gap-4">
          {/* Title */}
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-foreground">
              Permissions Management
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              Browse and manage system permissions across all modules
            </p>
          </div>

          {/* Search Bar */}
          <div className="relative flex-1 max-w-md">
            <IconSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground size-4" />
            <Input
              placeholder="Search by permission name or code..."
              className="pl-10 bg-muted/50 border-transparent focus-visible:bg-background h-9 text-sm"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setPage(0);
              }}
            />
            {searchQuery && (
              <button
                onClick={clearSearch}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              >
                <IconX className="size-4" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="flex-1 bg-background sm:bg-muted/5 flex flex-col min-h-0 overflow-hidden">
        {isLoadingPerms ? (
          <div className="flex flex-col items-center justify-center h-full text-muted-foreground">
            <IconLoader className="size-10 mb-4 animate-spin text-primary/50" />
            <p className="text-sm font-medium">Loading permissions...</p>
          </div>
        ) : permissions.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-muted-foreground py-16">
            <div className="rounded-lg bg-muted/30 p-4 mb-4">
              <IconShield className="size-12 opacity-30" />
            </div>
            <p className="text-base font-semibold text-foreground">
              No permissions found
            </p>
            <p className="text-sm text-muted-foreground mt-1">
              {searchQuery
                ? "Try adjusting your search criteria"
                : "No permissions available"}
            </p>
          </div>
        ) : (
          <>
            {/* Table Section */}
            <div className="flex-1 overflow-hidden flex flex-col">
              <div className="overflow-x-auto overflow-y-auto flex-1">
                <Table>
                  <TableHeader className="sticky top-0 bg-background">
                    <TableRow className="hover:bg-transparent border-b">
                      <TableHead className="font-semibold w-8">
                        <div className="text-xs text-muted-foreground">ID</div>
                      </TableHead>
                      <TableHead className="font-semibold min-w-48">
                        Permission Name
                      </TableHead>
                      <TableHead className="font-semibold min-w-40">
                        Code
                      </TableHead>
                      <TableHead className="font-semibold min-w-24">
                        Module
                      </TableHead>
                      <TableHead className="text-right font-semibold min-w-28">
                        Actions
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {permissions.map((perm, idx) => {
                      const ModuleIcon = MODULE_ICONS[perm.module] || IconKey;
                      const colors =
                        MODULE_COLORS[perm.module] || MODULE_COLORS.ROLE;

                      return (
                        <TableRow
                          key={perm.id}
                          className="hover:bg-muted/50 transition-colors border-b"
                        >
                          <TableCell className="text-muted-foreground text-xs font-medium py-3">
                            {page * size + idx + 1}
                          </TableCell>
                          <TableCell className="font-medium text-foreground py-3">
                            <div className="flex items-center gap-2">
                              <span className="truncate">{perm.name}</span>
                            </div>
                          </TableCell>
                          <TableCell className="text-muted-foreground font-mono text-xs sm:text-sm py-3">
                            <div className="flex items-center gap-2">
                              <span className="truncate">{perm.code}</span>
                              <button
                                onClick={() => copyToClipboard(perm.code)}
                                className="text-muted-foreground hover:text-foreground transition-colors shrink-0"
                                title="Copy code"
                              >
                                <IconCopy className="size-3.5" />
                              </button>
                            </div>
                          </TableCell>
                          <TableCell className="py-3">
                            <div className="flex items-center gap-1.5">
                              <ModuleIcon className="size-3.5 text-muted-foreground shrink-0" />
                              <Badge
                                className={cn(
                                  "text-[10px] sm:text-xs whitespace-nowrap",
                                  colors.badge,
                                )}
                              >
                                {perm.module}
                              </Badge>
                            </div>
                          </TableCell>
                          <TableCell className="text-right py-3">
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 text-xs hover:bg-muted"
                            >
                              View
                            </Button>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </div>
            </div>

            {/* Pagination Footer */}
            <div className="flex-none border-t bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60 p-4 sm:p-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                {/* Info Text */}
                <div className="text-sm text-muted-foreground whitespace-nowrap">
                  <span className="font-medium text-foreground">
                    {totalElements > 0 ? page * size + 1 : 0}
                  </span>
                  <span> – </span>
                  <span className="font-medium text-foreground">
                    {Math.min((page + 1) * size, totalElements)}
                  </span>
                  <span> of </span>
                  <span className="font-medium text-foreground">
                    {totalElements}
                  </span>
                </div>

                {/* Pagination Controls */}
                <Pagination
                  currentPage={page}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                  pageSize={size}
                  onPageSizeChange={handlePageSizeChange}
                  totalItems={totalElements}
                  pageSizeOptions={[5, 10, 20, 50]}
                />
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Permission;
