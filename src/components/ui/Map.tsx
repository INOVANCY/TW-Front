import { Icon, LatLng, LatLngExpression } from "leaflet";
import { useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  useMap,
  useMapEvents,
} from "react-leaflet";

import "leaflet/dist/leaflet.css";

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

  return null;
}

export default function TWMap({
  point,
  center,
  zoom,
  allowMovePoint,
  onPointEdit,
}: MapProps) {
  return (
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
      <ClickMarker allowMovePoint={allowMovePoint} onPointEdit={onPointEdit} />
      <MapUpdater />
    </MapContainer>
  );
}
