"use client";

import * as React from "react";

import { useMediaQuery } from "@/hooks/use-media-query";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { starterPlaces } from "@/lib/fetch-map";
import { useLoadGoogleMaps } from "@/hooks/use-load-google-maps";

export function RsSearch() {
  const [open, setOpen] = React.useState(false);
  const [places, setPlaces] = React.useState<any>(null);
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const [selectedStatus, setSelectedStatus] = React.useState<any>(null);

  const { isLoaded } = useLoadGoogleMaps();

  React.useEffect(() => {
    if (isLoaded) {
      starterPlaces().then((data) => {
        setPlaces(data);
      });
    }
  }, [isLoaded]);

  if (isDesktop) {
    return (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" className="w-[60%] justify-start">
            {selectedStatus ? <>{selectedStatus}</> : <>Pilih Rumah Sakit</>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0" align="start">
          <StatusList
            setOpen={setOpen}
            places={places}
            setSelectedStatus={setSelectedStatus}
          />
        </PopoverContent>
      </Popover>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button variant="outline" className="w-[150px] justify-start">
          {selectedStatus ? <>{selectedStatus}</> : <>Pilih Rumah Sakit</>}
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mt-4 border-t">
          <StatusList
            places={places}
            setOpen={setOpen}
            setSelectedStatus={setSelectedStatus}
          />
        </div>
      </DrawerContent>
    </Drawer>
  );
}

function StatusList({
  setOpen,
  setSelectedStatus,
  places,
}: {
  places: any;
  setOpen: (open: boolean) => void;
  setSelectedStatus: (status: any) => void;
}) {
  return (
    <Command>
      <CommandInput placeholder="Nama Rumah Sakit..." />
      <CommandList>
        <CommandEmpty>Tidak Ditemukan</CommandEmpty>
        <CommandGroup>
          {places?.map((place: any) => (
            <CommandItem
              key={place.id}
              value={place.displayName}
              onSelect={(value) => {
                setSelectedStatus(
                  places.find((priority: any) => priority.displayName === value)
                    .displayName || null
                );
                setOpen(false);
              }}
            >
              {place.displayName}
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </Command>
  );
}
