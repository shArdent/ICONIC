"use client";

import Link from "next/link";
import { NavDrawerUnsign } from "@/components/fragment/navigation/NavDrawerUnsign";
import { NavDrawerSign } from "@/components/fragment/navigation/NavDrawerSign";
import { Button } from "@/components/ui/button";
import { Logout } from "@/lib/auth";
import { User } from "@/types/authTypes";
import { useEffect, useState } from "react";

const Hero = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("user") as string));
  }, []);

  return (
    <div className="h-auto md:h-auto bg-[#880808] px-8 md:px-[70px] py-[40px] md:py-[40px] flex flex-col md:items-start items-center gap-7 md:gap-[67px]">
      <header className="flex justify-between w-full h-[10%]">
        <h1 className="text-white font-bold text-4xl md:text-[48px]">
          DonorKan
        </h1>
        {user ? (
          <div>
            <div className="md:flex hidden gap-[60px] h-[50px] items-center">
              <Button
                variant={"secondary"}
                size={"lg"}
                className="font-bold text-xl"
                onClick={() => Logout()}
              >
                Logout
              </Button>
              <h1 className="text-white text-[24px]">{user.username}</h1>
            </div>
            <NavDrawerSign username={user.username} />
          </div>
        ) : (
          <div>
            <Button
              asChild
              variant={"secondary"}
              size={"lg"}
              className="font-extrabold text-xl rounded py-6 hidden md:flex"
            >
              <Link href={"/login"}>Masuk</Link>
            </Button>
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
        <Link href={user ? "/request" : "/login"}>
          <Button
            variant={"secondary"}
            className="font-bold text-2xl px-5 py-7 rounded-sm"
            size={"lg"}
          >
            Donorkan Sekarang
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Hero;
