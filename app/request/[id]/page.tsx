"use client";

import { DonorDialog } from "@/components/fragment/request/DonorDialog";
import IdentityDetail from "@/components/fragment/request/IdentityDetail";
import GooglemapLayout from "@/components/layout/GooglemapLayout";
import { Button } from "@/components/ui/button";
import useAxiosAuth from "@/hooks/use-axios-auth";
import { useLoadGoogleMaps } from "@/hooks/use-load-google-maps";
import { getRs } from "@/lib/fetch-map";
import { Position } from "@/types/requestTypes";
import { getCookie } from "cookies-next";
import Link from "next/link";
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
  const axios = useAxiosAuth();

  useEffect(() => {
    axios.get(`requests/${params.id}`).then(({ data }) => {
      setDetailData(data.data);
    });
  }, []);

  useEffect(() => {
    if (isLoaded && !!detailData) {
      getRs(detailData.hospital_name).then((data) => {
        setRumahSakitPos({
          lat: data.location?.lat() as number,
          lng: data.location?.lng() as number,
        });
      });
    }
  }, [detailData, isLoaded]);

  return (
    <div className="px-3 py-10 md:py-5 md:px-10">
      <div className="w-full border-b-2 pb-2 ">
        <h1 className="text-3xl font-bold">Detail Permintaan</h1>
      </div>
      <div className="py-8 flex md:flex-row flex-col gap-10">
        <GooglemapLayout
          loadError={loadError}
          isLoaded={isLoaded}
          rsPos={rumahSakitPos}
        />
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
          </div>
          <div className="flex gap-6 justify-center mt-5">
            <Link href="/request">
              <Button variant={"outline"}>Kembali</Button>
            </Link>
            <DonorDialog
              id={detailData?.id}
              bloodType={detailData?.blood_type as string}
              isDisabled={detailData?.status == "fulfilled"}
            />
          </div>
          <h1 className="text-center mt-2">
            {detailData?.status === "fulfilled"
              ? "Permintaan sedang dalam proses pemenuhan atau selesai"
              : ""}
          </h1>
        </div>
      </div>
    </div>
  );
};

export default Page;
