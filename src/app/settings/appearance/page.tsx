import { Separator } from "@/components/ui/separator";
import { AppearanceForm } from "./appearance-form";

export default function SettingsAppearancePage() {
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium">Apparence</h3>

      <AppearanceForm />
    </div>
  );
}
