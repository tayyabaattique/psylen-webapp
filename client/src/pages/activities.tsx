import { useState } from "react";
import { Sprout, ArrowLeft } from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import ThemeToggle from "@/components/theme-toggle";
import DoodleCanvas from "@/components/doodle-canvas";
import JournalSection from "@/components/journal-section";
import ExercisesSection from "@/components/exercises-section";
import BottomNavigation from "@/components/bottom-navigation";

type ActiveSection = "doodle" | "journal" | "exercises";

export default function Activities() {
  const [activeSection, setActiveSection] = useState<ActiveSection>("doodle");

  return (
    <div className="bg-warm-gray dark:bg-gray-900 font-inter text-text-soft dark:text-gray-100 min-h-screen transition-colors duration-300">
      {/* Header */}
      <header className="bg-white dark:bg-gray-900 shadow-sm sticky top-0 z-50 border-b border-lavender/20 dark:border-gray-700">
        <div className="max-w-lg mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/">
              <Button variant="ghost" className="text-sage hover:text-sage/80 dark:text-soft-blue dark:hover:text-soft-blue/80 p-2">
                <ArrowLeft size={20} />
              </Button>
            </Link>
            
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-lavender to-sage rounded-full flex items-center justify-center">
                <Sprout className="text-white text-sm" size={16} />
              </div>
              <h1 className="text-xl font-semibold text-text-soft dark:text-white">Psylen</h1>
            </div>
            
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-lg mx-auto px-4 pb-20">
        <div className="animate-fade-in">
          {activeSection === "doodle" && <DoodleCanvas />}
          {activeSection === "journal" && <JournalSection />}
          {activeSection === "exercises" && <ExercisesSection />}
        </div>
      </main>

      {/* Bottom Navigation */}
      <BottomNavigation activeSection={activeSection} onSectionChange={setActiveSection} />
    </div>
  );
}