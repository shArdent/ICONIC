"use client";

import { Position } from "@/types/authTypes";
import { Libraries, useLoadScript } from "@react-google-maps/api";
import { useEffect, useState } from "react";

const libs: Libraries = ["places"];
export function useLoadGoogleMaps() {
  const [currentPosition, setCurrentPossition] = useState<Position | null>(
    null
  );

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY as string,
    libraries: libs,
  });

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setCurrentPossition({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      });
    });
  }, []);

  return { isLoaded, loadError, currentPosition };
}
