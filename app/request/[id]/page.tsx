"use client";

import IdentityDetail from "@/components/fragment/request/IdentityDetail";
import GooglemapLayout from "@/components/layout/GooglemapLayout";
import { Button } from "@/components/ui/button";
import { useLoadGoogleMaps } from "@/hooks/use-load-google-maps";
import { getRs } from "@/lib/fetch-map";
import { Position } from "@/types/requestTypes";
import axios from "axios";
import { useEffect, useState } from "react";

type DetailRecipient = {
  name: string;
  blood_type: string;
  id: number;
  hospital_name: string;
  jumlah_terpenuhi: number | null;
  quantity: number;
  recipient_address: string;
  request_at: string;
  status: string | null;
  user_id: string;
};

const Page = ({ params }: { params: { id: string } }) => {
  const [detailData, setDetailData] = useState<DetailRecipient | null>(null);
  const [rumahSakitPos, setRumahSakitPos] = useState<Position | null>(null);

  const { isLoaded, loadError } = useLoadGoogleMaps();

  useEffect(() => {
    axios
      .get(process.env.NEXT_PUBLIC_API_URL + `requests/${params.id}`, {
        headers: {
          "Content-Type": "aplication/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then(({ data }) => {
        setDetailData(data.data);
        console.log(data.data);
      });
  }, []);

  useEffect(() => {
    if (isLoaded && !!detailData) {
      getRs(detailData.hospital_name).then((data) => {
        setRumahSakitPos({
          lat: data.location?.lat(),
          lng: data.location?.lng(),
        });
      });
    }
  }, [detailData, isLoaded]);

  return (
    <div className="px-10 mt-7 w-full">
      <div className="w-full border-b-2 pb-2 ">
        <h1 className="text-3xl font-bold">Detail Permintaan</h1>
      </div>
      <div className="py-8 flex md:flex-row flex-col gap-10">
        <GooglemapLayout isLoaded={isLoaded} rsPos={rumahSakitPos} />
        <div className="flex flex-col bg-slate-100 p-3 shadow-lg rounded-lg">
          <h1 className="text-3xl font-bold mb-5">Identitas Penerima :</h1>
          <div className="grid grid-cols-2 w-full gap-5">
            <div className="grid grid-cols-1 gap-5">
              <IdentityDetail label="Nama" value={detailData?.name as string} />
              <IdentityDetail
                label="Alamat Penerima"
                value={detailData?.recipient_address as string}
              />
              <IdentityDetail
                label="Tanggal Permintaan Dibuat"
                value={detailData?.request_at.split("T")[0] as string}
              />
              <IdentityDetail
                label="Status"
                value={detailData?.status as string}
              />
            </div>
            <div className="grid grid-cols-1 gap-5">
              <IdentityDetail
                label={"Golongan Darah"}
                value={detailData?.blood_type as string}
              />
              <IdentityDetail
                value={detailData?.hospital_name as string}
                label="Rumah Sakit"
              />
              <IdentityDetail
                value={detailData?.quantity as number}
                label="Kantung Darah Dibutuhkan"
              />
              <IdentityDetail
                value={detailData?.jumlah_terpenuhi as number}
                label="Kantung Darah Terpenuhi"
              />
            </div>
            <Button className="ml-auto">Donorkan</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
