import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { BookOpen, Clock, Plus, ChevronRight } from "lucide-react";

interface ReadingSession {
  id: string;
  title: string;
  url: string;
  progress: number;
  lastRead: string;
  topic: string;
}

const SessionManager = () => {
  const [sessions, setSessions] = useState<ReadingSession[]>([
    {
      id: "1",
      title: "Understanding React Hooks",
      url: "https://react.dev/learn/hooks-overview",
      progress: 45,
      lastRead: "2 hours ago",
      topic: "React",
    },
    {
      id: "2",
      title: "Advanced TypeScript Patterns",
      url: "https://typescript-handbook.com",
      progress: 30,
      lastRead: "1 day ago",
      topic: "TypeScript",
    },
  ]);

  return (
    <div className="w-full min-h-screen bg-background">
      <div className="max-w-3xl mx-auto p-6 space-y-6">
        <div className="space-y-1">
          <h1 className="text-2xl font-semibold tracking-tight text-foreground">
            Reading Sessions
          </h1>
          <p className="text-sm text-accent">
            Track your reading progress across different topics
          </p>
        </div>

        <div className="flex justify-end">
          <Button
            onClick={() => {
              const title = prompt("Enter session title");
              const url = prompt("Enter article URL");
              const topic = prompt("Enter topic");
              if (title && url && topic) {
                setSessions([
                  ...sessions,
                  {
                    id: Date.now().toString(),
                    title,
                    url,
                    progress: 0,
                    lastRead: "Just now",
                    topic,
                  },
                ]);
              }
            }}
            variant="outline"
            size="sm"
            className="gap-1.5 hover:bg-background/80"
          >
            <Plus className="h-3.5 w-3.5" /> New Session
          </Button>
        </div>

        <div className="space-y-3">
          {sessions.map((session) => (
            <div
              key={session.id}
              className="group hover:bg-card/50 rounded-md p-3 -mx-3 border border-transparent hover:border-border/50 transition-all"
            >
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <div className="flex items-center gap-1.5">
                    <ChevronRight className="h-3.5 w-3.5 text-accent" />
                    <h3 className="text-sm font-medium hover:text-primary cursor-pointer">
                      {session.title}
                    </h3>
                  </div>
                  <p className="text-xs text-accent">{session.url}</p>
                  <div className="flex items-center gap-3 text-xs text-accent">
                    <span className="flex items-center gap-1">
                      <BookOpen className="h-3 w-3" /> {session.topic}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" /> {session.lastRead}
                    </span>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="opacity-0 group-hover:opacity-100 transition-opacity h-7 rounded-full text-xs hover:bg-background/80"
                  onClick={() => window.open(session.url, "_blank")}
                >
                  Resume
                </Button>
              </div>
              <div className="mt-3 space-y-1">
                <div className="flex justify-between text-xs text-accent">
                  <span>Progress</span>
                  <span>{session.progress}%</span>
                </div>
                <Progress value={session.progress} className="h-1" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SessionManager;
