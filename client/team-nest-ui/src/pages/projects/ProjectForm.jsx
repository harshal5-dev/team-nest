import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  IconFolder,
  IconArrowLeft,
  IconDeviceFloppy,
  IconCircleCheck,
  IconPlayerPlay,
  IconPlayerPause,
  IconArchive,
  IconUsers,
  IconCalendar,
  IconSparkles,
} from "@tabler/icons-react";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { showToast } from "@/components/ui/sonner";
import {
  PageHeader,
  PageHeaderHeading,
  PageHeaderTitle,
  PageHeaderDescription,
  PageHeaderActions,
} from "@/components/ui/page-header";

import {
  getProjects,
  createProject,
  updateProject,
  ProjectStatus,
  mockUsers,
} from "@/api/projectApi";

// Status configuration
const statusConfig = {
  ACTIVE: {
    label: "Active",
    icon: IconPlayerPlay,
    color: "bg-success/10 text-success border-success/20",
    description: "Project is currently in progress",
  },
  ON_HOLD: {
    label: "On Hold",
    icon: IconPlayerPause,
    color: "bg-warning/10 text-warning border-warning/20",
    description: "Project is temporarily paused",
  },
  COMPLETED: {
    label: "Completed",
    icon: IconCircleCheck,
    color: "bg-info/10 text-info border-info/20",
    description: "Project has been finished",
  },
  ARCHIVED: {
    label: "Archived",
    icon: IconArchive,
    color: "bg-muted/10 text-muted-foreground border-muted/20",
    description: "Project is archived",
  },
};

// Avatar colors
const avatarColors = [
  "from-violet-500 to-purple-600",
  "from-blue-500 to-cyan-500",
  "from-emerald-500 to-teal-500",
  "from-rose-500 to-pink-500",
  "from-amber-500 to-orange-500",
];

// Form validation schema
const projectSchema = z.object({
  name: z
    .string()
    .min(1, "Project name is required")
    .max(100, "Name must be less than 100 characters"),
  description: z
    .string()
    .max(500, "Description must be less than 500 characters")
    .optional(),
  status: z.nativeEnum(ProjectStatus),
  userIds: z.array(z.number()).optional(),
});

export function ProjectForm() {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditing = !!id;

  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(isEditing);

  const form = useForm({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      name: "",
      description: "",
      status: ProjectStatus.ACTIVE,
      userIds: [],
    },
  });

  // Fetch project data if editing
  useEffect(() => {
    if (isEditing) {
      const fetchProject = async () => {
        try {
          const response = await getProjects();
          const project = response.data.find((p) => p.id === parseInt(id));
          if (project) {
            form.reset({
              name: project.name,
              description: project.description || "",
              status: project.status,
              userIds: project.users.map((u) => u.id),
            });
          } else {
            showToast.error("Project not found");
            navigate("/projects");
          }
        } catch (error) {
          showToast.error("Failed to load project");
          navigate("/projects");
        } finally {
          setIsFetching(false);
        }
      };
      fetchProject();
    }
  }, [id, isEditing, form, navigate]);

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      if (isEditing) {
        await updateProject(parseInt(id), data);
        showToast.success("Project updated successfully");
      } else {
        await createProject(data);
        showToast.success("Project created successfully");
      }
      navigate("/projects");
    } catch (error) {
      showToast.error(isEditing ? "Failed to update project" : "Failed to create project");
    } finally {
      setIsLoading(false);
    }
  };

  const selectedUserIds = form.watch("userIds") || [];

  const toggleUser = (userId) => {
    const current = form.getValues("userIds") || [];
    const updated = current.includes(userId)
      ? current.filter((id) => id !== userId)
      : [...current, userId];
    form.setValue("userIds", updated, { shouldValidate: true });
  };

  if (isFetching) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="flex flex-col items-center gap-3">
          <div className="size-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
          <p className="text-sm text-muted-foreground">Loading project...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Page Header */}
      <PageHeader>
        <PageHeaderHeading icon={isEditing ? IconFolder : IconSparkles}>
          <PageHeaderTitle>{isEditing ? "Edit Project" : "Create New Project"}</PageHeaderTitle>
          <PageHeaderDescription>
            {isEditing
              ? "Update the project details below"
              : "Fill in the information to create a new project"}
          </PageHeaderDescription>
        </PageHeaderHeading>
        <PageHeaderActions>
          <Button variant="ghost" onClick={() => navigate("/projects")}>
            <IconArrowLeft className="mr-1.5 size-4" />
            Back to Projects
          </Button>
        </PageHeaderActions>
      </PageHeader>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Main Details Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <IconFolder className="size-5 text-primary" />
                Project Details
              </CardTitle>
              <CardDescription>
                Basic information about your project
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Project Name *</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter project name..."
                        className="h-11"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Choose a descriptive name for your project
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Describe your project goals, scope, and objectives..."
                        className="min-h-[120px] resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Provide detailed information about the project
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Status</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger className="h-11">
                          <SelectValue placeholder="Select project status" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {Object.entries(statusConfig).map(([key, config]) => {
                          const StatusIcon = config.icon;
                          return (
                            <SelectItem key={key} value={key}>
                              <div className="flex items-center gap-3">
                                <div className={`flex size-7 items-center justify-center rounded-md border ${config.color}`}>
                                  <StatusIcon className="size-4" />
                                </div>
                                <div className="flex flex-col">
                                  <span className="font-medium">{config.label}</span>
                                  <span className="text-xs text-muted-foreground">
                                    {config.description}
                                  </span>
                                </div>
                              </div>
                            </SelectItem>
                          );
                        })}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          {/* Team Members Card */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <IconUsers className="size-5 text-primary" />
                    Team Members
                  </CardTitle>
                  <CardDescription>
                    Add team members to collaborate on this project
                  </CardDescription>
                </div>
                {selectedUserIds.length > 0 && (
                  <Badge variant="secondary" className="text-xs">
                    {selectedUserIds.length} selected
                  </Badge>
                )}
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid gap-3 sm:grid-cols-2">
                {mockUsers.map((user, index) => {
                  const isSelected = selectedUserIds.includes(user.id);
                  return (
                    <button
                      key={user.id}
                      type="button"
                      onClick={() => toggleUser(user.id)}
                      className={`
                        flex items-center gap-4 p-4 rounded-xl border-2 transition-all duration-200
                        ${isSelected
                          ? "border-primary bg-primary/5 shadow-sm shadow-primary/10"
                          : "border-border hover:border-primary/30 hover:bg-muted/50"
                        }
                      `}
                    >
                      <Avatar className="size-11 shrink-0">
                        <AvatarFallback
                          className={`bg-gradient-to-br ${avatarColors[index % avatarColors.length]} text-white font-medium`}
                        >
                          {user.initials}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 text-left min-w-0">
                        <p className="font-medium text-sm truncate">{user.name}</p>
                        <p className="text-xs text-muted-foreground truncate">
                          {user.email}
                        </p>
                      </div>
                      <div
                        className={`
                          size-6 rounded-full border-2 flex items-center justify-center shrink-0 transition-all
                          ${isSelected
                            ? "border-primary bg-primary text-primary-foreground"
                            : "border-muted-foreground/30"
                          }
                        `}
                      >
                        {isSelected && <IconCircleCheck className="size-4" />}
                      </div>
                    </button>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="flex items-center justify-end gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate("/projects")}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? (
                <>
                  <span className="size-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                  {isEditing ? "Saving..." : "Creating..."}
                </>
              ) : (
                <>
                  <IconDeviceFloppy className="mr-1.5 size-4" />
                  {isEditing ? "Save Changes" : "Create Project"}
                </>
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}

export default ProjectForm;
