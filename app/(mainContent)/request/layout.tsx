"use client"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

const layout = ({ children }: { children: React.ReactNode }) => {

  const router = useRouter()

  useEffect(() => {
    const isLoggdIn = !!localStorage.getItem("token")

    if (!isLoggdIn) {
      router.push("/login")
    }
  })
  return (
    <div>
      {children}
    </div>
  )
}

export default layout