import { Park } from "@/types/db";

interface ParkRateFormDialogProps {
  isOpen: boolean;
  onClose: () => void;
  parkData: Park | null;
}

export default function ParkRateFormDialog({
  isOpen,
  onClose,
  parkData,
}: ParkRateFormDialogProps) {
  return <p>Test</p>;
}
