import { Routes, Route, useRoutes, Navigate } from "react-router-dom";
import Home from "./components/home";
import SiteManager from "./components/site-manager/SiteManager";
import SessionManager from "./components/session-manager/SessionManager";
import PomodoroTimer from "./components/pomodoro/PomodoroTimer";
import TabNav from "./components/navigation/TabNav";

// @ts-ignore
import routes from "tempo-routes";

function App() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <TabNav />

      {/* Tempo routes */}
      {import.meta.env.VITE_TEMPO && useRoutes(routes)}

      <main className="container mx-auto px-4 py-8">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/folders" element={<SiteManager />} />
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
