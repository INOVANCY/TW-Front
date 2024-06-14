import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface StoryDialogProps {
  story: string;
  parkName: string;
}

export default function StoryDialog({ story, parkName }: StoryDialogProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="link" size="link">
          Lire plus
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Histoire de {parkName}</DialogTitle>
        </DialogHeader>
        {story}
      </DialogContent>
    </Dialog>
  );
}
