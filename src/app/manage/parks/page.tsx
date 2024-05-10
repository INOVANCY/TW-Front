"use client";

import AppLayout from "@/app/layouts/AppLayout";
import ParksFormModal from "@/components/app/manage/ParksFormModal";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import TWCard from "@/components/ui/cards/Card";
import TWCardHeader from "@/components/ui/cards/CardHeader";
import { DataTable } from "@/components/ui/data-table";
import TWButton from "@/components/ui/forms/Button";
import TWInput from "@/components/ui/forms/Input";
import { useState } from "react";
import { Park, columns } from "./columns";
import { DataTablePagination } from "@/components/ui/data-table-pagination";
import { set } from "react-hook-form";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function ManageParksHome() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPark, setSelectedPark] = useState<number | null>(null);

  // Data sur les parcs d'attractions

  const parks: Park[] = [
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

  const onAddButtonClick = () => {
    setSelectedPark(null);
    setIsModalOpen(true);
  };

  const onEditButtonClick = (parkId: number) => {
    setSelectedPark(parkId);
    setIsModalOpen(true);
  };

  return (
    <AppLayout>
      <Card>
        <CardHeader>
          <CardTitle>Gérer les parcs d'attractions</CardTitle>
          <CardDescription>
            Sur cette page, vous pouvez gérer tous les parcs d'attractions de
            Thrills World.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <DataTable
            columns={columns(onEditButtonClick)}
            data={parks}
            searchColumn="name"
            tableName="un parc"
            onAddButtonClick={onAddButtonClick}
          />
        </CardContent>
      </Card>
      <Dialog
        open={isModalOpen}
        onOpenChange={() => setIsModalOpen(!isModalOpen)}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {selectedPark ? "Modifier un parc" : "Ajouter un parc"}
            </DialogTitle>
          </DialogHeader>
          <Tabs defaultValue="general">
            <TabsList className="w-full">
              <TabsTrigger value="general">Général</TabsTrigger>
              <TabsTrigger value="rates">Tarifs</TabsTrigger>
              <TabsTrigger value="location">Localisation</TabsTrigger>
            </TabsList>
          </Tabs>
        </DialogContent>
      </Dialog>
    </AppLayout>
  );
}
