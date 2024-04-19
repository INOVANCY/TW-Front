import AppLayout from "@/app/layouts/AppLayout";
import TWCard from "@/components/ui/cards/Card";
import TWCardHeader from "@/components/ui/cards/CardHeader";

export default function ManageParksHome() {
  return (
    <AppLayout>
      <TWCard>
        <TWCardHeader text="Attractions" />
      </TWCard>
    </AppLayout>
  );
}
