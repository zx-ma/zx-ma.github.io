import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { aboutContent } from "@/config/home";

export function AboutTab() {
  return (
    <ScrollArea className="h-full px-4 py-6">
      <div className="space-y-6">
        <section className="space-y-2">
          <h2 className="text-2xl font-semibold">Hello, I’m mzx</h2>
          <p className="text-sm leading-relaxed text-muted-foreground">
            {aboutContent.intro}
          </p>
        </section>
        <Separator />
        <section className="space-y-3">
          <h3 className="text-sm font-medium uppercase tracking-wide text-muted-foreground">
            Currently
          </h3>
          <ul className="space-y-2 text-sm">
            {aboutContent.currently.map((item) => (
              <li key={item}>• {item}</li>
            ))}
          </ul>
        </section>
      </div>
    </ScrollArea>
  );
}
