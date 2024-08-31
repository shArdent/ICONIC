"use client";

import { ArrowLeft, Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import axios from "@/lib/axios";
import { useState } from "react";
import { setCookie } from "cookies-next";

const Login = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [seePassword, setSeePassword] = useState<boolean>(false);
  const router = useRouter();

  const handleLogin = async (formdata: FormData) => {
    setIsLoading(true);
    const email = formdata.get("email") as string;
    const password = formdata.get("password") as string;

    axios
      .post("auth/login", {
        email,
        password,
      })
      .then(({ data }) => {
        console.log(data);
        setCookie("token", data.accessToken, {
          expires: new Date(new Date().setDate(new Date().getDate() + 1)),
        });
        setCookie("refreshToken", data.refreshToken, {
          expires: new Date(new Date().setDate(new Date().getDate() + 1)),
        });
        setCookie("user", JSON.stringify(data.user), {
          expires: new Date(new Date().setDate(new Date().getDate() + 1)),
        });
        router.push("/");
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setError("Username atau password salah");
        setIsLoading(false);
      });
  };

  return (
    <div className="h-screen bg-primary flex items-center justify-center">
      <button
        onClick={() => router.back()}
        className="absolute top-3 left-3 flex  items-center gap-2 md:border-2 p-3 rounded-lg"
      >
        <ArrowLeft className="text-white" size={20} />
        <h1 className="text-white text-md md:text-xl">Kembali</h1>
      </button>

      <div className="bg-white p-10 rounded-lg flex flex-col gap-7">
        <h1 className="text-3xl font-bold">Masuk Dengan Akun</h1>

        <form className="flex flex-col gap-3" action={handleLogin}>
          <label htmlFor="email" className="flex flex-col gap-2">
            {error && <p className="text-red-500">{error}</p>}
            Alamat Email
            <input
              className="border-2 border-primary p-3 rounded-lg focus:border-[#ce3e3e] focus:outline-none focus:ring-0 transition-all"
              type="email"
              placeholder="example@example.com"
              name="email"
              id="email"
            />
          </label>
          <label htmlFor="password" className="flex flex-col gap-2 relative">
            <p className="flex justify-between items-end">Password</p>
            <input
              className="border-2 border-primary p-3 rounded-lg focus:border-[#ce3e3e] focus:outline-none focus:ring-0 transition-all"
              type={seePassword ? "text" : "password"}
              placeholder="**********"
              name="password"
              id="password"
            />
            <button
              type="button"
              onClick={() => setSeePassword(!seePassword)}
              className="absolute top-14 right-3 -translate-y-1/2"
            >
              {seePassword ? <EyeOff /> : <Eye />}
            </button>
          </label>

          <div className="flex text-sm justify-between mb-7">
            <p>
              Belum punya akun?{" "}
              <Link href="/register" className="text-blue-700 hover:underline">
                Daftar
              </Link>
            </p>
          </div>

          <button
            className={`bg-primary ${
              isLoading ? "cursor-not-allowed opacity-50" : "cursor-pointer"
            } w-full text-white px-3 py-2 rounded-sm text-xl font-bold`}
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? "Loading..." : "Masuk"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
