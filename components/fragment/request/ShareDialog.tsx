"use client";

import { Button } from "@/components/ui/button";
import { Copy } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export function ShareDialog({ id }: { id: number }) {
  const [isCopied, setIsCopied] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(`www.donorkan.com/request/${id}`);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (error) {
      setIsCopied(false);
      setIsError(true);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size={"request"} variant={"blackwhite"} className=" h-full">
          Bagikan
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Bagikan permintaan darah</DialogTitle>
          <DialogDescription>
            Bantu membagikan permintaan darah ini!
          </DialogDescription>
        </DialogHeader>
        <div className="py-2 flex flex-col gap-2">
          <div className="flex items-center gap-4">
            <Input
              id="name"
              defaultValue={`www.donorkan.com/request/${id}`}
              readOnly
              className="col-span-3"
            />
            <Button variant={"outline"} onClick={handleCopy}>
              <Copy className="h-4 w-4" />
            </Button>
          </div>
          {isError && <p>Gagal menyalin</p>}
          {isCopied && <p>Link berhasil disalin</p>}
        </div>
        <DialogFooter></DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
