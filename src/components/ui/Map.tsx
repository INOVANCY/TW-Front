import { Icon, LatLng, LatLngExpression } from "leaflet";
import { use, useEffect, useRef, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  useMap,
  useMapEvents,
  MapContainerProps,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import { Button } from "./button";
import { IconCaretUpDown } from "@tabler/icons-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "./command";
import { useDebounce } from "use-debounce";
import ManageParkService from "@/services/manage/ManageParkService";
import Loader from "./loader";

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
  // Adress search
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState<string>("");
  const [debouncedQuery] = useDebounce<string>(query, 500);
  const [view, setView] = useState<[number, number] | null>(null);
  const [results, setResults] = useState<Results[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Map Updater, View Setter and Click Handler
  function MapUpdater() {
    const map = useMap();

    useEffect(() => {
      if (view !== null) {
        map.setView(view, map.getZoom());
        setView(null);
      }
    }, [view, map]);

    useEffect(() => {
      const handleClick = (e: any) => {
        if (allowMovePoint) {
          onPointEdit([e.latlng.lat, e.latlng.lng]);
        }
      };

      map.on("click", handleClick);

      return () => {
        map.off("click", handleClick);
      };
    }, [allowMovePoint, onPointEdit, map]);

    useEffect(() => {
      map.invalidateSize();
    }, [map]);
    return null;
  }

  // Get coordinates from address
  useEffect(() => {
    if (!debouncedQuery) return;
    if (debouncedQuery.length < 3) {
      setResults([]);
      return;
    }
    setIsLoading(true);
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
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [debouncedQuery]);

  return (
    <div className="w-full">
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
              <CommandEmpty>
                {isLoading ? (
                  <span className="flex items-center justify-center">
                    <Loader size={18} /> Chargement en cours...
                  </span>
                ) : (
                  "Aucune adresse trouvée."
                )}
              </CommandEmpty>
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
          <MapUpdater />
        </MapContainer>
      </div>
    </div>
  );
}
