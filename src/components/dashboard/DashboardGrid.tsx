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
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Main Todo Section */}
        <div className="mb-8">
          <TodoWidget
            todos={todos}
            onAddTodo={onAddTodo}
            onDeleteTodo={onDeleteTodo}
            onToggleTodo={onToggleTodo}
            onReorderTodos={onReorderTodos}
          />
        </div>

        {/* Quick Access and Recent Links in a grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <QuickAccessWidget
            folders={folders}
            onFolderClick={onFolderClick}
            onAddFolder={onAddFolder}
          />
          <RecentLinksWidget links={links} />
        </div>
      </div>
    </div>
  );
};

export default DashboardGrid;
