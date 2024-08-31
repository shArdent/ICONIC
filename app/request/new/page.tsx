"use client";

import GolonganDarahSelect from "@/components/fragment/request/GolonganDarahSelect";
import NewRequestConfirm from "@/components/fragment/request/NewRequestConfirm";
import { RsSearch } from "@/components/fragment/request/RsComboBox";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { NewRequest, NewRequestSchema } from "@/types/requestTypes";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const NewRequestPage = () => {
  const [newRequestData, setNewRequestData] = useState<NewRequest | null>(null);
  const [error, setError] = useState<string | null>(null);
  const form = useForm<z.infer<typeof NewRequestSchema>>({
    resolver: zodResolver(NewRequestSchema),
  });

  const onSubmit = (values: z.infer<typeof NewRequestSchema>) => {
    setNewRequestData(values);
  };

  return (
    <div className="h-screen flex flex-col items-center bg-slate-100 p-5 md:py-7">
      <div className="w-full md:w-[75%]">
        <h1 className="text-left text-3xl font-medium mb-5 md:text-4xl ">
          Buat Permintaan Darah
        </h1>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col md:grid md:grid-cols-2 w-full gap-8 bg-white px-7 py-5 rounded-lg shadow md:w-[75%]"
        >
          <FormField
            control={form.control}
            name="nama"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[1em]">Nama Penerima</FormLabel>
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
            name="golonganDarah"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[1em]">Golongan Darah</FormLabel>
                <GolonganDarahSelect field={field} />
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="kuantitas"
            render={({ field }) => (
              <FormItem className="">
                <FormLabel className="text-[1em]">
                  Kuantitas darah diperlukan (satuan labu)
                </FormLabel>
                <Input
                  className="border-none shadow bg-[#f0f0f0] w-full"
                  placeholder="contoh : 2"
                  type="number"
                  {...field}
                />
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="alamat"
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
          <FormField
            control={form.control}
            name="rumahSakit"
            render={() => (
              <FormItem className="flex flex-col w-full md:col-span-2">
                <FormLabel className="text-[1em]">Rumah Sakit</FormLabel>
                <RsSearch form={form} />
                <FormMessage />
              </FormItem>
            )}
          />
          <NewRequestConfirm
            newRequestData={newRequestData}
            setError={setError}
          />
          {error && <p className="text-destructive">{error}</p>}
        </form>
      </Form>
    </div>
  );
};

export default NewRequestPage;
