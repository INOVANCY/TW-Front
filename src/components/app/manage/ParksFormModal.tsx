import TWModal from "@/components/ui/Modal";
import TWCard from "@/components/ui/cards/Card";
import TWCardHeader from "@/components/ui/cards/CardHeader";
import TWButton from "@/components/ui/forms/Button";
import TWCheckbox from "@/components/ui/forms/Checkbox";
import TWInput from "@/components/ui/forms/Input";
import TWTextarea from "@/components/ui/forms/Textarea";
import TWTabPanel from "@/components/ui/tabs/TabPanel";
import TWTabs from "@/components/ui/tabs/Tabs";
import { TWTabsLabelsList } from "@/types/ui";
import {
  IconAdjustments,
  IconArrowDown,
  IconClock,
  IconMapPin,
  IconMoneybag,
  IconServer,
  IconX,
} from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Marker, TileLayer, useMap } from "react-leaflet";
import { MapContainer } from "react-leaflet/MapContainer";
import "leaflet/dist/leaflet.css";
import TWMap from "@/components/ui/Map";
import TWAlert from "@/components/ui/Alert";

export default function ParksFormModal() {
  // Formulaire
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data: any) => {
    console.log(data);
    reset();
  };

  // Tabs

  const [activeTab, setActiveTab] = useState(0);

  const tabsList: TWTabsLabelsList[] = [
    {
      label: "Informations générales",
      icon: <IconAdjustments />,
    },
    {
      label: "Tarifs",
      icon: <IconMoneybag />,
    },
    {
      label: "Localisation",
      icon: <IconMapPin />,
    },
  ];

  return (
    <TWModal onClose={() => console.log("close modal")} size="md">
      <TWCard>
        <TWCardHeader text="Ajouter un parc" />
        <TWTabs
          labels={tabsList}
          activeTab={activeTab}
          onClick={(index) => setActiveTab(index)}
        />
        <form onSubmit={handleSubmit(onSubmit)}>
          <TWTabPanel activeTab={activeTab} index={0}>
            <TWInput
              type="text"
              name="name"
              label="Nom du parc"
              errors={errors}
              register={register}
              validationSchema={{
                required: "Le nom du parc est requis",
                minLength: {
                  value: 5,
                  message:
                    "Rappel: le nom du parc doit contenir au moins 5 caractères",
                },
              }}
            />
            <TWTextarea
              name="description"
              label="Court résumé de l'histoire du parc"
              errors={errors}
              register={register}
              validationSchema={{
                required: "Le court résumé de l'histoire du parc est requise",
                minLength: {
                  value: 50,
                  message:
                    "Rappel: le court résumé de l'histoire du parc doit faire 50 caractères minimum",
                },
              }}
              className="mt-4"
            />
          </TWTabPanel>
          <TWTabPanel activeTab={activeTab} index={1}>
            <TWInput
              type="number"
              name="prices_season"
              label="Période de validité (saison) des tarifs"
              errors={errors}
              register={register}
              validationSchema={{
                max: {
                  value: 2099,
                  message:
                    "La période de validité doit être une année. Exemple: 2021",
                },
                min: {
                  value: 1800,
                  message:
                    "La période de validité doit être une année. Exemple: 2021",
                },
              }}
            />
            <div className="flex my-3 text-slate-300 justify-between">
              <IconArrowDown />
              <IconArrowDown />
              <IconArrowDown />
            </div>

            <div className="grid grid-cols-3 gap-x-2 gap-y-4">
              <TWInput
                type="number"
                name="child_ticket_price"
                label="Prix du ticket enfant"
                errors={errors}
                register={register}
                validationSchema={{
                  min: {
                    value: 0,
                    message: "Le prix enfant doit être supérieur à 0",
                  },
                }}
              />
              <TWInput
                type="number"
                name="adult_ticket_price"
                label="Prix du ticket adulte"
                errors={errors}
                register={register}
                validationSchema={{
                  min: {
                    value: 0,
                    message: "Le prix adulte doit être supérieur à 0",
                  },
                }}
              />
              <TWInput
                type="number"
                name="special_ticket_price"
                label="Prix du ticket 'spécial'"
                errors={errors}
                register={register}
                validationSchema={{
                  min: {
                    value: 1,
                    message: "Le prix spécial doit être supérieur à 0",
                  },
                }}
              />
              <TWCheckbox
                name="early_bird_offer"
                label="Le parc propose une offre d'achat anticipé"
                errors={errors}
                register={register}
                validationSchema={{}}
                className="col-span-3"
              />
              <TWCheckbox
                name="promo_code_offer"
                label="Le parc propose parfois des promotions"
                errors={errors}
                register={register}
                validationSchema={{}}
                className="col-span-3"
              />
              <TWCheckbox
                name="is_free"
                label="L'entrée au parc est gratuite"
                errors={errors}
                register={register}
                validationSchema={{}}
                className="col-span-3"
              />
            </div>
          </TWTabPanel>
          <TWTabPanel activeTab={activeTab} index={2}>
            <TWAlert
              type="info"
              size="sm"
              message="Pour changer les informations de localisation, repositionnez les points sur la carte. Le champ d'adresse ne sert qu'à la navigation dans la carte, il n'est pas prit en compte."
            />
            <TWInput
              type="text"
              name="address"
              label="Adresse du parc"
              errors={errors}
              register={register}
              validationSchema={{}}
              className="mb-4"
            />
            <div className="aspect-video z-50">
              <TWMap />
            </div>
          </TWTabPanel>
          <hr className="mt-4 mb-2" />
          <div className="w-full flex items-center justify-end gap-2">
            <TWButton type="submit" text="Ajouter le parc" />
          </div>
        </form>
      </TWCard>
    </TWModal>
  );
}
