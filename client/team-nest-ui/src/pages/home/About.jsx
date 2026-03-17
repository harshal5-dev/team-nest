import { IconBrandGithub, IconBrandLinkedin } from "@tabler/icons-react";

const About = () => {
  return (
    <section className="py-20 px-4">
      <div className="container mx-auto max-w-4xl text-center">
        <h2 className="text-3xl font-bold mb-4 animate-fade-in-up">
          About This Project
        </h2>
        <p className="text-muted-foreground mb-8 max-w-2xl mx-auto animate-fade-in-up animation-delay-100">
          TeamNest is a full-stack portfolio project demonstrating proficiency
          in building modern, scalable web applications. It features a React
          frontend with Spring Boot backend, PostgreSQL database, and showcases
          multi-tenant architecture with secure data isolation.
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
  );
};

export default About;
