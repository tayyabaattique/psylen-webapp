import { useRef, useEffect, useState } from "react";
import { PaintbrushVertical, Eraser, Download, Palette, SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

export default function DoodleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [color, setColor] = useState("#9CAF88");
  const [brushSize, setBrushSize] = useState(3);
  const { toast } = useToast();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = 300;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
    return () => window.removeEventListener("resize", resizeCanvas);
  }, []);

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    setIsDrawing(true);
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    let clientX, clientY;

    if ("touches" in e) {
      e.preventDefault();
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }

    ctx.beginPath();
    ctx.moveTo(clientX - rect.left, clientY - rect.top);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    let clientX, clientY;

    if ("touches" in e) {
      e.preventDefault();
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }

    ctx.lineTo(clientX - rect.left, clientY - rect.top);
    ctx.strokeStyle = color;
    ctx.lineWidth = brushSize;
    ctx.lineCap = "round";
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    toast({
      title: "Canvas cleared",
      description: "Your drawing has been cleared.",
    });
  };

  const saveDrawing = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const link = document.createElement("a");
    link.download = `psylen-doodle-${new Date().getTime()}.png`;
    link.href = canvas.toDataURL();
    link.click();
    
    toast({
      title: "Drawing saved",
      description: "Your doodle has been downloaded successfully.",
    });
  };

  return (
    <section className="py-6">
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-lavender/10 dark:border-gray-700 animate-slide-up">
        <div className="text-center mb-6">
          <div className="w-12 h-12 bg-peach rounded-full flex items-center justify-center mx-auto mb-3">
            <PaintbrushVertical className="text-sage text-lg" size={20} />
          </div>
          <h2 className="text-2xl font-semibold text-text-soft dark:text-white mb-2">Express Yourself</h2>
          <p className="text-gray-500 dark:text-gray-300">Let your creativity flow freely on the canvas</p>
        </div>

        {/* Canvas Container */}
        <div className="bg-white dark:bg-gray-700 rounded-2xl border-2 border-dashed border-lavender/30 dark:border-gray-600 p-4 mb-6">
          <canvas
            ref={canvasRef}
            className="drawing-canvas w-full bg-white dark:bg-gray-600 rounded-xl"
            width={400}
            height={300}
            onMouseDown={startDrawing}
            onMouseMove={draw}
            onMouseUp={stopDrawing}
            onMouseOut={stopDrawing}
            onTouchStart={startDrawing}
            onTouchMove={draw}
            onTouchEnd={stopDrawing}
          />
        </div>

        {/* Drawing Tools */}
        <div className="flex flex-wrap gap-3 mb-4">
          <div className="flex items-center space-x-2 bg-lavender/20 rounded-full px-4 py-2">
            <Palette className="text-sage" size={16} />
            <input
              type="color"
              value={color}
              onChange={(e) => setColor(e.target.value)}
              className="w-6 h-6 rounded border-none"
            />
          </div>
          <div className="flex items-center space-x-2 bg-soft-blue/20 rounded-full px-4 py-2">
            <SlidersHorizontal className="text-sage" size={16} />
            <input
              type="range"
              min="1"
              max="20"
              value={brushSize}
              onChange={(e) => setBrushSize(Number(e.target.value))}
              className="w-16"
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-3">
          <Button
            onClick={clearCanvas}
            variant="outline"
            className="flex-1 bg-gray-200 hover:bg-gray-300 text-text-soft py-3 px-4 rounded-xl font-medium transition-all duration-200 border-0"
          >
            <Eraser className="w-4 h-4 mr-2" />
            Clear
          </Button>
          <Button
            onClick={saveDrawing}
            className="flex-1 bg-gradient-to-r from-sage to-soft-blue hover:shadow-lg text-white py-3 px-4 rounded-xl font-medium transition-all duration-200"
          >
            <Download className="w-4 h-4 mr-2" />
            Save
          </Button>
        </div>
      </div>
    </section>
  );
}
