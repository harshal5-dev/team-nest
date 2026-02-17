import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  IconChecklist,
  IconArrowLeft,
  IconDeviceFloppy,
  IconCalendar,
  IconUser,
  IconFolder,
  IconFlag,
  IconClock,
  IconSparkles,
  IconCircleCheck,
  IconAlertCircle,
  IconAlertTriangle,
  IconMinus,
} from "@tabler/icons-react";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
  getTasks,
  createTask,
  updateTask,
  TaskStatus,
  TaskPriority,
  taskProjects,
  taskUsers,
} from "@/api/taskApi";

// Status configuration
const statusConfig = {
  TODO: {
    label: "To Do",
    color: "bg-muted text-muted-foreground border-border",
    description: "Not yet started",
  },
  IN_PROGRESS: {
    label: "In Progress",
    color: "bg-info/10 text-info border-info/20",
    description: "Currently being worked on",
  },
  IN_REVIEW: {
    label: "In Review",
    color: "bg-primary/10 text-primary border-primary/20",
    description: "Awaiting review",
  },
  COMPLETED: {
    label: "Completed",
    color: "bg-success/10 text-success border-success/20",
    description: "Finished successfully",
  },
  CANCELLED: {
    label: "Cancelled",
    color: "bg-destructive/10 text-destructive border-destructive/20",
    description: "Task was cancelled",
  },
};

// Priority configuration
const priorityConfig = {
  LOW: {
    label: "Low",
    icon: IconMinus,
    color: "bg-muted text-muted-foreground border-border",
    description: "Can be done later",
  },
  MEDIUM: {
    label: "Medium",
    icon: IconFlag,
    color: "bg-info/10 text-info border-info/20",
    description: "Normal priority",
  },
  HIGH: {
    label: "High",
    icon: IconAlertTriangle,
    color: "bg-pending/10 text-pending border-pending/20",
    description: "Should be prioritized",
  },
  URGENT: {
    label: "Urgent",
    icon: IconAlertCircle,
    color: "bg-destructive/10 text-destructive border-destructive/20",
    description: "Needs immediate attention",
  },
};

// Form validation schema
const taskSchema = z.object({
  title: z.string().min(1, "Title is required").max(200, "Title too long"),
  description: z.string().max(1000, "Description too long").optional(),
  status: z.nativeEnum(TaskStatus),
  priority: z.nativeEnum(TaskPriority),
  projectId: z.coerce.number().min(1, "Project is required"),
  assigneeId: z.coerce.number().optional(),
  dueDate: z.string().optional(),
  estimatedHours: z.coerce.number().min(0).optional(),
});

export function TaskForm() {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditing = !!id;

  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(isEditing);

  const form = useForm({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      title: "",
      description: "",
      status: TaskStatus.TODO,
      priority: TaskPriority.MEDIUM,
      projectId: taskProjects[0]?.id,
      assigneeId: undefined,
      dueDate: "",
      estimatedHours: undefined,
    },
  });

  // Fetch task data if editing
  useEffect(() => {
    if (isEditing) {
      const fetchTask = async () => {
        try {
          const response = await getTasks();
          const task = response.data.find((t) => t.id === parseInt(id));
          if (task) {
            form.reset({
              title: task.title,
              description: task.description || "",
              status: task.status,
              priority: task.priority,
              projectId: task.projectId,
              assigneeId: task.assigneeId,
              dueDate: task.dueDate ? task.dueDate.split("T")[0] : "",
              estimatedHours: task.estimatedHours,
            });
          } else {
            showToast.error("Task not found");
            navigate("/tasks");
          }
        } catch (error) {
          showToast.error("Failed to load task");
          navigate("/tasks");
        } finally {
          setIsFetching(false);
        }
      };
      fetchTask();
    }
  }, [id, isEditing, form, navigate]);

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      if (isEditing) {
        await updateTask(parseInt(id), data);
        showToast.success("Task updated successfully");
      } else {
        await createTask(data);
        showToast.success("Task created successfully");
      }
      navigate("/tasks");
    } catch (error) {
      showToast.error(isEditing ? "Failed to update task" : "Failed to create task");
    } finally {
      setIsLoading(false);
    }
  };

  const selectedProject = taskProjects.find((p) => p.id === form.watch("projectId"));
  const selectedAssignee = taskUsers.find((u) => u.id === form.watch("assigneeId"));

  if (isFetching) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="flex flex-col items-center gap-3">
          <div className="size-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
          <p className="text-sm text-muted-foreground">Loading task...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Page Header */}
      <PageHeader>
        <PageHeaderHeading icon={isEditing ? IconChecklist : IconSparkles}>
          <PageHeaderTitle>{isEditing ? "Edit Task" : "Create New Task"}</PageHeaderTitle>
          <PageHeaderDescription>
            {isEditing
              ? "Update the task details below"
              : "Fill in the information to create a new task"}
          </PageHeaderDescription>
        </PageHeaderHeading>
        <PageHeaderActions>
          <Button variant="ghost" onClick={() => navigate("/tasks")}>
            <IconArrowLeft className="mr-1.5 size-4" />
            Back to Tasks
          </Button>
        </PageHeaderActions>
      </PageHeader>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Task Preview Card */}
          <Card className="bg-gradient-to-br from-primary/5 via-primary/5 to-info/5 border-primary/10">
            <CardContent className="pt-6">
              <div className="flex items-start gap-4">
                <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-info text-white shadow-lg">
                  <IconChecklist className="size-6" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-lg truncate">
                    {form.watch("title") || "New Task"}
                  </h3>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {selectedProject && (
                      <Badge variant="secondary" className="text-xs">
                        {selectedProject.name}
                      </Badge>
                    )}
                    <Badge variant="outline" className={`text-xs ${statusConfig[form.watch("status")]?.color}`}>
                      {statusConfig[form.watch("status")]?.label}
                    </Badge>
                    <Badge variant="outline" className={`text-xs ${priorityConfig[form.watch("priority")]?.color}`}>
                      {priorityConfig[form.watch("priority")]?.label}
                    </Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Task Details */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <IconChecklist className="size-5 text-primary" />
                Task Details
              </CardTitle>
              <CardDescription>
                Basic information about the task
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Task Title *</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter task title..."
                        className="h-11"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      A clear, concise title for the task
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
                        placeholder="Describe the task in detail..."
                        className="min-h-[120px] resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Add any relevant details, requirements, or context
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="projectId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Project *</FormLabel>
                    <Select
                      onValueChange={(val) => field.onChange(parseInt(val))}
                      value={field.value?.toString()}
                    >
                      <FormControl>
                        <SelectTrigger className="h-11">
                          <div className="flex items-center gap-2">
                            <IconFolder className="size-4 text-muted-foreground" />
                            <SelectValue placeholder="Select project" />
                          </div>
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {taskProjects.map((project) => (
                          <SelectItem key={project.id} value={project.id.toString()}>
                            <div className="flex items-center gap-3">
                              <div
                                className={`size-3 rounded-full bg-gradient-to-br ${project.color}`}
                              />
                              <span>{project.name}</span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          {/* Status & Priority */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <IconFlag className="size-5 text-primary" />
                Status & Priority
              </CardTitle>
              <CardDescription>
                Set the current status and priority level
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-6 sm:grid-cols-2">
                <FormField
                  control={form.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Status</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger className="h-11">
                            <SelectValue placeholder="Select status" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {Object.entries(statusConfig).map(([key, config]) => (
                            <SelectItem key={key} value={key}>
                              <div className="flex items-center gap-3">
                                <Badge variant="outline" className={`${config.color} text-xs`}>
                                  {config.label}
                                </Badge>
                                <span className="text-xs text-muted-foreground">
                                  {config.description}
                                </span>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="priority"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Priority</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger className="h-11">
                            <SelectValue placeholder="Select priority" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {Object.entries(priorityConfig).map(([key, config]) => {
                            const PriorityIcon = config.icon;
                            return (
                              <SelectItem key={key} value={key}>
                                <div className="flex items-center gap-3">
                                  <div className={`flex size-6 items-center justify-center rounded border ${config.color}`}>
                                    <PriorityIcon className="size-3.5" />
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
              </div>
            </CardContent>
          </Card>

          {/* Assignment & Schedule */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <IconUser className="size-5 text-primary" />
                Assignment & Schedule
              </CardTitle>
              <CardDescription>
                Assign to a team member and set deadlines
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-6 sm:grid-cols-2">
                <FormField
                  control={form.control}
                  name="assigneeId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Assignee</FormLabel>
                      <Select
                        onValueChange={(val) => field.onChange(val ? parseInt(val) : undefined)}
                        value={field.value?.toString() || ""}
                      >
                        <FormControl>
                          <SelectTrigger className="h-11">
                            <SelectValue placeholder="Assign to someone..." />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {taskUsers.map((user) => (
                            <SelectItem key={user.id} value={user.id.toString()}>
                              <div className="flex items-center gap-3">
                                <Avatar className="size-6">
                                  <AvatarImage src={user.avatar} />
                                  <AvatarFallback className="text-[10px] bg-muted">
                                    {user.initials}
                                  </AvatarFallback>
                                </Avatar>
                                <span>{user.name}</span>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormDescription>
                        Who will be responsible for this task
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="dueDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Due Date</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <IconCalendar className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                          <Input
                            type="date"
                            className="h-11 pl-10"
                            {...field}
                          />
                        </div>
                      </FormControl>
                      <FormDescription>
                        When should this task be completed
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="estimatedHours"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Estimated Hours</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <IconClock className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                        <Input
                          type="number"
                          min="0"
                          step="0.5"
                          placeholder="0"
                          className="h-11 pl-10 max-w-[200px]"
                          {...field}
                          value={field.value ?? ""}
                        />
                      </div>
                    </FormControl>
                    <FormDescription>
                      Estimated time to complete (optional)
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="flex items-center justify-end gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate("/tasks")}
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
                  {isEditing ? "Save Changes" : "Create Task"}
                </>
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}

export default TaskForm;
