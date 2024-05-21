import AppLayout from "@/app/layouts/AppLayout";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { IconLockOpen } from "@tabler/icons-react";

export default function DBParkPage() {
  return (
    <AppLayout>
      <div className="grid grid-cols-12">
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle className="text-primary">Walibi Belgium</CardTitle>
            <h2>Noté 8.12/10</h2>
          </CardHeader>
          <CardContent>
            <ul>
              <li className="flex items-center gap-2">
                <IconLockOpen size={18} /> Ouvert en 1979
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}
