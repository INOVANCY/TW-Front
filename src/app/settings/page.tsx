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

export default function SettingsPage() {
  return (
    <AppLayout>
      <Card>
        <CardHeader>
          <CardTitle>Paramètres</CardTitle>
          <CardDescription>
            Gérer les paramètres de votre compte et définir vos préférences en
            matière de notifications.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Separator />
          <Tabs>
            <div className="grid grid-cols-2">
              <div>
                <TabsList orientation="vertical">
                  <TabsTrigger value="profile">Profil</TabsTrigger>
                  <TabsTrigger value="account">Compte & sécurité</TabsTrigger>
                  <TabsTrigger value="appearance">Apparence</TabsTrigger>
                  <TabsTrigger value="shop">Vente</TabsTrigger>
                  <TabsTrigger value="notifications">Notifications</TabsTrigger>
                </TabsList>
              </div>
              <div>
                <TabsContent value="profile">
                  <div>
                    <h2>Paramètres</h2>
                    <p>Contenu des paramètres</p>
                  </div>
                </TabsContent>
                <TabsContent value="notifications">
                  <div>
                    <h2>Notifications</h2>
                    <p>Contenu des notifications</p>
                  </div>
                </TabsContent>
              </div>
            </div>
          </Tabs>
        </CardContent>
      </Card>
    </AppLayout>
  );
}
