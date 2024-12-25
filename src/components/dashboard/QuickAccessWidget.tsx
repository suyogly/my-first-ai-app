import React from "react";
import { Button } from "@/components/ui/button";
import { Folder, Plus } from "lucide-react";

export interface QuickAccessFolder {
  id: string;
  name: string;
  linkCount: number;
}

interface QuickAccessWidgetProps {
  folders?: QuickAccessFolder[];
  onFolderClick?: (folderId: string) => void;
  onAddFolder?: () => void;
}

const defaultFolders: QuickAccessFolder[] = [
  { id: "1", name: "Work", linkCount: 12 },
  { id: "2", name: "Personal", linkCount: 8 },
  { id: "3", name: "Research", linkCount: 15 },
];

const QuickAccessWidget = ({
  folders = defaultFolders,
  onFolderClick = () => {},
  onAddFolder = () => {},
}: QuickAccessWidgetProps) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-medium">Folders</h2>
        <Button
          variant="ghost"
          size="icon"
          onClick={onAddFolder}
          className="h-6 w-6 rounded-full"
        >
          <Plus className="h-3.5 w-3.5" />
        </Button>
      </div>
      <div className="space-y-1">
        {folders.map((folder) => (
          <button
            key={folder.id}
            onClick={() => onFolderClick(folder.id)}
            className="w-full flex items-center gap-2 px-2 py-1.5 hover:bg-gray-50 rounded-md text-left group transition-colors"
          >
            <Folder className="h-3.5 w-3.5 text-gray-400 group-hover:text-gray-600" />
            <span className="text-sm truncate">
              {folder.name.length > 15
                ? `${folder.name.slice(0, 12)}...`
                : folder.name}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuickAccessWidget;
