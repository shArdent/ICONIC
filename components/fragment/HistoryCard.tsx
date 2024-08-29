import Link from "next/link";
import { Button } from "../ui/button";
import { Request } from "@/types/requestTypes";

const HistoryCard = ({ request }: { request: Request }) => {
  const displayDate = request.request_at.split("T")[0];
  const displayTime = request.request_at.split("T")[1];

  return (
    <div className="flex justify-between bg-slate-300 p-3 md:p-2 rounded w-full">
      <div className="flex gap-5">
        <div className="aspect-square bg-white min-w-20 rounded text-center flex items-center justify-center text-4xl font-semibold">
          {request.blood_type}
        </div>

        <div className="flex flex-col justify-around text-sm ">
          <h1 className="font-bold text-base">{request.name}</h1>
          <p>{request.hospital_name}</p>
          <p>
            {displayDate.split("-").reverse().join("-")} |
            {displayTime.slice(0, 5)}
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <Link href={`/request/${request.id}`} className="w-full h-full">
          <Button size={"request"} className=" h-full ">
            Rincian
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default HistoryCard;
