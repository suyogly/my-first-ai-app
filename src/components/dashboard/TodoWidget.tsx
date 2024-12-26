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
    <div className="space-y-4">
      <div className="space-y-1">
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">
          Tasks
        </h1>
        <p className="text-sm text-muted-foreground">
          {activeTodos.length} tasks remaining
        </p>
      </div>

      <form onSubmit={handleAddTodo} className="flex items-center space-x-2">
        <Input
          type="text"
          value={newTodoText}
          onChange={(e) => setNewTodoText(e.target.value)}
          placeholder="Add a new task..."
          className="flex-1 h-9 bg-transparent border-0 border-b rounded-none focus-visible:ring-0 focus-visible:border-primary px-0 text-sm"
        />
        <Button
          type="submit"
          variant="ghost"
          size="icon"
          className="h-7 w-7 rounded-full hover:bg-background/80"
        >
          <Plus className="h-4 w-4" />
        </Button>
      </form>

      <div className="space-y-4">
        {/* Active Todos */}
        <div className="space-y-0.5">
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
                <GripVertical className="h-3.5 w-3.5 text-muted-foreground" />
              </button>

              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => onToggleTodo(todo.id)}
                className="mr-2 h-3.5 w-3.5 rounded-sm border border-muted-foreground text-primary focus:ring-primary"
              />

              <span className="flex-1 text-sm text-foreground">
                {todo.text}
              </span>

              <Button
                variant="ghost"
                size="icon"
                className="opacity-0 group-hover:opacity-100 transition-opacity h-6 w-6 rounded-full hover:bg-background/80"
                onClick={() => onDeleteTodo(todo.id)}
              >
                <X className="h-3.5 w-3.5" />
              </Button>
            </div>
          ))}
        </div>

        {/* Completed Todos */}
        {completedTodos.length > 0 && (
          <div className="space-y-0.5">
            <h3 className="text-xs font-medium text-muted-foreground mb-2">
              Completed
            </h3>
            {completedTodos.map((todo) => (
              <div key={todo.id} className="group flex items-center py-1">
                <div className="w-5" /> {/* Spacer for alignment */}
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => onToggleTodo(todo.id)}
                  className="mr-2 h-3.5 w-3.5 rounded-sm border border-muted-foreground checked:bg-muted-foreground checked:border-muted-foreground focus:ring-0"
                />
                <span className="flex-1 text-sm text-muted-foreground line-through">
                  {todo.text}
                </span>
                <Button
                  variant="ghost"
                  size="icon"
                  className="opacity-0 group-hover:opacity-100 transition-opacity h-6 w-6 rounded-full hover:bg-background/80"
                  onClick={() => onDeleteTodo(todo.id)}
                >
                  <X className="h-3.5 w-3.5" />
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
