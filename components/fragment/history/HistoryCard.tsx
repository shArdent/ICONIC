import Link from "next/link";
import { Button } from "../../ui/button";


const HistoryCard = ({ request }: { request: any }) => {
  const displayDate = new Date(request.created_at.split("T")[0]);
  const displayTime = request.created_at.split("T")[1];

  return (
    <div className="flex justify-between bg-slate-200 p-3 md:p-2 rounded w-full h-auto md:h-20">
      <div className="flex gap-5">
        <div className="flex flex-col justify-around text-sm ">
          <h1 className="font-bold text-xl">
            {request.option === "Donor Darah"
              ? request.donor.donor_name
              : request.blood_request.name}
          </h1>
          <p className="text-xs md:text-base">
            Melakukan {request.option} Pada{" "}
            {displayDate.toLocaleDateString("id-ID")} |{" "}
            {displayTime.slice(0, 5)}
          </p>
          <p></p>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <Link
          href={`/finished?option=${request.option}&id=${
            request.option === "Request Darah" ? request.request_id : request.donor_id
          }`}
          className="w-full h-full"
        >
          <Button size={"request"} className=" h-full ">
            Rincian
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default HistoryCard;
