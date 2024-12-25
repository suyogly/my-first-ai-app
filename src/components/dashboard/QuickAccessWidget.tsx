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
        <h2 className="text-lg font-semibold">Quick Access</h2>
        <Button
          variant="ghost"
          size="icon"
          onClick={onAddFolder}
          className="h-8 w-8 rounded-full"
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>
      <div className="grid grid-cols-2 gap-3">
        {folders.map((folder) => (
          <Button
            key={folder.id}
            variant="outline"
            className="h-24 flex flex-col items-center justify-center gap-2 hover:bg-gray-50"
            onClick={() => onFolderClick(folder.id)}
          >
            <Folder className="h-8 w-8 text-gray-600" />
            <div className="text-sm font-medium">{folder.name}</div>
            <div className="text-xs text-gray-500">
              {folder.linkCount} links
            </div>
          </Button>
        ))}
      </div>
    </div>
  );
};

export default QuickAccessWidget;
