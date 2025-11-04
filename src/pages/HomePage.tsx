import Window from "@/components/desktop/Window";
import Dock from "@/components/desktop/Dock";
import { useWindows } from "@/stores/windows";
import { useEffect } from "react";

export default function HomePage() {
  const { open } = useWindows();

  useEffect(() => {
    // Open About by default the first time
    open("about");
  }, [open]);

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-background to-muted/30 relative">
      {/* Windows layer */}
      <Window id="about">
        <div className="space-y-2">
          <h2 className="text-lg font-semibold">Hello, I’m mzx</h2>
          <p className="text-sm opacity-80">
            Replace this text with your personal intro. Keep it short and friendly.
          </p>
        </div>
      </Window>
      <Window id="projects">
        <ul className="list-disc pl-5 space-y-1">
          <li>Project A — short description</li>
          <li>Project B — short description</li>
          <li>Project C — short description</li>
        </ul>
      </Window>
      <Window id="contact">
        <div className="space-y-2">
          <p>Email: you@example.com</p>
          <p>GitHub: github.com/yourname</p>
        </div>
      </Window>

      {/* Dock */}
      <Dock />
    </div>
  );
}
