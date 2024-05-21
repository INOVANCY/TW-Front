import { Separator } from "@/components/ui/separator";
import { NotificationsForm } from "./notifications-form";

export default function SettingsNotificationsPage() {
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium">Notifications</h3>

      <NotificationsForm />
    </div>
  );
}
