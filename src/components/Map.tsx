
import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { LatLngExpression } from "leaflet";

// Use a default blue marker icon, since Leaflet's default requires image imports
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

interface MapProps {
  height?: string;
  center?: [number, number];
  zoom?: number;
  markerPosition?: [number, number];
  markerPopup?: string;
}

// Define props that directly match what react-leaflet expects
interface MapContainerCustomProps {
  center: LatLngExpression;
  zoom: number;
  scrollWheelZoom?: boolean;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

// Define props for TileLayer to match expected structure
interface TileLayerCustomProps {
  url: string;
  attribution: string;
}

const Map = ({
  height = "400px",
  center = [37.7749, -122.4194], // Default to San Francisco
  zoom = 13,
  markerPosition,
  markerPopup
}: MapProps) => {
  // Using LatLngExpression type from Leaflet which is compatible with react-leaflet
  const centerPosition: LatLngExpression = center;
  const markerPos: LatLngExpression | undefined = markerPosition;

  // Create props objects that match the expected interfaces
  const mapContainerProps: MapContainerCustomProps = {
    center: centerPosition,
    zoom,
    scrollWheelZoom: true,
    style: { height: "100%", width: "100%" }
  };

  const tileLayerProps: TileLayerCustomProps = {
    url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  };

  return (
    <div style={{ height }} className="w-full rounded-md overflow-hidden shadow">
      <MapContainer {...mapContainerProps}>
        <TileLayer {...tileLayerProps} />
        {markerPos && 
          <Marker position={markerPos}>
            {markerPopup && <Popup>{markerPopup}</Popup>}
          </Marker>
        }
      </MapContainer>
    </div>
  );
};

export default Map;
