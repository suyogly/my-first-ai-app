import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Play, Pause, RotateCcw, Settings } from "lucide-react";

const PomodoroTimer = () => {
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [isBreak, setIsBreak] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (isRunning && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsBreak(!isBreak);
      setTimeLeft(isBreak ? 25 * 60 : 5 * 60);
      setIsRunning(false);
    }

    return () => clearInterval(timer);
  }, [isRunning, timeLeft, isBreak]);

  const toggleTimer = () => setIsRunning(!isRunning);
  const resetTimer = () => {
    setTimeLeft(25 * 60);
    setIsRunning(false);
    setIsBreak(false);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const progress = isBreak
    ? ((5 * 60 - timeLeft) / (5 * 60)) * 100
    : ((25 * 60 - timeLeft) / (25 * 60)) * 100;

  return (
    <div className="w-full min-h-screen bg-white dark:bg-gray-900 p-8">
      <div className="max-w-xl mx-auto space-y-12">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold tracking-tight">
            {isBreak ? "Break Time" : "Focus Time"}
          </h1>
          <p className="text-muted-foreground">
            {isBreak ? "Take a short break" : "Stay focused on your task"}
          </p>
        </div>

        <div className="aspect-square max-w-md mx-auto relative flex items-center justify-center bg-gray-50 dark:bg-gray-800 rounded-full">
          <div className="absolute inset-4">
            <div
              className="w-full h-full rounded-full transition-all duration-200"
              style={{
                background: `conic-gradient(rgb(0 0 0 / 0.1) ${progress}%, transparent ${progress}%)`,
              }}
            />
          </div>
          <div className="relative z-10">
            <span className="text-7xl font-mono tabular-nums font-medium">
              {formatTime(timeLeft)}
            </span>
          </div>
        </div>

        <div className="flex justify-center gap-4">
          <Button
            variant="outline"
            size="icon"
            className="h-12 w-12 rounded-full"
            onClick={resetTimer}
          >
            <RotateCcw className="h-5 w-5" />
          </Button>
          <Button
            size="icon"
            className="h-12 w-12 rounded-full"
            onClick={toggleTimer}
            variant={isRunning ? "outline" : "default"}
          >
            {isRunning ? (
              <Pause className="h-5 w-5" />
            ) : (
              <Play className="h-5 w-5" />
            )}
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="h-12 w-12 rounded-full"
          >
            <Settings className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PomodoroTimer;
