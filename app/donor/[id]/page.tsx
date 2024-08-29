"use client";

import PendonorBox from "@/components/fragment/donor/PendonorBox";
import PenerimaBox from "@/components/fragment/donor/PenerimaBox";
import GooglemapLayout from "@/components/layout/GooglemapLayout";
import Footer from "@/components/layout/landingpage/Footer";
import { Button } from "@/components/ui/button";
import { useLoadGoogleMaps } from "@/hooks/use-load-google-maps";
import { getCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const Page = () => {
  const { isLoaded, loadError } = useLoadGoogleMaps();
  const user = JSON.parse((getCookie("user") as string) ?? null);
  const router = useRouter();
  const data = {
    requestId: 12,
    penerima: {
      userId: "c71c97dc-3b6c-42a4-bdc0-6d7692d09261",
      name: "jhon doe",
      recipientAddress: "jalan jalan",
      bloodType: "A",
      quantity: 1,
      hospitalName: "rumah sakit TMC",
    },
    pendonor: {
      userID: "efgh",
      name: "Dimas Muhammad surya",
      donorAddress: "jalan jalan",
      bloodType: "A",
    },
  };

  useEffect(() => {
    if (!user) {
      router.push("/login");
    }
  }, [user]);

  return (
    <div className="px-3 py-5 md:py-5 md:px-10">
      <div className="w-full border-b-2 pb-2 ">
        <h1 className="text-3xl font-bold">Detail Donor</h1>
      </div>
      <div className="w-full flex flex-col md:flex-row py-7 gap-7">
        <div className="flex flex-col gap-7 w-full">
          <PenerimaBox penerima={data.penerima} />
          <PendonorBox pendonor={data.pendonor} />
          {user.id === data.penerima.userId && (
            <div className="flex gap-4">
              <Button className="w-full" variant={"outline"}>
                Batalkan
              </Button>
              <Button className="w-full">Selesai</Button>
            </div>
          )}
        </div>
        <GooglemapLayout
          isLoaded={isLoaded}
          loadError={loadError}
          rsPos={{ lat: 0, lng: 0 }}
        />
      </div>
      <Footer />
    </div>
  );
};

export default Page;
