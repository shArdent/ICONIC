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
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z, ZodType } from "zod";
import GolonganDarahSelect from "./GolonganDarahSelect";
import useAxiosAuth from "@/hooks/use-axios-auth";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { DonorSchema } from "@/types/requestTypes";

const bloodtypeMatcher: { [key: string]: string[] } = {
  A: ["A", "AB", "O"],
  B: ["B", "AB", "O"],
  O: ["O"],
  AB: ["A", "B", "AB", "O"],
};

export function DonorDialog({
  requestId,
  requestUserId,
  bloodType,
  isDisabled,
}: {
  bloodType: string;
  requestId: number;
  requestUserId: string;
  isDisabled: boolean;
}) {
  const [bloodtypeError, setBloodtypeError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const axios = useAxiosAuth();
  const router = useRouter();

  const form = useForm<z.infer<typeof DonorSchema>>({
    resolver: zodResolver(DonorSchema),
  });

  const onSubmit = (values: z.infer<typeof DonorSchema>) => {
    setIsLoading(true);
    if (!bloodtypeMatcher[bloodType].includes(values.bloodType)) {
      setBloodtypeError(
        "Jenis darah tidak sesuai dengan golongan darah yang dipilih"
      );
      setIsLoading(false);
      return;
    }

    const payload = {
      ...values,
      requestUser: requestUserId,
    };

    console.log(payload);

    axios
      .post(`donate/${requestId}`, payload)
      .then((result) => {
        console.log(result);
        router.push(`/donor/${result.data.data[0].donor_id}`);
        setIsLoading(false);
      })
      .catch((err) => {
        if (err.request.status == 401) {
          router.push("/login");
        }
      });

    setBloodtypeError(null);
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button disabled={isDisabled} className="px-7">
          Donor
        </Button>
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
              name="donorName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nama Pendonor</FormLabel>
                  <Input
                    className="border-none shadow bg-[#f0f0f0]"
                    placeholder="Nama pendonor"
                    {...field}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>No Handphone Pendonor</FormLabel>
                  <Input
                    className="border-none shadow bg-[#f0f0f0]"
                    placeholder="08xxxxxxxx"
                    {...field}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="bloodType"
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
              name="donorAddress"
              render={({ field }) => (
                <FormItem className="">
                  <FormLabel className="text-[1em]">
                    Alamat Rumah Pendonor
                  </FormLabel>
                  <Input
                    className="border-none shadow bg-[#f0f0f0] w-full"
                    placeholder="Alamat Pendonor"
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
              <Button
                className={`${isLoading ? "opacity-80" : ""} px-7`}
                disabled={isLoading}
                type="submit"
              >
                {isLoading ? "Loading..." : "Donor"}
              </Button>
            </div>
          </form>
        </Form>
      </AlertDialogContent>
    </AlertDialog>
  );
}
