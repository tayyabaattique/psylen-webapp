import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/components/theme-provider";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggleTheme}
      className="w-10 h-10 p-0 rounded-full bg-lavender/20 hover:bg-lavender/30 dark:bg-gray-800 dark:hover:bg-gray-700 transition-all duration-200"
    >
      {theme === "light" ? (
        <Moon className="w-5 h-5 text-sage dark:text-soft-blue" />
      ) : (
        <Sun className="w-5 h-5 text-orange-400" />
      )}
    </Button>
  );
}