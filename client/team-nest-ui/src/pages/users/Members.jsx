import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router";
import {
  IconPlus,
  IconDotsVertical,
  IconPencil,
  IconTrash,
  IconMail,
  IconPhone,
  IconUsers,
  IconUserPlus,
  IconUserCheck,
  IconUserX,
  IconUserPause,
  IconShield,
  IconBuildingSkyscraper,
  IconClock,
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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
import { SearchInput, FilterSelect } from "@/components/ui/search-filter";
import { EmptyState } from "@/components/ui/empty-state";
import { Pagination, usePagination } from "@/components/ui/pagination";

import {
  getUsers,
  deleteUser,
  getUserStats,
  getRoles,
  UserStatus,
  departments,
} from "@/api/userApi";

// Status configuration
const statusConfig = {
  ACTIVE: {
    label: "Active",
    icon: IconUserCheck,
    color: "bg-success/10 text-success border-success/20",
    dotColor: "bg-success",
  },
  INACTIVE: {
    label: "Inactive",
    icon: IconUserX,
    color: "bg-muted/10 text-muted-foreground border-muted/20",
    dotColor: "bg-muted-foreground",
  },
  PENDING: {
    label: "Pending",
    icon: IconUserPause,
    color: "bg-pending/10 text-pending border-pending/20",
    dotColor: "bg-pending",
  },
  SUSPENDED: {
    label: "Suspended",
    icon: IconUserX,
    color: "bg-destructive/10 text-destructive border-destructive/20",
    dotColor: "bg-destructive",
  },
};

// Avatar colors
const avatarColors = [
  "from-violet-500 to-purple-600",
  "from-blue-500 to-cyan-500",
  "from-emerald-500 to-teal-500",
  "from-rose-500 to-pink-500",
  "from-amber-500 to-orange-500",
  "from-indigo-500 to-blue-600",
];

// Stats Card Component - uses reusable StatsCard
function StatsCards({ stats }) {
  return (
    <StatsCardGrid>
      <StatsCard
        title="Total Users"
        value={stats.total}
        icon={IconUsers}
        color="primary"
      />
      <StatsCard
        title="Active Users"
        value={stats.active}
        icon={IconUserCheck}
        color="success"
      />
      <StatsCard
        title="Pending Approval"
        value={stats.pending}
        icon={IconUserPause}
        color="pending"
      />
      <StatsCard
        title="Suspended"
        value={stats.suspended}
        icon={IconUserX}
        color="destructive"
      />
    </StatsCardGrid>
  );
}

// Loading Skeleton
function TableSkeleton() {
  return (
    <div className="space-y-3">
      {[1, 2, 3, 4, 5].map((i) => (
        <div key={i} className="flex items-center gap-4 p-4 border rounded-lg">
          <Skeleton className="size-10 rounded-full" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-4 w-1/4" />
            <Skeleton className="h-3 w-1/3" />
          </div>
          <Skeleton className="h-6 w-16 rounded-full" />
          <Skeleton className="h-6 w-20 rounded-full" />
          <Skeleton className="h-8 w-8 rounded-md" />
        </div>
      ))}
    </div>
  );
}

// User Row Component
function UserRow({ user, roles, onEdit, onDelete }) {
  const status = statusConfig[user.status];
  const colorIndex = user.id % avatarColors.length;

  const formatDate = (dateString) => {
    if (!dateString) return "Never";
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const getTimeAgo = (dateString) => {
    if (!dateString) return "Never";
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return formatDate(dateString);
  };

  return (
    <TableRow className="group hover:bg-muted/50">
      <TableCell>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Avatar className="size-10">
              <AvatarImage src={user.avatar} alt={user.firstName} />
              <AvatarFallback
                className={`bg-gradient-to-br ${avatarColors[colorIndex]} text-white font-medium`}
              >
                {user.initials}
              </AvatarFallback>
            </Avatar>
            <div
              className={`absolute -bottom-0.5 -right-0.5 size-3 rounded-full border-2 border-background ${status.dotColor}`}
            />
          </div>
          <div>
            <p className="font-medium">{`${user.firstName} ${user.lastName}`}</p>
            <p className="text-sm text-muted-foreground">{user.email}</p>
          </div>
        </div>
      </TableCell>
      <TableCell>
        <div className="flex items-center gap-2">
          <div
            className={`size-2 rounded-full bg-gradient-to-r ${user.role?.color || "from-gray-500 to-slate-600"}`}
          />
          <span className="font-medium text-sm">{user.role?.name || "No Role"}</span>
        </div>
      </TableCell>
      <TableCell>
        <Badge variant="outline" className="gap-1">
          <IconBuildingSkyscraper className="size-3" />
          {user.department}
        </Badge>
      </TableCell>
      <TableCell>
        <Badge className={`${status.color} border`}>
          <status.icon className="size-3" />
          {status.label}
        </Badge>
      </TableCell>
      <TableCell>
        <span className="text-sm text-muted-foreground">{getTimeAgo(user.lastActive)}</span>
      </TableCell>
      <TableCell>
        <DropdownMenu>
          <DropdownMenuTrigger className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring hover:bg-accent hover:text-accent-foreground size-8 opacity-0 group-hover:opacity-100">
            <IconDotsVertical className="size-4" />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => onEdit(user)}>
              <IconPencil className="size-4" />
              Edit User
            </DropdownMenuItem>
            <DropdownMenuItem>
              <IconMail className="size-4" />
              Send Email
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem variant="destructive" onClick={() => onDelete(user)}>
              <IconTrash className="size-4" />
              Delete User
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </TableRow>
  );
}

// Delete Confirmation Dialog
function DeleteConfirmDialog({ open, onOpenChange, user, onConfirm }) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await onConfirm();
      onOpenChange(false);
    } catch (error) {
      showToast.error("Failed to delete user");
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
            Delete User
          </DialogTitle>
          <DialogDescription>
            Are you sure you want to delete{" "}
            <strong>
              {user?.firstName} {user?.lastName}
            </strong>
            ? This action cannot be undone and the user will lose all access.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={handleDelete} disabled={isDeleting}>
            {isDeleting ? (
              <>
                <span className="size-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                Deleting...
              </>
            ) : (
              <>
                <IconTrash className="size-4" />
                Delete User
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

// Main Members Page
export function Members() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState([]);
  const [stats, setStats] = useState({ total: 0, active: 0, inactive: 0, pending: 0, suspended: 0 });
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [roleFilter, setRoleFilter] = useState("all");
  const [departmentFilter, setDepartmentFilter] = useState("all");

  // Dialog states
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  // Fetch data
  const fetchData = async () => {
    try {
      const [usersRes, rolesRes, statsRes] = await Promise.all([
        getUsers(),
        getRoles(),
        getUserStats(),
      ]);
      setUsers(usersRes.data);
      setRoles(rolesRes.data);
      setStats(statsRes.data);
    } catch (error) {
      showToast.error("Failed to load data");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Filter users
  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const fullName = `${user.firstName} ${user.lastName}`.toLowerCase();
      const matchesSearch =
        fullName.includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = statusFilter === "all" || user.status === statusFilter;
      const matchesRole = roleFilter === "all" || user.roleId?.toString() === roleFilter;
      const matchesDepartment = departmentFilter === "all" || user.department === departmentFilter;
      return matchesSearch && matchesStatus && matchesRole && matchesDepartment;
    });
  }, [users, searchQuery, statusFilter, roleFilter, departmentFilter]);

  // Pagination
  const {
    currentPage,
    pageSize,
    totalPages,
    paginatedData,
    onPageChange,
    onPageSizeChange,
  } = usePagination({ totalItems: filteredUsers.length, initialPageSize: 10 });

  const paginatedUsers = paginatedData(filteredUsers);

  // Handlers - navigate to form pages
  const handleCreate = () => {
    navigate("/members/new");
  };

  const handleEdit = (user) => {
    navigate(`/members/${user.id}/edit`);
  };

  const handleDelete = (user) => {
    setSelectedUser(user);
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (selectedUser) {
      await deleteUser(selectedUser.id);
      showToast.success("User deleted successfully");
      fetchData();
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <PageHeader>
        <PageHeaderHeading icon={IconUsers}>
          <PageHeaderTitle>Team Members</PageHeaderTitle>
          <PageHeaderDescription>
            Manage users, assign roles, and control access
          </PageHeaderDescription>
        </PageHeaderHeading>
        <PageHeaderActions>
          <Button onClick={handleCreate} size="sm">
            <IconUserPlus className="mr-1.5 size-4" />
            Add User
          </Button>
        </PageHeaderActions>
      </PageHeader>

      {/* Stats Cards */}
      <StatsCards stats={stats} />

      {/* Filters */}
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
        <SearchInput
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder="Search by name or email..."
          className="lg:max-w-xs"
        />
        <div className="flex flex-wrap gap-2">
          <FilterSelect
            value={statusFilter}
            onChange={setStatusFilter}
            placeholder="All Status"
            options={[
              { value: "all", label: "All Status" },
              ...Object.entries(statusConfig).map(([key, config]) => ({
                value: key,
                label: config.label,
              }))
            ]}
          />
          <FilterSelect
            value={roleFilter}
            onChange={setRoleFilter}
            placeholder="All Roles"
            options={[
              { value: "all", label: "All Roles" },
              ...roles.map((role) => ({
                value: role.id.toString(),
                label: role.name,
              }))
            ]}
          />
          <FilterSelect
            value={departmentFilter}
            onChange={setDepartmentFilter}
            placeholder="All Departments"
            options={[
              { value: "all", label: "All Departments" },
              ...departments.map((dept) => ({
                value: dept,
                label: dept,
              }))
            ]}
          />
        </div>
      </div>

      {/* Users Table */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base">Users</CardTitle>
            <Badge variant="secondary" className="text-xs">{filteredUsers.length} users</Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {isLoading ? (
            <TableSkeleton />
          ) : filteredUsers.length === 0 ? (
            <EmptyState
              icon={IconUsers}
              title="No users found"
              description={
                searchQuery || statusFilter !== "all" || roleFilter !== "all"
                  ? "Try adjusting your filters"
                  : "Get started by adding your first user"
              }
              action={
                !searchQuery && statusFilter === "all" && roleFilter === "all" && (
                  <Button onClick={handleCreate} size="sm">
                    <IconUserPlus className="mr-1.5 size-4" />
                    Add User
                  </Button>
                )
              }
            />
          ) : (
            <>
              <div className="rounded-lg border overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-muted/50">
                      <TableHead className="w-[300px]">User</TableHead>
                      <TableHead className="w-[120px]">Role</TableHead>
                      <TableHead className="w-[150px]">Department</TableHead>
                      <TableHead className="w-[120px]">Status</TableHead>
                      <TableHead className="w-[120px]">Last Active</TableHead>
                      <TableHead className="w-[60px]"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {paginatedUsers.map((user) => (
                      <UserRow
                        key={user.id}
                        user={user}
                        roles={roles}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                      />
                    ))}
                  </TableBody>
                </Table>
              </div>
              
              {/* Pagination */}
              {totalPages > 1 && (
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  pageSize={pageSize}
                  totalItems={filteredUsers.length}
                  onPageChange={onPageChange}
                  onPageSizeChange={onPageSizeChange}
                />
              )}
            </>
          )}
        </CardContent>
      </Card>

      {/* Delete Dialog */}
      <DeleteConfirmDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        user={selectedUser}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
}

export default Members;
