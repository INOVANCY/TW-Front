import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import AppLayout from "./layouts/AppLayout";
import Image from "next/image";

export default function Custom404() {
  return (
    <AppLayout>
      <div className="grid grid-cols-4 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Mince! Page inconnue 🫤</CardTitle>
            <CardDescription>
              La page sur laquelle vous êtes arrivée n&apos;existe pas. Mais
              comment avez-vous fait?!
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="p-12">
              <Image
                src="/dev/sad_emoji.webp"
                alt="Sad emoji"
                width={300}
                height={300}
              />
            </div>
          </CardContent>
        </Card>
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>
              Vous cherchiez peut-être l&apos;un de ces éléments? 🔎
            </CardTitle>
          </CardHeader>
          <CardContent></CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}
