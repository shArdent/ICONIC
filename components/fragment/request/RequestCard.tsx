import Link from "next/link";
import { ShareDialog } from "./ShareDialog";
import { Button } from "@/components/ui/button";

const RequestCard = ({
  id,
  bloodType,
  name,
  hospital,
  time,
  status,
}: {
  id: number;
  bloodType: string;
  name: string;
  hospital: string;
  time: string;
  status : string;
}) => {
  const displayDate = time.split("T")[0];
  const displayTime = time.split("T")[1];

  return (
    <div className="flex justify-between bg-slate-300 p-3 md:p-2 rounded w-full">
      <div className="flex gap-5">
        <div className="aspect-square bg-white min-w-20 rounded text-center flex items-center justify-center text-4xl font-semibold">
          {bloodType}
        </div>

        <div className="flex flex-col justify-around text-sm ">
          <h1 className="font-bold text-base text-nowrap">{name} {status === "fulfilled" ? "(Terpenuhi)" : ""}</h1>
          <p>{hospital}</p>
          <p>
            {displayDate.split("-").reverse().join("-")} |{" "}
            {displayTime.slice(0, 5)}
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <Link href={`/request/${id}`} className="w-full h-full">
          <Button size={"request"} className=" h-full ">
            Rincian
          </Button>
        </Link>
        <ShareDialog id={id}/>
      </div>
    </div>
  );
};

export default RequestCard;
