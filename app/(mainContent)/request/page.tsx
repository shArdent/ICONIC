"use client";

import { PaginationBlock } from "@/components/fragment/PaginationBlock";
import RequestCard from "@/components/fragment/request/RequestCard";
import { Button } from "@/components/ui/button";
import { Request } from "@/types/authTypes";
import axios from "axios";
import { useEffect, useState } from "react";

const page = () => {
  const [requests, setRequests] = useState<Request[] | null>(null)
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    axios.get(process.env.NEXT_PUBLIC_API_URL + "requests", {
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + localStorage.getItem("token"),
      },
    }).then((res) => {
      console.log(res.data)
      setRequests(res.data)
    }).catch((err) => {
      console.log(err)
      setError("Gagal Mendapatkan Data dari server")
    })

  }, [])

  return (
    <div className="px-3 py-10 md:py-5 md:px-5">
      <div className="pb-1 mb-5 w-full border-b-2 flex justify-between items-center">
        <h1 className="text-3xl font-bold">Permintaan Darah</h1>
        <Button className="rounded-sm text-lg">Buat Permintaan</Button>
        {/* <button className="text-nowrap px-4 py-3 rounded bg-primary font-bold text-white">Buat Permintaan</button> */}
      </div>
      <div >
        {requests ? <div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-5">
            {requests.map((request) => (
              <RequestCard key={request.id} id={request.id} />
            ))}
          </div>
          <PaginationBlock/>
        </div> 
        :
        <p>{error}</p>
        }
      </div>
      
    </div>
  );
};

export default page;
