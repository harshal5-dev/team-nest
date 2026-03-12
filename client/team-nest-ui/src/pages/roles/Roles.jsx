import { useState, useEffect } from "react";
import {
  IconCheck,
  IconChevronDown,
  IconChevronRight,
  IconDotsVertical,
  IconKey,
  IconLoader,
  IconLock,
  IconPencil,
  IconPlus,
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
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
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
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { showToast } from "@/components/ui/sonner";
import { StatsCard, StatsCardGrid } from "@/components/ui/stats-card";
import {
  PageHeader,
  PageHeaderHeading,
  PageHeaderTitle,
  PageHeaderDescription,
  PageHeaderActions,
} from "@/components/ui/page-header";
import { SearchInput } from "@/components/ui/search-filter";
import { EmptyState } from "@/components/ui/empty-state";
import { StatusCallout } from "@/components/ui/status-callout";
import RequiredLabel from "@/components/ui/field-requirement";

import {
  getRoles,
  createRole,
  updateRole,
  deleteRole,
  getRoleStats,
  availablePermissions,
} from "@/api/userApi";

/* ─── Helpers ─── */
const groupedPermissions = availablePermissions.reduce((acc, perm) => {
  if (!acc[perm.category]) {
    acc[perm.category] = [];
  }
  acc[perm.category].push(perm);
  return acc;
}, {});

const CATEGORY_ICONS = {
  Users: IconUsers,
  Roles: IconShield,
  Projects: IconKey,
  Tasks: IconCheck,
  Settings: IconLock,
};

/* ─── Stats Cards ─── */
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

/* ─── Loading Skeleton ─── */
function RoleCardSkeleton() {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <Skeleton className="size-10 rounded-xl" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-3 w-32" />
            </div>
          </div>
          <Skeleton className="size-8 rounded-md" />
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <Skeleton className="h-3.5 w-full" />
        <Skeleton className="h-3.5 w-3/4" />
        <div className="flex flex-wrap gap-1.5 pt-1">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-5 w-20 rounded-full" />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

/* ─── Permission Badge ─── */
function PermissionBadge({ permissionId }) {
  const permInfo = availablePermissions.find((p) => p.id === permissionId);
  return (
    <Badge variant="outline" className="gap-1 text-xs font-normal">
      <IconKey className="size-3 text-muted-foreground" />
      {permInfo?.label || permissionId}
    </Badge>
  );
}

/* ─── Role Card ─── */
function RoleCard({ role, onEdit, onDelete }) {
  const [expanded, setExpanded] = useState(false);
  const maxVisible = 3;
  const hasMore = role.permissions.length > maxVisible;
  const visiblePerms = expanded
    ? role.permissions
    : role.permissions.slice(0, maxVisible);

  return (
    <Card className="group overflow-hidden transition-all duration-200 hover:shadow-lg hover:shadow-primary/5 hover:border-primary/20">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-3">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10">
              {role.isSystem ? (
                <IconShieldCheck className="size-5 text-primary" />
              ) : (
                <IconShield className="size-5 text-primary" />
              )}
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <CardTitle className="truncate text-base">
                  {role.name}
                </CardTitle>
                {role.isSystem && (
                  <Badge
                    variant="secondary"
                    className="shrink-0 gap-1 text-[11px]"
                  >
                    <IconLock className="size-2.5" />
                    System
                  </Badge>
                )}
              </div>
              <CardDescription className="mt-0.5 text-xs">
                {role.description}
              </CardDescription>
            </div>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger className="inline-flex size-8 shrink-0 items-center justify-center rounded-md text-sm transition-all hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring opacity-0 group-hover:opacity-100">
              <IconDotsVertical className="size-4" />
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
                    onClick={() => onDelete(role)}
                    disabled={role.usersCount > 0}
                  >
                    <IconTrash className="size-4" />
                    Delete Role
                  </DropdownMenuItem>
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>

      <CardContent className="space-y-3 pt-0">
        <div className="space-y-2">
          <p className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
            Permissions
          </p>
          <div className="flex flex-wrap gap-1.5">
            {visiblePerms.map((perm) => (
              <PermissionBadge key={perm} permissionId={perm} />
            ))}
            {hasMore && !expanded && (
              <button
                type="button"
                onClick={() => setExpanded(true)}
                className="inline-flex items-center gap-0.5 rounded-full border border-dashed border-muted-foreground/30 px-2 py-0.5 text-[11px] font-medium text-muted-foreground transition-colors hover:border-primary/40 hover:text-primary"
              >
                +{role.permissions.length - maxVisible} more
              </button>
            )}
            {expanded && hasMore && (
              <button
                type="button"
                onClick={() => setExpanded(false)}
                className="inline-flex items-center gap-0.5 rounded-full border border-dashed border-muted-foreground/30 px-2 py-0.5 text-[11px] font-medium text-muted-foreground transition-colors hover:border-primary/40 hover:text-primary"
              >
                Show less
              </button>
            )}
          </div>
        </div>

        <Separator />

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <IconUsers className="size-3.5" />
            <span>
              {role.usersCount}{" "}
              {role.usersCount === 1 ? "member" : "members"}
            </span>
          </div>
          <p className="text-[11px] text-muted-foreground">
            {role.permissions.length} permissions
          </p>
        </div>
      </CardContent>
    </Card>
  );
}

/* ─── Permission Checkbox ─── */
function PermissionCheckbox({ checked, indeterminate, onClick, label, sub }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "flex items-center gap-2.5 rounded-lg border px-3 py-2 text-left text-sm transition-all",
        checked
          ? "border-primary/30 bg-primary/5 text-foreground"
          : "border-transparent bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground",
      )}
    >
      <div
        className={cn(
          "flex size-4 shrink-0 items-center justify-center rounded border transition-colors",
          checked
            ? "border-primary bg-primary text-primary-foreground"
            : indeterminate
              ? "border-primary bg-primary/50 text-primary-foreground"
              : "border-muted-foreground/30",
        )}
      >
        {(checked || indeterminate) && <IconCheck className="size-3" />}
      </div>
      <div className="min-w-0">
        <span className="text-sm font-medium">{label}</span>
        {sub && (
          <span className="block truncate text-[11px] text-muted-foreground">
            {sub}
          </span>
        )}
      </div>
    </button>
  );
}

/* ─── Role Form Dialog ─── */
function RoleFormDialog({ open, onOpenChange, role, onSubmit }) {
  const isEditing = !!role;
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    permissions: [],
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [expandedCategories, setExpandedCategories] = useState({});

  useEffect(() => {
    if (open) {
      if (role) {
        setFormData({
          name: role.name,
          description: role.description,
          permissions: [...role.permissions],
        });
      } else {
        setFormData({ name: "", description: "", permissions: [] });
      }
      const cats = {};
      Object.keys(groupedPermissions).forEach((c) => {
        cats[c] = true;
      });
      setExpandedCategories(cats);
    }
  }, [role, open]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      showToast.error("Role name is required");
      return;
    }
    if (formData.permissions.length === 0) {
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

  const togglePermission = (permId) => {
    setFormData((prev) => ({
      ...prev,
      permissions: prev.permissions.includes(permId)
        ? prev.permissions.filter((p) => p !== permId)
        : [...prev.permissions, permId],
    }));
  };

  const toggleCategory = (category) => {
    const categoryPerms = groupedPermissions[category].map((p) => p.id);
    const allSelected = categoryPerms.every((p) =>
      formData.permissions.includes(p),
    );
    setFormData((prev) => ({
      ...prev,
      permissions: allSelected
        ? prev.permissions.filter((p) => !categoryPerms.includes(p))
        : [...new Set([...prev.permissions, ...categoryPerms])],
    }));
  };

  const toggleCategoryExpand = (category) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [category]: !prev[category],
    }));
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            {isEditing ? (
              <>
                <IconPencil className="size-5 text-primary" />
                Edit Role
              </>
            ) : (
              <>
                <IconShieldPlus className="size-5 text-primary" />
                Create New Role
              </>
            )}
          </DialogTitle>
          <DialogDescription>
            {isEditing
              ? "Update role details and permissions."
              : "Define a new role with specific permissions for your team."}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <RequiredLabel htmlFor="role-name">Role Name</RequiredLabel>
            <Input
              id="role-name"
              placeholder="e.g. Project Manager"
              value={formData.name}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, name: e.target.value }))
              }
              disabled={role?.isSystem}
              className="h-10"
            />
          </div>

          <div className="space-y-2">
            <RequiredLabel htmlFor="role-description" required={false}>
              Description
            </RequiredLabel>
            <Textarea
              id="role-description"
              placeholder="Describe this role's purpose..."
              value={formData.description}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  description: e.target.value,
                }))
              }
              className="min-h-20 resize-none"
            />
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <RequiredLabel htmlFor="role-permissions">
                Permissions
              </RequiredLabel>
              <span className="text-xs text-muted-foreground">
                {formData.permissions.length} selected
              </span>
            </div>

            <div className="space-y-1 rounded-xl border bg-muted/20 p-2">
              {Object.entries(groupedPermissions).map(
                ([category, perms]) => {
                  const categoryPerms = perms.map((p) => p.id);
                  const allSelected = categoryPerms.every((p) =>
                    formData.permissions.includes(p),
                  );
                  const someSelected =
                    !allSelected &&
                    categoryPerms.some((p) =>
                      formData.permissions.includes(p),
                    );
                  const isExpanded = expandedCategories[category];
                  const CatIcon =
                    CATEGORY_ICONS[category] || IconKey;

                  return (
                    <div
                      key={category}
                      className="rounded-lg border bg-background"
                    >
                      <div className="flex items-center gap-2 px-3 py-2">
                        <button
                          type="button"
                          onClick={() => toggleCategoryExpand(category)}
                          className="flex flex-1 items-center gap-2.5 text-sm font-medium transition-colors hover:text-primary"
                        >
                          {isExpanded ? (
                            <IconChevronDown className="size-4 text-muted-foreground" />
                          ) : (
                            <IconChevronRight className="size-4 text-muted-foreground" />
                          )}
                          <CatIcon className="size-4 text-muted-foreground" />
                          <span>{category}</span>
                          <Badge
                            variant="secondary"
                            className="ml-auto text-[10px] font-normal"
                          >
                            {
                              categoryPerms.filter((p) =>
                                formData.permissions.includes(p),
                              ).length
                            }
                            /{categoryPerms.length}
                          </Badge>
                        </button>
                        <button
                          type="button"
                          onClick={() => toggleCategory(category)}
                          className={cn(
                            "flex size-5 items-center justify-center rounded border text-xs transition-colors",
                            allSelected
                              ? "border-primary bg-primary text-primary-foreground"
                              : someSelected
                                ? "border-primary bg-primary/50 text-primary-foreground"
                                : "border-muted-foreground/30 hover:border-primary/50",
                          )}
                          title={
                            allSelected
                              ? `Deselect all ${category}`
                              : `Select all ${category}`
                          }
                        >
                          {(allSelected || someSelected) && (
                            <IconCheck className="size-3" />
                          )}
                        </button>
                      </div>

                      {isExpanded && (
                        <div className="grid gap-1.5 px-3 pb-3 sm:grid-cols-2">
                          {perms.map((perm) => (
                            <PermissionCheckbox
                              key={perm.id}
                              checked={formData.permissions.includes(
                                perm.id,
                              )}
                              onClick={() => togglePermission(perm.id)}
                              label={perm.label}
                            />
                          ))}
                        </div>
                      )}
                    </div>
                  );
                },
              )}
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              type="button"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <IconLoader className="mr-2 size-4 animate-spin" />
                  Saving...
                </>
              ) : isEditing ? (
                <>
                  <IconCheck className="mr-2 size-4" />
                  Save Changes
                </>
              ) : (
                <>
                  <IconPlus className="mr-2 size-4" />
                  Create Role
                </>
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

/* ─── Delete Confirmation Dialog ─── */
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

/* ─── Main Roles Page ─── */
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

  const [formDialogOpen, setFormDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState(null);

  const fetchData = async () => {
    try {
      const [rolesRes, statsRes] = await Promise.all([
        getRoles(),
        getRoleStats(),
      ]);
      setRoles(rolesRes.data);
      setStats(statsRes.data);
    } catch {
      showToast.error("Failed to load roles");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const filteredRoles = roles.filter(
    (role) =>
      role.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      role.description.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const handleCreate = () => {
    setSelectedRole(null);
    setFormDialogOpen(true);
  };

  const handleEdit = (role) => {
    setSelectedRole(role);
    setFormDialogOpen(true);
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
    if (selectedRole) {
      await deleteRole(selectedRole.id);
      showToast.success("Role deleted successfully");
      fetchData();
    }
  };

  return (
    <div className="flex flex-col gap-6 animate-fade-in-up">
      <PageHeader>
        <PageHeaderHeading icon={IconShield}>
          <PageHeaderTitle>Roles & Permissions</PageHeaderTitle>
          <PageHeaderDescription>
            Manage roles and configure access permissions for your team.
          </PageHeaderDescription>
        </PageHeaderHeading>
        <PageHeaderActions>
          <Button onClick={handleCreate} size="sm">
            <IconShieldPlus className="mr-1.5 size-4" />
            Create Role
          </Button>
        </PageHeaderActions>
      </PageHeader>

      <StatsCards stats={stats} />

      <SearchInput
        value={searchQuery}
        onChange={setSearchQuery}
        placeholder="Search roles..."
        className="max-w-xs"
      />

      {isLoading ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <RoleCardSkeleton key={i} />
          ))}
        </div>
      ) : filteredRoles.length === 0 ? (
        <EmptyState
          icon={IconShield}
          title="No roles found"
          description={
            searchQuery
              ? "Try adjusting your search query."
              : "Get started by creating your first custom role."
          }
          action={
            !searchQuery && (
              <Button onClick={handleCreate} size="sm">
                <IconShieldPlus className="mr-1.5 size-4" />
                Create Role
              </Button>
            )
          }
        />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredRoles.map((role) => (
            <RoleCard
              key={role.id}
              role={role}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}

      <RoleFormDialog
        open={formDialogOpen}
        onOpenChange={setFormDialogOpen}
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
