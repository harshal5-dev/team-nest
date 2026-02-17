import { useState, useEffect } from "react";
import {
  IconPlus,
  IconSearch,
  IconDotsVertical,
  IconPencil,
  IconTrash,
  IconShield,
  IconShieldCheck,
  IconShieldPlus,
  IconUsers,
  IconLock,
  IconKey,
  IconSparkles,
  IconCheck,
  IconX,
} from "@tabler/icons-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
import { Skeleton } from "@/components/ui/skeleton";
import { showToast } from "@/components/ui/sonner";
import { StatsCard, StatsCardGrid } from "@/components/ui/stats-card";
import { 
  PageHeader, 
  PageHeaderHeading, 
  PageHeaderTitle, 
  PageHeaderDescription,
  PageHeaderActions 
} from "@/components/ui/page-header";
import { SearchInput } from "@/components/ui/search-filter";
import { EmptyState } from "@/components/ui/empty-state";

import {
  getRoles,
  createRole,
  updateRole,
  deleteRole,
  getRoleStats,
  availablePermissions,
} from "@/api/userApi";

// Predefined color options for roles
const roleColors = [
  { name: "Red", value: "from-red-500 to-rose-600" },
  { name: "Orange", value: "from-orange-500 to-amber-600" },
  { name: "Yellow", value: "from-amber-500 to-yellow-600" },
  { name: "Green", value: "from-emerald-500 to-teal-500" },
  { name: "Blue", value: "from-blue-500 to-cyan-500" },
  { name: "Indigo", value: "from-indigo-500 to-blue-600" },
  { name: "Violet", value: "from-violet-500 to-purple-600" },
  { name: "Pink", value: "from-pink-500 to-rose-500" },
  { name: "Gray", value: "from-gray-500 to-slate-600" },
];

// Group permissions by category
const groupedPermissions = availablePermissions.reduce((acc, perm) => {
  if (!acc[perm.category]) {
    acc[perm.category] = [];
  }
  acc[perm.category].push(perm);
  return acc;
}, {});

// Stats Cards Component - uses reusable StatsCard
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

// Loading Skeleton
function RoleCardSkeleton() {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <Skeleton className="size-10 rounded-xl" />
            <div className="space-y-2">
              <Skeleton className="h-5 w-24" />
              <Skeleton className="h-4 w-32" />
            </div>
          </div>
          <Skeleton className="size-8 rounded-md" />
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <Skeleton className="h-4 w-full" />
        <div className="flex flex-wrap gap-2">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-5 w-20 rounded-full" />
          ))}
        </div>
      </CardContent>
      <CardFooter className="border-t pt-4">
        <Skeleton className="h-4 w-24" />
      </CardFooter>
    </Card>
  );
}

// Role Card Component
function RoleCard({ role, onEdit, onDelete }) {
  return (
    <Card className="group overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 hover:border-primary/20">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-3">
            <div
              className={`flex size-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${role.color} text-white shadow-lg`}
            >
              <IconShield className="size-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <CardTitle className="text-base">{role.name}</CardTitle>
                {role.isSystem && (
                  <Badge variant="secondary" className="text-xs gap-1">
                    <IconLock className="size-3" />
                    System
                  </Badge>
                )}
              </div>
              <CardDescription className="text-sm mt-0.5">
                {role.usersCount} {role.usersCount === 1 ? "user" : "users"} assigned
              </CardDescription>
            </div>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring hover:bg-accent hover:text-accent-foreground size-8 opacity-0 group-hover:opacity-100 shrink-0">
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
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground line-clamp-2">{role.description}</p>
        <div className="space-y-2">
          <p className="text-xs font-medium text-muted-foreground">Permissions</p>
          <div className="flex flex-wrap gap-1.5">
            {role.permissions.slice(0, 4).map((perm) => {
              const permInfo = availablePermissions.find((p) => p.id === perm);
              return (
                <Badge key={perm} variant="outline" className="text-xs gap-1">
                  <IconKey className="size-3" />
                  {permInfo?.label || perm}
                </Badge>
              );
            })}
            {role.permissions.length > 4 && (
              <Badge variant="secondary" className="text-xs">
                +{role.permissions.length - 4} more
              </Badge>
            )}
          </div>
        </div>
      </CardContent>
      <CardFooter className="border-t pt-4">
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <IconUsers className="size-3.5" />
          <span>
            {role.usersCount} {role.usersCount === 1 ? "member" : "members"}
          </span>
        </div>
      </CardFooter>
    </Card>
  );
}

// Role Form Dialog
function RoleFormDialog({ open, onOpenChange, role, onSubmit }) {
  const isEditing = !!role;
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    color: roleColors[0].value,
    permissions: [],
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (role) {
      setFormData({
        name: role.name,
        description: role.description,
        color: role.color,
        permissions: role.permissions,
      });
    } else {
      setFormData({
        name: "",
        description: "",
        color: roleColors[0].value,
        permissions: [],
      });
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
    } catch (error) {
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
    const allSelected = categoryPerms.every((p) => formData.permissions.includes(p));
    setFormData((prev) => ({
      ...prev,
      permissions: allSelected
        ? prev.permissions.filter((p) => !categoryPerms.includes(p))
        : [...new Set([...prev.permissions, ...categoryPerms])],
    }));
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            {isEditing ? (
              <>
                <IconPencil className="size-5" />
                Edit Role
              </>
            ) : (
              <>
                <IconShieldPlus className="size-5" />
                Create New Role
              </>
            )}
          </DialogTitle>
          <DialogDescription>
            {isEditing
              ? "Update role details and permissions."
              : "Define a new role with specific permissions."}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="name">Role Name *</Label>
            <Input
              id="name"
              placeholder="Enter role name"
              value={formData.name}
              onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
              disabled={role?.isSystem}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Describe this role's purpose..."
              value={formData.description}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, description: e.target.value }))
              }
              className="min-h-20"
            />
          </div>
          <div className="space-y-2">
            <Label>Role Color</Label>
            <div className="flex flex-wrap gap-2">
              {roleColors.map((color) => (
                <button
                  key={color.value}
                  type="button"
                  onClick={() => setFormData((prev) => ({ ...prev, color: color.value }))}
                  className={`size-8 rounded-lg bg-gradient-to-br ${color.value} transition-all ${
                    formData.color === color.value
                      ? "ring-2 ring-offset-2 ring-primary scale-110"
                      : "hover:scale-105"
                  }`}
                  title={color.name}
                />
              ))}
            </div>
          </div>
          <div className="space-y-3">
            <Label>Permissions *</Label>
            <div className="space-y-4 max-h-60 overflow-y-auto pr-2 border rounded-lg p-3">
              {Object.entries(groupedPermissions).map(([category, perms]) => {
                const categoryPerms = perms.map((p) => p.id);
                const allSelected = categoryPerms.every((p) =>
                  formData.permissions.includes(p)
                );
                const someSelected =
                  !allSelected && categoryPerms.some((p) => formData.permissions.includes(p));

                return (
                  <div key={category} className="space-y-2">
                    <button
                      type="button"
                      onClick={() => toggleCategory(category)}
                      className="flex items-center gap-2 text-sm font-medium hover:text-primary transition-colors"
                    >
                      <div
                        className={`size-4 rounded border flex items-center justify-center transition-colors ${
                          allSelected
                            ? "bg-primary border-primary text-primary-foreground"
                            : someSelected
                              ? "bg-primary/50 border-primary"
                              : "border-muted-foreground/30"
                        }`}
                      >
                        {(allSelected || someSelected) && <IconCheck className="size-3" />}
                      </div>
                      {category}
                    </button>
                    <div className="grid grid-cols-2 gap-2 pl-6">
                      {perms.map((perm) => (
                        <button
                          key={perm.id}
                          type="button"
                          onClick={() => togglePermission(perm.id)}
                          className={`flex items-center gap-2 p-2 rounded-md text-sm text-left transition-all ${
                            formData.permissions.includes(perm.id)
                              ? "bg-primary/10 text-primary border border-primary/20"
                              : "bg-muted/50 hover:bg-muted border border-transparent"
                          }`}
                        >
                          <div
                            className={`size-4 rounded border flex items-center justify-center transition-colors ${
                              formData.permissions.includes(perm.id)
                                ? "bg-primary border-primary text-primary-foreground"
                                : "border-muted-foreground/30"
                            }`}
                          >
                            {formData.permissions.includes(perm.id) && (
                              <IconCheck className="size-3" />
                            )}
                          </div>
                          {perm.label}
                        </button>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
            <p className="text-xs text-muted-foreground">
              {formData.permissions.length} permissions selected
            </p>
          </div>
          <DialogFooter>
            <Button variant="outline" type="button" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <span className="size-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                  Saving...
                </>
              ) : isEditing ? (
                "Save Changes"
              ) : (
                "Create Role"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

// Delete Confirmation Dialog
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
            Are you sure you want to delete the <strong>"{role?.name}"</strong> role? This
            action cannot be undone.
            {role?.usersCount > 0 && (
              <span className="block mt-2 text-destructive">
                Warning: This role has {role.usersCount} users assigned. Please reassign
                them before deleting.
              </span>
            )}
          </DialogDescription>
        </DialogHeader>
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
                <span className="size-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                Deleting...
              </>
            ) : (
              <>
                <IconTrash className="size-4" />
                Delete Role
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

// Main Roles Page
export function Roles() {
  const [roles, setRoles] = useState([]);
  const [stats, setStats] = useState({ total: 0, system: 0, custom: 0, totalUsers: 0 });
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  // Dialog states
  const [formDialogOpen, setFormDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState(null);

  // Fetch data
  const fetchData = async () => {
    try {
      const [rolesRes, statsRes] = await Promise.all([getRoles(), getRoleStats()]);
      setRoles(rolesRes.data);
      setStats(statsRes.data);
    } catch (error) {
      showToast.error("Failed to load roles");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Filter roles
  const filteredRoles = roles.filter(
    (role) =>
      role.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      role.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Handlers
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
    <div className="space-y-6">
      {/* Page Header */}
      <PageHeader>
        <PageHeaderHeading icon={IconShield}>
          <PageHeaderTitle>Roles & Permissions</PageHeaderTitle>
          <PageHeaderDescription>
            Manage roles and configure access permissions
          </PageHeaderDescription>
        </PageHeaderHeading>
        <PageHeaderActions>
          <Button onClick={handleCreate} size="sm">
            <IconShieldPlus className="mr-1.5 size-4" />
            Create Role
          </Button>
        </PageHeaderActions>
      </PageHeader>

      {/* Stats Cards */}
      <StatsCards stats={stats} />

      {/* Search */}
      <SearchInput
        value={searchQuery}
        onChange={setSearchQuery}
        placeholder="Search roles..."
        className="max-w-xs"
      />

      {/* Roles Grid */}
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
              ? "Try adjusting your search"
              : "Get started by creating your first custom role"
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

      {/* Dialogs */}
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
