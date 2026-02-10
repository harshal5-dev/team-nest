import { IconChecklist, IconSparkles } from "@tabler/icons-react";
import { cn } from "@/lib/utils";

export function Tasks() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
      {/* Icon */}
      <div 
        className={cn(
          "relative p-5 rounded-2xl mb-6",
          "bg-gradient-to-br from-violet-500/20 to-purple-500/20",
          "border border-violet-500/20"
        )}
      >
        <IconChecklist className="size-10 text-violet-500" />
        <div className="absolute -top-1 -right-1 p-1 rounded-full bg-primary">
          <IconSparkles className="size-3 text-white" />
        </div>
      </div>

      {/* Title */}
      <h2 className="text-2xl font-bold mb-2">Tasks</h2>
      
      {/* Badge */}
      <span className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
        Coming Soon
      </span>
      
      {/* Description */}
      <p className="text-muted-foreground max-w-md mb-6">
        Task management is under development. Soon you'll be able to create, assign, 
        and track tasks with your team.
      </p>

      {/* Feature List */}
      <div className="grid gap-3 text-sm text-left max-w-xs">
        {[
          "Create and organize tasks",
          "Assign tasks to team members",
          "Set due dates and priorities",
          "Track progress with kanban boards",
        ].map((feature, index) => (
          <div 
            key={index} 
            className="flex items-center gap-2 text-muted-foreground"
          >
            <div className="size-1.5 rounded-full bg-primary" />
            {feature}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Tasks;
