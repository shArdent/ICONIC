import axios from "axios"
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// export function getData(url : string, token ?: string ) {
//   axios.get(process.env.NEXT_PUBLIC_API_URL! + url, {
//     headers: {
//       "Authorization": "Bearer " + token,
//       "content-type" : "application/json"
//     }
//   }).then((res) => {
//     return res.data
//   }).catch((err) => {
//     return "Terjadi Kesalahan dalam pengambilan data"
//   })
// }