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
import { NewRequest } from "@/types/requestTypes";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

const NewRequestConfirm = ({
  newRequestData,
}: {
  newRequestData: NewRequest | null;
}) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const postNewRequest = () => {
    const newRequest = {
      name: newRequestData?.nama,
      recipientAddress: newRequestData?.alamat,
      bloodType: newRequestData?.golonganDarah,
      quantity: newRequestData?.kuantitas,
      hospitalName: newRequestData?.rumahSakit.displayName,
      latitude: newRequestData?.rumahSakit.koordinat.lat,
      longitude: newRequestData?.rumahSakit.koordinat.lng,
    };

    console.log(newRequest);

    try {
      setIsLoading(true);
      axios
        .post(
          "https://donate-blood-api-development.up.railway.app/api/v1/requests",
          newRequest,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        )
        .then((res) => {
          console.log(res);
          setIsLoading(false);
          router.push("/request");
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          className={isLoading ? "opacity-60" : ""}
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
