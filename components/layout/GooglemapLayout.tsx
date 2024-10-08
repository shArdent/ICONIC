"use client";

import { useEffect, useState } from "react";
import { DirectionsRenderer, GoogleMap, Marker } from "@react-google-maps/api";
import { Position } from "@/types/requestTypes";

const containerStyle = {
  width : "100%",
  minWidth: "300px",
  height: "100%",
  minHeight: "300px",
  borderRadius: "10px",
};

const GooglemapLayout = ({
  rsPos,
  isLoaded,
  loadError,
  marker,
}: {
  marker? :any;
  loadError: Error | undefined;
  rsPos: Position | null;
  isLoaded: boolean;
}) => {
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [directionResponse, setDirectionResponse] = useState<
    google.maps.DirectionsResult | undefined
  >(undefined);

  const tasik: any = {
    lat: -7.328647900226865,
    lng: 108.23270650372348,
  };

  const hitungRute = async (currentPos: Position) => {
    if (!!map && !!rsPos) {
      const directionsService = new google.maps.DirectionsService();
      const result = await directionsService.route({
        origin: currentPos,
        destination: rsPos,
        travelMode: google.maps.TravelMode.DRIVING,
      });

      setDirectionResponse(result);
    }
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const currentPosition = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        hitungRute(currentPosition);
      });
    }
  }, [map, rsPos]);

  if (loadError)
    return (
      <div className="w-full h-full flex items-center justify-center">
        <h1>Map gagal dimuat</h1>
      </div>
    );

  return (
    <div>
      {isLoaded && (
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={marker ? rsPos : tasik}
          zoom={14}
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
          {marker ? <Marker position={rsPos as any} /> : <DirectionsRenderer directions={directionResponse} />}
          
        </GoogleMap>
      )}
    </div>
  );
};

export default GooglemapLayout;
