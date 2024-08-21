"use client";

import useAxiosAuth from "@/hooks/use-axios-auth";
import { useLoadGoogleMaps } from "@/hooks/use-load-google-maps";
import { useEffect, useState } from "react";
import { GoogleMap } from "@react-google-maps/api";
import GooglemapLayout from "@/components/layout/GooglemapLayout";

const Page = () => {
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const { isLoaded, loadError } = useLoadGoogleMaps();
  const axios = useAxiosAuth();

  useEffect(() => {
    axios.get("donations").then((res) => {
      console.log(res);
    });
  });

  return (
    <div>
      <div>
        {/* <GooglemapLayout isLoaded={isLoaded} loadError={loadError} rsPos={} /> */}
        page
      </div>
    </div>
  );
};

export default Page;
