"use client";

import Link from "next/link";
import { NavDrawerSign } from "./NavDrawerSign";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { User } from "@/types/authTypes";
import ProfilePopover from "@/components/fragment/profile/ProfilePopover";
import { getCookie } from "cookies-next";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { NavDrawerUnsign } from "./NavDrawerUnsign";
import logoRed from "@/public/images/logo-red.png";
import logoWhite from "@/public/images/logo-white.png";
import Image from "next/image";
import { useMediaQuery } from "@/hooks/use-media-query";

const Navbar = () => {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [user, setUser] = useState<User | null>(null);
  const [isHome, setIsHome] = useState<boolean>(true);
  const disable = ["/login", "/register"];
  const pathname = usePathname();

  useEffect(() => {
    setIsHome(() => {
      return pathname === "/" ? true : false;
    });

    setUser(() => {
      const userToBeParsed = getCookie("user");
      if (userToBeParsed) {
        return JSON.parse(userToBeParsed);
      }
      return null;
    });
  }, [pathname]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
      viewport={{ once: true }}
      className={
        disable.includes(pathname)
          ? "hidden"
          : `sticky top-0 left-0 w-full flex justify-between ${
              isHome ? "bg-white" : "bg-primary"
            } z-50 items-center px-3 md:px-10 border-b-2 py-1`
      }
    >
      <Link href={"/"}>
        <Image src={isHome ? logoRed : logoWhite} alt="DonorKan" height={70}/>
      </Link>
      <div className="flex items-center gap-10">
        <ul
          className={`${
            isHome ? "text-black" : "text-white"
          } hidden gap-10 text-medium font-medium md:flex`}
        >
          <li className="hover:scale-110 transition-all">
            <Link href={"/request"}>Permintaan</Link>
          </li>
        </ul>
        {user ? (
          <div>
            <NavDrawerSign
              username={user?.username as string}
              isHome={isHome}
            />
            <ProfilePopover
              username={user?.username as string}
              isHome={isHome}
            />
          </div>
        ) : (
          <div>
            <NavDrawerUnsign isHome={isHome} />
            <Link href={"/login"}>
              <Button size={"lg"}
                className={`hidden md:block font-bold ${
                  isHome ? "text-white" : "bg-white text-primary"
                }`}
              >
                Masuk
              </Button>
            </Link>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default Navbar;
