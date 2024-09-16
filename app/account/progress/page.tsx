"use client";

import Loading from "@/app/loading";
import ProgressCard from "@/components/fragment/profile/ProgressCard";
import useAxiosAuth from "@/hooks/use-axios-auth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Page = () => {
  const axios = useAxiosAuth();
  const [processData, setProcessData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const router = useRouter();

  useEffect(() => {
    axios
      .get("donations/progress")
      .then(({ data }) => {
        console.log(data);
        setProcessData(data.data[0]);
      })
      .catch((err) => {
        if (err.response.status === 401) {
          router.push("/login");
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  },[]);

  return (
    <div className="w-full h-72 bg-white shadow md:py-5 py-3 md:px-10 px-5 rounded">
      <h1 className="font-semibold text-4xl mb-3">Proses Donor</h1>
      <p className="text-sm mb-4">
        Proses donor darah yang sedang berjalan saat ini
      </p>
      <div className="flex flex-col relative w-full gap-4 h-40 justify-center items-center">
        {isLoading ? (
          <Loading />
        ) : processData?.request ? (
          <ProgressCard data={processData} />
        ) : (
          <p className="">Tidak ada proses donor berjalan saat ini</p>
        )}
      </div>
    </div>
  );
};

export default Page;
