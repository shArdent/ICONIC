"use client";

import Loading from "@/app/loading";
import FinishDialog from "@/components/fragment/donor/FinishDialog";
import PendonorBox from "@/components/fragment/donor/PendonorBox";
import PenerimaBox from "@/components/fragment/donor/PenerimaBox";
import GooglemapLayout from "@/components/layout/GooglemapLayout";
import Footer from "@/components/layout/landingpage/Footer";
import { Button } from "@/components/ui/button";
import useAxiosAuth from "@/hooks/use-axios-auth";
import { useLoadGoogleMaps } from "@/hooks/use-load-google-maps";
import { getRs } from "@/lib/fetch-map";
import { getCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Page = ({ params }: { params: { id: string } }) => {
  const { isLoaded, loadError } = useLoadGoogleMaps();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [user, setUser] = useState<any>(null);
  const router = useRouter();
  const axios = useAxiosAuth();
  const [pendonorData, setPendonorData] = useState<any>(null);
  const [penerimaData, setPenerimaData] = useState<any>(null);
  const [rumahSakitPos, setRumahSakitPos] = useState<any>(null);

  useEffect(() => {
    const controller = new AbortController();
    setUser(JSON.parse((getCookie("user") as string) ?? null));

    axios
      .get(`donations/processed/${params.id}`)
      .then(({ data }) => {
        console.log(data);
        console.log(data.data[0]);
        // if (data.data[0].request.status === "Tercukupi") {
        //   router.push(`/finished/${data.data[0].request.id}`);
        // }
        setPendonorData(data.data[0].donor);
        setPenerimaData(data.data[0].request);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        if (err.request.status === 401) {
          router.push("/login");
        }
        if (err.request.status === 404) {
          router.push("/notfound");
        }
      });

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

  const handleCancel = () => {
    axios
      .delete(`donate/cancel/${params.id}`)
      .then((res) => {
        console.log(res);
        router.push("/request");
      })
      .catch((err) => {
        console.log(err);
        if (err.request.status === 401) {
          router.push("/login");
        }
      });
  };

  return (
    <div className="px-3 py-5 md:py-5 md:px-10">
      {isLoading ? (
        <Loading />
      ) : (
        <div>
          <div className="w-full border-b-2 pb-2 ">
            <h1 className="text-3xl font-bold">Detail Donor</h1>
          </div>
          <div className="w-full flex flex-col md:flex-row py-7 gap-7">
            <div className="flex flex-col gap-7 w-full">
              <div className="border-2 rounded-lg bg-slate-100">
                <PenerimaBox penerima={penerimaData} />
                <PendonorBox pendonor={pendonorData} />
              </div>
              {user
                ? user.id === penerimaData.user_id && (
                    <div className="flex gap-4">
                      <Button
                        onClick={handleCancel}
                        className="w-full"
                        variant={"outline"}
                      >
                        Batalkan
                      </Button>
                      <FinishDialog reqId={penerimaData.id} />
                    </div>
                  )
                : null}
            </div>
            <GooglemapLayout
              isLoaded={isLoaded}
              loadError={loadError}
              rsPos={rumahSakitPos}
            />
          </div>
          <Footer />
        </div>
      )}
    </div>
  );
};

export default Page;
