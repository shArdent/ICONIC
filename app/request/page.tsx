"use client";

import { PaginationBlock } from "@/components/fragment/PaginationBlock";
import RequestCard from "@/components/fragment/request/RequestCard";
import { Button } from "@/components/ui/button";
import { Position, Request } from "@/types/requestTypes";
import Link from "next/link";
import { useEffect, useState } from "react";
import useAxiosAuth from "@/hooks/use-axios-auth";

const RequestsPage = () => {
  const [requests, setRequests] = useState<Request[] | null>(null);
  const [currentPosition, setCurrentPossition] = useState<Position | null>(
    null
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const axiosAuth = useAxiosAuth();

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setCurrentPossition({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      });
    });

    setIsLoading(true);
    axiosAuth
      .get('requests')
      .then(({ data }) => {
        setRequests(data.data);
      })
      .catch((err) => {
        setError("Gagal Mendapatkan Data dari server");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [currentPosition?.lat, currentPosition?.lng]);

  return (
    <div className="px-3 py-10 md:py-5 md:px-10">
      <div className="pb-1 mb-5 w-full border-b-2 flex justify-between items-center">
        <h1 className="text-3xl font-bold">Permintaan Darah</h1>
        <Link href="/request/new">
          <Button className="rounded-sm text-lg">Buat Permintaan</Button>
        </Link>
        {/* <button className="text-nowrap px-4 py-3 rounded bg-primary font-bold text-white">Buat Permintaan</button> */}
      </div>
      {isLoading ? (
        <h1>Loading..</h1>
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
