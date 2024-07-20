import { Button } from "@/components/ui/button"
import { Copy } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function ShareDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size={"request"} variant={"blackwhite"}>Bagikan</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Bagikan permintaan darah</DialogTitle>
          <DialogDescription>
            Bantu membagikan permintaan darah ini!
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <div className="flex items-center gap-4">
            <Input
              id="name"
              defaultValue="www.donorkan.com/request/131231231"
              readOnly
              className="col-span-3"
            />
            <Button variant={"outline"}>
              <Copy className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <DialogFooter>
          
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
