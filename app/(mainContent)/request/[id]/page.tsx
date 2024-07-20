"use client";

import { useEffect, useState } from "react";
import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";

const containerStyle = {
  width: "400px",
  height: "400px",
};

const center = {
  lat: -3.745,
  lng: -38.523,
};

const page = ({ params }: { params: { id: string } }) => {
  const [map, setMap] = useState<any>(null);

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY as string,
  });

  useEffect(() => {
    // fetch(process.env.NEXT_PUBLIC_API_URL + "request/" + params.id, {
    //   method: "GET",
    //   headers: {
    //     "Content-Type": "application/json",
    //     "Authorization": "Bearer " + localStorage.getItem("token"),
    //   },
    // });
  });
  return (
    <div>
      {isLoaded && (
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={10}
          onLoad={(map) => {
            setMap(map);
          }}
        ></GoogleMap>
      )}
    </div>
  );
};

export default page;
