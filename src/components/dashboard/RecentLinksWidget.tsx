import React from "react";
import { Button } from "@/components/ui/button";
import { Clock, ExternalLink } from "lucide-react";

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
    title: "Getting Started with React",
    url: "https://react.dev",
    timestamp: "2h ago",
  },
  {
    id: "2",
    title: "Tailwind CSS Documentation",
    url: "https://tailwindcss.com/docs",
    timestamp: "3h ago",
  },
];

const RecentLinksWidget = ({
  links = defaultLinks,
}: RecentLinksWidgetProps) => {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Recent Links</h2>
      <div className="space-y-2">
        {links.map((link) => (
          <div
            key={link.id}
            className="group flex items-center justify-between py-2 border-b border-gray-100 last:border-0"
          >
            <div className="flex-1 min-w-0 space-y-1">
              <h4 className="text-sm font-medium truncate">{link.title}</h4>
              <div className="flex items-center text-xs text-gray-500">
                <Clock className="w-3 h-3 mr-1" />
                <span>{link.timestamp}</span>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity rounded-full"
              onClick={() => window.open(link.url, "_blank")}
            >
              <ExternalLink className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentLinksWidget;
