"use client";

import { useState } from "react";
import {
  GoogleMap,
  Libraries,
  MarkerF,
  useJsApiLoader,
} from "@react-google-maps/api";
import { Position } from "@/types/authTypes";
import { useLoadGoogleMaps } from "@/hooks/use-load-google-maps";

const containerStyle = {
  width: "400px",
  height: "400px",
};

const libs: Libraries = ["places"];

const Page = ({ params }: { params: { id: string } }) => {
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [places, setPlaces] = useState<google.maps.places.PlaceResult[] | null>(
    null
  );
  const [service, setService] =
    useState<google.maps.places.PlacesService | null>(null);

  const { isLoaded, loadError, currentPosition } = useLoadGoogleMaps();

  const tasik: Position = {
    lat: -7.328647900226865,
    lng: 108.23270650372348,
  };

  return (
    <div>
      {isLoaded && (
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={tasik}
          zoom={10}
          options={{
            zoomControl: true,
            streetViewControl: false,
            fullscreenControl: false,
            mapTypeControl: false,
          }}
          onLoad={(map) => {
            setMap(map);
          }}
        >
          <MarkerF position={currentPosition as Position} />
        </GoogleMap>
      )}
    </div>
  );
};

export default Page;
