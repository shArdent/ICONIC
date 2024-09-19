"use client";

import HistoryCard from "@/components/fragment/history/HistoryCard";
import HistorySkeleton from "@/components/fragment/history/HistorySkeleton";
import useAxiosAuth from "@/hooks/use-axios-auth";
import { Request } from "@/types/requestTypes";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const HistoryPage = () => {
  const [historyData, setHistoryData] = useState<Request[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const axios = useAxiosAuth();
  const router = useRouter();

  useEffect(() => {
    const controller = new AbortController();
    axios
      .get("history")
      .then(({ data }) => {
        console.log(data);
        setHistoryData(data.data);
      })
      .catch((err) => {
        console.log(err.response.data);
        if (err.request.status === 401) {
          router.push("/login");
        }
      }).finally(() => {
        setIsLoading(false)
      });
      return () => controller.abort();
  }, []);
  return (
    <div className="w-full h-auto bg-white shadow md:py-5 py-3 px-5 rounded">
      <h1 className="font-semibold text-3xl mb-3">Riwayat Donor</h1>
      <p className="text-sm mb-4">
        Riwayat donor darah yang pernah anda lakukan
      </p>
      <div className="flex flex-col gap-4 justify-center items-center">
        {historyData ? (
          historyData.map((request, index) => {
            return <HistoryCard request={request} key={index} />;
          })
        ) : (
          isLoading ? <HistorySkeleton/> : <p>Tidak ada riwayat donor</p>
        )}
      </div>
    </div>
  );
};

export default HistoryPage;
