"use client";

import Link from "next/link";
import useAuthStore from "../../context/AuthStore";
import { MyDrawer } from "./NavDrawer";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

const Navbar = () => {
  const disable = ["/", "/login", "/register"];

  const user = useAuthStore((state) => state.user);
  const pathname = usePathname();

  useEffect(() => {
    console.log(pathname);
  }, []);

  return (
    <div
      className={
        disable.includes(pathname)
          ? "hidden"
          : "sticky top-0 left-0 w-full flex justify-between bg-[#880808] items-center px-5 py-[20px]"
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
      <h1 className="text-white hidden md:block">{user.username}</h1>
      <MyDrawer />
    </div>
  );
};

export default Navbar;
