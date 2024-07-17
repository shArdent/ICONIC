"use client";

import useAuthStore from "@/app/context/AuthStore";
import Link from "next/link";
import { NavDrawerUnsign } from "@/app/components/Navigation/NavDrawerUnsign";
import { MyDrawer } from "@/app/components/Navigation/NavDrawer";

const Hero = () => {
  const user = useAuthStore((state) => state.user);
  const setAuth = useAuthStore((state) => state.setAuth);

  const handleLogout = () => {
    setAuth({
      email: "",
      username: "",
      isLoggedIn: false,
      token: "",
    });
  };

  return (
    <div className="h-auto md:h-auto bg-[#880808] px-8 md:px-[70px] py-[40px] md:py-[40px] flex flex-col md:items-start items-center gap-7 md:gap-[67px]">
      <header className="flex justify-between w-full h-[10%]">
        <h1 className="text-white font-bold text-4xl md:text-[48px]">
          DonorKan
        </h1>
        {user.isLoggedIn ? (
          <div>
            <div className="md:flex hidden gap-[60px] h-[50px] items-center">
              <button
                onClick={handleLogout}
                className="text-[#880808] px-[20px] py-[6px] bg-[#FFFFFF] rounded-sm h-[50px] font-bold w-[120px] text-[24px]"
              >
                Logout
              </button>
              <h1 className="text-white text-[24px]">{user.username}</h1>
            </div>
            <MyDrawer />
          </div>
        ) : (
          <div>
            <Link
              className="hidden md:block text-[#880808] px-[25px] py-[6px] bg-[#FFFFFF] rounded-sm  font-bold text-[24px]"
              href={"/login"}
            >
              Masuk
            </Link>
            <NavDrawerUnsign />
          </div>
        )}
      </header>
      <div className="flex flex-col max-w-[775px] justify-center gap-8 py-10 items-center md:items-start text-white md:gap-5">
        <h1 className="md:text-[96px] text-[2.9em] md:text-left text-center font-bold leading-[100%]">
          Setetes Darah Sejuta Harapan
        </h1>
        <p className="tracking-wide text-sm md:text-left text-center">
          Bergabunglah dengan kami dalam menyelamatkan nyawa. Donorkan darah
          Anda hari ini dan jadilah pahlawan bagi mereka yang membutuhkan.
        </p>
        <Link href={user.isLoggedIn ? "/request" : "/login"}>
          <button className="text-[#880808] px-[25px] md:py-[6px] bg-white rounded-sm h-[70px] font-bold text-[24px]">
            Donorkan Sekarang
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Hero;
