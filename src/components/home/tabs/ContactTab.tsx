import { ScrollArea } from "@/components/ui/scroll-area";
import { contactContent } from "@/config/home";

export function ContactTab() {
  return (
    <ScrollArea className="h-full px-4 py-6">
      <div className="space-y-6">
        <section className="space-y-2">
          <h2 className="text-2xl font-semibold">Stay in touch</h2>
          <p className="text-sm text-muted-foreground">{contactContent.intro}</p>
        </section>
        <div className="space-y-4 text-sm">
          {contactContent.entries.map((entry) => (
            <div
              key={entry.label}
              className="rounded-lg border bg-background/60 p-4 shadow-xs"
            >
              <h3 className="font-semibold">{entry.label}</h3>
              <p className="text-muted-foreground">{entry.value}</p>
            </div>
          ))}
        </div>
      </div>
    </ScrollArea>
  );
}
