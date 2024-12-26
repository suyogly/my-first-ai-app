import React from "react";
import QuickAccessWidget, { QuickAccessFolder } from "./QuickAccessWidget";
import RecentLinksWidget, { RecentLink } from "./RecentLinksWidget";
import TodoWidget, { TodoItem } from "./TodoWidget";

interface DashboardGridProps {
  folders?: QuickAccessFolder[];
  todos?: TodoItem[];
  links?: RecentLink[];
  onFolderClick?: (folderId: string) => void;
  onAddFolder?: () => void;
  onAddTodo?: (text: string) => void;
  onDeleteTodo?: (id: string) => void;
  onToggleTodo?: (id: string) => void;
  onReorderTodos?: (startIndex: number, endIndex: number) => void;
}

const DashboardGrid = ({
  folders,
  todos,
  links,
  onFolderClick = () => {},
  onAddFolder = () => {},
  onAddTodo = () => {},
  onDeleteTodo = () => {},
  onToggleTodo = () => {},
  onReorderTodos = () => {},
}: DashboardGridProps) => {
  return (
    <div className="w-full min-h-screen bg-background">
      <div className="w-[90%] mx-auto px-8 py-6 flex gap-12">
        {/* Quick Access - Left */}
        <div className="w-72 bg-card/50 p-6 rounded-xl border border-border/50">
          <QuickAccessWidget
            folders={folders}
            onFolderClick={onFolderClick}
            onAddFolder={onAddFolder}
          />
        </div>

        {/* Todo Section - Center */}
        <div className="flex-1 bg-card/50 p-6 rounded-xl border border-border/50">
          <TodoWidget
            todos={todos}
            onAddTodo={onAddTodo}
            onDeleteTodo={onDeleteTodo}
            onToggleTodo={onToggleTodo}
            onReorderTodos={onReorderTodos}
          />
        </div>

        {/* Recent Links - Right */}
        <div className="w-72 bg-card/50 p-6 rounded-xl border border-border/50">
          <RecentLinksWidget links={links} />
        </div>
      </div>
    </div>
  );
};

export default DashboardGrid;
