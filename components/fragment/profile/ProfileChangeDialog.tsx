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
import axios from "axios";

export function ProfileChangeDialog({ newData }: { newData: any }) {
  const axios = useAxiosAuth();
  const updateProfile = async () => {
    try {
      console.log(newData)
      axios.put("auth/me", newData).then((result) => console.log(result));
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button type="submit" className="self-end mt-5">
          Ubah Data
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
          <AlertDialogAction onClick={() => updateProfile()}>
            Konfirmasi
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
