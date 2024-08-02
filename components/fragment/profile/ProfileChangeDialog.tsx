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
import axios from "axios";

export function ProfileChangeDialog({ newData }: { newData: any }) {
  const updateProfile = async () => {
    try {
      const response = await axios.put(
        process.env.NEXT_PUBLIC_API_URL + "auth/me", 
        newData, {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Beare " + localStorage.getItem("token"),
          },
        }
      );
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button type="submit" className="self-end mt-5">Ubah Data</Button>
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
