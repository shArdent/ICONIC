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
import { NewRequest } from "@/types/authTypes";
import axios from "axios";

const NewRequestConfirm = ({
  isLoading,
  newRequestData,
}: {
  isLoading: boolean;
  newRequestData: NewRequest | null;
}) => {
  const postNewRequest = () => {
    const newRequest = {
      name: newRequestData?.nama,
      bloodType: newRequestData?.golonganDarah,
      quantity: newRequestData?.kuantitas,
      hospitalName: newRequestData?.rumahSakit.displayName,
      latitude: newRequestData?.rumahSakit.koordinat.lat,
      longitude: newRequestData?.rumahSakit.koordinat.lng,
    };

    try {
      axios
        .post(process.env.NEXT_PUBLIC_NEW_REQUEST + "requests", newRequest, {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then((res) => {
          console.log(res);
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
