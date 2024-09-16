"use client";

import { ArrowLeft, Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { FormDataRegister, registrationShema } from "@/types/authTypes";
import axios from "@/lib/axios";
import { toast } from "sonner";

const Register = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [seePassword, setSeePassword] = useState<boolean>(false);
  const [seeConfirmPassword, setSeeConfirmPassword] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormDataRegister>({
    resolver: zodResolver(registrationShema),
  });

  const onSubmit = async (data: FormDataRegister) => {
    setIsLoading(true);
    axios
      .post("auth/register", data)
      .then((result) => {
        console.log(result);
        setIsLoading(false);
        if (result.status === 201) {
          toast("Akun berhasil dibuat", {
            description: "Silahkan cek email anda untuk melakukan verifikasi",
            action: {
              label: "Login",
              onClick: () => router.push("/login"),
            },
          });
        }
      })
      .catch((err) => {
        console.log(err.response.data);
        setIsLoading(false);
        toast("Akun gagal dibuat", {
          description: "Email yang anda gunakan sudah terdaftar",
          action: {
            label: "X",
            onClick: () => {},
          }
        });
      });
  };

  return (
    <div className="h-auto md:h-screen px-3 py-20 md:p-20 bg-primary flex items-center justify-center">
      <button
        onClick={() => router.back()}
        className="absolute top-3 left-3 flex items-center gap-2 z-10 md:border-2 p-3 rounded-lg"
      >
        <ArrowLeft className="text-white " size={20} />
        <h1 className="text-white text-md md:text-xl">Kembali</h1>
      </button>

      <div className="bg-white p-7 rounded-lg flex flex-col gap-7 md:w-[65%]">
        <h1 className="text-3xl font-bold">Masuk Dengan Akun</h1>

        <form
          className="flex flex-col md:grid md:grid-cols-2 gap-3 gap-col-4"
          onSubmit={handleSubmit(onSubmit)}
        >
          <label htmlFor="username" className="flex flex-col gap-2">
            Nama Pengguna
            <input
              className="border-2 border-[#880808] p-3 rounded-lg focus:border-[#ce3e3e] focus:outline-none focus:ring-0 transition-all"
              placeholder="Nama Anda"
              {...register("username")}
            />
            {errors.username && (
              <p className="text-red-500">
                {errors.username.message as string}
              </p>
            )}
          </label>
          <label htmlFor="email" className="flex flex-col gap-2">
            Alamat Email
            <input
              className="border-2 border-[#880808] p-3 rounded-lg focus:border-[#ce3e3e] focus:outline-none focus:ring-0 transition-all"
              placeholder="example@example.com"
              {...register("email")}
            />
            {errors.email && (
              <p className="text-red-500">{errors.email.message as string}</p>
            )}
          </label>
          <label htmlFor="password" className="flex flex-col gap-2 relative">
            <p className="flex justify-between items-end">Password</p>
            <input
              className="border-2 border-primary p-3 rounded-lg focus:border-[#ce3e3e] focus:outline-none focus:ring-0 transition-all"
              type={seePassword ? "text" : "password"}
              placeholder="**********"
              {...register("password")}
            />
            <button
              type="button"
              onClick={() => setSeePassword((prev) => !prev)}
              className="absolute top-14 right-3 -translate-y-1/2"
            >
              {seePassword ? <EyeOff /> : <Eye />}
            </button>
            {errors.password && (
              <p className="text-red-500">
                {errors.password.message as string}
              </p>
            )}
          </label>
          <label
            htmlFor="confirm-password"
            className="flex flex-col gap-2 relative"
          >
            <p className="flex justify-between items-end">
              Konfirmasi Password
            </p>
            <input
              className="border-2 border-[#880808] p-3 rounded-lg focus:border-[#ce3e3e] focus:outline-none focus:ring-0 transition-all"
              type={seeConfirmPassword ? "text" : "password"}
              placeholder="**********"
              {...register("confirmPassword")}
            />
            <button
              type="button"
              onClick={() => setSeeConfirmPassword((prev) => !prev)}
              className="absolute top-14 right-3 -translate-y-1/2"
            >
              {seeConfirmPassword ? <EyeOff /> : <Eye />}
            </button>
            {errors.confirmPassword && (
              <p className="text-red-500">
                {errors.confirmPassword.message as string}
              </p>
            )}
          </label>

          <div className="flex text-sm justify-between mb-7 md:mt-1 col-span-2">
            <p>
              Sudah punya akun?{" "}
              <Link href="/login" className="text-blue-700 hover:underline">
                Masuk
              </Link>
            </p>
          </div>

          <button
            className={`${
              isLoading ? "cursor-not-allowed opacity-50" : "cursor-pointer"
            } bg-[#880808] w-full text-white px-3 py-2 md:py-4 rounded-sm text-2xl font-bold col-span-2`}
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? "Loading..." : "Daftar"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
