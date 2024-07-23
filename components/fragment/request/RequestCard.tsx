import { Dialog } from "@/components/ui/dialog";
import { DonorDialog } from "./DonorDialog";
import { ShareDialog } from "./ShareDialog";
import { string } from "zod";
import { useMemo } from "react";

const RequestCard = ({
  id,
  bloodType,
  name,
  hospital,
  time,
}: {
  id: number;
  bloodType: string;
  name: string;
  hospital: string;
  time: string;
}) => {
  const displayDate = time.split("T")[0];
  const displayTime = time.split("T")[1]; 

  return (
    <div className="inline-flex justify-between gap-5 bg-slate-300 p-3 md:p-2 rounded w-auto">
      <div className="flex gap-3">
        <div className="aspect-square bg-white min-w-20 rounded text-center flex items-center justify-center text-4xl font-semibold">
          {bloodType}
        </div>
        <div className="flex flex-col justify-around text-sm max-w-[210px]">
          <h1 className="font-bold text-base">
            Diva Marshelano Ardentinnova Suhartanto
          </h1>
          <p>{hospital}</p>
          <p>{displayDate} | {displayTime}</p>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <DonorDialog id={id} />
        <ShareDialog />
      </div>
      {/* <button className=" bg-primary font-bold text-white">Donor</button> */}
    </div>
  );
};

export default RequestCard;
