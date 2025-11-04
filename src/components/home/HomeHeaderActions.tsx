import { Button } from "@/components/ui/button";
import { Mail, Github } from "lucide-react";

export function HomeHeaderActions() {
  return (
    <div className="flex items-center gap-2 text-xs text-muted-foreground">
      <Button variant="ghost" size="sm" asChild>
        <a href="mailto:zhexuanma@gmail.com" className="gap-2">
          <Mail className="size-4" />
          Email
        </a>
      </Button>
      <Button variant="ghost" size="sm" asChild>
        <a href="https://github.com/zx-ma" target="_blank" rel="noreferrer" className="gap-2">
          <Github className="size-4" />
          GitHub
        </a>
      </Button>
    </div>
  );
}
