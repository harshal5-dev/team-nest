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

// Sample data
const stats = [
  {
    title: "Total Projects",
    value: "12",
    change: "+2 this month",
    icon: IconFolder,
    gradient: "from-violet-500 to-purple-600",
    bgGradient: "from-violet-500/10 to-purple-600/10",
  },
  {
    title: "Active Tasks",
    value: "24",
    change: "8 in progress",
    icon: IconChecklist,
    gradient: "from-blue-500 to-cyan-500",
    bgGradient: "from-blue-500/10 to-cyan-500/10",
  },
  {
    title: "Team Members",
    value: "8",
    change: "2 online now",
    icon: IconUsers,
    gradient: "from-emerald-500 to-teal-500",
    bgGradient: "from-emerald-500/10 to-teal-500/10",
  },
];

const myTasks = [
  {
    id: 1,
    title: "Design dashboard UI components",
    project: "Team Nest App",
    priority: "high",
    status: "in-progress",
    dueDate: "Today",
  },
  {
    id: 2,
    title: "Implement user authentication",
    project: "Team Nest App",
    priority: "high",
    status: "todo",
    dueDate: "Tomorrow",
  },
  {
    id: 3,
    title: "Write API documentation",
    project: "Backend API",
    priority: "medium",
    status: "todo",
    dueDate: "Feb 15",
  },
  {
    id: 4,
    title: "Review pull request #42",
    project: "Team Nest App",
    priority: "low",
    status: "completed",
    dueDate: "Completed",
  },
];

const projects = [
  {
    id: 1,
    name: "Team Nest App",
    description: "Multi-tenant team collaboration",
    progress: 65,
    tasks: { total: 24, completed: 16 },
    members: [
      { initials: "HG", color: "from-violet-500 to-purple-600" },
      { initials: "SC", color: "from-blue-500 to-cyan-500" },
      { initials: "MW", color: "from-emerald-500 to-teal-500" },
    ],
    status: "active",
  },
  {
    id: 2,
    name: "Portfolio Website",
    description: "Personal portfolio showcase",
    progress: 90,
    tasks: { total: 12, completed: 11 },
    members: [
      { initials: "HG", color: "from-violet-500 to-purple-600" },
    ],
    status: "active",
  },
  {
    id: 3,
    name: "Backend API",
    description: "Spring Boot REST API",
    progress: 40,
    tasks: { total: 18, completed: 7 },
    members: [
      { initials: "HG", color: "from-violet-500 to-purple-600" },
      { initials: "JB", color: "from-orange-500 to-red-500" },
    ],
    status: "active",
  },
];

const teamMembers = [
  {
    id: 1,
    name: "Harshal Ganbote",
    role: "Full Stack Developer",
    avatar: null,
    initials: "HG",
    status: "online",
    tasksCompleted: 42,
  },
  {
    id: 2,
    name: "Sarah Chen",
    role: "UI/UX Designer",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
    initials: "SC",
    status: "online",
    tasksCompleted: 38,
  },
  {
    id: 3,
    name: "Mike Wilson",
    role: "Backend Developer",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mike",
    initials: "MW",
    status: "away",
    tasksCompleted: 35,
  },
  {
    id: 4,
    name: "James Brown",
    role: "DevOps Engineer",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=James",
    initials: "JB",
    status: "offline",
    tasksCompleted: 29,
  },
];

function StatsCard({ stat, index }) {
  const Icon = stat.icon;

  return (
    <Card className={`group relative overflow-hidden hover:shadow-lg transition-all duration-300 animate-fade-in-up`} style={{ animationDelay: `${(index + 1) * 100}ms` }}>
      {/* Background gradient */}
      <div className={`absolute inset-0 bg-gradient-to-br ${stat.bgGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
      
      <CardContent className="relative p-6">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
            <p className="text-3xl font-bold tracking-tight">{stat.value}</p>
            <p className="text-sm text-muted-foreground">{stat.change}</p>
          </div>
          <div className={`p-3 rounded-xl bg-gradient-to-br ${stat.gradient} shadow-lg group-hover:scale-110 transition-transform duration-300`}>
            <Icon className="size-6 text-white" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function TaskCard({ task, index }) {
  const priorityConfig = {
    high: { color: "text-red-500 bg-red-500/10", label: "High" },
    medium: { color: "text-amber-500 bg-amber-500/10", label: "Medium" },
    low: { color: "text-emerald-500 bg-emerald-500/10", label: "Low" },
  };

  const statusConfig = {
    "in-progress": { icon: IconPlayerPlay, color: "text-blue-500" },
    todo: { icon: IconCircleDashed, color: "text-muted-foreground" },
    completed: { icon: IconCircleCheck, color: "text-emerald-500" },
  };

  const StatusIcon = statusConfig[task.status].icon;
  const priority = priorityConfig[task.priority];

  return (
    <div 
      className={`group flex items-start gap-3 p-4 rounded-xl border bg-card hover:bg-muted/50 hover:border-primary/20 transition-all duration-200 animate-fade-in-up`}
      style={{ animationDelay: `${(index + 1) * 100}ms` }}
    >
      <StatusIcon className={`size-5 mt-0.5 ${statusConfig[task.status].color} group-hover:scale-110 transition-transform`} />
      <div className="flex-1 min-w-0">
        <p className={`font-medium text-sm ${task.status === 'completed' ? 'line-through text-muted-foreground' : ''}`}>
          {task.title}
        </p>
        <div className="flex items-center gap-2 mt-1.5 flex-wrap">
          <Badge variant="secondary" className="text-xs font-normal">
            {task.project}
          </Badge>
          <Badge className={`text-xs font-normal ${priority.color}`}>
            {priority.label}
          </Badge>
        </div>
      </div>
      <div className="flex items-center gap-1 text-xs text-muted-foreground shrink-0">
        <IconCalendar className="size-3.5" />
        {task.dueDate}
      </div>
    </div>
  );
}

function ProjectCard({ project, index }) {
  return (
    <Card className={`group hover:shadow-lg hover:border-primary/20 transition-all duration-300 animate-fade-in-up`} style={{ animationDelay: `${(index + 1) * 100}ms` }}>
      <CardContent className="p-5">
        <div className="flex items-start justify-between mb-4">
          <div className="space-y-1">
            <h3 className="font-semibold group-hover:text-primary transition-colors">{project.name}</h3>
            <p className="text-sm text-muted-foreground">{project.description}</p>
          </div>
          <div className="flex items-center justify-center size-8 rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
            <IconArrowUpRight className="size-4" />
          </div>
        </div>

        {/* Progress */}
        <div className="space-y-2 mb-4">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Progress</span>
            <span className="font-medium">{project.progress}%</span>
          </div>
          <Progress value={project.progress} className="h-2" />
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between">
          {/* Members */}
          <div className="flex -space-x-2">
            {project.members.map((member, i) => (
              <div
                key={i}
                className={`size-8 rounded-full bg-gradient-to-br ${member.color} flex items-center justify-center text-white text-xs font-medium ring-2 ring-background`}
              >
                {member.initials}
              </div>
            ))}
          </div>
          
          {/* Tasks count */}
          <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <IconChecklist className="size-4" />
            <span>{project.tasks.completed}/{project.tasks.total}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function TeamMemberCard({ member, index }) {
  const statusColors = {
    online: "bg-emerald-500",
    away: "bg-amber-500",
    offline: "bg-muted-foreground/50",
  };

  return (
    <div className={`group flex items-center gap-4 p-4 rounded-xl border bg-card hover:bg-muted/50 hover:border-primary/20 transition-all duration-200 animate-fade-in-up`} style={{ animationDelay: `${(index + 1) * 100}ms` }}>
      <div className="relative">
        <Avatar className="size-11 ring-2 ring-primary/10 group-hover:ring-primary/30 transition-all">
          <AvatarImage src={member.avatar} alt={member.name} />
          <AvatarFallback className="bg-gradient-to-br from-primary via-violet-500 to-purple-600 text-white text-sm font-medium">
            {member.initials}
          </AvatarFallback>
        </Avatar>
        <span className={`absolute bottom-0 right-0 size-3 rounded-full ring-2 ring-background ${statusColors[member.status]} ${member.status === 'online' ? 'animate-pulse' : ''}`} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-medium text-sm truncate group-hover:text-primary transition-colors">{member.name}</p>
        <p className="text-xs text-muted-foreground truncate">{member.role}</p>
      </div>
      <div className="text-right shrink-0">
        <p className="text-lg font-semibold">{member.tasksCompleted}</p>
        <p className="text-xs text-muted-foreground">tasks</p>
      </div>
    </div>
  );
}

export function Dashboard() {
  return (
    <div className="space-y-8 pb-8">
      {/* Welcome Section */}
      <div className="animate-fade-in-up">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="space-y-1">
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
              Welcome back, <span className="bg-gradient-to-r from-primary via-violet-500 to-purple-600 bg-clip-text text-transparent">Harshal</span> 👋
            </h1>
            <p className="text-muted-foreground">
              Here's what's happening with your projects today.
            </p>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <IconClock className="size-4" />
            <span>{new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</span>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {stats.map((stat, index) => (
          <StatsCard key={index} stat={stat} index={index} />
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* My Tasks - Takes 2 columns */}
        <Card className="lg:col-span-2 animate-fade-in-up" style={{ animationDelay: '200ms' }}>
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <IconChecklist className="size-5 text-primary" />
                  My Tasks
                </CardTitle>
                <CardDescription>Your assigned tasks across all projects</CardDescription>
              </div>
              <Badge variant="secondary" className="font-normal">
                {myTasks.filter(t => t.status !== 'completed').length} pending
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            {myTasks.map((task, index) => (
              <TaskCard key={task.id} task={task} index={index} />
            ))}
          </CardContent>
        </Card>

        {/* Team Members */}
        <Card className="animate-fade-in-up" style={{ animationDelay: '300ms' }}>
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2">
              <IconUsers className="size-5 text-primary" />
              Team
            </CardTitle>
            <CardDescription>Your team members and activity</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {teamMembers.map((member, index) => (
              <TeamMemberCard key={member.id} member={member} index={index} />
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Projects Section */}
      <div className="animate-fade-in-up" style={{ animationDelay: '400ms' }}>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <IconFolder className="size-5 text-primary" />
              Active Projects
            </h2>
            <p className="text-sm text-muted-foreground">Track progress across your projects</p>
          </div>
          <Badge variant="outline" className="font-normal">
            {projects.length} projects
          </Badge>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
