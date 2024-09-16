"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";

const ProgressCard = ({ data }: { data: any }) => {
    const displayDate = new Date(data.created_at.split("T")[0]).toLocaleDateString(
        "id-ID"
    );
    const displayTime = data.created_at.split("T")[1];
  return (
    <div className="flex justify-between border-2 shadow p-3 md:p-2 rounded w-full">
      <div className="flex gap-5">
        <div className="aspect-square bg-slate-200 min-w-20 rounded text-center flex items-center justify-center text-4xl font-semibold">
          {data.request.blood_type}
        </div>

        <div className="flex flex-col justify-around text-sm ">
          <h1 className="font-bold text-base text-nowrap">Penerima : {data.request.name} | Pendonor : {data.donor.donor_name} </h1>
          <p>{data.request.hospital_name}</p>
          <p>
            {displayDate} |{" "}
            {displayTime.slice(0, 5)}
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <Link href={`/donor/${data.donor_id}`} className="w-full h-full">
          <Button size={"request"} className=" h-full ">
            Rincian
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default ProgressCard;
