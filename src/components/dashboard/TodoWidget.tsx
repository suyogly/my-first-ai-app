import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { GripVertical, Plus, X } from "lucide-react";
import { Input } from "@/components/ui/input";

export interface TodoItem {
  id: string;
  text: string;
  completed: boolean;
}

interface TodoWidgetProps {
  todos?: TodoItem[];
  onAddTodo?: (text: string) => void;
  onDeleteTodo?: (id: string) => void;
  onToggleTodo?: (id: string) => void;
  onReorderTodos?: (startIndex: number, endIndex: number) => void;
}

const defaultTodos: TodoItem[] = [
  { id: "1", text: "Review project documentation", completed: false },
  { id: "2", text: "Update team meeting notes", completed: true },
  { id: "3", text: "Prepare presentation slides", completed: false },
  { id: "4", text: "Send weekly progress report", completed: false },
];

const TodoWidget: React.FC<TodoWidgetProps> = ({
  todos = defaultTodos,
  onAddTodo = () => {},
  onDeleteTodo = () => {},
  onToggleTodo = () => {},
  onReorderTodos = () => {},
}) => {
  const [newTodoText, setNewTodoText] = useState("");
  const [draggedItem, setDraggedItem] = useState<number | null>(null);

  const handleAddTodo = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTodoText.trim()) {
      onAddTodo(newTodoText.trim());
      setNewTodoText("");
    }
  };

  const handleDragStart = (index: number) => {
    setDraggedItem(index);
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    if (draggedItem === null) return;

    if (draggedItem !== index) {
      onReorderTodos(draggedItem, index);
      setDraggedItem(index);
    }
  };

  const activeTodos = todos.filter((todo) => !todo.completed);
  const completedTodos = todos.filter((todo) => todo.completed);

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h1 className="text-4xl font-bold tracking-tight">Tasks</h1>
        <p className="text-muted-foreground">
          {activeTodos.length} tasks remaining
        </p>
      </div>

      <form onSubmit={handleAddTodo} className="flex items-center space-x-2">
        <Input
          type="text"
          value={newTodoText}
          onChange={(e) => setNewTodoText(e.target.value)}
          placeholder="Add a new task..."
          className="flex-1 text-lg h-12 bg-transparent border-0 border-b rounded-none focus-visible:ring-0 focus-visible:border-black px-0"
        />
        <Button
          type="submit"
          variant="ghost"
          size="icon"
          className="h-8 w-8 rounded-full hover:bg-gray-100"
        >
          <Plus className="h-5 w-5" />
        </Button>
      </form>

      <div className="space-y-6">
        {/* Active Todos */}
        <div className="space-y-1">
          {activeTodos.map((todo, index) => (
            <div
              key={todo.id}
              className="group flex items-center py-1"
              draggable
              onDragStart={() => handleDragStart(index)}
              onDragOver={(e) => handleDragOver(e, index)}
              onDragEnd={() => setDraggedItem(null)}
            >
              <button
                className="mr-2 cursor-grab opacity-0 group-hover:opacity-100 transition-opacity"
                aria-label="Drag to reorder"
              >
                <GripVertical className="h-4 w-4 text-gray-400" />
              </button>

              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => onToggleTodo(todo.id)}
                className="mr-3 h-4 w-4 rounded-full border-2 border-gray-300 text-black focus:ring-0"
              />

              <span className="flex-1 text-base">{todo.text}</span>

              <Button
                variant="ghost"
                size="icon"
                className="opacity-0 group-hover:opacity-100 transition-opacity h-8 w-8 rounded-full"
                onClick={() => onDeleteTodo(todo.id)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>

        {/* Completed Todos */}
        {completedTodos.length > 0 && (
          <div className="space-y-1">
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Completed
            </h3>
            {completedTodos.map((todo) => (
              <div key={todo.id} className="group flex items-center py-1">
                <div className="w-6" /> {/* Spacer for alignment */}
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => onToggleTodo(todo.id)}
                  className="mr-3 h-4 w-4 rounded-full border-2 border-gray-300 checked:bg-gray-400 checked:border-gray-400 focus:ring-0"
                />
                <span className="flex-1 text-base text-gray-400 line-through">
                  {todo.text}
                </span>
                <Button
                  variant="ghost"
                  size="icon"
                  className="opacity-0 group-hover:opacity-100 transition-opacity h-8 w-8 rounded-full"
                  onClick={() => onDeleteTodo(todo.id)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TodoWidget;
