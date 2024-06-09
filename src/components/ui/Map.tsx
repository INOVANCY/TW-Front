import { Icon, LatLng, LatLngExpression } from "leaflet";
import { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  useMap,
  useMapEvents,
} from "react-leaflet";

import "leaflet/dist/leaflet.css";
import { Input } from "./input";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import { Button } from "./button";
import { IconCaretUpDown, IconCheck } from "@tabler/icons-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "./command";
import { cn } from "@/lib/utils";
import { useDebounce } from "use-debounce";
import ManageParkService from "@/services/manage/ManageParkService";
import { number } from "zod";

const customIcon = new Icon({
  iconUrl: "/point.svg",
  iconSize: [30, 30],
  iconAnchor: [15, 15],
});

type MapProps = {
  point: [number, number];
  center: [number, number];
  zoom: number;
  allowMovePoint: boolean;
  onPointEdit: (newPosition: [number, number]) => void;
};

type Results = {
  display_name: string;
  lat: number;
  lon: number;
};

export default function TWMap({
  point,
  center,
  zoom,
  allowMovePoint,
  onPointEdit,
}: MapProps) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [debouncedQuery] = useDebounce(query, 500);
  const [view, setView] = useState<[number, number]>([0, 0]);
  const [results, setResults] = useState<Results[]>([]);

  function ClickMarker({
    allowMovePoint,
    onPointEdit,
  }: {
    allowMovePoint: boolean;
    onPointEdit: (newPosition: [number, number]) => void;
  }) {
    useMapEvents({
      click: (e) => {
        if (allowMovePoint) {
          onPointEdit([e.latlng.lat, e.latlng.lng]);
        }
      },
    });

    return null;
  }

  function MapUpdater() {
    const map = useMap();
    useEffect(() => {
      map.invalidateSize();
    }, []);

    useEffect(() => {
      map.setView(view, 13);
    }, [view]);

    return null;
  }

  useEffect(() => {
    if (!debouncedQuery && !(debouncedQuery !== "")) return;
    ManageParkService.getCoordinatesFromAddress(debouncedQuery)
      .then((response) => {
        const filteredResults = response.data
          .filter(
            (item: any) =>
              item.hasOwnProperty("display_name") &&
              item.hasOwnProperty("lat") &&
              item.hasOwnProperty("lon")
          )
          .map((item: any) => ({
            display_name: item.display_name,
            lat: item.lat,
            lon: item.lon,
          }));
        setResults(filteredResults);
        console.log(filteredResults);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [debouncedQuery]);

  return (
    <div>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild className="mb-4">
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-[500px] justify-between"
          >
            Rechercher une adresse ou un lieu
            <IconCaretUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[500px] p-0">
          <Command>
            <CommandInput
              placeholder="Rechercher une adresse ou un lieu..."
              value={query}
              onValueChange={setQuery}
            />
            <CommandList>
              <CommandEmpty>No framework found.</CommandEmpty>
              <CommandGroup>
                {results.map((result, index) => (
                  <CommandItem
                    key={index}
                    onSelect={() => {
                      setOpen(false);
                      setView([result.lat, result.lon]);
                    }}
                  >
                    {result.display_name}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
      <div className="w-full h-52">
        <MapContainer
          center={center}
          zoom={zoom}
          className="w-full h-full rounded-md"
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          />
          <Marker position={point} icon={customIcon} />
          <ClickMarker
            allowMovePoint={allowMovePoint}
            onPointEdit={onPointEdit}
          />
          <MapUpdater />
        </MapContainer>
      </div>
    </div>
  );
}
