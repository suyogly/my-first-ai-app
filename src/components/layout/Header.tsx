import { useState, useEffect } from "react";
import { Plus, Moon, Sun, MoreVertical, Pencil, Trash2 } from "lucide-react";
import TabNav from "../navigation/TabNav";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useTheme } from "../theme-provider";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

type QuickLink = {
  url: string;
  label: string;
};

const defaultQuickLinks = [
  { url: "https://github.com", label: "GitHub" },
  { url: "https://mail.google.com", label: "Gmail" },
  { url: "https://calendar.google.com/calendar", label: "Calendar" },
  { url: "https://docs.google.com/document", label: "Docs" },
  { url: "https://drive.google.com/drive", label: "Drive" },
];

export default function Header() {
  const { theme, setTheme } = useTheme();
  const [quickLinks, setQuickLinks] = useState<QuickLink[]>(() => {
    const saved = localStorage.getItem("quickLinks");
    return saved ? JSON.parse(saved) : defaultQuickLinks;
  });

  const [editingLink, setEditingLink] = useState<QuickLink | null>(null);
  const [newLink, setNewLink] = useState({ label: "", url: "" });
  const [time, setTime] = useState(new Date());
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    localStorage.setItem("quickLinks", JSON.stringify(quickLinks));
  }, [quickLinks]);

  const handleAddOrUpdateLink = () => {
    if (editingLink) {
      setQuickLinks(
        quickLinks.map((link) =>
          link.url === editingLink.url ? { ...newLink } : link,
        ),
      );
      setEditingLink(null);
    } else if (newLink.label && newLink.url) {
      setQuickLinks([...quickLinks, newLink]);
    }
    setNewLink({ label: "", url: "" });
    setIsDialogOpen(false);
  };

  const handleEditLink = (link: QuickLink) => {
    setEditingLink(link);
    setNewLink({ ...link });
    setIsDialogOpen(true);
  };

  const handleDeleteLink = (urlToDelete: string) => {
    setQuickLinks(quickLinks.filter((link) => link.url !== urlToDelete));
  };

  const getFaviconUrl = (url: string) => {
    try {
      const domain = new URL(url).hostname;
      return `https://www.google.com/s2/favicons?domain=${domain}&sz=32`;
    } catch {
      return "";
    }
  };

  return (
    <header className="w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      {/* Theme Toggle */}
      <div className="absolute right-4 top-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        >
          {theme === "dark" ? (
            <Sun className="h-5 w-5" />
          ) : (
            <Moon className="h-5 w-5" />
          )}
        </Button>
      </div>

      {/* Clock and Date */}
      <div className="flex flex-col items-center justify-center py-8 space-y-2">
        <div className="text-4xl font-mono tracking-widest">
          {time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
        </div>
        <div className="text-sm text-muted-foreground">
          {time.toLocaleDateString([], {
            weekday: "long",
            month: "long",
            day: "numeric",
          })}
        </div>
      </div>

      {/* Navigation */}
      <TabNav />

      {/* Quick Links Bar */}
      <div className="flex justify-center mt-4 mb-8">
        <div className="flex items-center space-x-6">
          {quickLinks.map((link) => (
            <div key={link.url} className="group relative">
              <a
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center space-y-1 text-muted-foreground hover:text-foreground transition-colors"
              >
                <div className="p-2 rounded-full bg-card/50 hover:bg-card flex items-center justify-center">
                  <img
                    src={getFaviconUrl(link.url)}
                    alt={link.label}
                    className="w-4 h-4"
                    onError={(e) => {
                      e.currentTarget.src = "/favicon.ico";
                    }}
                  />
                </div>
                <span className="text-xs">{link.label}</span>
              </a>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute -right-2 -top-2 w-6 h-6 p-0.5 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <MoreVertical className="w-4 h-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => handleEditLink(link)}>
                    <Pencil className="w-4 h-4 mr-2" /> Edit
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => handleDeleteLink(link.url)}
                    className="text-destructive"
                  >
                    <Trash2 className="w-4 h-4 mr-2" /> Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ))}

          {/* Add Link Button */}
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full p-2 hover:bg-card"
              >
                <Plus className="w-4 h-4" />
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>
                  {editingLink ? "Edit Quick Link" : "Add Quick Link"}
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="label">Label</Label>
                  <Input
                    id="label"
                    value={newLink.label}
                    onChange={(e) =>
                      setNewLink({ ...newLink, label: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="url">URL</Label>
                  <Input
                    id="url"
                    value={newLink.url}
                    placeholder="https://example.com"
                    onChange={(e) =>
                      setNewLink({ ...newLink, url: e.target.value })
                    }
                  />
                </div>
                <Button onClick={handleAddOrUpdateLink}>
                  {editingLink ? "Update" : "Add"} Link
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </header>
  );
}
