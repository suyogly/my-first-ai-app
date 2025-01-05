import { useState } from "react";
import {
  ChevronDown,
  ChevronRight,
  Plus,
  Pencil,
  Trash2,
  Link as LinkIcon,
} from "lucide-react";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

type Folder = {
  id: string;
  name: string;
  links: Link[];
};

type Link = {
  id: string;
  url: string;
  title: string;
  folderId: string;
};

export default function Home() {
  const [folders, setFolders] = useState<Folder[]>(() => {
    const saved = localStorage.getItem("folders");
    return saved ? JSON.parse(saved) : [];
  });

  const [selectedFolder, setSelectedFolder] = useState<string | null>(null);
  const [isNewFolderDialogOpen, setIsNewFolderDialogOpen] = useState(false);
  const [isNewLinkDialogOpen, setIsNewLinkDialogOpen] = useState(false);
  const [newFolder, setNewFolder] = useState({ name: "" });
  const [newLink, setNewLink] = useState({ title: "", url: "" });

  const handleAddFolder = () => {
    if (newFolder.name) {
      const folder: Folder = {
        id: Date.now().toString(),
        name: newFolder.name,
        links: [],
      };
      setFolders([...folders, folder]);
      setNewFolder({ name: "" });
      setIsNewFolderDialogOpen(false);
      localStorage.setItem("folders", JSON.stringify([...folders, folder]));
    }
  };

  const handleAddLink = () => {
    if (newLink.title && newLink.url && selectedFolder) {
      const link: Link = {
        id: Date.now().toString(),
        ...newLink,
        folderId: selectedFolder,
      };
      const updatedFolders = folders.map((folder) => {
        if (folder.id === selectedFolder) {
          return { ...folder, links: [...folder.links, link] };
        }
        return folder;
      });
      setFolders(updatedFolders);
      setNewLink({ title: "", url: "" });
      setIsNewLinkDialogOpen(false);
      localStorage.setItem("folders", JSON.stringify(updatedFolders));
    }
  };

  const handleDeleteFolder = (folderId: string) => {
    const updatedFolders = folders.filter((f) => f.id !== folderId);
    setFolders(updatedFolders);
    if (selectedFolder === folderId) setSelectedFolder(null);
    localStorage.setItem("folders", JSON.stringify(updatedFolders));
  };

  const handleDeleteLink = (folderId: string, linkId: string) => {
    const updatedFolders = folders.map((folder) => {
      if (folder.id === folderId) {
        return {
          ...folder,
          links: folder.links.filter((link) => link.id !== linkId),
        };
      }
      return folder;
    });
    setFolders(updatedFolders);
    localStorage.setItem("folders", JSON.stringify(updatedFolders));
  };

  return (
    <div className="grid grid-cols-[300px_1fr] gap-6 py-6">
      {/* Folders Column */}
      <div className="bg-card/50 p-4 rounded-xl border border-border/50">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Folders</h2>
          <Dialog
            open={isNewFolderDialogOpen}
            onOpenChange={setIsNewFolderDialogOpen}
          >
            <DialogTrigger asChild>
              <Button variant="ghost" size="icon">
                <Plus className="w-4 h-4" />
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>New Folder</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label>Name</Label>
                  <Input
                    value={newFolder.name}
                    onChange={(e) => setNewFolder({ name: e.target.value })}
                    placeholder="Folder name"
                  />
                </div>
                <Button onClick={handleAddFolder}>Create Folder</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
        <div className="space-y-2">
          {folders.map((folder) => (
            <div
              key={folder.id}
              className={`flex items-center justify-between p-2 rounded-lg cursor-pointer hover:bg-accent/50 ${selectedFolder === folder.id ? "bg-accent" : ""}`}
              onClick={() =>
                setSelectedFolder(
                  folder.id === selectedFolder ? null : folder.id,
                )
              }
            >
              <div className="flex items-center space-x-2">
                {selectedFolder === folder.id ? (
                  <ChevronDown className="w-4 h-4" />
                ) : (
                  <ChevronRight className="w-4 h-4" />
                )}
                <span>{folder.name}</span>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="opacity-0 group-hover:opacity-100"
                onClick={(e) => {
                  e.stopPropagation();
                  handleDeleteFolder(folder.id);
                }}
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          ))}
        </div>
      </div>

      {/* Links Column */}
      <div className="bg-card/50 p-4 rounded-xl border border-border/50">
        {selectedFolder ? (
          <>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">
                {folders.find((f) => f.id === selectedFolder)?.name} Links
              </h2>
              <Dialog
                open={isNewLinkDialogOpen}
                onOpenChange={setIsNewLinkDialogOpen}
              >
                <DialogTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <Plus className="w-4 h-4" />
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add Link</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div className="space-y-2">
                      <Label>Title</Label>
                      <Input
                        value={newLink.title}
                        onChange={(e) =>
                          setNewLink({ ...newLink, title: e.target.value })
                        }
                        placeholder="Link title"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>URL</Label>
                      <Input
                        value={newLink.url}
                        onChange={(e) =>
                          setNewLink({ ...newLink, url: e.target.value })
                        }
                        placeholder="https://example.com"
                      />
                    </div>
                    <Button onClick={handleAddLink}>Add Link</Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
            <div className="space-y-2">
              {folders
                .find((f) => f.id === selectedFolder)
                ?.links.map((link) => (
                  <div
                    key={link.id}
                    className="flex items-center justify-between p-2 rounded-lg hover:bg-accent/50 group"
                  >
                    <a
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-2 flex-1"
                    >
                      <LinkIcon className="w-4 h-4" />
                      <span>{link.title}</span>
                    </a>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="opacity-0 group-hover:opacity-100"
                      onClick={() => handleDeleteLink(selectedFolder, link.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
            </div>
          </>
        ) : (
          <div className="flex items-center justify-center h-full text-muted-foreground">
            Select a folder to view links
          </div>
        )}
      </div>
    </div>
  );
}
