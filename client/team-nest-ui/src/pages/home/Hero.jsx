import { Button } from "@/components/ui/button";
import { IconBrandGithub, IconRocket, IconSparkles } from "@tabler/icons-react";
import { Link } from "react-router";

const techStack = {
  frontend: ["React 19", "Vite", "Tailwind CSS", "shadcn/ui"],
  backend: ["Spring Boot", "Java", "PostgreSQL"],
};

const Hero = () => {
  return (
    <section className="pt-32 pb-20 px-4 relative">
      {/* Animated background gradient */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-20 left-1/4 size-96 bg-primary/20 rounded-full blur-3xl animate-blob" />
        <div className="absolute top-40 right-1/4 size-96 bg-info/20 rounded-full blur-3xl animate-blob animation-delay-2000" />
        <div className="absolute bottom-20 left-1/3 size-96 bg-success/10 rounded-full blur-3xl animate-blob animation-delay-4000" />
      </div>

      <div className="container mx-auto text-center max-w-4xl">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6 animate-fade-in-up animation-delay-100">
          <IconSparkles className="size-4 animate-pulse" />
          Portfolio Project
        </div>

        <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 animate-fade-in-up animation-delay-200">
          Collaborate with your team in{" "}
          <span className="text-transparent bg-clip-text bg-linear-to-r from-primary via-violet-500 to-primary bg-size-[200%_auto] animate-gradient">
            one place
          </span>
        </h1>

        <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto animate-fade-in-up animation-delay-300">
          TeamNest is a multi-tenant collaboration platform that helps teams
          organize projects, manage tasks, and work together seamlessly. Built
          as a portfolio demonstration of modern web development.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12 animate-fade-in-up animation-delay-400">
          <Button
            asChild
            size="lg"
            className="group shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 hover:scale-105 transition-all"
          >
            <Link to="/login" className="gap-2">
              <IconRocket className="size-5" />
              Try Demo
            </Link>
          </Button>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="hover:bg-accent transition-colors"
          >
            <a
              href="https://github.com/harshal5-dev/team-nest"
              target="_blank"
              rel="noopener noreferrer"
              className="gap-2"
            >
              <IconBrandGithub className="size-5" />
              View Source
            </a>
          </Button>
        </div>

        {/* Tech Stack */}
        <div className="flex flex-col gap-4 animate-fade-in-up animation-delay-500">
          <div className="flex flex-wrap items-center justify-center gap-2">
            <span className="text-sm text-muted-foreground font-medium">
              Frontend:
            </span>
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
            <span className="text-sm text-muted-foreground font-medium">
              Backend:
            </span>
            {techStack.backend.map((tech) => (
              <span
                key={tech}
                className="px-3 py-1 rounded-full bg-success/10 text-success text-sm hover:bg-success/20 transition-colors cursor-default"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
