import { useState } from "react";
import { Brain, Eye, Wind, Heart, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

type ExerciseType = "grounding" | "breathing" | "gratitude" | null;

export default function ExercisesSection() {
  const [activeExercise, setActiveExercise] = useState<ExerciseType>(null);
  const [gratitudeItems, setGratitudeItems] = useState(["", "", ""]);

  const closeExercise = () => {
    setActiveExercise(null);
    setGratitudeItems(["", "", ""]);
  };

  const updateGratitudeItem = (index: number, value: string) => {
    const newItems = [...gratitudeItems];
    newItems[index] = value;
    setGratitudeItems(newItems);
  };

  const renderGroundingExercise = () => (
    <div className="text-center">
      <div className="w-16 h-16 bg-sage/20 rounded-full flex items-center justify-center mx-auto mb-4">
        <Eye className="text-sage text-2xl" size={32} />
      </div>
      <h3 className="text-xl font-semibold mb-4">5-4-3-2-1 Grounding</h3>
      <div className="text-left space-y-3">
        <p>
          <strong>5 things you can see:</strong>
          <br />
          <small className="text-gray-500">Look around and name them</small>
        </p>
        <p>
          <strong>4 things you can touch:</strong>
          <br />
          <small className="text-gray-500">Feel different textures</small>
        </p>
        <p>
          <strong>3 things you can hear:</strong>
          <br />
          <small className="text-gray-500">Listen carefully</small>
        </p>
        <p>
          <strong>2 things you can smell:</strong>
          <br />
          <small className="text-gray-500">Take a deep breath</small>
        </p>
        <p>
          <strong>1 thing you can taste:</strong>
          <br />
          <small className="text-gray-500">Notice any lingering tastes</small>
        </p>
      </div>
    </div>
  );

  const renderBreathingExercise = () => (
    <div className="text-center">
      <div className="w-16 h-16 bg-soft-blue/20 rounded-full flex items-center justify-center mx-auto mb-4">
        <Wind className="text-soft-blue text-2xl" size={32} />
      </div>
      <h3 className="text-xl font-semibold mb-4">Box Breathing</h3>
      <div className="text-center">
        <div className="w-24 h-24 border-4 border-soft-blue rounded-lg mx-auto mb-4 transition-all duration-1000"></div>
        <p className="text-lg font-medium mb-4">Follow the rhythm:</p>
        <div className="space-y-2 text-sm">
          <p>1. Breathe in for 4 counts</p>
          <p>2. Hold for 4 counts</p>
          <p>3. Breathe out for 4 counts</p>
          <p>4. Hold for 4 counts</p>
        </div>
        <p className="text-gray-500 dark:text-gray-300 mt-4 text-sm">Repeat this cycle several times until you feel calm.</p>
      </div>
    </div>
  );

  const renderGratitudeExercise = () => (
    <div className="text-center">
      <div className="w-16 h-16 bg-peach/20 rounded-full flex items-center justify-center mx-auto mb-4">
        <Heart className="text-orange-400 text-2xl" size={32} />
      </div>
      <h3 className="text-xl font-semibold mb-4">Gratitude Moment</h3>
      <div className="space-y-4">
        <p className="text-gray-600 dark:text-gray-300">Take a moment to reflect on three things you're grateful for today:</p>
        <div className="space-y-3">
          {gratitudeItems.map((item, index) => (
            <Input
              key={index}
              type="text"
              placeholder="I'm grateful for..."
              value={item}
              onChange={(e) => updateGratitudeItem(index, e.target.value)}
              className="w-full p-3 border border-gray-200 rounded-lg"
            />
          ))}
        </div>
        <p className="text-sm text-gray-500 dark:text-gray-300">
          Take a deep breath and let these feelings of gratitude fill your heart.
        </p>
      </div>
    </div>
  );

  return (
    <section className="py-6">
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-lavender/10 dark:border-gray-700 animate-slide-up">
        <div className="text-center mb-6">
          <div className="w-12 h-12 bg-peach rounded-full flex items-center justify-center mx-auto mb-3">
            <Brain className="text-sage text-lg" size={20} />
          </div>
          <h2 className="text-2xl font-semibold text-text-soft dark:text-white mb-2">Mindful Exercises</h2>
          <p className="text-gray-500 dark:text-gray-300">Ground yourself with awareness techniques</p>
        </div>

        {/* Exercise Cards */}
        <div className="space-y-4">
          {/* 5-4-3-2-1 Grounding */}
          <div className="exercise-card rounded-xl p-5 text-white">
            <h3 className="font-semibold mb-2 flex items-center">
              <Eye className="mr-2" size={20} />
              5-4-3-2-1 Grounding
            </h3>
            <p className="text-white/90 mb-4 text-sm">
              Name 5 things you see, 4 you can touch, 3 you hear, 2 you smell, 1 you taste.
            </p>
            <Button
              onClick={() => setActiveExercise("grounding")}
              className="bg-white/20 hover:bg-white/30 text-white px-6 py-2 rounded-lg font-medium transition-all duration-200 backdrop-blur-sm"
            >
              Start Exercise
            </Button>
          </div>

          {/* Breathing Exercise */}
          <div className="bg-gradient-to-br from-lavender to-peach rounded-xl p-5 text-text-soft">
            <h3 className="font-semibold mb-2 flex items-center">
              <Wind className="mr-2" size={20} />
              Box Breathing
            </h3>
            <p className="text-text-soft/80 mb-4 text-sm">
              Breathe in for 4, hold for 4, out for 4, hold for 4. Repeat and find your calm.
            </p>
            <Button
              onClick={() => setActiveExercise("breathing")}
              className="bg-white hover:bg-gray-50 text-text-soft px-6 py-2 rounded-lg font-medium transition-all duration-200 shadow-sm"
            >
              Begin Breathing
            </Button>
          </div>

          {/* Gratitude Moment */}
          <div className="bg-gradient-to-br from-peach to-soft-blue rounded-xl p-5 text-text-soft">
            <h3 className="font-semibold mb-2 flex items-center">
              <Heart className="mr-2" size={20} />
              Gratitude Moment
            </h3>
            <p className="text-text-soft/80 mb-4 text-sm">
              Take a moment to think of three things you're grateful for today.
            </p>
            <Button
              onClick={() => setActiveExercise("gratitude")}
              className="bg-white hover:bg-gray-50 text-text-soft px-6 py-2 rounded-lg font-medium transition-all duration-200 shadow-sm"
            >
              Practice Gratitude
            </Button>
          </div>
        </div>

        {/* Exercise Modal */}
        <Dialog open={activeExercise !== null} onOpenChange={() => closeExercise()}>
          <DialogContent className="max-w-md mx-4 rounded-2xl">
            <DialogHeader>
              <DialogTitle className="sr-only">Mindfulness Exercise</DialogTitle>
            </DialogHeader>
            <div className="p-4">
              {activeExercise === "grounding" && renderGroundingExercise()}
              {activeExercise === "breathing" && renderBreathingExercise()}
              {activeExercise === "gratitude" && renderGratitudeExercise()}
              <Button
                onClick={closeExercise}
                className="mt-6 bg-gray-200 hover:bg-gray-300 text-text-soft px-6 py-2 rounded-lg font-medium transition-all duration-200 w-full"
              >
                Close
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
}
