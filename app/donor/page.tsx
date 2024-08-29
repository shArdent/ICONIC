"use client";

import useAxiosAuth from "@/hooks/use-axios-auth";
import { useLoadGoogleMaps } from "@/hooks/use-load-google-maps";
import { useEffect, useState } from "react";
import GooglemapLayout from "@/components/layout/GooglemapLayout";
import { User } from "@/types/authTypes";
import { getCookie } from "cookies-next";

const Page = () => {
  const [user, setUser] = useState<User | null>(null);
  const { isLoaded, loadError } = useLoadGoogleMaps();
  const axios = useAxiosAuth();

  useEffect(() => {
    const user = getCookie("user");

    if (user) {
      setUser(JSON.parse(user as string));
      console.log(JSON.parse(user as string));
    }

    // axios.get(`donate/dono  ` ).then((res) => {
    //   console.log(res);
    // });
  }, []);

  return (
    <div>
      <div>
        <GooglemapLayout
          isLoaded={isLoaded}
          loadError={loadError}
          rsPos={{ lat: 0, lng: 0 }}
        />
        page
      </div>
    </div>
  );
};

export default Page;
