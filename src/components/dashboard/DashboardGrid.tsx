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
    <div className="w-full min-h-screen bg-white dark:bg-gray-900">
      <div className="w-[80%] mx-auto px-8 py-6 flex gap-12">
        {/* Quick Access - Left */}
        <div className="w-64">
          <QuickAccessWidget
            folders={folders}
            onFolderClick={onFolderClick}
            onAddFolder={onAddFolder}
          />
        </div>

        {/* Todo Section - Center */}
        <div className="flex-1">
          <TodoWidget
            todos={todos}
            onAddTodo={onAddTodo}
            onDeleteTodo={onDeleteTodo}
            onToggleTodo={onToggleTodo}
            onReorderTodos={onReorderTodos}
          />
        </div>

        {/* Recent Links - Right */}
        <div className="w-64">
          <RecentLinksWidget links={links} />
        </div>
      </div>
    </div>
  );
};

export default DashboardGrid;
