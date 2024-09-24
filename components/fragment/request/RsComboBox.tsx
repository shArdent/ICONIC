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
import { getRs, starterPlaces } from "@/lib/fetch-map";
import { useLoadGoogleMaps } from "@/hooks/use-load-google-maps";
import { FormControl } from "@/components/ui/form";
import { UseFormReturn } from "react-hook-form";
import { NewRequest } from "@/types/requestTypes";
import useDebounce from "@/hooks/use-debounce";

interface Places extends google.maps.places.PlaceResult {
  displayName: string;
  id: string;
  location: google.maps.LatLng;
}

export function RsSearch({
  form,
}: {
  form: UseFormReturn<NewRequest, any, undefined>;
}) {
  const [selectedValue, setSelectedValue] = React.useState<Places | null>(null);
  const [open, setOpen] = React.useState<boolean>(false);
  const [places, setPlaces] = React.useState<Places[] | null>(null);
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const [currentPosition, setCurrentPosition] = React.useState<any>(null);

  const { isLoaded, loadError } = useLoadGoogleMaps();

  React.useEffect(() => {
    if (isLoaded && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setCurrentPosition({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      });
    }
  }, [isLoaded]);

  React.useEffect(() => {
    if (isLoaded && !!currentPosition) {
      starterPlaces(currentPosition).then((data) => {
        setPlaces(data as Places[]);
      });
    }
  }, [currentPosition]);

  if (isDesktop) {
    return (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <FormControl>
            <Button variant="outline" className="justify-start">
              {selectedValue ? (
                <>{selectedValue.displayName}</>
              ) : (
                <>Pilih Rumah Sakit</>
              )}
            </Button>
          </FormControl>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0" align="start">
          <StatusList
            form={form}
            setOpen={setOpen}
            places={places}
            setSelectedValue={setSelectedValue}
            setPlaces={setPlaces}
          />
        </PopoverContent>
      </Popover>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <FormControl>
          <Button variant="outline" className="w-auto text-wrap justify-start">
            {selectedValue ? (
              <>{selectedValue.displayName}</>
            ) : (
              <>Pilih Rumah Sakit</>
            )}
          </Button>
        </FormControl>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mt-4 border-t">
          <StatusList
            form={form}
            places={places}
            setOpen={setOpen}
            setSelectedValue={setSelectedValue}
            setPlaces={setPlaces}
          />
        </div>
      </DrawerContent>
    </Drawer>
  );
}

function StatusList({
  form,
  setOpen,
  places,
  setPlaces,
  setSelectedValue,
}: {
  setPlaces: React.Dispatch<React.SetStateAction<Places[] | null>>;
  form: UseFormReturn<NewRequest, any, undefined>;
  places: Places[] | null;
  setOpen: (open: boolean) => void;
  setSelectedValue: (value: Places | null) => void;
}) {
  const [searchText, setSearchText] = React.useState<string>("");
  const debouncedSearch = useDebounce(searchText, 1500);

  React.useEffect(() => {
    if (debouncedSearch) {
        getRs(debouncedSearch).then((data) => {
          setPlaces(data as Places[]);
        });
    }
  }, [debouncedSearch]);

  return (
    <Command>
      <CommandInput
        placeholder="Cari Rumah Sakit..."
        onValueChange={(value) => {
          if (value.trim() !== "") {
            setSearchText(value);
          }
        }}
      />
      <CommandList>
        <CommandEmpty>Tidak Ditemukan</CommandEmpty>
        <CommandGroup>
          {places?.map((place: Places) => (
            <CommandItem
              key={place.place_id}
              value={place.displayName}
              onSelect={(value) => {
                form.setValue(
                  "rumahSakit.displayName",
                  places.find(
                    (priority: any) => priority.displayName === value
                  )!.displayName as string
                );
                form.setValue(
                  "rumahSakit.id",
                  places.find(
                    (priority: any) => priority.displayName === value
                  )!.id as string
                );
                form.setValue(
                  "rumahSakit.koordinat.lat",
                  places
                    .find((priority: any) => priority.displayName === value)!
                    .location.lat() as number
                );
                form.setValue(
                  "rumahSakit.koordinat.lng",
                  places
                    .find((priority: any) => priority.displayName === value)!
                    .location.lng() as number
                );

                setSelectedValue(place);

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
