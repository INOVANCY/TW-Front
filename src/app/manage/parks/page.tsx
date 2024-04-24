"use client";

import AppLayout from "@/app/layouts/AppLayout";
import ParksFormModal from "@/components/app/manage/ParksFormModal";
import TWTable from "@/components/ui/Table";
import TWCard from "@/components/ui/cards/Card";
import TWCardHeader from "@/components/ui/cards/CardHeader";
import TWButton from "@/components/ui/forms/Button";
import TWInput from "@/components/ui/forms/Input";
import { useState } from "react";

export default function ManageParksHome() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Data sur les parcs d'attractions
  const data = [
    {
      id: 1,
      name: "Disneyland Paris",
      city: "Marne-la-Vallée",
      country: "France",
    },
    { id: 2, name: "Parc Astérix", city: "Plailly", country: "France" },
    { id: 3, name: "Europa-Park", city: "Rust", country: "Allemagne" },
    { id: 4, name: "PortAventura", city: "Salou", country: "Espagne" },
    { id: 5, name: "Phantasialand", city: "Brühl", country: "Allemagne" },
    { id: 6, name: "Efteling", city: "Kaatsheuvel", country: "Pays-Bas" },
    { id: 7, name: "Alton Towers", city: "Alton", country: "Royaume-Uni" },
    { id: 8, name: "Thorpe Park", city: "Chertsey", country: "Royaume-Uni" },
    { id: 9, name: "Tivoli Gardens", city: "Copenhague", country: "Danemark" },
    { id: 10, name: "Liseberg", city: "Göteborg", country: "Suède" },
  ];

  const columns = [
    { key: "name", label: "Nom" },
    { key: "city", label: "Ville" },
    { key: "country", label: "Pays" },
  ];

  return (
    <AppLayout>
      <TWCard>
        <TWCardHeader text="Gérer les parcs" />
        <TWTable
          columns={columns}
          data={data}
          actions
          onAdd={() => setIsModalOpen(true)}
        />
      </TWCard>
      {isModalOpen && <ParksFormModal />}
    </AppLayout>
  );
}
