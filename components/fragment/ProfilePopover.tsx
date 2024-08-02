import Link from "next/link";
import { Button } from "../ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Logout } from "@/lib/auth";

const ProfilePopover = ({ username }: { username: string }) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant={"blackwhite"} className="h-full">
          {username}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-36">
        <ul className="flex flex-col">
          <Link href={`/account/profile`} className="hover:bg-slate-100 p-2 rounded h-auto">
            <li>Profil</li>
          </Link>
          <button onClick={() => Logout()} className="text-left hover:bg-slate-100 p-2 rounded h-auto">
            <li>Logout</li>
          </button>
        </ul>
      </PopoverContent>
    </Popover>
  );
};

export default ProfilePopover;
