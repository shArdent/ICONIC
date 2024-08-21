"use client";

import Link from "next/link";
import { NavDrawerSign } from "./NavDrawerSign";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { User } from "@/types/authTypes";
import ProfilePopover from "../ProfilePopover";
import { getCookie } from "cookies-next";
import { motion } from "framer-motion";

const Navbar = () => {
  const [user, setUser] = useState<User | null>(null);
  const disable = ["/", "/login", "/register"];
  const pathname = usePathname();

  useEffect(() => {
    setUser(JSON.parse(getCookie("user") ?? "{}") as User);
  }, [pathname]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
      viewport={{ once: true }}
      className={
        "sticky top-0 left-0 w-full flex justify-between bg-white z-50 items-center px-5 md:px-10 py-[20px]"
      }
    >
      <Link href={"/"}>
        <h1 className="text-primary font-extrabold text-4xl md:text-[48px]">
          DonorKan
        </h1>
      </Link>
      <ul className="hidden gap-10 text-medium font-medium text-black md:flex">
        <li className="hover:scale-110 transition-all">
          <Link href={"/request"}>Permintaan</Link>
        </li>
        <li className="hover:scale-110 transition-all">
          <Link href={"/request"}>Daftar Donor</Link>
        </li>
      </ul>
      <ProfilePopover username={user?.username as string} />
      <NavDrawerSign username={user?.username as string} />
    </motion.div>
  );
};

export default Navbar;
