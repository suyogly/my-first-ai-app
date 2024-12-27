import React from "react";
import { Globe } from "lucide-react";

export interface QuickLink {
  id: string;
  title: string;
  url: string;
  timestamp?: string;
}

interface QuickLinksWidgetProps {
  links?: QuickLink[];
}

const defaultLinks: QuickLink[] = [
  {
    id: "1",
    title: "React",
    url: "https://react.dev",
  },
  {
    id: "2",
    title: "Tailwind",
    url: "https://tailwindcss.com/docs",
  },
  {
    id: "3",
    title: "Shadcn",
    url: "https://ui.shadcn.com",
  },
  {
    id: "4",
    title: "GitHub",
    url: "https://github.com",
  },
];

const QuickLinksWidget = ({ links = defaultLinks }: QuickLinksWidgetProps) => {
  return (
    <div className="space-y-4">
      <h2 className="text-sm font-medium text-foreground">Quick Links</h2>
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

export default QuickLinksWidget;
