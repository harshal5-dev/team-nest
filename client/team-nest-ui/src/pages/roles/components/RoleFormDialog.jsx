import { useEffect, useMemo, useState } from "react";
import {
  IconBriefcase,
  IconCheck,
  IconKey,
  IconLoader,
  IconLock,
  IconPencil,
  IconSearch,
  IconShield,
  IconUsers,
  IconX,
} from "@tabler/icons-react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import RequiredLabel from "@/components/ui/field-requirement";
import { showToast } from "@/components/ui/sonner";
import { Textarea } from "@/components/ui/textarea";
import { useGetPermissionsQuery } from "@/pages/permission/permissionApi";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { Checkbox } from "@/components/ui/checkbox";

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

export function RoleFormDialog({ open, onOpenChange, role, onSubmit }) {
  const isEditing = Boolean(role);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(0);
  const size = 5; // Fixed page size

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    permissions: [],
  });

  // Use Redux query hook for permissions
  const { data: apiResponse, isLoading: isLoadingPerms } =
    useGetPermissionsQuery({ name: searchQuery, page, size });

  const permissionsData = useMemo(
    () => apiResponse?.data || [],
    [apiResponse?.data],
  );

  // Derive pagination data from API response

  const totalElements = useMemo(
    () => apiResponse?.pagination?.totalElements || 0,
    [apiResponse],
  );
  const totalPages = useMemo(
    () => apiResponse?.pagination?.totalPages || 0,
    [apiResponse],
  );

  useEffect(() => {
    if (!open) {
      setSearchQuery("");
      setPage(0);
      return;
    }

    if (role) {
      setFormData({
        name: role.name,
        description: role.description,
        permissions: [...role.permissions],
      });
    } else {
      setFormData({
        name: "",
        description: "",
        permissions: [],
      });
    }
  }, [open, role]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!formData.name.trim()) {
      showToast.error("Role name is required");
      return;
    }

    if (!formData.permissions.length) {
      showToast.error("Please select at least one permission");
      return;
    }

    setIsSubmitting(true);
    try {
      await onSubmit(formData);
      onOpenChange(false);
    } catch {
      showToast.error("Failed to save role");
    } finally {
      setIsSubmitting(false);
    }
  };

  const togglePermission = (code) => {
    setFormData((prev) => ({
      ...prev,
      permissions: prev.permissions.includes(code)
        ? prev.permissions.filter((item) => item !== code)
        : [...prev.permissions, code],
    }));
  };

  const toggleAllPermissions = () => {
    setFormData((prev) => ({
      ...prev,
      permissions:
        prev.permissions.length === permissionsData.length
          ? []
          : permissionsData.map((p) => p.code),
    }));
  };

  const clearSearch = () => {
    setSearchQuery("");
    setPage(0);
  };

  const handlePageChange = (selectedPage) => {
    setPage(selectedPage);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="p-0 overflow-hidden flex flex-col w-full max-w-[95vw] sm:max-w-5xl max-h-[95vh] sm:max-h-[90vh] gap-0">
        <div className="flex flex-col h-full bg-background min-h-0">
          {/* Header */}
          <div className="flex-none border-b bg-muted/30 px-3 sm:px-6 py-3 sm:py-4 flex items-center justify-between">
            <div className="flex items-center gap-2 sm:gap-3 min-w-0">
              <div className="flex size-8 sm:size-10 items-center justify-center rounded-xl bg-primary/10 text-primary shrink-0">
                {isEditing ? (
                  <IconPencil size={20} />
                ) : (
                  <IconShield size={20} />
                )}
              </div>
              <div className="min-w-0">
                <DialogTitle className="text-base sm:text-lg truncate">
                  {isEditing ? "Update Role" : "Create New Role"}
                </DialogTitle>
                <DialogDescription className="text-xs sm:text-sm line-clamp-1">
                  {isEditing
                    ? "Adjust privileges and basic settings for this role."
                    : "Configure a role to granularly assign permissions to users."}
                </DialogDescription>
              </div>
            </div>
          </div>

          {/* Body */}
          <div className="flex flex-col sm:flex-row flex-1 min-h-0 overflow-hidden">
            {/* Left sidebar: Details */}
            <div className="w-full sm:w-80 lg:w-96 flex-none sm:shrink-0 border-b sm:border-b-0 sm:border-r bg-muted/5 p-3 sm:p-4 lg:p-6 flex flex-col gap-4 sm:gap-5 overflow-y-auto max-h-[35vh] sm:max-h-none">
              {/* Role Name */}
              <div className="space-y-1.5">
                <RequiredLabel
                  htmlFor="role-name"
                  className="text-xs sm:text-sm"
                >
                  Role Name
                </RequiredLabel>
                <Input
                  id="role-name"
                  placeholder="e.g. Content Editor"
                  className="h-8 sm:h-9 text-sm"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, name: e.target.value }))
                  }
                />
              </div>

              {/* Role Description */}
              <div className="space-y-1.5">
                <label
                  htmlFor="role-description"
                  className="text-xs sm:text-sm font-medium text-foreground"
                >
                  Description
                </label>
                <Textarea
                  id="role-description"
                  placeholder="Describe the purpose of this role..."
                  className="min-h-20 sm:min-h-24 text-sm resize-none"
                  value={formData.description}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      description: e.target.value,
                    }))
                  }
                />
              </div>

              {/* Permissions Summary */}
              <div className="mt-auto flex flex-col items-stretch gap-3 rounded-lg border bg-muted/30 p-3 sm:p-4 text-left shadow-sm">
                <div className="flex items-start gap-2.5">
                  <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-primary/20">
                    <IconCheck className="size-4 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-lg font-semibold text-foreground">
                      {formData.permissions.length}
                    </div>
                    <p className="text-xs font-medium text-muted-foreground mt-0.5">
                      Permissions Selected
                    </p>
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="flex items-center gap-1.5 justify-between text-xs">
                  <button
                    type="button"
                    onClick={toggleAllPermissions}
                    disabled={isLoadingPerms || permissionsData.length === 0}
                    className="text-primary hover:underline font-medium px-2 py-1 rounded hover:bg-primary/10 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex-1 text-center"
                  >
                    {formData.permissions.length === permissionsData.length
                      ? "Deselect All"
                      : "Select All"}
                  </button>
                  <div className="w-px h-4 bg-border" />
                  <button
                    type="button"
                    onClick={() =>
                      setFormData((p) => ({ ...p, permissions: [] }))
                    }
                    className="text-destructive hover:underline font-medium px-2 py-1 rounded hover:bg-destructive/10 transition-colors flex-1 text-center"
                  >
                    Clear
                  </button>
                </div>
              </div>
            </div>

            {/* Right content: Permissions Table */}
            <div className="flex-1 min-w-0 flex flex-col overflow-hidden">
              {/* Search Bar */}
              <div className="flex-none border-b bg-background p-3 sm:p-4">
                <div className="relative">
                  <IconSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground size-4" />
                  <Input
                    placeholder="Search permissions..."
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

              {/* Permissions Table */}
              <div className="flex-1 overflow-hidden flex flex-col">
                {isLoadingPerms ? (
                  <div className="flex flex-col items-center justify-center h-full text-muted-foreground">
                    <IconLoader className="size-10 mb-4 animate-spin text-primary/50" />
                    <p className="text-sm font-medium">
                      Loading permissions...
                    </p>
                  </div>
                ) : permissionsData.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full text-muted-foreground">
                    <IconShield className="size-10 mb-3 opacity-30" />
                    <p className="text-sm font-semibold text-foreground">
                      No permissions found
                    </p>
                  </div>
                ) : (
                  <>
                    <div className="overflow-x-auto overflow-y-auto flex-1">
                      <Table>
                        <TableHeader className="sticky top-0 bg-background">
                          <TableRow className="hover:bg-transparent border-b">
                            <TableHead className="w-8">
                              <Checkbox
                                checked={
                                  formData.permissions.length ===
                                  permissionsData.length
                                }
                                onChange={toggleAllPermissions}
                                className="size-4"
                              />
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
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {permissionsData.map((perm) => {
                            const ModuleIcon =
                              MODULE_ICONS[perm.module] || IconKey;
                            const colors =
                              MODULE_COLORS[perm.module] || MODULE_COLORS.ROLE;
                            const isSelected = formData.permissions.includes(
                              perm.code,
                            );

                            return (
                              <TableRow
                                key={perm.id}
                                className="hover:bg-muted/50 transition-colors border-b cursor-pointer"
                                onClick={() => togglePermission(perm.code)}
                              >
                                <TableCell className="py-3">
                                  <Checkbox
                                    checked={isSelected}
                                    onChange={() => {}}
                                    className="size-4"
                                    onClick={(e) => e.stopPropagation()}
                                  />
                                </TableCell>
                                <TableCell className="font-medium text-foreground py-3">
                                  {perm.name}
                                </TableCell>
                                <TableCell className="text-muted-foreground font-mono text-xs sm:text-sm py-3">
                                  {perm.code}
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
                              </TableRow>
                            );
                          })}
                        </TableBody>
                      </Table>
                    </div>

                    {/* Pagination Footer */}
                    <div className="flex-none border-t bg-background/95 p-3 sm:p-4">
                      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4">
                        <div className="text-xs sm:text-sm text-muted-foreground">
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

                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() =>
                              handlePageChange(Math.max(0, page - 1))
                            }
                            disabled={page === 0}
                            className="h-8 px-3 text-xs"
                          >
                            Previous
                          </Button>
                          <div className="text-xs font-medium text-foreground">
                            Page {page + 1} of {totalPages || 1}
                          </div>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() =>
                              handlePageChange(
                                Math.min(totalPages - 1, page + 1),
                              )
                            }
                            disabled={page >= totalPages - 1}
                            className="h-8 px-3 text-xs"
                          >
                            Next
                          </Button>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="flex-none border-t bg-background px-6 py-4 flex items-center justify-end gap-3">
            <Button
              variant="outline"
              type="button"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button
              type="button"
              onClick={handleSubmit}
              disabled={isSubmitting}
            >
              {isSubmitting && (
                <IconLoader className="mr-2 size-4 animate-spin" />
              )}
              {isEditing ? "Save Changes" : "Create Role"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
