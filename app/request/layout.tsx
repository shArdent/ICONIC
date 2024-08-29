"use client";
import { useRouter } from "next/navigation";
import { Suspense, useEffect } from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <div >{children}</div>
    </div>
  );
};

export default Layout;
