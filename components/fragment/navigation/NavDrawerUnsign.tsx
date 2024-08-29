"use client";

import { Drawer } from "vaul";
import Link from "next/link";

export function NavDrawerUnsign({ isHome }: { isHome: boolean }) {
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
            className={`w-8 h-8 ${isHome ? "text-primary" : "text-white"}`}
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
              {/* Menu Disini */}
              <div className="flex flex-col gap-6 my-6">
                <Link
                  href={"/register"}
                  className="border-b py-2 px-2 hover:translate-x-2 transition-all cursor-pointer"
                >
                  Daftar
                </Link>
                <Link
                  href={"/login"}
                  className="border-b py-2 px-2 hover:translate-x-2 transition-all cursor-pointer"
                >
                  Masuk
                </Link>
              </div>
            </div>
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}
