import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Folder, Plus, Pencil } from "lucide-react";
import AddLinksDialog from "./AddLinksDialog";

export interface Link {
  url: string;
  title: string;
}

export interface QuickAccessFolder {
  id: string;
  name: string;
  linkCount: number;
  links: Link[];
}

interface QuickAccessWidgetProps {
  folders?: QuickAccessFolder[];
  onAddFolder?: () => void;
  onAddLinks?: (folderId: string, links: Link[]) => void;
}

const defaultFolders: QuickAccessFolder[] = [
  {
    id: "1",
    name: "Work",
    linkCount: 2,
    links: [
      { url: "https://github.com", title: "GitHub" },
      { url: "https://jira.com", title: "Jira" },
    ],
  },
  {
    id: "2",
    name: "Personal",
    linkCount: 2,
    links: [
      { url: "https://gmail.com", title: "Gmail" },
      { url: "https://calendar.google.com", title: "Calendar" },
    ],
  },
];

const QuickAccessWidget = ({
  folders = defaultFolders,
  onAddFolder = () => {},
  onAddLinks = () => {},
}: QuickAccessWidgetProps) => {
  const [selectedFolderId, setSelectedFolderId] = useState<string | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const openLinksInNewWindow = (links: Link[]) => {
    if (links.length === 0) return;

    const windowFeatures = [
      "toolbar=yes",
      "location=yes",
      "directories=yes",
      "status=yes",
      "menubar=yes",
      "scrollbars=yes",
      "resizable=yes",
      "width=1200",
      "height=800",
      "left=100",
      "top=100",
    ].join(",");

    // Open first link in a new window with all features
    const newWindow = window.open(links[0].url, "_blank", windowFeatures);

    // If window was successfully opened, open remaining links as tabs
    if (newWindow) {
      // Focus the new window
      newWindow.focus();

      // Open remaining links as tabs in that window after a short delay
      setTimeout(() => {
        links.slice(1).forEach((link) => {
          newWindow.open(link.url);
        });
      }, 1000);
    }
  };

  const handleFolderClick = (folder: QuickAccessFolder) => {
    if (folder.links.length > 0) {
      openLinksInNewWindow(folder.links);
    }
  };

  const handleAddLinksClick = (folderId: string) => {
    setSelectedFolderId(folderId);
    setDialogOpen(true);
  };

  const selectedFolder = folders.find((f) => f.id === selectedFolderId);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-medium text-foreground">Quick Access</h2>
        <Button
          variant="ghost"
          size="icon"
          onClick={onAddFolder}
          className="h-6 w-6 rounded-full hover:bg-background/80"
        >
          <Plus className="h-3.5 w-3.5" />
        </Button>
      </div>

      <div className="space-y-1">
        {folders.map((folder) => (
          <div key={folder.id} className="group relative">
            <button
              onClick={() => handleFolderClick(folder)}
              className="w-full flex items-center gap-2 px-2 py-1.5 hover:bg-background/80 rounded-md text-left group transition-colors"
            >
              <Folder className="h-3.5 w-3.5 text-muted-foreground group-hover:text-primary" />
              <span className="text-sm text-muted-foreground group-hover:text-foreground truncate">
                {folder.name.length > 15
                  ? `${folder.name.slice(0, 12)}...`
                  : folder.name}
                <span className="ml-1 text-xs text-muted-foreground">
                  ({folder.links.length})
                </span>
              </span>
            </button>
            <Button
              variant="ghost"
              size="icon"
              onClick={(e) => {
                e.stopPropagation();
                handleAddLinksClick(folder.id);
              }}
              className="absolute right-1 top-1/2 -translate-y-1/2 h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity rounded-full hover:bg-background/80"
            >
              <Pencil className="h-3.5 w-3.5" />
            </Button>
          </div>
        ))}
      </div>

      {selectedFolder && (
        <AddLinksDialog
          open={dialogOpen}
          onOpenChange={setDialogOpen}
          onSave={(links) => {
            onAddLinks(selectedFolder.id, links);
            setSelectedFolderId(null);
          }}
          folderName={selectedFolder.name}
        />
      )}
    </div>
  );
};

export default QuickAccessWidget;
