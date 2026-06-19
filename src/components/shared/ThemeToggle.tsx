import { Sun, Moon } from "lucide-react";
import { useTheme } from "@/hooks/useTheme";

export const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();
  return (
    <button
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
      className="
        inline-flex items-center justify-center
        w-9 h-9 rounded-md
        border border-border
        bg-surface-container-lowest
        text-on-surface-variant
        hover:text-on-surface
        hover:bg-surface-container
        transition-colors duration-150
      "
    >
      {theme === "dark"
        ? <Sun className="w-4 h-4" strokeWidth={1.75} />
        : <Moon className="w-4 h-4" strokeWidth={1.75} />
      }
    </button>
  );
};
