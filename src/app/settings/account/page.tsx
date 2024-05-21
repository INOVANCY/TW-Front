import { Separator } from "@/components/ui/separator";
import { AccountForm } from "./account-form";

export default function SettingsAccountPage() {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Compte et sécurité</h3>
      <AccountForm />
    </div>
  );
}
