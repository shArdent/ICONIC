import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { DonorSchema } from "@/types/requestTypes";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import GolonganDarahSelect from "./GolonganDarahSelect";
import useAxiosAuth from "@/hooks/use-axios-auth";
import { useRouter } from "next/navigation";
import { useState } from "react";

const bloodtypeMatcher: { [key: string]: string[] } = {
  A: ["A", "AB"],
  B: ["B", "AB"],
  O: ["O"],
  AB: ["A", "B", "AB", "O"],
};

export function DonorDialog({
  id,
  bloodType,
  isDisabled,
}: {
  bloodType: string;
  id: number | undefined;
  isDisabled: boolean;
}) {
  const [bloodtypeError, setBloodtypeError] = useState<string | null>(null);
  const axios = useAxiosAuth();
  const router = useRouter();

  const form = useForm<z.infer<typeof DonorSchema>>({
    resolver: zodResolver(DonorSchema),
  });

  const onSubmit = (values: z.infer<typeof DonorSchema>) => {
    if (!bloodtypeMatcher[bloodType].includes(values.blood_type)) {
      setBloodtypeError(
        "Jenis darah tidak sesuai dengan golongan darah yang dipilih"
      );
      return;
    }
    console.log(values);

    // axios.post(`donate/${id}`, values).then(({ data }) => {
    //   router.push(`/donor/${data.id}`);
    // });

    setBloodtypeError(null);
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button disabled={isDisabled}>Donor</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Konfirmasi Donor Darah</AlertDialogTitle>
        </AlertDialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-5"
          >
            <FormField
              control={form.control}
              name="donor_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nama Pendonor</FormLabel>
                  <Input
                    className="border-none shadow bg-[#f0f0f0]"
                    placeholder="Nama penerima donor"
                    {...field}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="blood_type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[1em]">Golongan Darah</FormLabel>
                  <GolonganDarahSelect field={field} />
                  {bloodtypeError && (
                    <h1 className="text-sm font-medium text-destructive">
                      {bloodtypeError}
                    </h1>
                  )}
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="donor_Address"
              render={({ field }) => (
                <FormItem className="">
                  <FormLabel className="text-[1em]">
                    Alamat Rumah Penerima
                  </FormLabel>
                  <Input
                    className="border-none shadow bg-[#f0f0f0] w-full"
                    placeholder="Alamat penerima donor"
                    {...field}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex gap-3 justify-end">
              <AlertDialogCancel className="h-10 px-6 py-2">
                Cancel
              </AlertDialogCancel>
              <Button type="submit">Donor</Button>
            </div>
          </form>
        </Form>
      </AlertDialogContent>
    </AlertDialog>
  );
}
