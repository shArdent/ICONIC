"use client";

import HistoryCard from "@/components/fragment/HistoryCard";
import useAxiosAuth from "@/hooks/use-axios-auth";
import { Request } from "@/types/requestTypes";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const HistoryPage = () => {
  const [historyData, setHistoryData] = useState<Request[] | null>(null);
  const axios = useAxiosAuth();
  const router = useRouter();

  useEffect(() => {
    axios
      .get("history")
      .then(({ data }) => {
        console.log(data)
        setHistoryData(data.data);
      })
      .catch((err) => {
        console.log(err.response.data);
        if (err.request.status === 401) {
          router.push("/login");
        }
      });
  });
  return (
    <div className="w-full h-auto bg-white shadow py-5 px-10">
      <h1 className="font-semibold text-4xl mb-3">Riwayat Donor</h1>
      <p className="text-sm mb-4">
        Riwayat donor darah yang pernah anda lakukan
      </p>
      <div>
        {historyData ? (
          historyData.map((request, index) => {
            return <HistoryCard request={request} key={index} />;
          })
        ) : (
          <p>Belum ada riwayat donor</p>
        )}
      </div>
    </div>
  );
};

export default HistoryPage;
