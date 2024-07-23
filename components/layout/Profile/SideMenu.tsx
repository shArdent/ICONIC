"use client";

import AvatarProfile from "@/components/fragment/profile/Avatar";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

const SideMenu = () => {
  const pathname = usePathname().split("/")[2];

  useEffect(()=> {
    console.log(pathname.includes('profile'))
  }, [pathname])

  return (
    <div className="flex flex-col gap-5 max-w-[400px]">
      <div className="flex items-center gap-3">
        <AvatarProfile />
        <h1 className="font-bold text-md">Diva Marshelano</h1>
      </div>
      <div>
        <ul className="flex flex-col">
          <Link className={` text-gray-500 text-md hover:text-red-400 ${pathname === 'profile' ? "text-primary" : ""}`} href={"/account/profile"}>
            <li>Info Profil</li>
          </Link>
          <Link className={`${pathname === 'history' ? "text-primary" : ""} text-gray-500 text-md hover:text-red-400 `} href={"/account/history"}>
            <li>History Donor</li>
          </Link>
          <Link className={`${pathname.includes('password') ? "text-primary" : ""} text-gray-500 text-md hover:text-red-400`} href={"/account/password"}>
            <li>Ubah Password</li>
          </Link>
        </ul>
      </div>
    </div>
  );
};

export default SideMenu;
