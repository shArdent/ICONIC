"use client";

import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import useAuthStore from "../../context/AuthStore";

const Login = () => {
  const router = useRouter();
  const setAuth = useAuthStore((state) => state.setAuth);

  const handleRegister = (formdata: FormData) => {
    const formEmail = formdata.get("email") as string;
    const password = formdata.get("password");
    const confirmPassword = formdata.get("confirmPassword");

    if (formEmail && (password === confirmPassword)) {
      
      router.push("/login");
    }

    return null;
  };

  return (
    <div className="h-screen bg-[#880808] flex items-center justify-center">
      <button
        onClick={() => router.back()}
        className="absolute top-3 left-3 flex  items-center gap-2 md:border-2 p-3 rounded-lg"
      >
        <ArrowLeft className="text-white" size={20} />
        <h1 className="text-white text-md md:text-xl">Kembali</h1>
      </button>

      <div className="bg-white p-10 rounded-lg flex flex-col gap-7">
        <h1 className="text-3xl font-bold">Masuk Dengan Akun</h1>

        <form className="flex flex-col gap-3" action={handleRegister}>
          <label htmlFor="email" className="flex flex-col gap-2">
            Alamat Email
            <input
              className="border-2 border-[#880808] p-3 rounded-lg focus:border-[#ce3e3e] focus:outline-none focus:ring-0 transition-all"
              type="email"
              placeholder="example@example.com"
              name="email"
              id="email"
            />
          </label>
          <label htmlFor="password" className="flex flex-col gap-2">
            <p className="flex justify-between items-end">
              Password
            </p>
            <input
              className="border-2 border-[#880808] p-3 rounded-lg focus:border-[#ce3e3e] focus:outline-none focus:ring-0 transition-all"
              type="password"
              placeholder="**********"
              name="password"
              id="password"
            />
          </label>
          <label htmlFor="confirm-password" className="flex flex-col gap-2">
            <p className="flex justify-between items-end">
              Konfirmasi Password
            </p>
            <input
              className="border-2 border-[#880808] p-3 rounded-lg focus:border-[#ce3e3e] focus:outline-none focus:ring-0 transition-all"
              type="password"
              placeholder="**********"
              name="confirmPassword"
              id="confirmPassword"
            />
          </label>

          <div className="flex text-sm justify-between mb-7">
            <p>
              Sudah punya akun?{" "}
              <Link href="/login" className="text-blue-700 hover:underline">
                Masuk
              </Link>
            </p>
          </div>

          <button
            className="bg-[#880808] w-full text-white px-3 py-2 rounded-sm text-xl font-bold"
            type="submit"
          >
            Daftar
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
