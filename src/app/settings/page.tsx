"use client";

import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { ProfileForm } from "./profile-form";
import { useAuth } from "@/providers/AuthProvider";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import ProfileService from "@/services/ProfileService";

export default function SettingsProfilePage() {
  const router = useRouter();
  const { user } = useAuth();
  if (!user) {
    router.push("/auth/login");
    return <></>;
  }

  useEffect(() => {
    ProfileService.getProfile()
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium">Profil</h3>
      <ProfileForm />
    </div>
  );
}
