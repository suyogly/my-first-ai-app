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
    <div className="w-full min-h-screen bg-background">
      <div className="max-w-4xl mx-auto p-6 space-y-6">
        <div className="space-y-1">
          <h1 className="text-2xl font-semibold tracking-tight text-foreground">
            Site Manager
          </h1>
          <p className="text-sm text-accent">
            Organize and manage your web resources
          </p>
        </div>

        <div className="flex gap-6">
          {/* Folders Sidebar */}
          <div className="w-48 flex-shrink-0 space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-xs font-medium text-accent">FOLDERS</h2>
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
                className="h-6 w-6 rounded-full hover:bg-background/80"
              >
                <Plus className="h-3.5 w-3.5" />
              </Button>
            </div>
            <div className="space-y-0.5">
              {folders.map((folder) => (
                <Button
                  key={folder.id}
                  variant="ghost"
                  className={`w-full justify-start py-1 px-2 h-auto text-sm font-normal rounded-md ${selectedFolder === folder.id ? "bg-card/50 text-foreground" : "text-muted-foreground hover:text-foreground hover:bg-background/80"}`}
                  onClick={() => setSelectedFolder(folder.id)}
                >
                  <ChevronRight
                    className={`h-3.5 w-3.5 mr-1.5 transition-transform ${selectedFolder === folder.id ? "rotate-90" : ""}`}
                  />
                  {folder.name}
                </Button>
              ))}
            </div>
          </div>

          {/* Links Section */}
          <div className="flex-1 space-y-4">
            <div className="flex items-center gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-accent" />
                <Input
                  placeholder="Search links..."
                  className="pl-8 h-8 text-sm bg-card/50 border-border/50"
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
                size="sm"
                className="gap-1.5 hover:bg-background/80"
              >
                <Plus className="h-3.5 w-3.5" /> Add Link
              </Button>
            </div>

            <div className="space-y-1">
              {links
                .filter((link) =>
                  selectedFolder ? link.folderId === selectedFolder : true,
                )
                .map((link) => (
                  <div
                    key={link.id}
                    className="group flex items-center justify-between py-2 px-3 hover:bg-card/50 rounded-md -mx-3 transition-colors border border-transparent hover:border-border/50"
                  >
                    <div className="flex items-center gap-2">
                      <LinkIcon className="h-3.5 w-3.5 text-accent" />
                      <div>
                        <h3 className="text-sm font-medium text-foreground">
                          {link.title}
                        </h3>
                        <p className="text-xs text-accent">{link.url}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {link.tags.map((tag) => (
                        <div
                          key={tag}
                          className="px-1.5 py-0.5 bg-background/80 rounded-full text-xs text-accent flex items-center gap-1"
                        >
                          <Tag className="h-3 w-3" />
                          {tag}
                        </div>
                      ))}
                      <Button
                        variant="ghost"
                        size="sm"
                        className="opacity-0 group-hover:opacity-100 transition-opacity h-7 rounded-full text-xs hover:bg-background/80"
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
