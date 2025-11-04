import { Button } from "@/components/ui/button";
import { useTheme } from "@/hooks/use-theme";
import { Moon, Sun } from "lucide-react";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <Button
      variant="ghost"
      size="sm"
      type="button"
      onClick={toggleTheme}
      className="gap-2"
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
    >
      {isDark ? <Moon className="size-4" /> : <Sun className="size-4" />}
      <span className="hidden md:inline">{isDark ? "Dark" : "Light"} mode</span>
    </Button>
  );
}
