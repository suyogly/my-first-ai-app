import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Folder, Plus, Pencil } from "lucide-react";
import AddLinksDialog from "./AddLinksDialog";

export interface QuickAccessFolder {
  id: string;
  name: string;
  linkCount: number;
  links?: { url: string; title: string }[];
}

interface QuickAccessWidgetProps {
  folders?: QuickAccessFolder[];
  onFolderClick?: (folderId: string) => void;
  onAddFolder?: () => void;
  onAddLinks?: (
    folderId: string,
    links: { url: string; title: string }[],
  ) => void;
}

const defaultFolders: QuickAccessFolder[] = [
  {
    id: "1",
    name: "Work",
    linkCount: 12,
    links: [
      { url: "https://github.com", title: "GitHub" },
      { url: "https://jira.com", title: "Jira" },
    ],
  },
  {
    id: "2",
    name: "Personal",
    linkCount: 8,
    links: [
      { url: "https://gmail.com", title: "Gmail" },
      { url: "https://calendar.google.com", title: "Calendar" },
    ],
  },
];

const QuickAccessWidget = ({
  folders = defaultFolders,
  onFolderClick = () => {},
  onAddFolder = () => {},
  onAddLinks = () => {},
}: QuickAccessWidgetProps) => {
  const [selectedFolderId, setSelectedFolderId] = useState<string | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleFolderClick = (folder: QuickAccessFolder) => {
    if (folder.links?.length) {
      // Open first link in a new window
      const newWindow = window.open(folder.links[0].url, folder.name);

      // Open remaining links in the same window
      if (newWindow && folder.links.length > 1) {
        folder.links.slice(1).forEach((link) => {
          newWindow.open(link.url);
        });
      }
    }
    onFolderClick(folder.id);
  };

  const handleAddLinksClick = (folderId: string) => {
    setSelectedFolderId(folderId);
    setDialogOpen(true);
  };

  const selectedFolder = folders.find((f) => f.id === selectedFolderId);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-medium text-foreground">Folders</h2>
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
