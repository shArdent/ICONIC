"use client"

import {
  AlertDialog,
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
import useAxiosAuth from "@/hooks/use-axios-auth";
import { DoneSchema } from "@/types/requestTypes";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const FinishDialog = ({ reqId } : { reqId: number }) => {
  const axios = useAxiosAuth();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const form = useForm<z.infer<typeof DoneSchema>>({
    resolver: zodResolver(DoneSchema),
  });

  const onSubmit = (values: z.infer<typeof DoneSchema>) => {
    setIsLoading(true);

    axios.post(`requests/finish/${reqId}`, values).then((result) => {
      console.log(result);
      setIsLoading(false);
      router.push("/request");
    });
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className="w-full">Selesai</Button>
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
              name="jumlahTerpenuhi"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Jumlah darah didapat</FormLabel>
                  <Input
                    className="border-none shadow bg-[#f0f0f0]"
                    placeholder="Contoh : 3"
                    type="number"
                    {...field}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex gap-3 justify-end">
              <AlertDialogCancel className="h-10 px-6 py-2">
                Batal
              </AlertDialogCancel>
              <Button
                className={`${isLoading ? "opacity-80" : ""}`}
                disabled={isLoading}
                type="submit"
              >
                {isLoading ? "Loading..." : "Selesai"}
              </Button>
            </div>
          </form>
        </Form>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default FinishDialog;
