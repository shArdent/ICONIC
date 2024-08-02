import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { string } from "zod"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const fetcher = (...args: string[]) => fetch(...args).then(res => res.json())