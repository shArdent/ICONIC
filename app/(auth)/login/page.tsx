"use client";

import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import useAuthStore from "../../context/AuthStore";

const Login = () => {
  const router = useRouter();
  const setAuth = useAuthStore((state) => state.setAuth);

  const handleLogin = (formdata: FormData) => {
    const formEmail = formdata.get("email") as string;
    const password = formdata.get("password");

    if (formEmail && password) {
      setAuth({
        email: formEmail as string,
        username: formEmail.split('@')[0],
        token: "token",
        isLoggedIn: true,
      });
      router.push("/request");
    }

    return null;
  };

  return (
    <div className="h-[100dvh] bg-[#880808] flex items-center justify-center">
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
              <Link
                href="/forgot"
                className="text-blue-700 hover:underline inline-block text-sm"
              >
                Lupa Password
              </Link>
            </p>
            <input
              className="border-2 border-[#880808] p-3 rounded-lg focus:border-[#ce3e3e] focus:outline-none focus:ring-0 transition-all"
              type="password"
              placeholder="**********"
              name="password"
              id="password"
            />
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
            className="bg-[#880808] w-full text-white px-3 py-2 rounded-sm text-xl font-bold"
            type="submit"
          >
            Masuk
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
