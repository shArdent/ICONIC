"use client";

import { Drawer } from "vaul";
import Link from "next/link";
import { Logout } from "@/lib/auth";

export function NavDrawerSign({ username }: { username: string | null}) {

  return (
    <Drawer.Root direction="right">
      <Drawer.Trigger asChild>
        <button className=" flex justify-center items-center md:hidden">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-8 h-8 text-white"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
            />
          </svg>
        </button>
      </Drawer.Trigger>
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 bg-black/40" />
        <Drawer.Content className="bg-white flex flex-col rounded-t-[10px] h-full w-[75dvw] mt-24 fixed bottom-0 right-0 z-50">
          <div className="p-4 bg-white flex-1 h-full">
            <div className="max-w-md mx-auto">
              <Drawer.Title className="font-medium text-xl mb-4 px-2 py-2">
                {username}
              </Drawer.Title>
              {/* Menu Disini */}
              <div className="flex flex-col gap-20">
                <ul className="flex flex-col gap-4 ">
                  <Link
                    href={"/request"}
                    className="border-b cursor-pointer transition-all hover:translate-x-2 px-2 py-2 rounded "
                  >
                    <li>Request</li>
                  </Link>
                  <Link
                    href={"/request"}
                    className="border-b cursor-pointer transition-all hover:translate-x-2 px-2 py-2 rounded "
                  >
                    <li>Donor Sekarang</li>
                  </Link>
                  <Link
                    href={"/request"}
                    className="border-b px-2 hover:translate-x-2 transition-all cursor-pointer py-2 rounded"
                  >
                    <li>Akun</li>
                  </Link>
                </ul>

                <button
                  onClick={() => Logout()}
                  className="border-t-2 py-2 px-2 hover:scale-105 transition-all cursor-pointer"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}
