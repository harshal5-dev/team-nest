import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router";
import {
  IconArrowLeft,
  IconCalendar,
  IconChecklist,
  IconCircleCheck,
  IconClock,
  IconDots,
  IconEdit,
  IconFolder,
  IconPlayerPause,
  IconPlayerPlay,
  IconPlus,
  IconTrash,
  IconUsers,
  IconCircleDashed,
  IconPlayerRecord,
  IconEye,
  IconArchive,
  IconCircleCheckFilled,
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
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { EmptyState } from "@/components/ui/empty-state";
import { StatsCard, StatsCardGrid } from "@/components/ui/stats-card";
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
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { showToast } from "@/components/ui/sonner";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "@/pages/auth/authSlice";

import { getProjectById, deleteProject } from "@/api/projectApi";
import { getTasks, deleteTask, TaskStatus, TaskPriority } from "@/api/taskApi";

/* ─── Helpers ─── */
const statusConfig = {
  ACTIVE: {
    label: "Active",
    icon: IconPlayerPlay,
    color: "bg-success/10 text-success border-success/20",
    gradient: "from-success/80 to-success/50",
    dot: "bg-success",
  },
  ON_HOLD: {
    label: "On Hold",
    icon: IconPlayerPause,
    color: "bg-warning/10 text-warning border-warning/20",
    gradient: "from-warning/80 to-warning/50",
    dot: "bg-warning",
  },
  COMPLETED: {
    label: "Completed",
    icon: IconCircleCheck,
    color: "bg-info/10 text-info border-info/20",
    gradient: "from-info/80 to-info/50",
    dot: "bg-info",
  },
  ARCHIVED: {
    label: "Archived",
    icon: IconArchive,
    color: "bg-muted/40 text-muted-foreground border-border",
    gradient: "from-muted-foreground/40 to-muted-foreground/20",
    dot: "bg-muted-foreground",
  },
};

const priorityConfig = {
  LOW: { label: "Low", color: "text-muted-foreground bg-muted border-border" },
  MEDIUM: { label: "Medium", color: "text-info bg-info/10 border-info/20" },
  HIGH: {
    label: "High",
    color: "text-pending bg-pending/10 border-pending/20",
  },
  URGENT: {
    label: "Urgent",
    color: "text-destructive bg-destructive/10 border-destructive/20",
  },
};

const avatarColors = [
  "from-violet-500 to-purple-600",
  "from-blue-500 to-cyan-500",
  "from-emerald-500 to-teal-500",
  "from-rose-500 to-pink-500",
  "from-amber-500 to-orange-500",
  "from-indigo-500 to-blue-600",
];

const kanbanColumns = [
  {
    id: TaskStatus.TODO,
    title: "To Do",
    icon: IconCircleDashed,
    color: "bg-muted text-muted-foreground border-border",
  },
  {
    id: TaskStatus.IN_PROGRESS,
    title: "In Progress",
    icon: IconPlayerRecord,
    color: "bg-info/10 text-info border-info/20",
  },
  {
    id: TaskStatus.IN_REVIEW,
    title: "In Review",
    icon: IconEye,
    color: "bg-primary/10 text-primary border-primary/20",
  },
  {
    id: TaskStatus.COMPLETED,
    title: "Completed",
    icon: IconCircleCheckFilled,
    color: "bg-success/10 text-success border-success/20",
  },
];

const formatDate = (dateStr) =>
  dateStr
    ? new Date(dateStr).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    : "—";

/* ─── Skeleton Loading ─── */
function DetailSkeleton() {
  return (
    <div className="flex flex-col gap-6 animate-fade-in-up">
      <div className="flex items-center gap-3">
        <Skeleton className="h-8 w-28" />
        <Skeleton className="h-8 w-8 rounded-full" />
      </div>
      <Skeleton className="h-45 rounded-2xl" />
      <div className="grid gap-4 sm:grid-cols-4">
        {[1, 2, 3, 4].map((i) => (
          <Skeleton key={i} className="h-24 rounded-xl" />
        ))}
      </div>
      <Skeleton className="h-100 rounded-xl" />
    </div>
  );
}

/* ─── Project Hero Banner ─── */
function ProjectHero({ project, canManage, onEdit, onDelete }) {
  const status = statusConfig[project.status] || statusConfig.ACTIVE;
  const StatusIcon = status.icon;
  const completedTasks = project.tasks.filter((t) => t.completed).length;
  const totalTasks = project.tasks.length;
  const progress =
    totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  return (
    <Card className="overflow-hidden py-0">
      {/* Gradient banner */}
      <div className="relative h-20 bg-linear-to-r from-gradient-start via-gradient-mid to-gradient-end sm:h-24">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.12)_0%,transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(255,255,255,0.08)_0%,transparent_40%)]" />
        <div className="absolute inset-0 opacity-[0.07] bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHZpZXdCb3g9IjAgMCAyMCAyMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48Y2lyY2xlIGN4PSIxMCIgY3k9IjEwIiByPSIxLjUiIGZpbGw9IiNmZmYiLz48L3N2Zz4=')]" />
      </div>

      <div className="relative px-5 pb-5 sm:px-6 sm:pb-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:gap-5">
          {/* Project icon */}
          <div className="-mt-8 shrink-0">
            <div className="rounded-xl bg-background p-1.5 shadow-lg ring-1 ring-border/50">
              <div
                className={cn(
                  "flex size-14 items-center justify-center rounded-lg bg-linear-to-br shadow-sm",
                  `bg-linear-to-br from-gradient-start to-gradient-end`,
                )}
              >
                <IconFolder className="size-7 text-white drop-shadow-sm" />
              </div>
            </div>
          </div>

          {/* Info + actions */}
          <div className="flex flex-1 flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div className="space-y-1.5 min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-xl font-semibold tracking-tight sm:text-2xl truncate">
                  {project.name}
                </h1>
                <Badge className={cn("border text-xs gap-1", status.color)}>
                  <StatusIcon className="size-3" />
                  {status.label}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground line-clamp-2 max-w-lg">
                {project.description}
              </p>
              <div className="flex flex-wrap items-center gap-3 pt-0.5 text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  <IconCalendar className="size-3.5" />
                  Created {formatDate(project.createdAt)}
                </span>
                <span className="flex items-center gap-1">
                  <IconClock className="size-3.5" />
                  Updated {formatDate(project.lastModifiedAt)}
                </span>
              </div>
            </div>

            {/* Action buttons — visible only for admin/manager */}
            {canManage && (
              <div className="flex shrink-0 items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="gap-1.5"
                  onClick={onEdit}
                >
                  <IconEdit className="size-3.5" />
                  Edit
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="icon" className="size-8">
                      <IconDots className="size-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuSeparator />
                    <DropdownMenuItem variant="destructive" onClick={onDelete}>
                      <IconTrash className="size-4" />
                      Delete Project
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            )}
          </div>
        </div>

        {/* Progress bar */}
        {totalTasks > 0 && (
          <div className="mt-4 space-y-1.5">
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>Overall Progress</span>
              <span className="font-medium tabular-nums">
                {completedTasks}/{totalTasks} tasks · {progress}%
              </span>
            </div>
            <Progress value={progress} className="h-1.5" />
          </div>
        )}
      </div>
    </Card>
  );
}

/* ─── Overview Tab ─── */
function OverviewTab({ project, tasks }) {
  const tasksByStatus = Object.fromEntries(
    Object.values(TaskStatus).map((s) => [
      s,
      tasks.filter((t) => t.status === s).length,
    ]),
  );

  const overdueTasks = tasks.filter(
    (t) =>
      t.dueDate &&
      new Date(t.dueDate) < new Date() &&
      t.status !== TaskStatus.COMPLETED &&
      t.status !== TaskStatus.CANCELLED,
  );

  const priorityCounts = Object.fromEntries(
    Object.values(TaskPriority).map((p) => [
      p,
      tasks.filter((t) => t.priority === p).length,
    ]),
  );

  return (
    <div className="space-y-6">
      {/* Task stats */}
      <StatsCardGrid className="sm:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="To Do"
          value={tasksByStatus[TaskStatus.TODO] ?? 0}
          icon={IconCircleDashed}
          color="muted"
        />
        <StatsCard
          title="In Progress"
          value={tasksByStatus[TaskStatus.IN_PROGRESS] ?? 0}
          icon={IconPlayerRecord}
          color="info"
        />
        <StatsCard
          title="In Review"
          value={tasksByStatus[TaskStatus.IN_REVIEW] ?? 0}
          icon={IconEye}
          color="primary"
        />
        <StatsCard
          title="Completed"
          value={tasksByStatus[TaskStatus.COMPLETED] ?? 0}
          icon={IconCircleCheckFilled}
          color="success"
        />
      </StatsCardGrid>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Priority breakdown */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">By Priority</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {Object.entries(priorityConfig).map(([key, cfg]) => {
              const count = priorityCounts[key] ?? 0;
              const pct =
                tasks.length > 0 ? Math.round((count / tasks.length) * 100) : 0;
              return (
                <div key={key} className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <Badge
                        variant="outline"
                        className={cn("h-5 px-1.5 text-[10px]", cfg.color)}
                      >
                        {cfg.label}
                      </Badge>
                    </div>
                    <span className="tabular-nums text-muted-foreground">
                      {count} · {pct}%
                    </span>
                  </div>
                  <Progress value={pct} className="h-1" />
                </div>
              );
            })}
            {tasks.length === 0 && (
              <p className="text-xs text-muted-foreground text-center py-4">
                No tasks yet
              </p>
            )}
          </CardContent>
        </Card>

        {/* Overdue tasks */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center justify-between">
              Overdue Tasks
              {overdueTasks.length > 0 && (
                <Badge
                  variant="outline"
                  className="bg-destructive/10 text-destructive border-destructive/20 h-5 text-[10px]"
                >
                  {overdueTasks.length}
                </Badge>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {overdueTasks.length === 0 ? (
              <p className="text-xs text-muted-foreground text-center py-6">
                🎉 No overdue tasks
              </p>
            ) : (
              <div className="space-y-2">
                {overdueTasks.slice(0, 5).map((task) => (
                  <div
                    key={task.id}
                    className="flex items-start gap-2 text-xs rounded-lg border border-destructive/20 bg-destructive/5 px-2.5 py-2"
                  >
                    <IconClock className="size-3.5 mt-px text-destructive shrink-0" />
                    <div className="min-w-0 flex-1">
                      <p className="font-medium text-foreground truncate">
                        {task.title}
                      </p>
                      <p className="text-destructive">
                        Due {formatDate(task.dueDate)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Team members */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center justify-between">
              Team
              <Badge variant="outline" className="h-5 text-[10px]">
                {project.users.length}
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {project.users.length === 0 ? (
              <p className="text-xs text-muted-foreground text-center py-6">
                No members assigned
              </p>
            ) : (
              project.users.map((member, idx) => {
                const taskCount = tasks.filter(
                  (t) => t.assigneeId === member.id,
                ).length;
                return (
                  <div
                    key={member.id}
                    className="flex items-center gap-2.5 rounded-lg border bg-muted/20 px-2.5 py-2"
                  >
                    <Avatar className="size-7 shrink-0">
                      <AvatarImage src={member.avatar} />
                      <AvatarFallback
                        className={cn(
                          "text-[10px] font-semibold text-white bg-linear-to-br",
                          avatarColors[idx % avatarColors.length],
                        )}
                      >
                        {member.initials}
                      </AvatarFallback>
                    </Avatar>
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-medium truncate">
                        {member.name}
                      </p>
                      <p className="text-[10px] text-muted-foreground">
                        {taskCount} tasks
                      </p>
                    </div>
                  </div>
                );
              })
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

/* ─── Kanban Task Card ─── */
function KanbanTaskCard({ task, canManage, onEdit, onDelete }) {
  const priority = priorityConfig[task.priority] || priorityConfig.MEDIUM;
  const completedSubs = task.subtasks?.filter((s) => s.completed).length ?? 0;
  const totalSubs = task.subtasks?.length ?? 0;

  return (
    <Card className="overflow-hidden transition-all duration-200 hover:shadow-md hover:border-primary/20 group cursor-default">
      <CardContent className="p-3.5 flex flex-col gap-2.5">
        {/* Top row: priority + menu */}
        <div className="flex items-center justify-between gap-2 -mb-0.5">
          <Badge
            variant="outline"
            className={cn("h-5 px-1.5 text-[10px] font-medium", priority.color)}
          >
            {priority.label}
          </Badge>
          {canManage && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="size-6 -mr-1 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <IconDots className="size-3.5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-32">
                <DropdownMenuItem onClick={onEdit}>
                  <IconEdit className="mr-2 size-3.5" />
                  Edit
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="text-destructive focus:text-destructive"
                  onClick={onDelete}
                >
                  <IconTrash className="mr-2 size-3.5" />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>

        {/* Title + description */}
        <div className="space-y-1">
          <h3 className="font-medium text-sm leading-snug">{task.title}</h3>
          {task.description && (
            <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
              {task.description}
            </p>
          )}
        </div>

        {/* Subtasks progress */}
        {totalSubs > 0 && (
          <div className="space-y-1">
            <div className="flex items-center justify-between text-[10px] text-muted-foreground">
              <span>Subtasks</span>
              <span className="tabular-nums">
                {completedSubs}/{totalSubs}
              </span>
            </div>
            <Progress
              value={Math.round((completedSubs / totalSubs) * 100)}
              className="h-1"
            />
          </div>
        )}

        {/* Footer row: assignee + due date */}
        <div className="flex items-center justify-between pt-0.5">
          <div className="flex items-center gap-1.5">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <Avatar className="size-6 border border-background">
                    <AvatarImage src={task.assignee?.avatar} />
                    <AvatarFallback className="text-[10px] bg-muted">
                      {task.assignee?.initials || "?"}
                    </AvatarFallback>
                  </Avatar>
                </TooltipTrigger>
                <TooltipContent>
                  {task.assignee?.name || "Unassigned"}
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            {task.dueDate && (
              <span
                className={cn(
                  "flex items-center gap-1 text-[10px]",
                  new Date(task.dueDate) < new Date() &&
                    task.status !== TaskStatus.COMPLETED
                    ? "text-destructive"
                    : "text-muted-foreground",
                )}
              >
                <IconClock className="size-3" />
                {new Date(task.dueDate).toLocaleDateString(undefined, {
                  month: "short",
                  day: "numeric",
                })}
              </span>
            )}
          </div>
          {task.tags?.length > 0 && (
            <span className="text-[10px] text-muted-foreground">
              {task.tags[0].name}
              {task.tags.length > 1 && ` +${task.tags.length - 1}`}
            </span>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

/* ─── Tasks Tab ─── */
function TasksTab({ tasks, canManage, onCreateTask, onDeleteTask, navigate }) {
  return (
    <div className="flex flex-col gap-4 h-[calc(100vh-22rem)]">
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          {tasks.length} task{tasks.length !== 1 ? "s" : ""} in this project
        </p>
        {canManage && (
          <Button size="sm" className="gap-1.5" onClick={onCreateTask}>
            <IconPlus className="size-4" />
            Add Task
          </Button>
        )}
      </div>

      <ScrollArea className="flex-1 -mx-4 px-4 md:-mx-6 md:px-6">
        <div className="flex gap-4 min-w-240 pb-6">
          {kanbanColumns.map((col) => {
            const colTasks = tasks.filter((t) => t.status === col.id);
            const ColIcon = col.icon;
            return (
              <div key={col.id} className="flex-1 flex flex-col gap-3 min-w-60">
                {/* Column header */}
                <div className="flex items-center justify-between px-1">
                  <div className="flex items-center gap-2">
                    <Badge
                      variant="outline"
                      className={cn(
                        "rounded-md px-2.5 py-1 text-xs font-medium gap-1",
                        col.color,
                      )}
                    >
                      <ColIcon className="size-3" />
                      {col.title}
                    </Badge>
                    <span className="flex size-5 items-center justify-center rounded-full bg-muted text-[10px] font-medium text-muted-foreground">
                      {colTasks.length}
                    </span>
                  </div>
                  {canManage && (
                    <Button
                      variant="ghost"
                      size="icon"
                      className="size-7 text-muted-foreground hover:text-foreground"
                      onClick={onCreateTask}
                    >
                      <IconPlus className="size-3.5" />
                    </Button>
                  )}
                </div>

                {/* Cards */}
                <div className="flex flex-col gap-2.5">
                  {colTasks.length === 0 ? (
                    <EmptyState
                      icon={IconChecklist}
                      title="No tasks"
                      description=""
                      className="py-8 border-dashed shadow-none"
                    />
                  ) : (
                    colTasks.map((task) => (
                      <KanbanTaskCard
                        key={task.id}
                        task={task}
                        canManage={canManage}
                        onEdit={() => navigate(`/tasks/${task.id}/edit`)}
                        onDelete={() => onDeleteTask(task.id)}
                      />
                    ))
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </ScrollArea>
    </div>
  );
}

/* ─── Team Tab ─── */
function TeamTab({ project, tasks }) {
  if (project.users.length === 0) {
    return (
      <EmptyState
        icon={IconUsers}
        title="No team members"
        description="This project has no members assigned yet."
        className="py-20"
      />
    );
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {project.users.map((member, idx) => {
        const memberTasks = tasks.filter((t) => t.assigneeId === member.id);
        const done = memberTasks.filter(
          (t) => t.status === TaskStatus.COMPLETED,
        ).length;
        const inProgress = memberTasks.filter(
          (t) => t.status === TaskStatus.IN_PROGRESS,
        ).length;
        const pct =
          memberTasks.length > 0
            ? Math.round((done / memberTasks.length) * 100)
            : 0;

        return (
          <Card
            key={member.id}
            className="overflow-hidden transition-all duration-200 hover:shadow-lg hover:shadow-primary/5 hover:border-primary/20"
          >
            <CardHeader className="pb-3">
              <div className="flex items-center gap-3">
                <Avatar className="size-10 border-2 border-background shadow">
                  <AvatarImage src={member.avatar} />
                  <AvatarFallback
                    className={cn(
                      "font-semibold text-sm text-white bg-linear-to-br",
                      avatarColors[idx % avatarColors.length],
                    )}
                  >
                    {member.initials}
                  </AvatarFallback>
                </Avatar>
                <div className="min-w-0">
                  <CardTitle className="text-base truncate">
                    {member.name}
                  </CardTitle>
                  <CardDescription className="text-xs truncate">
                    {member.email}
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid grid-cols-3 gap-2 text-center">
                <div className="rounded-lg bg-muted/40 px-2 py-2">
                  <p className="text-lg font-bold tabular-nums">
                    {memberTasks.length}
                  </p>
                  <p className="text-[10px] text-muted-foreground">Total</p>
                </div>
                <div className="rounded-lg bg-info/10 px-2 py-2">
                  <p className="text-lg font-bold tabular-nums text-info">
                    {inProgress}
                  </p>
                  <p className="text-[10px] text-muted-foreground">Active</p>
                </div>
                <div className="rounded-lg bg-success/10 px-2 py-2">
                  <p className="text-lg font-bold tabular-nums text-success">
                    {done}
                  </p>
                  <p className="text-[10px] text-muted-foreground">Done</p>
                </div>
              </div>
              {memberTasks.length > 0 && (
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>Completion</span>
                    <span className="tabular-nums font-medium">{pct}%</span>
                  </div>
                  <Progress value={pct} className="h-1.5" />
                </div>
              )}
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}

/* ─── Delete Confirm Dialog ─── */
function DeleteConfirmDialog({
  open,
  onOpenChange,
  title,
  description,
  onConfirm,
  isDeleting,
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={isDeleting}
          >
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={onConfirm}
            disabled={isDeleting}
          >
            {isDeleting ? "Deleting…" : "Delete"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

/* ─── Tab navigation ─── */
const tabs = [
  { id: "overview", label: "Overview", icon: IconFolder },
  { id: "tasks", label: "Tasks", icon: IconChecklist },
  { id: "team", label: "Team", icon: IconUsers },
];

/* ─── Main Page ─── */
export function ProjectDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const user = useSelector(selectCurrentUser);

  const [project, setProject] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [isDeletingProject, setIsDeletingProject] = useState(false);
  const [deletingTaskId, setDeletingTaskId] = useState(null);
  const [deleteTaskDialogOpen, setDeleteTaskDialogOpen] = useState(false);

  // Role-based permissions
  const canManage = user?.roles?.some(
    (role) =>
      (typeof role === "string" &&
        ["admin", "manager"].includes(role.toLowerCase())) ||
      (typeof role === "object" &&
        ["admin", "manager"].includes(role?.name?.toLowerCase())),
  );

  useEffect(() => {
    async function load() {
      try {
        setLoading(true);
        const [projectRes, tasksRes] = await Promise.all([
          getProjectById(Number(id)),
          getTasks(),
        ]);
        setProject(projectRes.data);
        if (tasksRes.success) {
          setTasks(tasksRes.data.filter((t) => t.projectId === Number(id)));
        }
      } catch {
        showToast.error("Could not load project details.");
        navigate("/projects");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [id, navigate]);

  const handleDeleteProject = async () => {
    try {
      setIsDeletingProject(true);
      await deleteProject(Number(id));
      showToast.success("Project deleted successfully.");
      navigate("/projects");
    } catch {
      showToast.error("Could not delete project.");
    } finally {
      setIsDeletingProject(false);
      setDeleteDialogOpen(false);
    }
  };

  const handleDeleteTask = async () => {
    if (!deletingTaskId) return;
    try {
      await deleteTask(deletingTaskId);
      setTasks((prev) => prev.filter((t) => t.id !== deletingTaskId));
      showToast.success("Task deleted.");
    } catch {
      showToast.error("Could not delete task.");
    } finally {
      setDeletingTaskId(null);
      setDeleteTaskDialogOpen(false);
    }
  };

  if (loading) return <DetailSkeleton />;
  if (!project) return null;

  return (
    <div className="flex flex-col gap-6 animate-fade-in-up">
      {/* Back nav */}
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="sm"
          className="gap-1.5 text-muted-foreground hover:text-foreground -ml-2"
          asChild
        >
          <Link to="/projects">
            <IconArrowLeft className="size-4" />
            All Projects
          </Link>
        </Button>
      </div>

      {/* Hero */}
      <ProjectHero
        project={project}
        canManage={canManage}
        onEdit={() => navigate(`/projects/${project.id}/edit`)}
        onDelete={() => setDeleteDialogOpen(true)}
      />

      {/* Tab layout */}
      <div className="grid gap-6 lg:grid-cols-[200px_1fr]">
        {/* Sidebar tab nav */}
        <Card className="h-fit">
          <CardContent className="p-2">
            <nav className="space-y-0.5">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={cn(
                    "flex w-full items-center gap-2.5 rounded-lg px-3 py-2.5 text-left text-sm font-medium transition-all",
                    activeTab === tab.id
                      ? "bg-primary/10 text-primary shadow-sm"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground",
                  )}
                >
                  <tab.icon className="size-4 shrink-0" />
                  <span>{tab.label}</span>
                  {tab.id === "tasks" && tasks.length > 0 && (
                    <span className="ml-auto flex size-5 items-center justify-center rounded-full bg-muted text-[10px] font-medium text-muted-foreground">
                      {tasks.length}
                    </span>
                  )}
                  {tab.id === "team" && project.users.length > 0 && (
                    <span className="ml-auto flex size-5 items-center justify-center rounded-full bg-muted text-[10px] font-medium text-muted-foreground">
                      {project.users.length}
                    </span>
                  )}
                </button>
              ))}
            </nav>
          </CardContent>
        </Card>

        {/* Tab content */}
        <div>
          {activeTab === "overview" && (
            <OverviewTab project={project} tasks={tasks} />
          )}
          {activeTab === "tasks" && (
            <TasksTab
              projectId={project.id}
              tasks={tasks}
              canManage={canManage}
              onCreateTask={() => navigate(`/tasks/new`)}
              onDeleteTask={(taskId) => {
                setDeletingTaskId(taskId);
                setDeleteTaskDialogOpen(true);
              }}
              navigate={navigate}
            />
          )}
          {activeTab === "team" && <TeamTab project={project} tasks={tasks} />}
        </div>
      </div>

      {/* Delete project dialog */}
      <DeleteConfirmDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        title="Delete Project"
        description={`Are you sure you want to delete "${project.name}"? This action cannot be undone and will remove all associated data.`}
        onConfirm={handleDeleteProject}
        isDeleting={isDeletingProject}
      />

      {/* Delete task dialog */}
      <DeleteConfirmDialog
        open={deleteTaskDialogOpen}
        onOpenChange={setDeleteTaskDialogOpen}
        title="Delete Task"
        description="Are you sure you want to delete this task? This action cannot be undone."
        onConfirm={handleDeleteTask}
        isDeleting={false}
      />
    </div>
  );
}

export default ProjectDetail;
