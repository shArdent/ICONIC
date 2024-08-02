"use client";

import Link from "next/link";
import { NavDrawerSign } from "./NavDrawerSign";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { User } from "@/types/authTypes";
import ProfilePopover from "../ProfilePopover";

const Navbar = () => {
  const [user, setUser] = useState<User | null>(null);
  const disable = ["/", "/login", "/register"];
  const pathname = usePathname();

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("user") as string));
  }, []);

  return (
    <div
      className={
        disable.includes(pathname)
          ? "hidden"
          : "sticky top-0 left-0 w-full flex justify-between bg-[#880808] z-50 items-center px-5 md:px-10 py-[20px]"
      }
    >
      <Link href={"/"}>
        <h1 className="text-white font-bold text-4xl md:text-[48px]">
          DonorKan
        </h1>
      </Link>
      <ul className="hidden gap-4 text-white md:flex">
        <li>
          <Link href={"/request"}>Permintaan</Link>
        </li>
        <li>
          <Link href={"/request"}>Daftar Donor</Link>
        </li>
      </ul>
      <ProfilePopover username={user?.username as string} />
      <NavDrawerSign username={user?.username as string} />
    </div>
  );
};

export default Navbar;
