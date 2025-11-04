import { ScrollArea } from "@/components/ui/scroll-area";
import { projectsContent } from "@/data/home";

export function ProjectsTab() {
  return (
    <ScrollArea className="h-full px-4 py-6" id="projects">
      <div className="space-y-6">
        <section className="space-y-2">
          <h2 className="text-2xl font-semibold">Selected Projects</h2>
          <p className="text-sm text-muted-foreground">
            Highlight a few things you're proud of. Link to live demos or blog posts for deeper dives.
          </p>
        </section>
        <div className="space-y-4">
          {projectsContent.map((project) => (
            <article
              key={project.title}
              className="rounded-lg border bg-background/60 p-4 shadow-xs"
            >
              <h3 className="text-base font-semibold">{project.title}</h3>
              <p className="text-sm text-muted-foreground">
                {project.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </ScrollArea>
  );
}
