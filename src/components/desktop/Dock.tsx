import { useWindows } from "@/stores/windows";
import { Briefcase, Mail, User } from "lucide-react";

const apps = [
  { id: "about", label: "About", Icon: User },
  { id: "projects", label: "Projects", Icon: Briefcase },
  { id: "contact", label: "Contact", Icon: Mail },
] as const;

export default function Dock() {
  const { open, windows, activeId } = useWindows();
  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 rounded-2xl border border-foreground/10 bg-background/70 backdrop-blur px-3 py-2 shadow-lg">
      <div className="flex items-center gap-3">
        {apps.map(({ id, label, Icon }) => (
          <button
            key={id}
            className="group flex flex-col items-center gap-1 px-2 py-1 rounded-md hover:bg-foreground/5"
            onClick={() => open(id)}
          >
            <div
              style={{ viewTransitionName: `app-${id}` }}
              className="flex items-center justify-center"
            >
              <Icon
                className={
                  "size-6 transition-transform group-hover:scale-110 " +
                  (activeId === id || windows[id].visible ? "text-primary" : "text-foreground")
                }
              />
            </div>
            <span className="text-[10px] text-foreground/80">{label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
