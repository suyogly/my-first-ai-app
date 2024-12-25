import React from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Home, FolderOpen, BookOpen, Timer } from "lucide-react";

interface TabNavProps {
  activeTab?: string;
  onTabChange?: (value: string) => void;
}

const TabNav = ({
  activeTab = "home",
  onTabChange = () => {},
}: TabNavProps) => {
  return (
    <div className="w-full bg-white border-b">
      <Tabs
        defaultValue={activeTab}
        className="w-full"
        onValueChange={onTabChange}
      >
        <TabsList className="w-full h-16 justify-start gap-2 bg-transparent border-b">
          <TabsTrigger
            value="home"
            className="flex items-center gap-2 px-4 py-2 data-[state=active]:bg-primary/5"
          >
            <Home className="h-5 w-5" />
            <span className="hidden sm:inline">Home</span>
          </TabsTrigger>

          <TabsTrigger
            value="site-manager"
            className="flex items-center gap-2 px-4 py-2 data-[state=active]:bg-primary/5"
          >
            <FolderOpen className="h-5 w-5" />
            <span className="hidden sm:inline">Site Manager</span>
          </TabsTrigger>

          <TabsTrigger
            value="session-manager"
            className="flex items-center gap-2 px-4 py-2 data-[state=active]:bg-primary/5"
          >
            <BookOpen className="h-5 w-5" />
            <span className="hidden sm:inline">Session Manager</span>
          </TabsTrigger>

          <TabsTrigger
            value="pomodoro"
            className="flex items-center gap-2 px-4 py-2 data-[state=active]:bg-primary/5"
          >
            <Timer className="h-5 w-5" />
            <span className="hidden sm:inline">Pomodoro</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="home">
          {/* Content rendered by parent */}
        </TabsContent>
        <TabsContent value="site-manager">
          {/* Content rendered by parent */}
        </TabsContent>
        <TabsContent value="session-manager">
          {/* Content rendered by parent */}
        </TabsContent>
        <TabsContent value="pomodoro">
          {/* Content rendered by parent */}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TabNav;
