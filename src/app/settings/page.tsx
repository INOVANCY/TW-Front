"use client";
import { ProfileForm } from "./profile-form";
import { useAuth } from "@/providers/AuthProvider";
import { useRouter } from "next/navigation";

export default function SettingsProfilePage() {
  const router = useRouter();
  const { user } = useAuth();
  if (!user) {
    router.push("/auth/login");
    return <></>;
  }

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium">Profil</h3>
      <ProfileForm />
    </div>
  );
}
