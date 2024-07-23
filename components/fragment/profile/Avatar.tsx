import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const AvatarProfile = () => {
  return (
    <Avatar>
      <AvatarImage
        src="https://github.com/shadcn.png"
        alt="Avatar image"
      />
      <AvatarFallback>JD</AvatarFallback>
    </Avatar>
  )
}

export default AvatarProfile