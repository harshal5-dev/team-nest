import { useEffect, useState } from "react";
import { Link } from "react-router";
import {
  IconFolder,
  IconChecklist,
  IconUsers,
  IconClock,
  IconCalendar,
  IconArrowUpRight,
  IconCircleCheck,
  IconCircleDashed,
  IconPlayerPlay,
  IconLayoutDashboard,
  IconTrendingUp,
} from "@tabler/icons-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { ScrollArea } from "@/components/ui/scroll-area";
import { StatsCard, StatsCardGrid } from "@/components/ui/stats-card";
import { 
  PageHeader, 
  PageHeaderHeading, 
  PageHeaderTitle, 
  PageHeaderDescription,
  PageHeaderActions 
} from "@/components/ui/page-header";
import { EmptyState } from "@/components/ui/empty-state";
import { cn } from "@/lib/utils";

import { getProjectStats, getProjects, ProjectStatus } from "@/api/projectApi";
import { getTaskStats, getTasks, TaskStatus, TaskPriority } from "@/api/taskApi";
import { getUserStats } from "@/api/userApi";

export function Dashboard() {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    projects: { total: 0, change: 0 },
    tasks: { total: 0, change: 0 },
    users: { total: 0, change: 0 },
  });
  const [recentTasks, setRecentTasks] = useState([]);
  const [activeProjects, setActiveProjects] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const [
          projectStatsRes, 
          taskStatsRes, 
          userStatsRes,
          tasksRes, 
          projectsRes
        ] = await Promise.all([
          getProjectStats(),
          getTaskStats(),
          getUserStats(),
          getTasks(),
          getProjects()
        ]);

        if (projectStatsRes.success) {
          setStats(prev => ({ ...prev, projects: { 
            total: projectStatsRes.data.total, 
            active: projectStatsRes.data.active 
          }}));
        }
        
        if (taskStatsRes.success) {
          setStats(prev => ({ ...prev, tasks: { 
            total: taskStatsRes.data.active || (taskStatsRes.data.todo + taskStatsRes.data.inProgress), 
            completed: taskStatsRes.data.completed 
          }}));
        }

        if (userStatsRes.success) {
          setStats(prev => ({ ...prev, users: { 
            total: userStatsRes.data.total, 
            active: userStatsRes.data.active 
          }}));
        }

        if (tasksRes.success) {
          // Get recent tasks, sort by date or priority
           const sortedTasks = tasksRes.data
            .filter(t => t.status !== TaskStatus.COMPLETED && t.status !== TaskStatus.CANCELLED)
            .sort((a, b) => new Date(b.lastModifiedAt) - new Date(a.lastModifiedAt))
            .slice(0, 5);
          setRecentTasks(sortedTasks);
        }

        if (projectsRes.success) {
          const active = projectsRes.data
            .filter(p => p.status === ProjectStatus.ACTIVE)
            .slice(0, 3);
          setActiveProjects(active);
        }

      } catch (error) {
        console.error("Failed to fetch dashboard data", error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  const statCards = [
    {
      title: "Active Projects",
      value: stats.projects.active || 0,
      total: stats.projects.total || 0,
      label: "projects total",
      icon: IconFolder,
      className: "bg-primary/10 text-primary border-primary/20",
      gradient: "from-primary to-primary/80", 
      bgGradient: "bg-primary/10",
      textColor: "text-primary",
      borderColor: "border-primary/20",
    },
    {
      title: "Pending Tasks",
      value: stats.tasks.total || 0,
      total: (stats.tasks.total + stats.tasks.completed) || 0,
      label: "tasks total",
      icon: IconChecklist,
      className: "bg-info/10 text-info border-info/20",
      gradient: "from-info to-info/80",
      bgGradient: "bg-info/10",
      textColor: "text-info",
      borderColor: "border-info/20",
    },
    {
      title: "Team Members",
      value: stats.users.active || 0,
      total: stats.users.total || 0,
      label: "users total",
      icon: IconUsers,
      className: "bg-success/10 text-success border-success/20",
      gradient: "from-success to-success/80",
      bgGradient: "bg-success/10",
      textColor: "text-success",
      borderColor: "border-success/20",
    },
  ];

  if (loading) {
    return (
      <div className="flex flex-col gap-6">
        <PageHeader>
          <PageHeaderHeading>
            <Skeleton className="h-6 w-32" />
            <Skeleton className="h-4 w-48 mt-1" />
          </PageHeaderHeading>
          <Skeleton className="h-9 w-32" />
        </PageHeader>
        <StatsCardGrid className="lg:grid-cols-3">
          {[1, 2, 3].map(i => <Skeleton key={i} className="h-[120px] rounded-xl" />)}
        </StatsCardGrid>
        <div className="grid gap-6 lg:grid-cols-7">
          <Skeleton className="lg:col-span-4 h-[400px] rounded-xl" />
          <Skeleton className="lg:col-span-3 h-[400px] rounded-xl" />
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <PageHeader>
        <PageHeaderHeading icon={IconLayoutDashboard}>
          <PageHeaderTitle>Dashboard</PageHeaderTitle>
          <PageHeaderDescription>
            Overview of your team's activity and progress
          </PageHeaderDescription>
        </PageHeaderHeading>
        <PageHeaderActions>
          <Button variant="outline" size="sm" className="gap-2">
            <IconCalendar className="size-4" />
            <span className="hidden sm:inline">
              {new Date().toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
            </span>
          </Button>
        </PageHeaderActions>
      </PageHeader>

      {/* Stats Cards */}
      <StatsCardGrid className="lg:grid-cols-3">
        <StatsCard
          title="Active Projects"
          value={stats.projects.active || 0}
          subtitle={`from ${stats.projects.total || 0} projects total`}
          icon={IconFolder}
          color="primary"
          progress={stats.projects.total > 0 ? (stats.projects.active / stats.projects.total) * 100 : 0}
        />
        <StatsCard
          title="Pending Tasks"
          value={stats.tasks.total || 0}
          subtitle={`${stats.tasks.completed || 0} completed`}
          icon={IconChecklist}
          color="info"
          progress={((stats.tasks.total || 0) + (stats.tasks.completed || 0)) > 0 
            ? ((stats.tasks.completed || 0) / ((stats.tasks.total || 0) + (stats.tasks.completed || 0))) * 100 
            : 0}
        />
        <StatsCard
          title="Team Members"
          value={stats.users.active || 0}
          subtitle={`from ${stats.users.total || 0} users total`}
          icon={IconUsers}
          color="success"
          progress={stats.users.total > 0 ? (stats.users.active / stats.users.total) * 100 : 0}
        />
      </StatsCardGrid>

      {/* Main Content Grid */}
      <div className="grid gap-6 lg:grid-cols-7">
        {/* Recent Tasks */}
        <Card className="lg:col-span-4 overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between pb-3">
            <div>
              <CardTitle className="text-base">Recent Tasks</CardTitle>
              <CardDescription>Tasks requiring attention</CardDescription>
            </div>
            <Button variant="ghost" size="sm" asChild>
              <Link to="/tasks" className="gap-1 text-muted-foreground hover:text-foreground">
                View All <IconArrowUpRight className="size-3.5" />
              </Link>
            </Button>
          </CardHeader>
          <CardContent className="pt-0">
            {recentTasks.length === 0 ? (
              <EmptyState
                icon={IconChecklist}
                title="No active tasks"
                description="Create your first task to get started"
                className="py-8"
              />
            ) : (
              <div className="space-y-2">
                {recentTasks.map((task) => (
                  <div 
                    key={task.id} 
                    className="flex items-center justify-between gap-4 p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors group"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className={cn(
                        "flex size-8 shrink-0 items-center justify-center rounded-lg",
                        task.status === TaskStatus.IN_PROGRESS 
                          ? "bg-info/10 text-info" 
                          : task.status === TaskStatus.COMPLETED 
                            ? "bg-success/10 text-success" 
                            : "bg-muted text-muted-foreground"
                      )}>
                        {task.status === TaskStatus.IN_PROGRESS ? (
                          <IconCircleDashed className="size-4" />
                        ) : (
                          <IconCircleCheck className="size-4" />
                        )}
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-medium truncate">{task.title}</p>
                        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                          <span className="truncate">{task.project?.name}</span>
                          <span>•</span>
                          <span className={cn(
                            "capitalize shrink-0",
                            task.priority === TaskPriority.URGENT && "text-destructive font-medium",
                            task.priority === TaskPriority.HIGH && "text-pending"
                          )}>
                            {task.priority?.toLowerCase()}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      {task.assignee && (
                        <Avatar className="size-6 border border-background">
                          <AvatarImage src={task.assignee.avatar} />
                          <AvatarFallback className="text-[10px]">{task.assignee.initials}</AvatarFallback>
                        </Avatar>
                      )}
                      <span className="text-xs text-muted-foreground hidden sm:inline">
                        {task.dueDate 
                          ? new Date(task.dueDate).toLocaleDateString(undefined, { month: 'short', day: 'numeric' }) 
                          : 'No due date'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Active Projects */}
        <Card className="lg:col-span-3 overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between pb-3">
            <div>
              <CardTitle className="text-base">Active Projects</CardTitle>
              <CardDescription>Top priority projects</CardDescription>
            </div>
            <Button variant="ghost" size="sm" asChild>
              <Link to="/projects" className="gap-1 text-muted-foreground hover:text-foreground">
                View All <IconArrowUpRight className="size-3.5" />
              </Link>
            </Button>
          </CardHeader>
          <CardContent className="pt-0">
            {activeProjects.length === 0 ? (
              <EmptyState
                icon={IconFolder}
                title="No active projects"
                description="Create a project to start tracking work"
                className="py-8"
              />
            ) : (
              <div className="space-y-4">
                {activeProjects.map((project) => {
                  const completedTasks = project.tasks?.filter(t => t.completed).length || 0;
                  const totalTasks = project.tasks?.length || 0;
                  const progressPercent = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;
                  
                  return (
                    <div key={project.id} className="p-3 rounded-lg bg-muted/30 space-y-3">
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2.5 min-w-0">
                          <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                            <IconFolder className="size-4" />
                          </div>
                          <span className="font-medium text-sm truncate">{project.name}</span>
                        </div>
                        <Badge variant="secondary" className="text-[10px] shrink-0">
                          {completedTasks}/{totalTasks}
                        </Badge>
                      </div>
                      <div className="space-y-1.5">
                        <div className="flex items-center justify-between text-xs text-muted-foreground">
                          <span>Progress</span>
                          <span className="tabular-nums">{progressPercent}%</span>
                        </div>
                        <Progress value={progressPercent} className="h-1.5" />
                      </div>
                      {project.users && project.users.length > 0 && (
                        <div className="flex items-center -space-x-1.5 pt-1">
                          {project.users.slice(0, 4).map((user, i) => (
                            <Avatar key={i} className="size-6 border-2 border-card">
                              <AvatarImage src={user.avatar} />
                              <AvatarFallback className="text-[10px] bg-muted">{user.initials}</AvatarFallback>
                            </Avatar>
                          ))}
                          {project.users.length > 4 && (
                            <div className="flex size-6 items-center justify-center rounded-full bg-muted border-2 border-card text-[10px] font-medium text-muted-foreground">
                              +{project.users.length - 4}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
