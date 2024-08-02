"use client";

import { useEffect, useState } from "react";
import { DirectionsRenderer, GoogleMap } from "@react-google-maps/api";
import { Position } from "@/types/requestTypes";

const containerStyle = {
  width: "400px",
  height: "100%",
  borderRadius: "10px",
};

const GooglemapLayout = ({
  rsPos,
  isLoaded,
}: {
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

  return (
    <div>
      {isLoaded && (
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={tasik}
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
          <DirectionsRenderer directions={directionResponse} />
        </GoogleMap>
      )}
    </div>
  );
};

export default GooglemapLayout;
