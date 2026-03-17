import { Link } from "react-router";
import { IconArrowRight } from "@tabler/icons-react";
import AppLogo from "@/components/AppLogo";
import { Button } from "@/components/ui/button";
import Hero from "./Hero";
import Feature from "./Feature";
import ThemeToggle from "@/components/ThemeToggle";
import About from "./About";

const Home = () => {
  return (
    <div className="min-h-screen bg-background overflow-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b bg-background/80 backdrop-blur-lg animate-fade-in-down">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <AppLogo size="sm" asLink={false} />
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Button
              asChild
              className="shadow-sm hover:scale-105 transition-all"
            >
              <Link to="/login" className="gap-2">
                Sign In
                <IconArrowRight className="size-4" />
              </Link>
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <Hero />

      {/* Features Section */}
      <Feature />

      {/* About Section */}
      <About />

      {/* Footer */}
      <footer className="py-8 px-4 border-t animate-fade-in">
        <div className="container mx-auto text-center text-sm text-muted-foreground">
          <p>
            © {new Date().getFullYear()} TeamNest. A portfolio project built
            with React, shadcn/ui, Spring Boot, and PostgreSQL.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
