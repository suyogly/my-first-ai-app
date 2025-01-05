import { Routes, Route, useRoutes, Navigate } from "react-router-dom";
import Home from "./components/home";
import TodoWidget from "./components/dashboard/TodoWidget";
import SessionManager from "./components/session-manager/SessionManager";
import PomodoroTimer from "./components/pomodoro/PomodoroTimer";
import Header from "./components/layout/Header";

// @ts-ignore
import routes from "tempo-routes";

function App() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Persistent Header with Clock, Navigation, and Quick Links */}
      <Header />

      {/* Tempo routes */}
      {import.meta.env.VITE_TEMPO && useRoutes(routes)}

      {/* Main Content Area */}
      <main className="container mx-auto px-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/tasks"
            element={
              <div className="flex justify-center py-6">
                <div className="w-[50%] min-w-[380px] bg-card/50 p-6 rounded-xl border border-border/50">
                  <TodoWidget
                    todos={[]}
                    onAddTodo={() => {}}
                    onDeleteTodo={() => {}}
                    onToggleTodo={() => {}}
                    onReorderTodos={() => {}}
                  />
                </div>
              </div>
            }
          />
          <Route path="/sessions" element={<SessionManager />} />
          <Route path="/pomodoro" element={<PomodoroTimer />} />
          {import.meta.env.VITE_TEMPO && <Route path="/tempobook/*" />}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
