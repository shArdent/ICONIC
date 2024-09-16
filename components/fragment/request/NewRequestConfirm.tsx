"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import useAxiosAuth from "@/hooks/use-axios-auth";
import { NewRequest } from "@/types/requestTypes";
import { useRouter } from "next/navigation";
import { useState } from "react";

const NewRequestConfirm = ({
  newRequestData,
  setError,
}: {
  newRequestData: NewRequest | null;
  setError: React.Dispatch<React.SetStateAction<string | null>>;
}) => {
  const axios = useAxiosAuth();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const postNewRequest = () => {
    const newRequest = {
      name: newRequestData?.nama,
      recipientAddress: newRequestData?.alamat,
      bloodType: newRequestData?.golonganDarah,
      quantity: newRequestData?.kuantitas,
      phone: newRequestData?.phone,
      hospitalName: newRequestData?.rumahSakit.displayName,
      latitude: newRequestData?.rumahSakit.koordinat.lat,
      longitude: newRequestData?.rumahSakit.koordinat.lng,
    };

    console.log(newRequest)

    setIsLoading(true);
    axios
      .post("requests", newRequest)
      .then((res) => {
        console.log(res);
        setIsLoading(false);
        router.push("/request");
      })
      .catch((err) => {
        console.log(err.request.status)
        if (err.request.status === 401) {
          router.push("/login");
        };
        setError("Gagal menambahkan request. Coba kembali nanti");
        setIsLoading(false);
      });
      setIsLoading(false);
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          className={`${isLoading && "animate-pulse "} px-4 relative w-36 rigth-0 col-end-3 self-end justify-self-end`}
          disabled={isLoading}
          type="submit"
        >
          {isLoading ? "Loading..." : "Submit"}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Apakah data yang anda masukan sudah benar?
          </AlertDialogTitle>
          <AlertDialogDescription>
            Pastikan data yang anda masukan sudah sesuai dengan data pribadi
            yang ada pada kartu tanda penduduk maupun kartu keluarga
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel type="button">Batalkan</AlertDialogCancel>
          <AlertDialogAction onClick={() => postNewRequest()}>
            Konfirmasi
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default NewRequestConfirm;
