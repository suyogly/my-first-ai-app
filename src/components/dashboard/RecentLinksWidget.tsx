import React from "react";
import { Globe } from "lucide-react";

export interface RecentLink {
  id: string;
  title: string;
  url: string;
  timestamp: string;
}

interface RecentLinksWidgetProps {
  links?: RecentLink[];
}

const defaultLinks: RecentLink[] = [
  {
    id: "1",
    title: "React",
    url: "https://react.dev",
    timestamp: "2h ago",
  },
  {
    id: "2",
    title: "Tailwind",
    url: "https://tailwindcss.com",
    timestamp: "3h ago",
  },
  {
    id: "3",
    title: "Shadcn",
    url: "https://ui.shadcn.com",
    timestamp: "5h ago",
  },
  {
    id: "4",
    title: "GitHub",
    url: "https://github.com",
    timestamp: "6h ago",
  },
];

const RecentLinksWidget = ({
  links = defaultLinks,
}: RecentLinksWidgetProps) => {
  return (
    <div className="space-y-4">
      <h2 className="text-sm font-medium text-foreground">Recent Links</h2>
      <div className="grid grid-cols-2 gap-3">
        {links.map((link) => (
          <button
            key={link.id}
            onClick={() => window.open(link.url, "_blank")}
            className="flex flex-col items-center gap-1.5 group"
          >
            <div className="h-8 w-8 rounded-full bg-background flex items-center justify-center group-hover:bg-background/80 transition-colors">
              <Globe className="h-3.5 w-3.5 text-primary" />
            </div>
            <span className="text-xs text-center truncate w-full text-muted-foreground group-hover:text-foreground">
              {link.title.length > 15
                ? `${link.title.slice(0, 12)}...`
                : link.title}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default RecentLinksWidget;
