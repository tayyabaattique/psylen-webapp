import { useState, useEffect } from "react";
import { Brain, Eye, Wind, Heart, X, Timer, AlertCircle, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

type ExerciseType = "grounding" | "breathing" | "gratitude" | "stress-breathing" | "panic-breathing" | "anxiety-breathing" | null;

export default function ExercisesSection() {
  const [activeExercise, setActiveExercise] = useState<ExerciseType>(null);
  const [gratitudeItems, setGratitudeItems] = useState(["", "", ""]);
  const [groundingInputs, setGroundingInputs] = useState({
    see: ["", "", "", "", ""],
    touch: ["", "", "", ""],
    hear: ["", "", ""],
    smell: ["", ""],
    taste: [""]
  });
  const [breathingTimer, setBreathingTimer] = useState(0);
  const [breathingPhase, setBreathingPhase] = useState("inhale");
  const [isTimerActive, setIsTimerActive] = useState(false);

  const closeExercise = () => {
    setActiveExercise(null);
    setGratitudeItems(["", "", ""]);
    setGroundingInputs({
      see: ["", "", "", "", ""],
      touch: ["", "", "", ""],
      hear: ["", "", ""],
      smell: ["", ""],
      taste: [""]
    });
    setIsTimerActive(false);
    setBreathingTimer(0);
    setBreathingPhase("inhale");
  };

  const updateGratitudeItem = (index: number, value: string) => {
    const newItems = [...gratitudeItems];
    newItems[index] = value;
    setGratitudeItems(newItems);
  };

  const updateGroundingInput = (category: keyof typeof groundingInputs, index: number, value: string) => {
    setGroundingInputs(prev => ({
      ...prev,
      [category]: prev[category].map((item, i) => i === index ? value : item)
    }));
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isTimerActive) {
      interval = setInterval(() => {
        setBreathingTimer(prev => {
          const newTime = prev + 1;
          
          // Box breathing: 4 seconds each phase
          if (activeExercise === "breathing") {
            if (newTime <= 4) setBreathingPhase("inhale");
            else if (newTime <= 8) setBreathingPhase("hold");
            else if (newTime <= 12) setBreathingPhase("exhale");
            else if (newTime <= 16) setBreathingPhase("hold");
            else {
              setBreathingPhase("inhale");
              return 1;
            }
          }
          // 4-7-8 breathing for anxiety
          else if (activeExercise === "anxiety-breathing") {
            if (newTime <= 4) setBreathingPhase("inhale");
            else if (newTime <= 11) setBreathingPhase("hold");
            else if (newTime <= 19) setBreathingPhase("exhale");
            else {
              setBreathingPhase("inhale");
              return 1;
            }
          }
          // Quick coherent breathing for stress
          else if (activeExercise === "stress-breathing") {
            if (newTime <= 5) setBreathingPhase("inhale");
            else if (newTime <= 10) setBreathingPhase("exhale");
            else {
              setBreathingPhase("inhale");
              return 1;
            }
          }
          // Fast calming breath for panic
          else if (activeExercise === "panic-breathing") {
            if (newTime <= 3) setBreathingPhase("inhale");
            else if (newTime <= 6) setBreathingPhase("exhale");
            else {
              setBreathingPhase("inhale");
              return 1;
            }
          }
          
          return newTime;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerActive, activeExercise]);

  const startBreathingTimer = () => {
    setIsTimerActive(true);
    setBreathingTimer(1);
    setBreathingPhase("inhale");
  };

  const stopBreathingTimer = () => {
    setIsTimerActive(false);
    setBreathingTimer(0);
    setBreathingPhase("inhale");
  };

  const renderGroundingExercise = () => (
    <div className="text-center">
      <div className="w-16 h-16 bg-sage/20 rounded-full flex items-center justify-center mx-auto mb-4">
        <Eye className="text-sage text-2xl" size={32} />
      </div>
      <h3 className="text-xl font-semibold mb-4">5-4-3-2-1 Grounding</h3>
      <div className="text-left space-y-4">
        <div>
          <strong className="block mb-2">5 things you can see:</strong>
          <div className="space-y-1">
            {groundingInputs.see.map((item, index) => (
              <Input
                key={index}
                placeholder={`Thing ${index + 1} you can see...`}
                value={item}
                onChange={(e) => updateGroundingInput("see", index, e.target.value)}
                className="text-sm"
              />
            ))}
          </div>
        </div>
        
        <div>
          <strong className="block mb-2">4 things you can touch:</strong>
          <div className="space-y-1">
            {groundingInputs.touch.map((item, index) => (
              <Input
                key={index}
                placeholder={`Thing ${index + 1} you can touch...`}
                value={item}
                onChange={(e) => updateGroundingInput("touch", index, e.target.value)}
                className="text-sm"
              />
            ))}
          </div>
        </div>
        
        <div>
          <strong className="block mb-2">3 things you can hear:</strong>
          <div className="space-y-1">
            {groundingInputs.hear.map((item, index) => (
              <Input
                key={index}
                placeholder={`Thing ${index + 1} you can hear...`}
                value={item}
                onChange={(e) => updateGroundingInput("hear", index, e.target.value)}
                className="text-sm"
              />
            ))}
          </div>
        </div>
        
        <div>
          <strong className="block mb-2">2 things you can smell:</strong>
          <div className="space-y-1">
            {groundingInputs.smell.map((item, index) => (
              <Input
                key={index}
                placeholder={`Thing ${index + 1} you can smell...`}
                value={item}
                onChange={(e) => updateGroundingInput("smell", index, e.target.value)}
                className="text-sm"
              />
            ))}
          </div>
        </div>
        
        <div>
          <strong className="block mb-2">1 thing you can taste:</strong>
          <Input
            placeholder="Thing you can taste..."
            value={groundingInputs.taste[0]}
            onChange={(e) => updateGroundingInput("taste", 0, e.target.value)}
            className="text-sm"
          />
        </div>
      </div>
    </div>
  );

  const renderBreathingExercise = () => {
    const getPhaseText = () => {
      switch (breathingPhase) {
        case "inhale": return "Breathe In";
        case "hold": return "Hold";
        case "exhale": return "Breathe Out";
        default: return "Breathe In";
      }
    };
    
    const getPhaseColor = () => {
      switch (breathingPhase) {
        case "inhale": return "bg-blue-100 border-blue-400";
        case "hold": return "bg-yellow-100 border-yellow-400";
        case "exhale": return "bg-green-100 border-green-400";
        default: return "bg-blue-100 border-blue-400";
      }
    };
    
    return (
      <div className="text-center">
        <div className="w-16 h-16 bg-soft-blue/20 rounded-full flex items-center justify-center mx-auto mb-4">
          <Wind className="text-soft-blue text-2xl" size={32} />
        </div>
        <h3 className="text-xl font-semibold mb-4">Box Breathing</h3>
        <div className="text-center">
          <div className={`w-32 h-32 border-4 rounded-full mx-auto mb-4 transition-all duration-1000 flex items-center justify-center ${getPhaseColor()}`}>
            <div className="text-center">
              <div className="text-2xl font-bold">{breathingTimer || "--"}</div>
              <div className="text-sm font-medium">{getPhaseText()}</div>
            </div>
          </div>
          
          <div className="space-y-2 mb-4">
            <Button
              onClick={isTimerActive ? stopBreathingTimer : startBreathingTimer}
              className={`w-full ${isTimerActive ? 'bg-red-500 hover:bg-red-600' : 'bg-blue-500 hover:bg-blue-600'} text-white`}
            >
              {isTimerActive ? 'Stop' : 'Start'} Timer
            </Button>
          </div>
          
          <div className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
            <p>• Inhale for 4 seconds</p>
            <p>• Hold for 4 seconds</p>
            <p>• Exhale for 4 seconds</p>
            <p>• Hold for 4 seconds</p>
          </div>
        </div>
      </div>
    );
  };

  const renderStressBreathingExercise = () => {
    const getPhaseText = () => {
      switch (breathingPhase) {
        case "inhale": return "Breathe In";
        case "exhale": return "Breathe Out";
        default: return "Breathe In";
      }
    };
    
    return (
      <div className="text-center">
        <div className="w-16 h-16 bg-sage/20 rounded-full flex items-center justify-center mx-auto mb-4">
          <Timer className="text-sage text-2xl" size={32} />
        </div>
        <h3 className="text-xl font-semibold mb-4">Stress Relief Breathing</h3>
        <div className="text-center">
          <div className={`w-32 h-32 border-4 rounded-full mx-auto mb-4 transition-all duration-1000 flex items-center justify-center ${
            breathingPhase === "inhale" ? "bg-green-100 border-green-400" : "bg-blue-100 border-blue-400"
          }`}>
            <div className="text-center">
              <div className="text-2xl font-bold">{breathingTimer || "--"}</div>
              <div className="text-sm font-medium">{getPhaseText()}</div>
            </div>
          </div>
          
          <div className="space-y-2 mb-4">
            <Button
              onClick={isTimerActive ? stopBreathingTimer : startBreathingTimer}
              className={`w-full ${isTimerActive ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'} text-white`}
            >
              {isTimerActive ? 'Stop' : 'Start'} Timer
            </Button>
          </div>
          
          <div className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
            <p>• Inhale slowly for 5 seconds</p>
            <p>• Exhale slowly for 5 seconds</p>
            <p>• Perfect for reducing stress hormones</p>
          </div>
        </div>
      </div>
    );
  };

  const renderAnxietyBreathingExercise = () => {
    const getPhaseText = () => {
      switch (breathingPhase) {
        case "inhale": return "Breathe In";
        case "hold": return "Hold";
        case "exhale": return "Breathe Out";
        default: return "Breathe In";
      }
    };
    
    const getPhaseColor = () => {
      switch (breathingPhase) {
        case "inhale": return "bg-blue-100 border-blue-400";
        case "hold": return "bg-purple-100 border-purple-400";
        case "exhale": return "bg-green-100 border-green-400";
        default: return "bg-blue-100 border-blue-400";
      }
    };
    
    return (
      <div className="text-center">
        <div className="w-16 h-16 bg-lavender/20 rounded-full flex items-center justify-center mx-auto mb-4">
          <AlertCircle className="text-purple-500 text-2xl" size={32} />
        </div>
        <h3 className="text-xl font-semibold mb-4">4-7-8 Anxiety Relief</h3>
        <div className="text-center">
          <div className={`w-32 h-32 border-4 rounded-full mx-auto mb-4 transition-all duration-1000 flex items-center justify-center ${getPhaseColor()}`}>
            <div className="text-center">
              <div className="text-2xl font-bold">{breathingTimer || "--"}</div>
              <div className="text-sm font-medium">{getPhaseText()}</div>
            </div>
          </div>
          
          <div className="space-y-2 mb-4">
            <Button
              onClick={isTimerActive ? stopBreathingTimer : startBreathingTimer}
              className={`w-full ${isTimerActive ? 'bg-red-500 hover:bg-red-600' : 'bg-purple-500 hover:bg-purple-600'} text-white`}
            >
              {isTimerActive ? 'Stop' : 'Start'} Timer
            </Button>
          </div>
          
          <div className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
            <p>• Inhale for 4 seconds</p>
            <p>• Hold for 7 seconds</p>
            <p>• Exhale for 8 seconds</p>
            <p>• Activates natural relaxation response</p>
          </div>
        </div>
      </div>
    );
  };

  const renderPanicBreathingExercise = () => {
    const getPhaseText = () => {
      switch (breathingPhase) {
        case "inhale": return "Breathe In";
        case "exhale": return "Breathe Out";
        default: return "Breathe In";
      }
    };
    
    return (
      <div className="text-center">
        <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Zap className="text-orange-500 text-2xl" size={32} />
        </div>
        <h3 className="text-xl font-semibold mb-4">Quick Panic Relief</h3>
        <div className="text-center">
          <div className={`w-32 h-32 border-4 rounded-full mx-auto mb-4 transition-all duration-500 flex items-center justify-center ${
            breathingPhase === "inhale" ? "bg-red-100 border-red-400" : "bg-blue-100 border-blue-400"
          }`}>
            <div className="text-center">
              <div className="text-2xl font-bold">{breathingTimer || "--"}</div>
              <div className="text-sm font-medium">{getPhaseText()}</div>
            </div>
          </div>
          
          <div className="space-y-2 mb-4">
            <Button
              onClick={isTimerActive ? stopBreathingTimer : startBreathingTimer}
              className={`w-full ${isTimerActive ? 'bg-red-500 hover:bg-red-600' : 'bg-orange-500 hover:bg-orange-600'} text-white`}
            >
              {isTimerActive ? 'Stop' : 'Start'} Timer
            </Button>
          </div>
          
          <div className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
            <p>• Quick 3-second inhale</p>
            <p>• Quick 3-second exhale</p>
            <p>• Helps regain control during panic</p>
            <p>• Focus only on the breathing</p>
          </div>
        </div>
      </div>
    );
  };

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
              Write down 5 things you see, 4 you can touch, 3 you hear, 2 you smell, 1 you taste.
            </p>
            <Button
              onClick={() => setActiveExercise("grounding")}
              className="bg-white/20 hover:bg-white/30 text-white px-6 py-2 rounded-lg font-medium transition-all duration-200 backdrop-blur-sm"
            >
              Start Exercise
            </Button>
          </div>

          {/* Box Breathing */}
          <div className="bg-gradient-to-br from-lavender to-peach rounded-xl p-5 text-text-soft dark:text-white">
            <h3 className="font-semibold mb-2 flex items-center">
              <Wind className="mr-2" size={20} />
              Box Breathing
            </h3>
            <p className="text-text-soft/80 dark:text-white/80 mb-4 text-sm">
              Perfect for general relaxation. Guided timer with 4-4-4-4 rhythm.
            </p>
            <Button
              onClick={() => setActiveExercise("breathing")}
              className="bg-white hover:bg-gray-50 text-text-soft px-6 py-2 rounded-lg font-medium transition-all duration-200 shadow-sm"
            >
              Begin Breathing
            </Button>
          </div>

          {/* Stress Relief Breathing */}
          <div className="bg-gradient-to-br from-sage to-soft-blue rounded-xl p-5 text-white">
            <h3 className="font-semibold mb-2 flex items-center">
              <Timer className="mr-2" size={20} />
              Stress Relief Breathing
            </h3>
            <p className="text-white/90 mb-4 text-sm">
              5-second inhale, 5-second exhale. Helps lower stress hormones.
            </p>
            <Button
              onClick={() => setActiveExercise("stress-breathing")}
              className="bg-white/20 hover:bg-white/30 text-white px-6 py-2 rounded-lg font-medium transition-all duration-200 backdrop-blur-sm"
            >
              Reduce Stress
            </Button>
          </div>

          {/* Anxiety Relief Breathing */}
          <div className="bg-gradient-to-br from-soft-blue to-lavender rounded-xl p-5 text-text-soft dark:text-white">
            <h3 className="font-semibold mb-2 flex items-center">
              <AlertCircle className="mr-2" size={20} />
              4-7-8 Anxiety Relief
            </h3>
            <p className="text-text-soft/80 dark:text-white/80 mb-4 text-sm">
              Inhale 4, hold 7, exhale 8. Activates your natural relaxation response.
            </p>
            <Button
              onClick={() => setActiveExercise("anxiety-breathing")}
              className="bg-white hover:bg-gray-50 text-text-soft px-6 py-2 rounded-lg font-medium transition-all duration-200 shadow-sm"
            >
              Calm Anxiety
            </Button>
          </div>

          {/* Panic Attack Breathing */}
          <div className="bg-gradient-to-br from-peach to-sage rounded-xl p-5 text-white">
            <h3 className="font-semibold mb-2 flex items-center">
              <Zap className="mr-2" size={20} />
              Quick Panic Relief
            </h3>
            <p className="text-white/90 mb-4 text-sm">
              Fast 3-3 breathing pattern to quickly regain control during panic.
            </p>
            <Button
              onClick={() => setActiveExercise("panic-breathing")}
              className="bg-white/20 hover:bg-white/30 text-white px-6 py-2 rounded-lg font-medium transition-all duration-200 backdrop-blur-sm"
            >
              Stop Panic
            </Button>
          </div>

          {/* Gratitude Moment */}
          <div className="bg-gradient-to-br from-peach to-soft-blue rounded-xl p-5 text-text-soft dark:text-white">
            <h3 className="font-semibold mb-2 flex items-center">
              <Heart className="mr-2" size={20} />
              Gratitude Moment
            </h3>
            <p className="text-text-soft/80 dark:text-white/80 mb-4 text-sm">
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
              {activeExercise === "stress-breathing" && renderStressBreathingExercise()}
              {activeExercise === "anxiety-breathing" && renderAnxietyBreathingExercise()}
              {activeExercise === "panic-breathing" && renderPanicBreathingExercise()}
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
