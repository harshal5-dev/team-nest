import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { 
  getTasks, deleteTask, 
  TaskStatus, TaskPriority, taskProjects, taskUsers 
} from "@/api/taskApi";
import { cn } from "@/lib/utils";
import { 
  IconPlus, IconDots, IconChecklist, IconClock, IconEdit, IconTrash 
} from "@tabler/icons-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { 
  PageHeader, 
  PageHeaderHeading, 
  PageHeaderTitle, 
  PageHeaderDescription,
  PageHeaderActions 
} from "@/components/ui/page-header";
import { SearchInput, FilterSelect } from "@/components/ui/search-filter";
import { EmptyState } from "@/components/ui/empty-state";

export function Tasks() {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProjectId, setSelectedProjectId] = useState("all");

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const response = await getTasks();
      if (response.success) {
        setTasks(response.data);
      }
    } catch (error) {
      toast.error("Failed to load tasks");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteTask(id);
      setTasks((prev) => prev.filter((t) => t.id !== id));
      toast.success("Task deleted successfully");
    } catch (error) {
      toast.error("Failed to delete task");
    }
  };

  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.description?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesProject = selectedProjectId === "all" || task.projectId.toString() === selectedProjectId;
    
    return matchesSearch && matchesProject;
  });

  const columns = [
    { id: TaskStatus.TODO, title: "To Do", color: "bg-muted text-muted-foreground border-border" },
    { id: TaskStatus.IN_PROGRESS, title: "In Progress", color: "bg-info/10 text-info border-info/20" },
    { id: TaskStatus.IN_REVIEW, title: "In Review", color: "bg-primary/10 text-primary border-primary/20" },
    { id: TaskStatus.COMPLETED, title: "Completed", color: "bg-success/10 text-success border-success/20" },
  ];

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)] gap-6">
      {/* Header */}
      <PageHeader>
        <PageHeaderHeading icon={IconChecklist}>
          <PageHeaderTitle>Tasks</PageHeaderTitle>
          <PageHeaderDescription>Manage and track your team's work</PageHeaderDescription>
        </PageHeaderHeading>
        
        <PageHeaderActions className="flex-wrap">
          <FilterSelect
            value={selectedProjectId}
            onChange={setSelectedProjectId}
            placeholder="All Projects"
            options={[
              { value: "all", label: "All Projects" },
              ...taskProjects.map(p => ({ value: p.id.toString(), label: p.name }))
            ]}
          />
          <SearchInput 
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Search tasks..."
          />
          <Button onClick={() => navigate("/tasks/new")} size="sm">
            <IconPlus className="mr-1.5 size-4" />
            New Task
          </Button>
        </PageHeaderActions>
      </PageHeader>

      {/* Board */}
      <ScrollArea className="flex-1 -mx-4 px-4 md:-mx-6 md:px-6">
        <div className="flex gap-4 min-w-[1000px] pb-6">
          {columns.map((column) => (
            <div key={column.id} className="flex-1 flex flex-col gap-3 min-w-[280px]">
              {/* Column Header */}
              <div className="flex items-center justify-between px-1">
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className={cn("rounded-md px-2.5 py-1 text-xs font-medium", column.color)}>
                    {column.title}
                  </Badge>
                  <span className="flex size-5 items-center justify-center rounded-full bg-muted text-[10px] font-medium text-muted-foreground">
                    {filteredTasks.filter(t => t.status === column.id).length}
                  </span>
                </div>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="size-7 text-muted-foreground hover:text-foreground"
                  onClick={() => navigate("/tasks/new")}
                >
                  <IconPlus className="size-3.5" />
                </Button>
              </div>

              {/* Tasks List */}
              <div className="flex flex-col gap-2.5">
                {filteredTasks
                  .filter(t => t.status === column.id)
                  .map(task => (
                    <TaskCard 
                      key={task.id} 
                      task={task} 
                      onEdit={() => navigate(`/tasks/${task.id}/edit`)}
                      onDelete={() => handleDelete(task.id)}
                    />
                  ))}
                  
                {filteredTasks.filter(t => t.status === column.id).length === 0 && (
                  <EmptyState
                    icon={IconChecklist}
                    title="No tasks"
                    description="Drop tasks here or create a new one"
                    className="py-8 border-dashed"
                  />
                )}
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}

function TaskCard({ task, onEdit, onDelete }) {
  const priorityColors = {
    [TaskPriority.LOW]: "text-muted-foreground bg-muted border-border",
    [TaskPriority.MEDIUM]: "text-info bg-info/10 border-info/20",
    [TaskPriority.HIGH]: "text-pending bg-pending/10 border-pending/20",
    [TaskPriority.URGENT]: "text-destructive bg-destructive/10 border-destructive/20",
  };

  return (
    <Card className="overflow-hidden transition-all duration-200 hover:shadow-md hover:border-primary/20 group">
      <CardContent className="p-3.5 flex flex-col gap-2.5">
        <div className="flex items-start justify-between gap-2">
          <Badge 
            variant="secondary" 
            className="px-2 py-0.5 h-5 text-[10px] font-medium truncate max-w-[140px]"
          >
            {task.project?.name || "No Project"}
          </Badge>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="ghost" 
                size="icon" 
                className="size-6 -mr-1.5 -mt-0.5 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <IconDots className="size-3.5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-32">
              <DropdownMenuItem onClick={onEdit}>
                <IconEdit className="mr-2 size-3.5" /> Edit
              </DropdownMenuItem>
              <DropdownMenuItem className="text-destructive focus:text-destructive" onClick={onDelete}>
                <IconTrash className="mr-2 size-3.5" /> Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="space-y-1">
          <h3 className="font-medium text-sm leading-snug">{task.title}</h3>
          {task.description && (
            <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">{task.description}</p>
          )}
        </div>

        <div className="flex items-center justify-between pt-0.5">
          <div className="flex items-center gap-2">
            <Avatar className="size-6 border border-background">
              <AvatarImage src={task.assignee?.avatar} />
              <AvatarFallback className="text-[10px] bg-muted">{task.assignee?.initials || "?"}</AvatarFallback>
            </Avatar>
            {task.dueDate && (
              <div className="flex items-center gap-1 text-[10px] text-muted-foreground">
                <IconClock className="size-3" />
                {new Date(task.dueDate).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
              </div>
            )}
          </div>
          
          <Badge 
            variant="outline"
            className={cn("h-5 px-1.5 text-[10px] font-medium", priorityColors[task.priority])}
          >
            {task.priority || "Normal"}
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
}

export default Tasks;
