"use client";

import PendonorBox from "@/components/fragment/donor/PendonorBox";
import PenerimaBox from "@/components/fragment/donor/PenerimaBox";
import GooglemapLayout from "@/components/layout/GooglemapLayout";
import useAxiosAuth from "@/hooks/use-axios-auth";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Loading from "../loading";
import { useLoadGoogleMaps } from "@/hooks/use-load-google-maps";
import { getRs } from "@/lib/fetch-map";
import { Button } from "@/components/ui/button";

const Page = () => {
  const [penerimaData, setPenerimaData] = useState<any>(null);
  const [pendonorData, setPendonorData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [rumahSakitPos, setRumahSakitPos] = useState<any>(null);
  const { loadError, isLoaded } = useLoadGoogleMaps();
  const router = useRouter();
  const queryParams = useSearchParams();
  const option = queryParams.get("option");
  const id = queryParams.get("id");

  const axios = useAxiosAuth();

  useEffect(() => {
    const controller = new AbortController();
    if (option === "Donor Darah") {
      axios
        .get(`donate/donation-detail/${id}`)
        .then(({ data }) => {
          console.log(data)
          setPendonorData(data.data[0].donor);
          setPenerimaData(data.data[0].request);
          setIsLoading(false);
        })
        .catch((err) => {
          console.log(err.response.data);
          if (err.request.status === 401) {
            router.push("/login");
          }
        });
    } else {
      axios
        .get(`donate/recipient/${id}`)
        .then(({ data }) => {
          setPendonorData(data.data[0].donor);
          setPenerimaData(data.data[0].request);
          setIsLoading(false);
        })
        .catch((err) => {
          console.log(err.response.data);
          if (err.request.status === 401) {
            router.push("/login");
          }
        });
    }

    return () => controller.abort();
  }, []);

  useEffect(() => {
    if (isLoaded && !!penerimaData) {
      getRs(penerimaData.hospital_name).then((data) => {
        setRumahSakitPos({
          lat: data.location?.lat() as number,
          lng: data.location?.lng() as number,
        });
      });
    }
  }, [penerimaData, isLoaded]);

  return (
    <div className="px-3 py-5 md:py-5 md:px-10">
      {isLoading ? (
        <Loading />
      ) : (
        <div>
          <div className="w-full pb-5 ">
            <h1 className="text-3xl font-bold border-b-2">Detail Donor</h1>
          </div>
          <div className="w-full flex flex-col md:flex-row gap-7">
            <div className="flex flex-col gap-4 w-full ">
              <div className="border-2 rounded-lg border-slate-200">
                <PenerimaBox penerima={penerimaData} />
                <PendonorBox pendonor={pendonorData} />
              </div>
              <Button
                className="font-bold"
                onClick={() => router.back( )}
              >
                {" "}
                Kembali
              </Button>
            </div>
            <GooglemapLayout
              isLoaded={isLoaded}
              loadError={loadError}
              rsPos={rumahSakitPos}
              marker={true}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Page;
