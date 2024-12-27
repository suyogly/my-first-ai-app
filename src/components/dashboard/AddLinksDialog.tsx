import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Trash } from "lucide-react";

interface Link {
  url: string;
  title: string;
}

interface AddLinksDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (links: Link[]) => void;
  folderName: string;
}

const AddLinksDialog = ({
  open,
  onOpenChange,
  onSave,
  folderName,
}: AddLinksDialogProps) => {
  const [links, setLinks] = useState<Link[]>([{ url: "", title: "" }]);

  const handleAddLink = () => {
    setLinks([...links, { url: "", title: "" }]);
  };

  const handleRemoveLink = (index: number) => {
    setLinks(links.filter((_, i) => i !== index));
  };

  const handleLinkChange = (
    index: number,
    field: keyof Link,
    value: string,
  ) => {
    setLinks(
      links.map((link, i) =>
        i === index ? { ...link, [field]: value } : link,
      ),
    );
  };

  const handleSave = () => {
    const validLinks = links.filter((link) => link.url && link.title);
    if (validLinks.length > 0) {
      onSave(validLinks);
      onOpenChange(false);
      setLinks([{ url: "", title: "" }]);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add Links to {folderName}</DialogTitle>
        </DialogHeader>
        <div className="space-y-3 py-4 max-h-[60vh] overflow-y-auto">
          {links.map((link, index) => (
            <div key={index} className="flex items-start gap-2">
              <div className="flex-1 space-y-2">
                <Input
                  placeholder="Title"
                  value={link.title}
                  onChange={(e) =>
                    handleLinkChange(index, "title", e.target.value)
                  }
                  className="h-8 text-sm"
                />
                <Input
                  placeholder="URL"
                  value={link.url}
                  onChange={(e) =>
                    handleLinkChange(index, "url", e.target.value)
                  }
                  className="h-8 text-sm"
                />
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleRemoveLink(index)}
                className="h-8 w-8 rounded-full hover:bg-destructive/10 hover:text-destructive"
                disabled={links.length === 1}
              >
                <Trash className="h-4 w-4" />
              </Button>
            </div>
          ))}
          <Button
            variant="ghost"
            size="sm"
            onClick={handleAddLink}
            className="w-full gap-1.5 hover:bg-background/80"
          >
            <Plus className="h-3.5 w-3.5" /> Add Another Link
          </Button>
        </div>
        <DialogFooter>
          <Button
            onClick={handleSave}
            className="w-full"
            disabled={!links.some((link) => link.url && link.title)}
          >
            Save Links
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddLinksDialog;
