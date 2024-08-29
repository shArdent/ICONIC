"use client";

import HistoryCard from "@/components/fragment/HistoryCard";
import useAxiosAuth from "@/hooks/use-axios-auth";
import { Request } from "@/types/requestTypes";
import { request } from "http";
import { useEffect, useState } from "react";

const HistoryPage = () => {
  const [historyData, setHistoryData] = useState<Request[] | null>(null);
  const axios = useAxiosAuth();

  useEffect(() => {
    axios
      .get("history")
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
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
