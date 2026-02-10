import { Link } from "react-router";
import { 
  IconUsers, 
  IconFolder, 
  IconChecklist, 
  IconArrowRight,
  IconBrandGithub,
  IconBrandLinkedin,
  IconShieldCheck,
  IconRocket,
  IconSparkles,
  IconSun,
  IconMoon,
} from "@tabler/icons-react";
import { cn } from "@/lib/utils";
import { useTheme } from "@/components/ThemeProvider";
import AppLogo from "@/components/AppLogo";

const features = [
  {
    icon: IconUsers,
    title: "Team Management",
    description: "Organize your team members, roles, and permissions across multiple workspaces.",
    color: "from-emerald-500 to-teal-500",
  },
  {
    icon: IconFolder,
    title: "Project Tracking",
    description: "Create and manage projects with real-time collaboration and progress tracking.",
    color: "from-blue-500 to-cyan-500",
  },
  {
    icon: IconChecklist,
    title: "Task Management",
    description: "Break down work into tasks, assign team members, and track completion.",
    color: "from-violet-500 to-purple-500",
  },
  {
    icon: IconShieldCheck,
    title: "Multi-Tenant Security",
    description: "Secure data isolation between organizations with role-based access control.",
    color: "from-orange-500 to-amber-500",
  },
];

const techStack = {
  frontend: ["React 19", "Vite", "Tailwind CSS", "shadcn/ui"],
  backend: ["Spring Boot", "Java", "PostgreSQL"],
};

function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="relative inline-flex items-center justify-center size-9 rounded-lg hover:bg-accent transition-colors"
      aria-label="Toggle theme"
    >
      <IconSun className="size-5 rotate-0 scale-100 transition-all duration-300 dark:-rotate-90 dark:scale-0" />
      <IconMoon className="absolute size-5 rotate-90 scale-0 transition-all duration-300 dark:rotate-0 dark:scale-100" />
    </button>
  );
}

export function Home() {
  return (
    <div className="min-h-screen bg-background overflow-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b bg-background/80 backdrop-blur-lg animate-fade-in-down">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <AppLogo size="sm" asLink={false} />
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Link 
              to="/login" 
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-all shadow-sm hover:scale-105"
            >
              Sign In
              <IconArrowRight className="size-4" />
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 relative">
        {/* Animated background gradient */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute top-20 left-1/4 size-96 bg-primary/20 rounded-full blur-3xl animate-blob" />
          <div className="absolute top-40 right-1/4 size-96 bg-violet-500/20 rounded-full blur-3xl animate-blob animation-delay-2000" />
          <div className="absolute bottom-20 left-1/3 size-96 bg-cyan-500/10 rounded-full blur-3xl animate-blob animation-delay-4000" />
        </div>

        <div className="container mx-auto text-center max-w-4xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6 animate-fade-in-up animation-delay-100">
            <IconSparkles className="size-4 animate-pulse" />
            Portfolio Project
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 animate-fade-in-up animation-delay-200">
            Collaborate with your team in{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-violet-500 to-primary bg-[length:200%_auto] animate-gradient">
              one place
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto animate-fade-in-up animation-delay-300">
            TeamNest is a multi-tenant collaboration platform that helps teams organize projects, 
            manage tasks, and work together seamlessly. Built as a portfolio demonstration of modern web development.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12 animate-fade-in-up animation-delay-400">
            <Link 
              to="/login" 
              className="group inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-all shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 hover:scale-105"
            >
              <IconRocket className="size-5" />
              Try Demo
            </Link>
            <a 
              href="https://github.com/harshal5-dev/team-nest" 
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-border text-foreground font-medium hover:bg-accent transition-colors"
            >
              <IconBrandGithub className="size-5" />
              View Source
            </a>
          </div>

          {/* Tech Stack */}
          <div className="flex flex-col gap-4 animate-fade-in-up animation-delay-500">
            <div className="flex flex-wrap items-center justify-center gap-2">
              <span className="text-sm text-muted-foreground font-medium">Frontend:</span>
              {techStack.frontend.map((tech) => (
                <span 
                  key={tech}
                  className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm hover:bg-primary/20 transition-colors cursor-default"
                >
                  {tech}
                </span>
              ))}
            </div>
            <div className="flex flex-wrap items-center justify-center gap-2">
              <span className="text-sm text-muted-foreground font-medium">Backend:</span>
              {techStack.backend.map((tech) => (
                <span 
                  key={tech}
                  className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-sm hover:bg-emerald-500/20 transition-colors cursor-default"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 animate-fade-in-up">Features</h2>
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
                    "hover:-translate-y-1 animate-fade-in-up"
                  )}
                  style={{ animationDelay: `${200 + index * 100}ms` }}
                >
                  <div 
                    className={cn(
                      "inline-flex items-center justify-center size-12 rounded-xl mb-4",
                      "bg-gradient-to-br shadow-lg group-hover:scale-110 transition-transform duration-300",
                      feature.color
                    )}
                  >
                    <Icon className="size-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold mb-4 animate-fade-in-up">About This Project</h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto animate-fade-in-up animation-delay-100">
            TeamNest is a full-stack portfolio project demonstrating proficiency in building modern, 
            scalable web applications. It features a React frontend with Spring Boot backend, 
            PostgreSQL database, and showcases multi-tenant architecture with secure data isolation.
          </p>
          
          <div className="inline-flex items-center gap-4 animate-fade-in-up animation-delay-200">
            <a 
              href="https://github.com/harshal5-dev/team-nest" 
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-accent transition-all hover:scale-105"
            >
              <IconBrandGithub className="size-5" />
              GitHub
            </a>
            <a 
              href="https://www.linkedin.com/in/harshal-ganbote" 
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-accent transition-all hover:scale-105"
            >
              <IconBrandLinkedin className="size-5" />
              LinkedIn
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t animate-fade-in">
        <div className="container mx-auto text-center text-sm text-muted-foreground">
          <p>
            © {new Date().getFullYear()} TeamNest. A portfolio project built with React, shadcn/ui, Spring Boot, and PostgreSQL.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default Home;
