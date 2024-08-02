"use client";

import { Position } from "@/types/requestTypes";
import { Libraries, useLoadScript } from "@react-google-maps/api";
import { useEffect, useState } from "react";

const libs: Libraries = ["places"];

export function useLoadGoogleMaps() {

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY as string,
    libraries: libs,
  });

  return { isLoaded, loadError };
}
