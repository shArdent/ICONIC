import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";

export function DonorDialog({ id }: { id: number }) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button size={"request"}>Donor</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Konfirmasi Donor Darah</AlertDialogTitle>
        </AlertDialogHeader>
        <form>
          <div className="flex flex-col w-full max-w-full items-start gap-1.5">
            <Label htmlFor="email" className="text-black">
              Email
            </Label>
            <Input type="email" id="email" placeholder="Email" />
          </div>
        </form>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <Link href={`/request/${id}`}>
            <AlertDialogAction>Donor</AlertDialogAction>
          </Link>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
