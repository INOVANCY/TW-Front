import { Icon, LatLng, LatLngExpression } from "leaflet";
import { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  useMap,
  useMapEvents,
} from "react-leaflet";

const customIcon = new Icon({
  iconUrl: "/point.svg", // URL de l'image du point de couleur
  iconSize: [30, 30], // Taille du point
  iconAnchor: [15, 15], // Point du point qui correspondra à la position du marqueur
});

function ClickMarker() {
  const [position, setPosition] = useState<LatLng | null>(null);

  const map = useMapEvents({
    click: (e) => {
      setPosition(e.latlng);
      console.log(`Latitude: ${e.latlng.lat}, Longitude: ${e.latlng.lng}`);
    },
  });

  return position === null ? null : (
    <Marker position={position} icon={customIcon} />
  );
}

function MapUpdater() {
  const map = useMap();

  useEffect(() => {
    map.invalidateSize();
  }, []);

  return null;
}

export default function TWMap() {
  return (
    <MapContainer
      center={[48.8566, 2.3522]}
      zoom={6}
      className="h-full w-full rounded-lg shadow-md"
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />
      <ClickMarker />
      <MapUpdater />
    </MapContainer>
  );
}
