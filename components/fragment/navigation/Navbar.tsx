"use client";

import Link from "next/link";
import { NavDrawerSign } from "./NavDrawerSign";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { User } from "@/types/authTypes";
import ProfilePopover from "../ProfilePopover";
import { getCookie } from "cookies-next";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { NavDrawerUnsign } from "./NavDrawerUnsign";

const Navbar = () => {
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
            } z-50 items-center px-5 md:px-10 py-[20px]`
      }
    >
      <Link href={"/"}>
        <h1
          className={`${
            isHome ? "text-primary" : "text-white"
          }  font-extrabold text-4xl md:text-[48px]`}
        >
          DonorKan
        </h1>
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
              <Button
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
