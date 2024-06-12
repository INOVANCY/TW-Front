"use client";

import AppLayout from "@/app/layouts/AppLayout";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { DataTable } from "@/components/ui/data-table";
import { useEffect, useState } from "react";
import { columns } from "./columns";
import ManageParkService from "@/services/manage/ManageParkService";
import { Park } from "@/types/db";
import ParkFormDialog from "./ParkFormDialog";
import ParkLandFormDialog from "./ParkLandFormDialog";
import ParkRateFormDialog from "./ParkRateFormDialog";

export default function ManageParksHome() {
  // Modals
  const [openModal, setOpenModal] = useState<
    "general" | "lands" | "rates" | null
  >(null);
  const [selectedPark, setSelectedPark] = useState<Park | null>(null);

  // Datatable
  const [parks, setParks] = useState<Park[]>([]);
  const [pageCount, setPageCount] = useState(0);

  // Data sur les parcs d'attractions

  const fetchParks = async (
    pageIndex: number,
    pageSize: number,
    query: string = ""
  ) => {
    try {
      ManageParkService.getParks(pageIndex, pageSize, query)
        .then((response) => {
          setParks(response.data.parks);
          setPageCount(response.data.pagination.pageCount);
        })
        .catch((error) => {
          console.error(error);
        });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchParks(0, 10);
  }, []);

  // Formulaire

  const onAddButtonClick = () => {
    setSelectedPark(null);
    setOpenModal("general");
  };

  const onEditButtonClick = (
    park: Park,
    type: "general" | "lands" | "rates"
  ) => {
    setSelectedPark(park);
    setOpenModal(type);
  };

  const handleModalClose = () => {
    setSelectedPark(null);
    setOpenModal(null);
    fetchParks(0, 10);
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
            pageCount={pageCount}
            onAddButtonClick={onAddButtonClick}
            onPageChange={(pageIndex, pageSize, query) => {
              fetchParks(pageIndex, pageSize, query);
            }}
          />
        </CardContent>
      </Card>
      <ParkFormDialog
        isOpen={openModal === "general"}
        parkData={selectedPark}
        onClose={handleModalClose}
      />
      {selectedPark && (
        <ParkLandFormDialog
          isOpen={openModal === "lands"}
          parkData={selectedPark}
          onClose={handleModalClose}
        />
      )}
      {selectedPark && (
        <ParkRateFormDialog
          isOpen={openModal === "rates"}
          parkData={selectedPark}
          onClose={handleModalClose}
        />
      )}

      {/* <Dialog
        open={isZoneModalOpen}
        onOpenChange={() => setIsZoneModalOpen(!isZoneModalOpen)}
      >
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Modifier les zones d'un parc</DialogTitle>
              </DialogHeader>
              <FormField
                control={form.control}
                name="zone_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Ajouter une nouvelle zone</FormLabel>
                    <div className="flex items-center justify-between gap-2">
                      <FormControl>
                        <Input placeholder="Croatie" {...field} />
                      </FormControl>
                      <Button
                        variant="outline"
                        className="flex items-center gap-2"
                      >
                        <IconCheck size={14} /> Valider
                      </Button>
                    </div>
                  </FormItem>
                )}
              />
              <Separator />
              <p className="font-semibold">Renommer une zone déjà existante</p>
              <ul className="flex flex-col gap-2">
                <li>
                  <div className="flex items-center justify-between gap-2">
                    <Input value="Grèce" />
                    <Button variant="outline">Renommer</Button>
                  </div>
                </li>
                <li>
                  <div className="flex items-center justify-between gap-2">
                    <Input value="France" />
                    <Button variant="outline">Renommer</Button>
                  </div>
                </li>
                <li>
                  <div className="flex items-center justify-between gap-2">
                    <Input value="Islande" />
                    <Button variant="outline">Renommer</Button>
                  </div>
                </li>
              </ul>
            </DialogContent>
          </form>
        </Form>
      </Dialog> */}
    </AppLayout>
  );
}
