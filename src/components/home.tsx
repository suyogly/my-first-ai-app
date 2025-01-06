import { useState } from "react";
import {
  ChevronRight,
  Plus,
  Trash2,
  Link as LinkIcon,
  MoreVertical,
  Pencil,
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

type Link = {
  id: string;
  url: string;
  title: string;
  folderId: string;
};

type Folder = {
  id: string;
  name: string;
  links: Link[];
};

export default function Home() {
  const [selectedFolder, setSelectedFolder] = useState<string | null>(null);
  const [folders, setFolders] = useState<Folder[]>(() => {
    const saved = localStorage.getItem("folders");
    return saved ? JSON.parse(saved) : [];
  });
  const [isNewFolderDialogOpen, setIsNewFolderDialogOpen] = useState(false);
  const [isNewLinkDialogOpen, setIsNewLinkDialogOpen] = useState(false);
  const [editingFolder, setEditingFolder] = useState<Folder | null>(null);
  const [newFolder, setNewFolder] = useState({ name: "" });
  const [newLink, setNewLink] = useState({ title: "", url: "" });

  const handleAddFolder = () => {
    if (newFolder.name) {
      if (editingFolder) {
        // Editing existing folder
        const updatedFolders = folders.map((f) =>
          f.id === editingFolder.id ? { ...f, name: newFolder.name } : f,
        );
        setFolders(updatedFolders);
        localStorage.setItem("folders", JSON.stringify(updatedFolders));
      } else {
        // Adding new folder
        const folder: Folder = {
          id: Date.now().toString(),
          name: newFolder.name,
          links: [],
        };
        const updatedFolders = [...folders, folder];
        setFolders(updatedFolders);
        localStorage.setItem("folders", JSON.stringify(updatedFolders));
      }
      setNewFolder({ name: "" });
      setEditingFolder(null);
      setIsNewFolderDialogOpen(false);
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

  const handleEditFolder = (folder: Folder) => {
    setEditingFolder(folder);
    setNewFolder({ name: folder.name });
    setIsNewFolderDialogOpen(true);
  };

  const handleFolderClick = (folder: Folder) => {
    // Toggle folder selection for UI
    setSelectedFolder(folder.id === selectedFolder ? null : folder.id);

    // Open all links in new tabs
    folder.links.forEach((link) => {
      window.open(link.url, "_blank");
    });
  };

  return (
    <div className="flex items-center justify-center py-6">
      <div className="w-[50%] bg-card/50 rounded-xl border border-border/50 overflow-hidden">
        <div className="p-4 border-b border-border/50">
          <h2 className="text-sm font-medium text-muted-foreground">
            Open your fav tabs all at once
          </h2>
        </div>
        <div className="flex">
          {/* Left Column - Folders */}
          <div className="w-[40%] border-r border-border/50 p-4">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-medium">Folders</span>
              <Dialog
                open={isNewFolderDialogOpen}
                onOpenChange={setIsNewFolderDialogOpen}
              >
                <DialogTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-7 w-7">
                    <Plus className="h-4 w-4" />
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>
                      {editingFolder ? "Edit Folder" : "New Folder"}
                    </DialogTitle>
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
                    <Button onClick={handleAddFolder}>
                      {editingFolder ? "Update" : "Create"} Folder
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
            <div className="space-y-1">
              {folders.map((folder) => (
                <div
                  key={folder.id}
                  className="flex items-center p-2 rounded-lg group text-sm hover:bg-accent/50 cursor-pointer"
                >
                  <ChevronRight
                    className={`w-4 h-4 mr-2 transition-transform ${selectedFolder === folder.id ? "rotate-90" : ""}`}
                  />
                  <span
                    className="flex-1"
                    onClick={() => handleFolderClick(folder)}
                  >
                    {folder.name}
                  </span>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="opacity-0 group-hover:opacity-100 h-7 w-7"
                      >
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem
                        onClick={() => handleEditFolder(folder)}
                      >
                        <Pencil className="w-4 h-4 mr-2" /> Rename
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => handleDeleteFolder(folder.id)}
                        className="text-destructive"
                      >
                        <Trash2 className="w-4 h-4 mr-2" /> Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column - Links */}
          <div className="w-[60%] p-4">
            {selectedFolder ? (
              <>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-medium">Links</span>
                  <Dialog
                    open={isNewLinkDialogOpen}
                    onOpenChange={setIsNewLinkDialogOpen}
                  >
                    <DialogTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-7 w-7">
                        <Plus className="h-4 w-4" />
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
                <div className="space-y-1">
                  {folders
                    .find((f) => f.id === selectedFolder)
                    ?.links.map((link) => (
                      <div
                        key={link.id}
                        className="flex items-center justify-between p-2 rounded-lg hover:bg-accent/50 group text-sm"
                      >
                        <a
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center space-x-2"
                        >
                          <LinkIcon className="w-4 h-4" />
                          <span>{link.title}</span>
                        </a>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="opacity-0 group-hover:opacity-100 h-7 w-7"
                          onClick={() =>
                            handleDeleteLink(selectedFolder, link.id)
                          }
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                </div>
              </>
            ) : (
              <div className="flex items-center justify-center h-full text-sm text-muted-foreground">
                Select a folder to view links
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
