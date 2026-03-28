import { useEffect, useMemo, useState } from "react";
import {
  IconCheck,
  IconKey,
  IconLoader,
  IconPencil,
  IconSearch,
  IconShield,
  IconShieldCheck,
  IconShieldPlus,
  IconUsers,
  IconLock,
  IconBriefcase,
} from "@tabler/icons-react";

import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Pagination } from "@/components/ui/pagination";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import RequiredLabel from "@/components/ui/field-requirement";
import { showToast } from "@/components/ui/sonner";

const CATEGORY_ICONS = {
  Users: IconUsers,
  Roles: IconShield,
  Projects: IconBriefcase,
  Tasks: IconCheck,
  Settings: IconLock,
};

export function RoleFormDialog({ open, onOpenChange, role, onSubmit }) {
  const isEditing = Boolean(role);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    permissions: [],
  });

  // API State
  const [permissionsData, setPermissionsData] = useState([]);
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(10);
  const [totalElements, setTotalElements] = useState(0);
  const [apiTotalPages, setApiTotalPages] = useState(0);
  const [isLoadingPerms, setIsLoadingPerms] = useState(false);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(searchQuery);
      setPage(1); 
    }, 500);
    return () => clearTimeout(handler);
  }, [searchQuery]);

  useEffect(() => {
    if (!open) {
      setSearchQuery("");
      setDebouncedQuery("");
      setPage(1);
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

  useEffect(() => {
    if (!open) return;

    let isMounted = true;
    const fetchPermissions = async () => {
      setIsLoadingPerms(true);
      try {
        const url = new URL("http://localhost:8080/api/v1/permissions");
        if (debouncedQuery.trim()) {
          url.searchParams.append("name", debouncedQuery.trim());
        }
        url.searchParams.append("page", page.toString());
        url.searchParams.append("size", size.toString());
        // Sort syntax typically URL encoded like sort=["module"] but we'll adapt to how the sample provided it
        url.searchParams.append("sort", '["module"]');

        const response = await fetch(url.toString());
        const result = await response.json();

        if (isMounted && result.success) {
          setPermissionsData(result.data || []);
          setTotalElements(result.pagination?.totalElements || 0);
          setApiTotalPages(result.pagination?.totalPages || 0);
        }
      } catch (err) {
        console.error("Error fetching permissions:", err);
      } finally {
        if (isMounted) setIsLoadingPerms(false);
      }
    };

    fetchPermissions();

    return () => {
      isMounted = false;
    };
  }, [open, page, size, debouncedQuery]);

  const togglePermission = (permissionId) => {
    setFormData((prev) => ({
      ...prev,
      permissions: prev.permissions.includes(permissionId)
        ? prev.permissions.filter((item) => item !== permissionId)
        : [...prev.permissions, permissionId],
    }));
  };

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

  const groupedModules = useMemo(() => {
    const groups = permissionsData.reduce((acc, perm) => {
      const mod = perm.module || "Other";
      if (!acc[mod]) acc[mod] = [];
      acc[mod].push(perm);
      return acc;
    }, {});
    
    return Object.entries(groups).map(([category, perms]) => ({
      category,
      perms
    }));
  }, [permissionsData]);

  const toggleModule = (perms) => {
    const permIds = perms.map((p) => p.code);
    const allSelected = permIds.every((id) => formData.permissions.includes(id));

    setFormData((prev) => {
      let newPermissions = [...prev.permissions];
      if (allSelected) {
        newPermissions = newPermissions.filter((id) => !permIds.includes(id));
      } else {
        const toAdd = permIds.filter((id) => !newPermissions.includes(id));
        newPermissions = [...newPermissions, ...toAdd];
      }
      return { ...prev, permissions: newPermissions };
    });
  };

  const totalPermissions = totalElements;
  const selectedPermissions = formData.permissions.length;

  const handleSelectPageAll = () => {
    const pagePerms = permissionsData.map(p => p.code);
    setFormData(prev => {
      const merged = new Set([...prev.permissions, ...pagePerms]);
      return { ...prev, permissions: Array.from(merged) };
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="p-0 overflow-hidden flex flex-col w-full max-w-[95vw] sm:max-w-4xl max-h-[95vh] sm:max-h-[90vh] gap-0">
        <div className="flex flex-col h-full bg-background min-h-0">
          {/* Header */}
          <div className="flex-none border-b bg-muted/30 px-3 sm:px-6 py-3 sm:py-4 flex items-center justify-between">
            <div className="flex items-center gap-2 sm:gap-3 min-w-0">
              <div className="flex size-8 sm:size-10 items-center justify-center rounded-xl bg-primary/10 text-primary shrink-0">
                {isEditing ? (
                  <IconPencil size={20} />
                ) : (
                  <IconShieldPlus size={20} />
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
            <div className="w-full sm:w-72 lg:w-80 flex-none sm:shrink-0 border-b sm:border-b-0 sm:border-r bg-muted/5 p-3 sm:p-4 lg:p-6 flex flex-col gap-4 sm:gap-5 overflow-y-auto max-h-[30vh] sm:max-h-none">
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

              <div className="mt-auto flex flex-row sm:flex-col items-center sm:items-stretch gap-3 sm:gap-0 sm:space-y-2 rounded-lg border bg-background p-2.5 sm:p-3 text-left sm:text-center text-sm sm:text-base shadow-sm">
                <div className="flex size-8 sm:size-10 shrink-0 items-center justify-center rounded-full bg-primary/10 sm:mx-auto">
                  <IconShieldCheck className="size-4 sm:size-5 text-primary" />
                </div>
                <div className="flex-1 min-w-0 flex flex-row items-center sm:block gap-2">
                  <div className="text-lg sm:text-xl lg:text-2xl font-semibold text-foreground flex sm:block items-baseline gap-0.5">
                    {selectedPermissions}
                    <span className="text-[10px] sm:text-xs font-normal text-muted-foreground">
                      {" "}
                      / {totalPermissions}
                    </span>
                  </div>
                  <div className="text-[9px] sm:text-xs font-medium text-muted-foreground uppercase tracking-wider truncate">
                    Selected
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-end sm:items-center justify-center sm:justify-between text-[11px] sm:text-xs sm:pt-2 sm:border-t sm:mt-2 gap-1 sm:gap-0 shrink-0">
                  <button
                    type="button"
                    onClick={handleSelectPageAll}
                    disabled={isLoadingPerms || groupedModules.length === 0}
                    className="text-primary hover:underline font-medium px-1.5 py-0.5 rounded hover:bg-primary/5 transition-colors text-xs disabled:opacity-50"
                  >
                    Page All
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      setFormData((p) => ({ ...p, permissions: [] }))
                    }
                    className="text-destructive hover:underline font-medium px-1.5 py-0.5 rounded hover:bg-destructive/5 transition-colors text-xs"
                  >
                    Clear All
                  </button>
                </div>
              </div>
            </div>

            {/* Right content: Permissions */}
            <div className="flex flex-1 flex-col min-h-0 bg-background">
              {/* Search Header */}
              <div className="flex-none p-3 sm:p-4 border-b flex gap-2 sm:gap-4 items-center bg-background">
                <div className="relative flex-1">
                  <IconSearch className="absolute left-2 sm:left-3 top-1/2 -translate-y-1/2 text-muted-foreground size-3.5 sm:size-4" />
                  <Input
                    placeholder="Search..."
                    className="pl-7 sm:pl-9 bg-muted/50 border-transparent focus-visible:bg-background h-8 sm:h-9 text-sm"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>

              {/* Permissions List */}
              <div className="flex-1 bg-background sm:bg-muted/5 flex flex-col min-h-0">
                <div className="p-3 sm:p-4 flex-1 overflow-y-auto">
                  {isLoadingPerms ? (
                    <div className="flex flex-col items-center justify-center h-full text-muted-foreground py-10">
                      <IconLoader className="size-8 mb-4 animate-spin text-primary/50" />
                      <p className="text-sm font-medium mt-2">Loading permissions...</p>
                    </div>
                  ) : groupedModules.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full text-muted-foreground py-10">
                      <IconShield className="size-12 mb-4 opacity-20" />
                      <p className="text-base font-medium text-foreground">
                        No permissions found
                      </p>
                      <p className="text-sm">
                        Try adjusting your search query.
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {groupedModules.map((module) => {
                        const CategoryIcon = CATEGORY_ICONS[module.category] || IconKey;
                        const allSelected = module.perms.every((p) =>
                          formData.permissions.includes(p.code)
                        );
                        
                        return (
                          <Card key={module.category} className="overflow-hidden shadow-sm border-border/50">
                            {/* Module Header */}
                            <div className="flex items-center justify-between px-4 py-3 bg-muted/30 border-b">
                              <div className="flex items-center gap-2">
                                <div className="p-1.5 rounded-md bg-background border shadow-sm text-primary">
                                  <CategoryIcon className="size-4" />
                                </div>
                                <h4 className="font-semibold text-sm text-foreground">
                                  {module.category}
                                </h4>
                                <Badge variant="secondary" className="text-[10px] ml-1">
                                  {module.perms.length}
                                </Badge>
                              </div>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-8 text-xs font-medium"
                                onClick={() => toggleModule(module.perms)}
                              >
                                {allSelected ? "Deselect All" : "Select All"}
                              </Button>
                            </div>
  
                            {/* Module Permissions */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-border/50">
                              {module.perms.map((perm) => {
                                const isChecked = formData.permissions.includes(perm.code);
  
                                return (
                                  <div
                                    key={perm.code}
                                    className="flex items-center p-3 bg-background hover:bg-muted/30 transition-colors cursor-pointer"
                                    onClick={() => togglePermission(perm.code)}
                                  >
                                    <div className="flex items-center gap-3 overflow-hidden w-full">
                                      <div
                                        className={cn(
                                          "flex size-4 sm:size-5 shrink-0 items-center justify-center rounded border transition-colors",
                                          isChecked
                                            ? "border-primary bg-primary text-primary-foreground"
                                            : "border-muted-foreground/30 bg-background"
                                        )}
                                      >
                                        {isChecked && <IconCheck className="size-3.5" />}
                                      </div>
                                      <div className="flex flex-col min-w-0">
                                        <span className="text-sm font-medium truncate text-foreground">
                                          {perm.name}
                                        </span>
                                        <span className="text-[10px] sm:text-xs text-muted-foreground font-mono truncate">
                                          {perm.code}
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          </Card>
                        );
                      })}
                    </div>
                  )}
                </div>
                {/* Pagination Controls */}
                <div className="flex-none border-t bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60 p-4">
                  <Pagination
                    currentPage={page}
                    totalPages={apiTotalPages}
                    onPageChange={setPage}
                    pageSize={size}
                    onPageSizeChange={(newSize) => { setSize(newSize); setPage(1); }}
                    totalItems={totalElements}
                    pageSizeOptions={[5, 10, 20, 50]}
                  />
                </div>
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
