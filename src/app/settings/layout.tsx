import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import AppLayout from "../layouts/AppLayout";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { SidebarNav } from "@/components/ui/sidebar-nav";

const sidebarNavItems = [
  {
    title: "Profil",
    href: "/settings",
  },
  {
    title: "Compte & sécurité",
    href: "/settings/account",
  },
  {
    title: "Apparence",
    href: "/settings/appearance",
  },
  {
    title: "Notifications",
    href: "/settings/notifications",
  },
  {
    title: "Vente",
    href: "/settings/selling",
  },
];

interface SettingsPageProps {
  children: React.ReactNode;
}

export default function SettingsPage({ children }: SettingsPageProps) {
  return (
    <AppLayout>
      <Card>
        <CardHeader>
          <CardTitle>Paramètres</CardTitle>
          <CardDescription>
            Gérer les paramètres de votre compte et définir vos conditions de
            vente sur l'eshop.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Separator />
          <div className="mt-4 flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
            <aside className="lg:w-1/5">
              <SidebarNav items={sidebarNavItems} />
            </aside>
            <div className="flex-1 lg:max-w-2xl">{children}</div>
          </div>
        </CardContent>
      </Card>
    </AppLayout>
  );
}
