import React, { useState, useEffect } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Home, FolderOpen, BookOpen, Timer } from "lucide-react";

interface TabNavProps {
  activeTab?: string;
  onTabChange?: (value: string) => void;
}

const TabNav = ({
  activeTab = "home",
  onTabChange = () => {},
}: TabNavProps) => {
  const [time, setTime] = useState<string>("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = now.getHours().toString().padStart(2, "0");
      const minutes = now.getMinutes().toString().padStart(2, "0");
      setTime(`${hours}:${minutes}`);
    };

    updateTime(); // Initial call
    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full bg-white border-b">
      <div className="flex flex-col items-center py-6 space-y-4">
        {/* Digital Clock */}
        <div className="text-4xl font-mono font-medium tracking-wider text-gray-800">
          {time}
        </div>

        {/* Tabs */}
        <Tabs
          defaultValue={activeTab}
          className="w-full max-w-md"
          onValueChange={onTabChange}
        >
          <TabsList className="w-full h-12 grid grid-cols-4 gap-4 bg-gray-50 p-1 rounded-full">
            <TabsTrigger
              value="home"
              className="data-[state=active]:bg-white rounded-full flex items-center gap-2 transition-all"
            >
              <Home className="h-4 w-4" />
              <span className="text-sm">Home</span>
            </TabsTrigger>

            <TabsTrigger
              value="site-manager"
              className="data-[state=active]:bg-white rounded-full flex items-center gap-2 transition-all"
            >
              <FolderOpen className="h-4 w-4" />
              <span className="text-sm">Folders</span>
            </TabsTrigger>

            <TabsTrigger
              value="session-manager"
              className="data-[state=active]:bg-white rounded-full flex items-center gap-2 transition-all"
            >
              <BookOpen className="h-4 w-4" />
              <span className="text-sm">Sessions</span>
            </TabsTrigger>

            <TabsTrigger
              value="pomodoro"
              className="data-[state=active]:bg-white rounded-full flex items-center gap-2 transition-all"
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
