"use client";

import { User } from "@/types/authTypes";
import { getCookie } from "cookies-next";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
const SideMenu = () => {
  const pathname = usePathname().split("/")[2];
  const [userData, setUserData] = useState<User | null>(null);

  useEffect(() => {
    setUserData(JSON.parse(getCookie("user") ?? ("{}" as string)));
  }, []);

  return (
    <div className="flex flex-col md:flex-col md:py-0 py-3 gap-5 w-full md:w-[400px] md:max-w-auto">
      <div className="border-b-4 w-full pb-2">
        <h1 className="font-bold text-3xl text-wrap">{userData?.username}</h1>
      </div>
      <div>
        <ul className="flex md:flex-col gap-1 h-full w-full md:gap-4">
          <Link
            className={`text-center w-auto p-2 shadow hover:bg-slate-200 text-sm  rounded-lg flex items-center justify-center
            md:w-full text-gray-500 text-md hover:text-red-400 ${
              pathname === "profile"
                ? "text-primary bg-slate-200"
                : "bg-slate-100"
            }`}
            href={"/account/profile"}
          >
            <li className="font-bold text-nowrap">Info Profil</li>
          </Link>
          <Link
            className={`text-center w-auto py-2 px-2 shadow flex items-center justify-center  
            md:w-full hover:bg-slate-200 text-sm  rounded-lg ${
              pathname === "progress"
                ? "text-primary bg-slate-200"
                : "bg-slate-100"
            } text-gray-500 text-md hover:text-red-400 `}
            href={"/account/progress"}
          >
            <li className="font-bold text-nowrap">Proses Donor Saat Ini</li>
          </Link>
          <Link
            className={`text-center w-auto py-2 px-2 shadow  flex items-center justify-center  
            md:w-full hover:bg-slate-200 text-sm  rounded-lg ${
              pathname === "history"
                ? "text-primary bg-slate-200"
                : "bg-slate-100"
            } text-gray-500 text-md hover:text-red-400 `}
            href={"/account/history"}
          >
            <li className="font-bold text-nowrap">Riwayat Donor</li>
          </Link>
        </ul>
      </div>
    </div>
  );
};

export default SideMenu;
