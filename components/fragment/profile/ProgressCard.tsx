"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";

const ProgressCard = ({ data }: { data: any }) => {
  const displayDate = new Date(
    data.created_at.split("T")[0]
  ).toLocaleDateString("id-ID");
  const displayTime = data.created_at.split("T")[1];
  return (
    <div className="flex border-2 shadow p-3 items-center justify-between md:p-2 h-auto rounded w-full">
      <div className="flex gap-5 justify-between w-full">
        <div className="aspect-square bg-slate-200 min-w-20 md:w-20 w-32 rounded text-center flex items-center justify-center text-4xl font-semibold">
          {data.request.blood_type}
        </div>

        <div className="flex flex-col justify-around h-auto w-full">
          <div className="flex flex-col md:flex-row gap-0 md:gap-2">
            <h1 className="font-bold text-base text-nowrap">
              Penerima : {data.request.name}
            </h1>
            <span className="text-base hidden font-bold md:block"> | </span>
            <h1 className="font-bold text-base text-nowrap">
              Pendonor : {data.donor.donor_name}
            </h1>
          </div>

          <p className="text-sm">{data.request.hospital_name}</p>
          <p className="text-xs">
            {displayDate} | {displayTime.slice(0, 5)}
          </p>

          <Link
            href={`/donor/${data.donor_id}`}
            className="w-full h-full mt-1 block md:hidden"
          >
            <Button className=" h-full rounded w-full">Rincian</Button>
          </Link>
        </div>
      </div>

      <div className="flex-col gap-2 hidden md:flex h-20">
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
