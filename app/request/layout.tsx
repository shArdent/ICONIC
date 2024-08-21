"use client";
import { useRouter } from "next/navigation";
import { Suspense, useEffect } from "react";
import Loading from "./loading";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <Suspense fallback={<Loading />}>{children}</Suspense>
    </div>
  );
};

export default Layout;
