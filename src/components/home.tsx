import React, { useState } from "react";
import TabNav from "./navigation/TabNav";
import DashboardGrid from "./dashboard/DashboardGrid";
import SiteManager from "./site-manager/SiteManager";
import SessionManager from "./session-manager/SessionManager";
import PomodoroTimer from "./pomodoro/PomodoroTimer";
import { TodoItem } from "./dashboard/TodoWidget";
import { QuickAccessFolder } from "./dashboard/QuickAccessWidget";
import { RecentLink } from "./dashboard/RecentLinksWidget";

interface HomeProps {
  activeTab?: string;
  onTabChange?: (value: string) => void;
}

const Home = ({ activeTab = "home", onTabChange = () => {} }: HomeProps) => {
  const [currentTab, setCurrentTab] = useState(activeTab);
  const [folders, setFolders] = useState<QuickAccessFolder[]>([
    { id: "1", name: "Work", linkCount: 12 },
    { id: "2", name: "Personal", linkCount: 8 },
    { id: "3", name: "Research", linkCount: 15 },
    { id: "4", name: "Reading List", linkCount: 6 },
    { id: "5", name: "Projects", linkCount: 10 },
    { id: "6", name: "Learning", linkCount: 9 },
  ]);

  const [todos, setTodos] = useState<TodoItem[]>([
    { id: "1", text: "Review project documentation", completed: false },
    { id: "2", text: "Update team meeting notes", completed: true },
    { id: "3", text: "Prepare presentation slides", completed: false },
    { id: "4", text: "Send weekly progress report", completed: false },
  ]);

  const [links, setLinks] = useState<RecentLink[]>([
    {
      id: "1",
      title: "Getting Started with React",
      url: "https://react.dev",
      timestamp: "2 hours ago",
    },
    {
      id: "2",
      title: "Tailwind CSS Documentation",
      url: "https://tailwindcss.com/docs",
      timestamp: "3 hours ago",
    },
    {
      id: "3",
      title: "ShadcnUI Components",
      url: "https://ui.shadcn.com",
      timestamp: "5 hours ago",
    },
  ]);

  const handleFolderClick = (folderId: string) => {
    // Navigate to folder contents or open folder view
    console.log("Folder clicked:", folderId);
  };

  const handleAddFolder = () => {
    const newFolder: QuickAccessFolder = {
      id: `folder-${Date.now()}`,
      name: `New Folder ${folders.length + 1}`,
      linkCount: 0,
    };
    setFolders([...folders, newFolder]);
  };

  const handleAddTodo = (text: string) => {
    const newTodo: TodoItem = {
      id: `todo-${Date.now()}`,
      text,
      completed: false,
    };
    setTodos([...todos, newTodo]);
  };

  const handleDeleteTodo = (id: string) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const handleToggleTodo = (id: string) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo,
      ),
    );
  };

  const handleReorderTodos = (startIndex: number, endIndex: number) => {
    const newTodos = [...todos];
    const [removed] = newTodos.splice(startIndex, 1);
    newTodos.splice(endIndex, 0, removed);
    setTodos(newTodos);
  };

  const handleTabChange = (value: string) => {
    setCurrentTab(value);
    onTabChange(value);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <TabNav activeTab={currentTab} onTabChange={handleTabChange} />

      <main className="flex-1 overflow-auto">
        {currentTab === "home" && (
          <DashboardGrid
            folders={folders}
            todos={todos}
            links={links}
            onFolderClick={handleFolderClick}
            onAddFolder={handleAddFolder}
            onAddTodo={handleAddTodo}
            onDeleteTodo={handleDeleteTodo}
            onToggleTodo={handleToggleTodo}
            onReorderTodos={handleReorderTodos}
          />
        )}
        {currentTab === "site-manager" && <SiteManager />}
        {currentTab === "session-manager" && <SessionManager />}
        {currentTab === "pomodoro" && <PomodoroTimer />}
      </main>
    </div>
  );
};

export default Home;
