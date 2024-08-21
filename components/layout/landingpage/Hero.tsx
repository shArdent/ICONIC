"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { User } from "@/types/authTypes";
import { useEffect, useState } from "react";
import { getCookie } from "cookies-next";
import { motion } from "framer-motion";

const Hero = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    setUser(JSON.parse(getCookie("user") ?? ("{}" as string)));
  }, []);

  return (
    <div
      className={`h-[calc(100dvh+40px)] md:h-[110dvh] px-8 md:px-[70px] py-[40px] md:py-[40px] flex flex-col md:items-center items-center md:gap-10 bg-[url("/images/landingPage/hero-background.jpg")] bg-cover bg-center backdrop-brightness-50 relative`}
    >
      <div className="absolute inset-0 bg-black/50 z-0"></div>
      <motion.div 
      initial={{ opacity: 0, y: 100 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true, amount: 0.5 }}
      className="flex flex-col max-w-[800px] justify-center gap-6 pb-10 items-center md:items-center text-white md:gap-5 z-10">
        <h1 className="md:text-[96px] text-7xl md:text-center text-center font-bold leading-tight">
          Setetes Darah Sejuta Harapan
        </h1>
        <p className="tracking-wide text-lg md:text-center text-center">
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
      </motion.div>
    </div>
  );
};

export default Hero;
