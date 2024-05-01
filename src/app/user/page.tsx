import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import AppLayout from "../layouts/AppLayout";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import {
  IconBrandFacebook,
  IconBrandInstagram,
  IconBrandSnapchat,
  IconBrandX,
  IconHeartPlus,
  IconUserPlus,
} from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import { Icon } from "leaflet";

export default function UserProfile() {
  return (
    <AppLayout>
      <div className="grid">
        <Card>
          <div className="w-full h-72">
            <img
              src="/dev/kondaa.jpg"
              alt="Kondaa"
              className="w-full h-full object-cover rounded-t-lg"
            />
          </div>
          <div className="px-4 pb-4 -mt-10 flex justify-between items-center">
            <div className="flex items-center gap-6">
              <Avatar className="w-40 h-40 rounded-xl border-4 border-white">
                <AvatarImage src="/dev/pdp.jpeg" alt="Gaspard Delvaux" />
                <AvatarFallback>GD</AvatarFallback>
              </Avatar>
              <div className="mt-6">
                <h2 className="text-3xl font-semibold mb-2">Gaspard Delvaux</h2>
                <ul className="flex gap-4">
                  <li>
                    <Badge
                      className="py-1 px-2 flex gap-1 items-center text-slate-800"
                      variant="secondary"
                    >
                      <IconBrandFacebook size={16} /> @gaspard.dlx
                    </Badge>
                  </li>
                  <li>
                    <Badge
                      className="py-1 px-2 flex gap-1 items-center text-slate-800"
                      variant="secondary"
                    >
                      <IconBrandInstagram size={16} /> @gaspard.dlx
                    </Badge>
                  </li>
                  <li>
                    <Badge
                      className="py-1 px-2 flex gap-1 items-center text-slate-800"
                      variant="secondary"
                    >
                      <IconBrandX size={16} /> @gaspard.dlx
                    </Badge>
                  </li>
                  <li>
                    <Badge
                      className="py-1 px-2 flex gap-1 items-center text-slate-800"
                      variant="secondary"
                    >
                      <IconBrandSnapchat size={16} /> @gaspard.dlx
                    </Badge>
                  </li>
                </ul>
              </div>
            </div>
            <Button className="flex items-center gap-2">
              <IconUserPlus size={18} /> Demander en ami
            </Button>
          </div>
        </Card>
      </div>
    </AppLayout>
  );
}
