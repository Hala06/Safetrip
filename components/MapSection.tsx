import React, { useCallback } from "react";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";

const containerStyle = { width: "100%", height: "400px" };
const center = { lat: 40.7128, lng: -74.0060 };

export default function MapSection() {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY!,
    libraries: ["places"],
  });

  // Define the callback outside of conditional rendering
  const handleMapLoad = useCallback(() => {}, []);

  if (!isLoaded) {
    return <p className="text-center text-gray-400">Loading map…</p>;
  }
  
  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={12}
      onLoad={handleMapLoad}
    >
      <Marker position={center} />
      <Marker position={{ lat: 40.7306, lng: -73.9352 }} />
    </GoogleMap>
  );
}
