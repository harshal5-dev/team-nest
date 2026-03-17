import { cn } from "@/lib/utils";
import {
  IconChecklist,
  IconFolder,
  IconShieldCheck,
  IconUsers,
} from "@tabler/icons-react";

const features = [
  {
    icon: IconUsers,
    title: "Team Management",
    description:
      "Organize your team members, roles, and permissions across multiple workspaces.",
    color: "from-success to-success/80",
  },
  {
    icon: IconFolder,
    title: "Project Tracking",
    description:
      "Create and manage projects with real-time collaboration and progress tracking.",
    color: "from-info to-info/80",
  },
  {
    icon: IconChecklist,
    title: "Task Management",
    description:
      "Break down work into tasks, assign team members, and track completion.",
    color: "from-primary to-primary/80",
  },
  {
    icon: IconShieldCheck,
    title: "Multi-Tenant Security",
    description:
      "Secure data isolation between organizations with role-based access control.",
    color: "from-warning to-warning/80",
  },
];

const Feature = () => {
  return (
    <section className="py-20 px-4 bg-muted/30">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4 animate-fade-in-up">
            Features
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto animate-fade-in-up animation-delay-100">
            Everything you need to manage your team and projects efficiently
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                className={cn(
                  "group relative p-6 rounded-2xl bg-background border border-border/50",
                  "hover:border-border hover:shadow-lg transition-all duration-300",
                  "hover:-translate-y-1 animate-fade-in-up",
                )}
                style={{ animationDelay: `${200 + index * 100}ms` }}
              >
                <div
                  className={cn(
                    "inline-flex items-center justify-center size-12 rounded-xl mb-4",
                    "bg-linear-to-br shadow-lg group-hover:scale-110 transition-transform duration-300",
                    feature.color,
                  )}
                >
                  <Icon className="size-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Feature;
