"use client";

import { PaginationBlock } from "@/app/components/PaginationBlock";
import RequestCard from "@/app/components/request/RequestCard";

const page = () => {
  return (
    <div className="px-3 py-10 md:py-5 md:px-5">
      <div className="pb-1 mb-5 w-full border-b-2 flex justify-between items-center">
        <h1 className="text-3xl font-bold">Permintaan Darah</h1>
        <button className="text-nowrap px-4 py-3 rounded bg-[#880808] text-white">Buat Permintaan</button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-5">
        {[1,2,3,4,5,6,7,8,8].map((i) => {
          return <RequestCard key={i} />
        })
        }
      </div>
      <PaginationBlock/>
    </div>
  );
};

export default page;
