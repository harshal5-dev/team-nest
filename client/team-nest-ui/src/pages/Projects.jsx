import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import {
  IconPlus,
  IconFolder,
  IconDotsVertical,
  IconPencil,
  IconTrash,
  IconChecklist,
  IconPlayerPlay,
  IconPlayerPause,
  IconCircleCheck,
  IconArchive,
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
import { Avatar, AvatarFallback, AvatarGroup } from "@/components/ui/avatar";
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
import { SearchInput, FilterSelect } from "@/components/ui/search-filter";
import { EmptyState } from "@/components/ui/empty-state";
import { Pagination, usePagination } from "@/components/ui/pagination";

import {
  getProjects,
  deleteProject,
  getProjectStats,
  ProjectStatus,
} from "@/api/projectApi";

// Status configuration with colors and icons
const statusConfig = {
  ACTIVE: {
    label: "Active",
    variant: "default",
    icon: IconPlayerPlay,
    color: "bg-success/10 text-success border-success/20",
    gradient: "from-success to-success/80",
  },
  ON_HOLD: {
    label: "On Hold",
    variant: "secondary",
    icon: IconPlayerPause,
    color: "bg-warning/10 text-warning border-warning/20",
    gradient: "from-warning to-warning/80",
  },
  COMPLETED: {
    label: "Completed",
    variant: "outline",
    icon: IconCircleCheck,
    color: "bg-info/10 text-info border-info/20",
    gradient: "from-info to-info/80",
  },
  ARCHIVED: {
    label: "Archived",
    variant: "secondary",
    icon: IconArchive,
    color: "bg-muted/10 text-muted-foreground border-muted/20",
    gradient: "from-muted to-muted/80",
  },
};

// Avatar colors for team members
const avatarColors = [
  "from-violet-500 to-purple-600",
  "from-blue-500 to-cyan-500",
  "from-emerald-500 to-teal-500",
  "from-rose-500 to-pink-500",
  "from-amber-500 to-orange-500",
];

// Loading skeleton for project cards
function ProjectCardSkeleton() {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="space-y-2 flex-1">
            <Skeleton className="h-5 w-3/4" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-2/3" />
          </div>
          <Skeleton className="size-8 rounded-md" />
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-2">
          <Skeleton className="h-5 w-16 rounded-full" />
          <Skeleton className="h-5 w-20 rounded-full" />
        </div>
        <div className="space-y-2">
          <div className="flex justify-between">
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-4 w-8" />
          </div>
          <Skeleton className="h-1.5 w-full rounded-full" />
        </div>
      </CardContent>
      <CardFooter className="border-t pt-4">
        <div className="flex items-center justify-between w-full">
          <div className="flex -space-x-2">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="size-7 rounded-full" />
            ))}
          </div>
          <Skeleton className="h-4 w-24" />
        </div>
      </CardFooter>
    </Card>
  );
}

// Project card component
function ProjectCard({ project, onEdit, onDelete }) {
  const status = statusConfig[project.status];
  const StatusIcon = status.icon;
  const completedTasks = project.tasks.filter((t) => t.completed).length;
  const totalTasks = project.tasks.length;
  const progress = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <Card className="group overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 hover:border-primary/20">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <div
                className={`flex size-8 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br ${status.gradient} text-white shadow-sm`}
              >
                <IconFolder className="size-4" />
              </div>
              <CardTitle className="text-base truncate">{project.name}</CardTitle>
            </div>
            <CardDescription className="line-clamp-2 mt-1.5 text-sm">
              {project.description}
            </CardDescription>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring hover:bg-accent hover:text-accent-foreground size-8 opacity-0 group-hover:opacity-100 shrink-0">
              <IconDotsVertical className="size-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => onEdit(project)}>
                <IconPencil className="size-4" />
                Edit Project
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem variant="destructive" onClick={() => onDelete(project)}>
                <IconTrash className="size-4" />
                Delete Project
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-wrap gap-2">
          <Badge className={`${status.color} border`}>
            <StatusIcon className="size-3" />
            {status.label}
          </Badge>
          <Badge variant="outline" className="gap-1">
            <IconChecklist className="size-3" />
            {completedTasks}/{totalTasks} tasks
          </Badge>
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Progress</span>
            <span className="font-medium">{progress}%</span>
          </div>
          <div className="h-1.5 w-full rounded-full bg-muted overflow-hidden">
            <div
              className={`h-full rounded-full bg-gradient-to-r ${status.gradient} transition-all duration-500`}
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </CardContent>
      <CardFooter className="border-t pt-4">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-2">
            <AvatarGroup className="[&>*]:ring-card">
              {project.users.slice(0, 3).map((user, index) => (
                <Avatar key={user.id} size="sm">
                  <AvatarFallback
                    className={`bg-gradient-to-br ${avatarColors[index % avatarColors.length]} text-white text-xs font-medium`}
                  >
                    {user.initials}
                  </AvatarFallback>
                </Avatar>
              ))}
            </AvatarGroup>
            {project.users.length > 3 && (
              <span className="text-xs text-muted-foreground">
                +{project.users.length - 3} more
              </span>
            )}
          </div>
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <IconClock className="size-3.5" />
            {formatDate(project.lastModifiedAt)}
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}

// Stats cards component - uses reusable StatsCard
function StatsCards({ stats }) {
  return (
    <StatsCardGrid>
      <StatsCard
        title="Total Projects"
        value={stats.total}
        icon={IconFolder}
        color="primary"
      />
      <StatsCard
        title="Active"
        value={stats.active}
        icon={IconPlayerPlay}
        color="success"
      />
      <StatsCard
        title="On Hold"
        value={stats.onHold}
        icon={IconPlayerPause}
        color="warning"
      />
      <StatsCard
        title="Completed"
        value={stats.completed}
        icon={IconCircleCheck}
        color="info"
      />
    </StatsCardGrid>
  );
}

// Delete confirmation dialog
function DeleteConfirmDialog({ open, onOpenChange, project, onConfirm }) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await onConfirm();
      onOpenChange(false);
    } catch (error) {
      showToast.error("Failed to delete project");
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
            Delete Project
          </DialogTitle>
          <DialogDescription>
            Are you sure you want to delete <strong>"{project?.name}"</strong>? This action
            cannot be undone and all associated data will be permanently removed.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button variant="destructive" onClick={handleDelete} disabled={isDeleting}>
            {isDeleting ? (
              <>
                <span className="size-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                Deleting...
              </>
            ) : (
              <>
                <IconTrash className="size-4" />
                Delete Project
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

// Main Projects page component
export function Projects() {
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [stats, setStats] = useState({ total: 0, active: 0, onHold: 0, completed: 0, archived: 0 });
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  // Dialog states
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);

  // Fetch projects
  const fetchProjects = async () => {
    try {
      const [projectsRes, statsRes] = await Promise.all([getProjects(), getProjectStats()]);
      setProjects(projectsRes.data);
      setStats(statsRes.data);
    } catch (error) {
      showToast.error("Failed to load projects");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  // Filter projects
  const filteredProjects = projects.filter((project) => {
    const matchesSearch =
      project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || project.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Pagination
  const {
    currentPage,
    pageSize,
    totalPages,
    paginatedData,
    onPageChange,
    onPageSizeChange,
  } = usePagination({ totalItems: filteredProjects.length, initialPageSize: 6 });

  const paginatedProjects = paginatedData(filteredProjects);

  // Handle create - navigate to form page
  const handleCreate = () => {
    navigate("/projects/new");
  };

  // Handle edit - navigate to form page
  const handleEdit = (project) => {
    navigate(`/projects/${project.id}/edit`);
  };

  // Handle delete project
  const handleDelete = (project) => {
    setSelectedProject(project);
    setDeleteDialogOpen(true);
  };

  // Confirm delete
  const handleConfirmDelete = async () => {
    if (selectedProject) {
      await deleteProject(selectedProject.id);
      showToast.success("Project deleted successfully");
      fetchProjects();
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <PageHeader>
        <PageHeaderHeading icon={IconFolder}>
          <PageHeaderTitle>Projects</PageHeaderTitle>
          <PageHeaderDescription>
            Manage and track all your team projects
          </PageHeaderDescription>
        </PageHeaderHeading>
        <PageHeaderActions>
          <Button onClick={handleCreate} size="sm">
            <IconPlus className="mr-1.5 size-4" />
            New Project
          </Button>
        </PageHeaderActions>
      </PageHeader>

      {/* Stats Cards */}
      <StatsCards stats={stats} />

      {/* Filters */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <SearchInput
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder="Search projects..."
          className="sm:max-w-xs"
        />
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
      </div>

      {/* Projects Grid */}
      {isLoading ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <ProjectCardSkeleton key={i} />
          ))}
        </div>
      ) : filteredProjects.length === 0 ? (
        <EmptyState
          icon={IconFolder}
          title="No projects found"
          description={
            searchQuery || statusFilter !== "all"
              ? "Try adjusting your search or filter"
              : "Get started by creating your first project"
          }
          action={
            !searchQuery && statusFilter === "all" && (
              <Button onClick={handleCreate} size="sm">
                <IconPlus className="mr-1.5 size-4" />
                Create Project
              </Button>
            )
          }
        />
      ) : (
        <>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {paginatedProjects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))}
          </div>
          
          {/* Pagination */}
          {totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              pageSize={pageSize}
              totalItems={filteredProjects.length}
              onPageChange={onPageChange}
              onPageSizeChange={onPageSizeChange}
              pageSizeOptions={[6, 12, 24]}
            />
          )}
        </>
      )}

      {/* Delete Dialog */}
      <DeleteConfirmDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        project={selectedProject}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
}
