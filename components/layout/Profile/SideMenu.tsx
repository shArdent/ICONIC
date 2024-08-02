"use client";

import AvatarProfile from "@/components/fragment/profile/Avatar";
import { User } from "@/types/authTypes";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
const SideMenu = () => {
  const pathname = usePathname().split("/")[2];
  const [userData, setUserData] = useState<User | null>(null);
  useEffect(() => {
    const fromLocal = localStorage.getItem("user");
    setUserData(fromLocal ? JSON.parse(fromLocal) : null);
  }, []);

  return (
    <div className="flex md:flex-col py-5 gap-5 w-full md:w-[400px] md:max-w-auto">
      <div className="flex items-center gap-3 ">
        <AvatarProfile />
        <h1 className="font-bold text-md text-wrap">{userData?.username}</h1>
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
            <li>History Donor</li>
          </Link>
        </ul>
      </div>
    </div>
  );
};

export default SideMenu;
