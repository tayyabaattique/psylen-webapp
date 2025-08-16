import { PaintbrushVertical, FeatherIcon, Brain } from "lucide-react";
import { Button } from "@/components/ui/button";

type ActiveSection = "doodle" | "journal" | "exercises";

interface BottomNavigationProps {
  activeSection: ActiveSection;
  onSectionChange: (section: ActiveSection) => void;
}

export default function BottomNavigation({ activeSection, onSectionChange }: BottomNavigationProps) {
  const navItems = [
    {
      id: "doodle" as const,
      icon: PaintbrushVertical,
      label: "Doodle",
    },
    {
      id: "journal" as const,
      icon: FeatherIcon,
      label: "Journal",
    },
    {
      id: "exercises" as const,
      icon: Brain,
      label: "Exercises",
    },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-lavender/20 z-40">
      <div className="max-w-lg mx-auto px-4">
        <div className="flex justify-around py-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            
            return (
              <Button
                key={item.id}
                onClick={() => onSectionChange(item.id)}
                variant="ghost"
                className={`flex-1 py-3 px-2 text-center transition-all duration-200 rounded-xl mx-1 flex flex-col items-center space-y-1 ${
                  isActive
                    ? "tab-active text-text-soft"
                    : "text-gray-500 hover:text-text-soft"
                }`}
              >
                <Icon size={20} />
                <span className="text-xs font-medium">{item.label}</span>
              </Button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
