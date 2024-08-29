"use client";

import RequestCard from "@/components/fragment/request/RequestCard";
import { Button } from "@/components/ui/button";
import { Position, Request } from "@/types/requestTypes";
import Link from "next/link";
import { useEffect, useState } from "react";
import useAxiosAuth from "@/hooks/use-axios-auth";
import Loading from "../loading";
import { useRouter } from "next/navigation";

const RequestsPage = () => {
  const [requests, setRequests] = useState<Request[] | null>(null);
  const [currentPosition, setCurrentPossition] = useState<Position | null>(
    null
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const axiosAuth = useAxiosAuth();
  const router = useRouter();

  useEffect(() => {
    setIsLoading(true);
    axiosAuth
      .get("requests")
      .then(({ data }) => {
        setRequests(data.data);
        console.log(data.data)
      })
      .catch((err) => {
        console.log(err)
        setError(err.message);
        if (err.request.status == 401) {
          router.push("/login");
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [currentPosition?.lat, currentPosition?.lng]);

  return (
    <div className="px-3 md:px-10">
      <div className="pb-1 mb-5 w-full border-b-2 flex justify-between items-end">
        <h1 className="text-3xl font-bold ">Permintaan Darah</h1>
        <Link href="/request/new">
          <Button className="rounded-sm py-1 px-4 bg-primary my-1">
            Buat Permintaan
          </Button>
        </Link>
        {/* <button className="text-nowrap px-4 py-3 rounded bg-primary font-bold text-white">Buat Permintaan</button> */}
      </div>
      {isLoading ? (
        <Loading />
      ) : (
        <div>
          {requests ? (
            <div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-5">
                {requests!.map((request) => (
                  <RequestCard
                    key={request.id}
                    id={request.id}
                    name={request.name}
                    hospital={request.hospital_name}
                    bloodType={request.blood_type}
                    time={request.request_at.toString()}
                    status={request.status}
                  />
                ))}
              </div>
            </div>
          ) : (
            <p>{error}</p>
          )}
        </div>
      )}
    </div>
  );
};

export default RequestsPage;
