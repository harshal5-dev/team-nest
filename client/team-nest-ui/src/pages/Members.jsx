import {
  IconPlus,
  IconSearch,
  IconMail,
  IconBrandSlack,
  IconDots,
  IconEdit,
  IconTrash,
  IconFilter,
} from "@tabler/icons-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Sample team members data
const teamMembers = [
  {
    id: 1,
    name: "Alex Johnson",
    role: "Team Lead",
    department: "Engineering",
    email: "alex@acme.com",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
    initials: "AJ",
    status: "online",
    projects: ["Website Redesign", "API Integration"],
    joinedDate: "Jan 2024",
  },
  {
    id: 2,
    name: "Sarah Chen",
    role: "Senior Designer",
    department: "Design",
    email: "sarah@acme.com",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
    initials: "SC",
    status: "online",
    projects: ["Website Redesign", "Brand Guidelines"],
    joinedDate: "Mar 2024",
  },
  {
    id: 3,
    name: "Mike Wilson",
    role: "Full Stack Developer",
    department: "Engineering",
    email: "mike@acme.com",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mike",
    initials: "MW",
    status: "away",
    projects: ["Mobile App V2", "Backend API"],
    joinedDate: "Feb 2024",
  },
  {
    id: 4,
    name: "Emma Davis",
    role: "Marketing Manager",
    department: "Marketing",
    email: "emma@acme.com",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emma",
    initials: "ED",
    status: "offline",
    projects: ["Q4 Campaign", "Content Strategy"],
    joinedDate: "Dec 2023",
  },
  {
    id: 5,
    name: "James Brown",
    role: "DevOps Engineer",
    department: "Engineering",
    email: "james@acme.com",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=James",
    initials: "JB",
    status: "online",
    projects: ["Infrastructure", "CI/CD Pipeline"],
    joinedDate: "Apr 2024",
  },
  {
    id: 6,
    name: "Lisa Park",
    role: "Product Manager",
    department: "Product",
    email: "lisa@acme.com",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Lisa",
    initials: "LP",
    status: "online",
    projects: ["Mobile App V2", "Feature Roadmap"],
    joinedDate: "Nov 2023",
  },
  {
    id: 7,
    name: "David Kim",
    role: "UX Researcher",
    department: "Design",
    email: "david@acme.com",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=David",
    initials: "DK",
    status: "away",
    projects: ["User Research", "Website Redesign"],
    joinedDate: "May 2024",
  },
  {
    id: 8,
    name: "Rachel Green",
    role: "Frontend Developer",
    department: "Engineering",
    email: "rachel@acme.com",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Rachel",
    initials: "RG",
    status: "online",
    projects: ["Website Redesign", "Component Library"],
    joinedDate: "Jun 2024",
  },
];

const departments = ["All", "Engineering", "Design", "Marketing", "Product"];

function MemberCard({ member }) {
  const statusColors = {
    online: "bg-emerald-500",
    away: "bg-amber-500",
    offline: "bg-muted-foreground",
  };

  const departmentColors = {
    Engineering: "bg-blue-500/10 text-blue-600 border-blue-500/20",
    Design: "bg-purple-500/10 text-purple-600 border-purple-500/20",
    Marketing: "bg-pink-500/10 text-pink-600 border-pink-500/20",
    Product: "bg-amber-500/10 text-amber-600 border-amber-500/20",
  };

  return (
    <Card className="group hover:shadow-md transition-all duration-200 hover:border-primary/20">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="relative">
            <Avatar className="size-16">
              <AvatarImage src={member.avatar} alt={member.name} />
              <AvatarFallback className="bg-primary/10 text-primary text-lg">
                {member.initials}
              </AvatarFallback>
            </Avatar>
            <div
              className={`absolute bottom-0 right-0 size-4 rounded-full border-2 border-background ${statusColors[member.status]}`}
            />
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground size-9 opacity-0 group-hover:opacity-100">
              <IconDots className="size-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <IconEdit className="size-4 mr-2" />
                Edit Member
              </DropdownMenuItem>
              <DropdownMenuItem>
                <IconMail className="size-4 mr-2" />
                Send Email
              </DropdownMenuItem>
              <DropdownMenuItem>
                <IconBrandSlack className="size-4 mr-2" />
                Message on Slack
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-destructive focus:text-destructive">
                <IconTrash className="size-4 mr-2" />
                Remove Member
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="space-y-3">
          <div>
            <h3 className="font-semibold text-lg">{member.name}</h3>
            <p className="text-sm text-muted-foreground">{member.role}</p>
          </div>

          <Badge
            variant="outline"
            className={`text-xs ${departmentColors[member.department]}`}
          >
            {member.department}
          </Badge>

          <div className="pt-2 border-t">
            <p className="text-xs text-muted-foreground mb-2">Projects</p>
            <div className="flex flex-wrap gap-1">
              {member.projects.slice(0, 2).map((project, index) => (
                <Badge key={index} variant="secondary" className="text-xs">
                  {project}
                </Badge>
              ))}
              {member.projects.length > 2 && (
                <Badge variant="secondary" className="text-xs">
                  +{member.projects.length - 2}
                </Badge>
              )}
            </div>
          </div>

          <div className="flex items-center justify-between pt-2 text-xs text-muted-foreground">
            <span>{member.email}</span>
            <span>Joined {member.joinedDate}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export function Members() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Team Members</h1>
          <p className="text-muted-foreground">
            Manage your team and their access levels
          </p>
        </div>
        <Button className="gap-2">
          <IconPlus className="size-4" />
          Invite Member
        </Button>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="relative flex-1 max-w-sm">
              <IconSearch className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search members..."
                className="pl-9"
              />
            </div>
            <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0">
              {departments.map((dept) => (
                <Button
                  key={dept}
                  variant={dept === "All" ? "default" : "outline"}
                  size="sm"
                  className="shrink-0"
                >
                  {dept}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats Summary */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold">{teamMembers.length}</div>
            <p className="text-sm text-muted-foreground">Total Members</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-emerald-500">
              {teamMembers.filter((m) => m.status === "online").length}
            </div>
            <p className="text-sm text-muted-foreground">Online Now</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold">
              {new Set(teamMembers.map((m) => m.department)).size}
            </div>
            <p className="text-sm text-muted-foreground">Departments</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold">2</div>
            <p className="text-sm text-muted-foreground">Pending Invites</p>
          </CardContent>
        </Card>
      </div>

      {/* Members Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {teamMembers.map((member) => (
          <MemberCard key={member.id} member={member} />
        ))}
      </div>
    </div>
  );
}

export default Members;
