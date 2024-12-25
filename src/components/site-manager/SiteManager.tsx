import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Plus,
  Folder,
  Link as LinkIcon,
  Tag,
  Search,
  ChevronRight,
} from "lucide-react";

interface SiteLink {
  id: string;
  title: string;
  url: string;
  tags: string[];
  folderId: string;
}

interface SiteFolder {
  id: string;
  name: string;
}

const SiteManager = () => {
  const [folders, setFolders] = useState<SiteFolder[]>([
    { id: "1", name: "Work" },
    { id: "2", name: "Personal" },
  ]);

  const [links, setLinks] = useState<SiteLink[]>([
    {
      id: "1",
      title: "React Documentation",
      url: "https://react.dev",
      tags: ["development", "frontend"],
      folderId: "1",
    },
  ]);

  const [selectedFolder, setSelectedFolder] = useState<string | null>(null);

  return (
    <div className="w-full min-h-screen bg-white dark:bg-gray-900">
      <div className="max-w-6xl mx-auto p-8 space-y-8">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold tracking-tight">Site Manager</h1>
          <p className="text-muted-foreground">
            Organize and manage your web resources
          </p>
        </div>

        <div className="flex gap-8">
          {/* Folders Sidebar */}
          <div className="w-64 flex-shrink-0 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-medium text-gray-500">FOLDERS</h2>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => {
                  const name = prompt("Enter folder name");
                  if (name) {
                    setFolders([
                      ...folders,
                      { id: Date.now().toString(), name },
                    ]);
                  }
                }}
                className="h-8 w-8 rounded-full"
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <div className="space-y-0.5">
              {folders.map((folder) => (
                <Button
                  key={folder.id}
                  variant="ghost"
                  className={`w-full justify-start py-1.5 px-2 h-auto text-sm font-normal ${selectedFolder === folder.id ? "bg-gray-100 dark:bg-gray-800" : ""}`}
                  onClick={() => setSelectedFolder(folder.id)}
                >
                  <ChevronRight
                    className={`h-4 w-4 mr-2 transition-transform ${selectedFolder === folder.id ? "rotate-90" : ""}`}
                  />
                  {folder.name}
                </Button>
              ))}
            </div>
          </div>

          {/* Links Section */}
          <div className="flex-1 space-y-6">
            <div className="flex items-center gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search links..."
                  className="pl-10 bg-gray-50 border-0"
                />
              </div>
              <Button
                onClick={() => {
                  const title = prompt("Enter link title");
                  const url = prompt("Enter link URL");
                  if (title && url && selectedFolder) {
                    setLinks([
                      ...links,
                      {
                        id: Date.now().toString(),
                        title,
                        url,
                        tags: [],
                        folderId: selectedFolder,
                      },
                    ]);
                  }
                }}
                disabled={!selectedFolder}
                variant="outline"
                className="gap-2"
              >
                <Plus className="h-4 w-4" /> Add Link
              </Button>
            </div>

            <div className="space-y-2">
              {links
                .filter((link) =>
                  selectedFolder ? link.folderId === selectedFolder : true,
                )
                .map((link) => (
                  <div
                    key={link.id}
                    className="group flex items-center justify-between py-3 border-b border-gray-100 last:border-0"
                  >
                    <div className="flex items-center gap-3">
                      <LinkIcon className="h-4 w-4 text-gray-400" />
                      <div>
                        <h3 className="font-medium">{link.title}</h3>
                        <p className="text-sm text-gray-500">{link.url}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      {link.tags.map((tag) => (
                        <div
                          key={tag}
                          className="px-2 py-1 bg-gray-50 rounded-full text-xs text-gray-600 flex items-center gap-1"
                        >
                          <Tag className="h-3 w-3" />
                          {tag}
                        </div>
                      ))}
                      <Button
                        variant="ghost"
                        size="sm"
                        className="opacity-0 group-hover:opacity-100 transition-opacity rounded-full"
                        onClick={() => window.open(link.url, "_blank")}
                      >
                        Open
                      </Button>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SiteManager;
