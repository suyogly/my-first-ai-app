import React, { useState, useEffect } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Home, FolderOpen, BookOpen, Timer, Sun, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/components/theme-provider";

interface TabNavProps {
  activeTab?: string;
  onTabChange?: (value: string) => void;
}

const TabNav = ({
  activeTab = "home",
  onTabChange = () => {},
}: TabNavProps) => {
  const [time, setTime] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const { setTheme, theme } = useTheme();

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = now.getHours().toString().padStart(2, "0");
      const minutes = now.getMinutes().toString().padStart(2, "0");
      setTime(`${hours}:${minutes}`);

      // Update date
      const options: Intl.DateTimeFormatOptions = {
        weekday: "long",
        month: "long",
        day: "numeric",
      };
      setDate(now.toLocaleDateString("en-US", options));
    };

    updateTime(); // Initial call
    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full bg-background border-b border-border/40">
      {/* Theme Toggle */}
      <div className="absolute top-4 left-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="rounded-full w-8 h-8"
        >
          {theme === "dark" ? (
            <Sun className="h-4 w-4" />
          ) : (
            <Moon className="h-4 w-4" />
          )}
        </Button>
      </div>

      <div className="flex flex-col items-center py-8 space-y-6">
        {/* Digital Clock */}
        <div className="digital-clock">
          <div className="time">{time}</div>
          <div className="date">{date}</div>
        </div>

        {/* Tabs */}
        <Tabs
          defaultValue={activeTab}
          className="w-full max-w-md"
          onValueChange={onTabChange}
        >
          <TabsList className="w-full h-11 grid grid-cols-4 gap-1 bg-card p-1 rounded-full border border-border/50">
            <TabsTrigger
              value="home"
              className="data-[state=active]:bg-background rounded-full flex items-center gap-2 transition-all data-[state=active]:text-primary data-[state=active]:shadow-sm"
            >
              <Home className="h-4 w-4" />
              <span className="text-sm">Home</span>
            </TabsTrigger>

            <TabsTrigger
              value="site-manager"
              className="data-[state=active]:bg-background rounded-full flex items-center gap-2 transition-all data-[state=active]:text-primary data-[state=active]:shadow-sm"
            >
              <FolderOpen className="h-4 w-4" />
              <span className="text-sm">Folders</span>
            </TabsTrigger>

            <TabsTrigger
              value="session-manager"
              className="data-[state=active]:bg-background rounded-full flex items-center gap-2 transition-all data-[state=active]:text-primary data-[state=active]:shadow-sm"
            >
              <BookOpen className="h-4 w-4" />
              <span className="text-sm">Sessions</span>
            </TabsTrigger>

            <TabsTrigger
              value="pomodoro"
              className="data-[state=active]:bg-background rounded-full flex items-center gap-2 transition-all data-[state=active]:text-primary data-[state=active]:shadow-sm"
            >
              <Timer className="h-4 w-4" />
              <span className="text-sm">Pomodoro</span>
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
    </div>
  );
};

export default TabNav;
