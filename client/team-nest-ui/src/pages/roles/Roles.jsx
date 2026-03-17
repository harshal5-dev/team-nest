import { useEffect, useMemo, useState } from "react";
import {
  IconDotsVertical,
  IconKey,
  IconLoader,
  IconLock,
  IconPencil,
  IconShield,
  IconShieldCheck,
  IconShieldPlus,
  IconTrash,
  IconUsers,
} from "@tabler/icons-react";

import { cn } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Skeleton } from "@/components/ui/skeleton";
import { showToast } from "@/components/ui/sonner";
import { StatsCard, StatsCardGrid } from "@/components/ui/stats-card";
import {
  PageHeader,
  PageHeaderActions,
  PageHeaderDescription,
  PageHeaderHeading,
  PageHeaderTitle,
} from "@/components/ui/page-header";
import { FilterSelect, SearchInput } from "@/components/ui/search-filter";
import { EmptyState } from "@/components/ui/empty-state";
import { StatusCallout } from "@/components/ui/status-callout";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Pagination, usePagination } from "@/components/ui/pagination";

import {
  availablePermissions,
  createRole,
  deleteRole,
  getRoleStats,
  getRoles,
  updateRole,
} from "@/api/userApi";
import { RoleFormDialog } from "./components/RoleFormDialog";

const roleTypeOptions = [
  { value: "all", label: "All types" },
  { value: "system", label: "System roles" },
  { value: "custom", label: "Custom roles" },
];

function formatDate(dateString) {
  if (!dateString) {
    return "-";
  }

  return new Date(dateString).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function StatsCards({ stats }) {
  return (
    <StatsCardGrid>
      <StatsCard
        title="Total Roles"
        value={stats.total}
        icon={IconShield}
        color="primary"
      />
      <StatsCard
        title="System Roles"
        value={stats.system}
        icon={IconShieldCheck}
        color="info"
      />
      <StatsCard
        title="Custom Roles"
        value={stats.custom}
        icon={IconShieldPlus}
        color="success"
      />
      <StatsCard
        title="Active Users"
        value={stats.totalUsers}
        icon={IconUsers}
        color="warning"
      />
    </StatsCardGrid>
  );
}

function RoleTableSkeleton() {
  return (
    <Card>
      <CardContent className="p-0">
        <div className="space-y-2 p-4">
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-12 w-full" />
        </div>
      </CardContent>
    </Card>
  );
}

function PermissionBadge({ permissionId }) {
  const permission = availablePermissions.find(
    (item) => item.id === permissionId,
  );

  return (
    <Badge
      variant="outline"
      className="h-5 gap-1 px-1.5 text-[10px] font-normal"
    >
      <IconKey className="size-3 text-muted-foreground" />
      {permission?.label || permissionId}
    </Badge>
  );
}

function RoleListRow({ role, onEdit, onDelete }) {
  const previewPermissions = role.permissions.slice(0, 2);
  const hiddenPermissionCount = Math.max(0, role.permissions.length - 2);

  return (
    <TableRow>
      <TableCell className="whitespace-normal py-3 align-top">
        <div className="flex items-start gap-3">
          <div className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-xl bg-primary/10">
            {role.isSystem ? (
              <IconShieldCheck className="size-4.5 text-primary" />
            ) : (
              <IconShield className="size-4.5 text-primary" />
            )}
          </div>
          <div className="min-w-0 space-y-1">
            <div className="flex items-center gap-2">
              <p className="truncate text-sm font-semibold">{role.name}</p>
              {role.isSystem && (
                <Badge
                  variant="secondary"
                  className="h-5 gap-1 px-1.5 text-[10px]"
                >
                  <IconLock className="size-2.5" />
                  System
                </Badge>
              )}
            </div>
            <p className="line-clamp-2 text-xs text-muted-foreground">
              {role.description}
            </p>
          </div>
        </div>
      </TableCell>

      <TableCell className="py-3">
        <Badge
          variant="outline"
          className={cn(
            "h-6 gap-1 px-2 text-[11px]",
            role.isSystem
              ? "border-info/30 bg-info/10 text-info"
              : "border-success/30 bg-success/10 text-success",
          )}
        >
          {role.isSystem ? "System" : "Custom"}
        </Badge>
      </TableCell>

      <TableCell className="py-3 text-sm">
        <div className="inline-flex items-center gap-1.5 rounded-md bg-muted/60 px-2 py-1 text-xs text-muted-foreground">
          <IconUsers className="size-3.5" />
          <span className="font-medium text-foreground">{role.usersCount}</span>
          members
        </div>
      </TableCell>

      <TableCell className="whitespace-normal py-3">
        <div className="flex flex-wrap gap-1.5">
          {previewPermissions.map((perm) => (
            <PermissionBadge key={perm} permissionId={perm} />
          ))}
          {hiddenPermissionCount > 0 && (
            <Badge
              variant="outline"
              className="h-5 px-1.5 text-[10px] text-muted-foreground"
            >
              +{hiddenPermissionCount} more
            </Badge>
          )}
        </div>
      </TableCell>

      <TableCell className="py-3 text-xs text-muted-foreground">
        {formatDate(role.createdAt)}
      </TableCell>

      <TableCell className="py-3 text-right">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="size-8">
              <IconDotsVertical className="size-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => onEdit(role)}>
              <IconPencil className="size-4" />
              Edit Role
            </DropdownMenuItem>
            {!role.isSystem && (
              <>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  variant="destructive"
                  disabled={role.usersCount > 0}
                  onClick={() => onDelete(role)}
                >
                  <IconTrash className="size-4" />
                  Delete Role
                </DropdownMenuItem>
              </>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </TableRow>
  );
}

function DeleteConfirmDialog({ open, onOpenChange, role, onConfirm }) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await onConfirm();
      onOpenChange(false);
    } catch (error) {
      showToast.error(error.message || "Failed to delete role");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-destructive">
            <IconTrash className="size-5" />
            Delete Role
          </DialogTitle>
          <DialogDescription>
            Are you sure you want to delete the{" "}
            <strong>&quot;{role?.name}&quot;</strong> role? This action cannot
            be undone.
          </DialogDescription>
        </DialogHeader>

        {role?.usersCount > 0 && (
          <StatusCallout
            variant="error"
            title="Cannot delete"
            message={`This role has ${role.usersCount} ${role.usersCount === 1 ? "user" : "users"} assigned. Reassign them before deleting.`}
          />
        )}

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={handleDelete}
            disabled={isDeleting || role?.usersCount > 0}
          >
            {isDeleting ? (
              <>
                <IconLoader className="mr-2 size-4 animate-spin" />
                Deleting...
              </>
            ) : (
              <>
                <IconTrash className="mr-2 size-4" />
                Delete Role
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export function Roles() {
  const [roles, setRoles] = useState([]);
  const [stats, setStats] = useState({
    total: 0,
    system: 0,
    custom: 0,
    totalUsers: 0,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [roleTypeFilter, setRoleTypeFilter] = useState("all");

  const [formDrawerOpen, setFormDrawerOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState(null);

  const fetchData = async () => {
    try {
      const [rolesResponse, statsResponse] = await Promise.all([
        getRoles(),
        getRoleStats(),
      ]);
      setRoles(rolesResponse.data);
      setStats(statsResponse.data);
    } catch {
      showToast.error("Failed to load roles");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const filteredRoles = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return roles.filter((role) => {
      const matchesQuery =
        !query ||
        role.name.toLowerCase().includes(query) ||
        role.description.toLowerCase().includes(query);

      const matchesType =
        roleTypeFilter === "all" ||
        (roleTypeFilter === "system" && role.isSystem) ||
        (roleTypeFilter === "custom" && !role.isSystem);

      return matchesQuery && matchesType;
    });
  }, [roles, roleTypeFilter, searchQuery]);

  const { paginatedData, paginationProps, onPageChange } = usePagination({
    totalItems: filteredRoles.length,
    initialPageSize: 6,
  });

  const paginatedRoles = paginatedData(filteredRoles);

  useEffect(() => {
    onPageChange(1);
  }, [searchQuery, roleTypeFilter, onPageChange]);

  const handleCreate = () => {
    setSelectedRole(null);
    setFormDrawerOpen(true);
  };

  const handleEdit = (role) => {
    setSelectedRole(role);
    setFormDrawerOpen(true);
  };

  const handleDelete = (role) => {
    setSelectedRole(role);
    setDeleteDialogOpen(true);
  };

  const handleSubmitRole = async (formData) => {
    if (selectedRole) {
      await updateRole(selectedRole.id, formData);
      showToast.success("Role updated successfully");
    } else {
      await createRole(formData);
      showToast.success("Role created successfully");
    }
    fetchData();
  };

  const handleConfirmDelete = async () => {
    if (!selectedRole) {
      return;
    }

    await deleteRole(selectedRole.id);
    showToast.success("Role deleted successfully");
    fetchData();
  };

  return (
    <div className="flex flex-col gap-6 animate-fade-in-up">
      <PageHeader>
        <PageHeaderHeading icon={IconShield}>
          <PageHeaderTitle>Roles & Permissions</PageHeaderTitle>
          <PageHeaderDescription>
            Define role boundaries and keep tenant access clean and predictable.
          </PageHeaderDescription>
        </PageHeaderHeading>
        <PageHeaderActions>
          <Button
            onClick={handleCreate}
            size="sm"
            className="shadow-lg shadow-primary/20"
          >
            <IconShieldPlus className="mr-1.5 size-4" />
            Create Role
          </Button>
        </PageHeaderActions>
      </PageHeader>

      <StatsCards stats={stats} />

      <Card className="overflow-hidden">
        <CardHeader className="border-b bg-muted/20 pb-4">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div>
              <CardTitle className="text-base">Role Listing</CardTitle>
              <CardDescription>
                Search, filter, and manage role definitions across your
                organization.
              </CardDescription>
            </div>
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
              <SearchInput
                value={searchQuery}
                onChange={setSearchQuery}
                placeholder="Search by role name or description"
                className="max-w-md"
              />
              <FilterSelect
                value={roleTypeFilter}
                onChange={setRoleTypeFilter}
                options={roleTypeOptions}
                placeholder="Role type"
              />
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-0">
          {isLoading ? (
            <RoleTableSkeleton />
          ) : filteredRoles.length === 0 ? (
            <div className="p-6">
              <EmptyState
                icon={IconShield}
                title="No roles found"
                description={
                  searchQuery || roleTypeFilter !== "all"
                    ? "Try adjusting your search or filter criteria."
                    : "Start by creating your first custom role."
                }
                action={
                  !searchQuery &&
                  roleTypeFilter === "all" && (
                    <Button onClick={handleCreate} size="sm">
                      <IconShieldPlus className="mr-1.5 size-4" />
                      Create Role
                    </Button>
                  )
                }
              />
            </div>
          ) : (
            <>
              {/* Desktop Table View */}
              <div className="hidden md:block overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="pl-5">Role</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Members</TableHead>
                      <TableHead>Permissions</TableHead>
                      <TableHead>Created</TableHead>
                      <TableHead className="pr-5 text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {paginatedRoles.map((role) => (
                      <RoleListRow
                        key={role.id}
                        role={role}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                      />
                    ))}
                  </TableBody>
                </Table>
              </div>

              {/* Mobile Card View */}
              <div className="md:hidden space-y-3">
                {paginatedRoles.map((role) => {
                  const previewPermissions = role.permissions.slice(0, 2);
                  const hiddenPermissionCount = Math.max(
                    0,
                    role.permissions.length - 2,
                  );
                  return (
                    <div
                      key={role.id}
                      className="rounded-lg border bg-card p-4 space-y-3"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex items-start gap-2 min-w-0 flex-1">
                          <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 mt-0.5">
                            {role.isSystem ? (
                              <IconShieldCheck className="size-3.5 text-primary" />
                            ) : (
                              <IconShield className="size-3.5 text-primary" />
                            )}
                          </div>
                          <div className="min-w-0 flex-1">
                            <div className="flex items-center gap-1 flex-wrap">
                              <p className="truncate text-sm font-semibold">
                                {role.name}
                              </p>
                              {role.isSystem && (
                                <Badge
                                  variant="secondary"
                                  className="h-4 gap-0.5 px-1.5 text-[9px]"
                                >
                                  <IconLock className="size-2" />
                                  System
                                </Badge>
                              )}
                            </div>
                            <p className="line-clamp-1 text-xs text-muted-foreground">
                              {role.description}
                            </p>
                          </div>
                        </div>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="size-8 shrink-0"
                            >
                              <IconDotsVertical className="size-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => handleEdit(role)}>
                              <IconPencil className="size-4" />
                              Edit Role
                            </DropdownMenuItem>
                            {!role.isSystem && (
                              <>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem
                                  variant="destructive"
                                  disabled={role.usersCount > 0}
                                  onClick={() => handleDelete(role)}
                                >
                                  <IconTrash className="size-4" />
                                  Delete Role
                                </DropdownMenuItem>
                              </>
                            )}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>

                      <div className="grid grid-cols-2 gap-3 text-xs">
                        <div className="space-y-1">
                          <p className="text-muted-foreground">Type</p>
                          <Badge
                            variant="outline"
                            className={cn(
                              "h-5 gap-0.5 px-1.5 text-[10px]",
                              role.isSystem
                                ? "border-info/30 bg-info/10 text-info"
                                : "border-success/30 bg-success/10 text-success",
                            )}
                          >
                            {role.isSystem ? "System" : "Custom"}
                          </Badge>
                        </div>
                        <div className="space-y-1">
                          <p className="text-muted-foreground">Members</p>
                          <div className="inline-flex items-center gap-1 rounded-md bg-muted/60 px-1.5 py-0.5 text-xs text-muted-foreground">
                            <IconUsers className="size-3" />
                            <span className="font-medium text-foreground">
                              {role.usersCount}
                            </span>
                          </div>
                        </div>
                      </div>

                      {previewPermissions.length > 0 && (
                        <div className="space-y-1.5">
                          <p className="text-xs text-muted-foreground">
                            Permissions
                          </p>
                          <div className="flex flex-wrap gap-1">
                            {previewPermissions.map((perm) => (
                              <PermissionBadge key={perm} permissionId={perm} />
                            ))}
                            {hiddenPermissionCount > 0 && (
                              <Badge
                                variant="outline"
                                className="h-5 px-1.5 text-[10px] text-muted-foreground"
                              >
                                +{hiddenPermissionCount} more
                              </Badge>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              <div className="border-t px-3 sm:px-5 py-4">
                <Pagination
                  {...paginationProps}
                  pageSizeOptions={[6, 10, 20, 50]}
                  showPageSize
                  showItemCount
                />
              </div>
            </>
          )}
        </CardContent>
      </Card>

      <RoleFormDialog
        open={formDrawerOpen}
        onOpenChange={setFormDrawerOpen}
        role={selectedRole}
        onSubmit={handleSubmitRole}
      />

      <DeleteConfirmDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        role={selectedRole}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
}

export default Roles;
