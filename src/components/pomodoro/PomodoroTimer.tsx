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
    <div className="w-full min-h-screen bg-background">
      <div className="max-w-sm mx-auto p-6 space-y-8">
        <div className="space-y-1">
          <h1 className="text-2xl font-semibold tracking-tight text-foreground text-center">
            {isBreak ? "Break Time" : "Focus Time"}
          </h1>
          <p className="text-sm text-accent text-center">
            {isBreak ? "Take a short break" : "Stay focused on your task"}
          </p>
        </div>

        <div className="aspect-square relative flex items-center justify-center bg-card/50 rounded-full border border-border/50">
          <div className="absolute inset-2">
            <div
              className="w-full h-full rounded-full transition-all duration-200"
              style={{
                background: `conic-gradient(hsl(var(--primary)) ${progress}%, transparent ${progress}%)`,
              }}
            />
          </div>
          <div className="relative z-10">
            <span className="text-5xl font-mono tabular-nums font-medium text-foreground">
              {formatTime(timeLeft)}
            </span>
          </div>
        </div>

        <div className="flex justify-center gap-3">
          <Button
            variant="outline"
            size="icon"
            className="h-9 w-9 rounded-full hover:bg-background/80"
            onClick={resetTimer}
          >
            <RotateCcw className="h-4 w-4" />
          </Button>
          <Button
            size="icon"
            className="h-9 w-9 rounded-full"
            onClick={toggleTimer}
            variant={isRunning ? "outline" : "default"}
          >
            {isRunning ? (
              <Pause className="h-4 w-4" />
            ) : (
              <Play className="h-4 w-4" />
            )}
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="h-9 w-9 rounded-full hover:bg-background/80"
          >
            <Settings className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PomodoroTimer;
