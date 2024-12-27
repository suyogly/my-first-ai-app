import React from "react";
import QuickAccessWidget, { QuickAccessFolder } from "./QuickAccessWidget";
import QuickLinksWidget, { QuickLink } from "./QuickLinksWidget";
import TodoWidget, { TodoItem } from "./TodoWidget";

interface DashboardGridProps {
  folders?: QuickAccessFolder[];
  todos?: TodoItem[];
  links?: QuickLink[];
  onFolderClick?: (folderId: string) => void;
  onAddFolder?: () => void;
  onAddLinks?: (folderId: string) => void;
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
  onAddLinks = () => {},
  onAddTodo = () => {},
  onDeleteTodo = () => {},
  onToggleTodo = () => {},
  onReorderTodos = () => {},
}: DashboardGridProps) => {
  return (
    <div className="w-full min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 py-6 flex flex-wrap justify-center gap-6">
        {/* Quick Access - Left */}
        <div className="w-72 min-w-[280px] shrink bg-card/50 p-6 rounded-xl border border-border/50">
          <QuickAccessWidget
            folders={folders}
            onFolderClick={onFolderClick}
            onAddFolder={onAddFolder}
            onAddLinks={onAddLinks}
          />
        </div>

        {/* Todo Section - Center */}
        <div className="w-[400px] min-w-[380px] bg-card/50 p-6 rounded-xl border border-border/50">
          <TodoWidget
            todos={todos}
            onAddTodo={onAddTodo}
            onDeleteTodo={onDeleteTodo}
            onToggleTodo={onToggleTodo}
            onReorderTodos={onReorderTodos}
          />
        </div>

        {/* Quick Links - Right */}
        <div className="w-72 min-w-[280px] shrink bg-card/50 p-6 rounded-xl border border-border/50">
          <QuickLinksWidget links={links} />
        </div>
      </div>
    </div>
  );
};

export default DashboardGrid;
