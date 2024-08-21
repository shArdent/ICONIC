"use client";

import JenisKelaminSelect from "@/components/fragment/profile/JenisKelaminSelect";
import ProfileCalendar from "@/components/fragment/profile/ProfileCalendar";
import { ProfileChangeDialog } from "@/components/fragment/profile/ProfileChangeDialog";
import GolonganDarahSelect from "@/components/fragment/request/GolonganDarahSelect";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { profileDataSchema, User } from "@/types/authTypes";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { TypeOf, z } from "zod";
import useAxiosAuth from "@/hooks/use-axios-auth";
import { deleteCookie } from "cookies-next";

const ProfilePage = () => {
  const [profileData, SetProfileData] = useState<User | null>(null);
  const [newProfileData, SetNewProfileData] = useState<any | null>(null);
  const axios = useAxiosAuth();

  const router = useRouter();

  useEffect(() => {
    axios
      .get("auth/me")
      .then(({ data }) => {
        console.log(data);
        SetProfileData(data.user);
      })
      .catch((err) => {
        if (err) {  
          router.push("/login");
        }
      });
  }, []);

  useEffect(() => {
    form.reset(profileData as TypeOf<typeof profileDataSchema>);
  }, [profileData]);

  const form = useForm<z.infer<typeof profileDataSchema>>({
    resolver: zodResolver(profileDataSchema),
    defaultValues: useMemo(() => {
      return profileData as TypeOf<typeof profileDataSchema>;
    }, [profileData]),
  });

  const onSubmit = (values: z.infer<typeof profileDataSchema>) => {
    const { id, ...rest } = values;
    console.log(rest);
    SetNewProfileData(rest);
  };

  return (
    <div className="w-full h-auto bg-white shadow py-5 px-10">
      <h1 className="font-semibold text-4xl mb-3">Profil Saya</h1>
      <p className="text-sm mb-4">
        Kelola informasi profil Anda untuk mengontrol, melindungi dan
        mengamankan akun
      </p>
      <div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full flex flex-col items-center gap-2"
          >
            <FormField
              control={form.control}
              name="id"
              render={({ field }) => (
                <FormItem className="gap-10 flex w-full">
                  <FormLabel className=" text-right self-center w-[14%]">
                    Id
                  </FormLabel>
                  <Input
                    className="border-none shadow bg-[#f0f0f0]"
                    disabled
                    {...field}
                  />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem className="gap-10 flex w-full">
                  <FormLabel className=" text-right self-center w-[14%]">
                    Username
                  </FormLabel>
                  <Input
                    placeholder="Username anda"
                    className="border-none shadow bg-[#f0f0f0]"
                    disabled
                    {...field}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="gap-10 flex w-full">
                  <FormLabel className=" text-right self-center w-[14%]">
                    Username
                  </FormLabel>
                  <Input
                    placeholder="Username anda"
                    type="email"
                    className="border-none shadow bg-[#f0f0f0]"
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
                <FormItem className="gap-10 flex w-full">
                  <FormLabel className=" text-right self-center w-[14%]">
                    Nomor Telepon
                  </FormLabel>
                  <Input
                    placeholder="08xxxxxxxxx"
                    className="border-none shadow bg-[#f0f0f0]"
                    type="text"
                    inputMode="numeric"
                    {...field}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="first_name"
              render={({ field }) => (
                <FormItem className="gap-10 flex w-full">
                  <FormLabel className=" text-right self-center w-[14%]">
                    Nama Depan
                  </FormLabel>
                  <Input
                    placeholder="Nama depan anda"
                    className="border-none shadow bg-[#f0f0f0]"
                    {...field}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="last_name"
              render={({ field }) => (
                <FormItem className="gap-10 flex w-full">
                  <FormLabel className=" text-right self-center w-[14%]">
                    Nama Belakang
                  </FormLabel>
                  <Input
                    placeholder="Nama belakang anda"
                    className="border-none shadow bg-[#f0f0f0]"
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
                <FormItem className="gap-10 flex w-full">
                  <FormLabel className=" text-right self-center w-[14%]">
                    Golongan Darah
                  </FormLabel>
                  <GolonganDarahSelect field={field} />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="gender"
              render={({ field }) => (
                <FormItem className="gap-10 flex w-full">
                  <FormLabel className=" text-right self-center w-[14%]">
                    Jenis Kelamin
                  </FormLabel>
                  <JenisKelaminSelect field={field} />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="birthdate"
              render={({ field }) => (
                <FormItem className="gap-10 flex w-full">
                  <FormLabel className=" text-right self-center w-[14%]">
                    Tanggal Lahir
                  </FormLabel>
                  <Input
                    type="date"
                    className="border-none shadow w-full bg-[#f0f0f0]"
                    {...field}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem className="gap-10 flex w-full">
                  <FormLabel className=" text-right self-start w-[14%] pt-2">
                    Alamat Rumah
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Alamat anda"
                      className="border-none shadow bg-[#f0f0f0]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <ProfileChangeDialog newData={newProfileData} />
          </form>
        </Form>
      </div>
    </div>
  );
};

export default ProfilePage;
