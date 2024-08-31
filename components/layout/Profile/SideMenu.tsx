"use client";

import AvatarProfile from "@/components/fragment/profile/Avatar";
import { User } from "@/types/authTypes";
import { getCookie } from "cookies-next";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
const SideMenu = () => {
  const pathname = usePathname().split("/")[2];
  const [userData, setUserData] = useState<User | null>(null);

  useEffect(() => {
    setUserData(JSON.parse(getCookie("user") ?? "{}" as string));
    
  }, []);

  return (
    <div className="flex md:flex-col py-5 gap-5 w-full md:w-[400px] md:max-w-auto">
      <div className="border-b-4 w-full">
        <h1 className="font-bold text-3xl text-wrap">{userData?.username}</h1>
      </div>
      <div>
        <ul className="flex md:flex-col gap-2 md:gap-4">
          <Link
            className={`text-center p-2 shadow hover:bg-slate-200 text-sm  rounded-lg  text-gray-500 text-md hover:text-red-400 ${
              pathname === "profile"
                ? "text-primary bg-slate-200"
                : "bg-slate-100"
            }`}
            href={"/account/profile"}
          >
            <li>Info Profil</li>
          </Link>
          <Link
            className={`text-center p-2 shadow hover:bg-slate-200 text-sm  rounded-lg ${
              pathname === "history"
                ? "text-primary bg-slate-200"
                : "bg-slate-100"
            } text-gray-500 text-md hover:text-red-400 `}
            href={"/account/history"}
          >
            <li>Riwayat Donor</li>
          </Link>
        </ul>
      </div>
    </div>
  );
};

export default SideMenu;
