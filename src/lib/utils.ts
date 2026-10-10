import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatImageUrl(imageUrl: string) {
  if (imageUrl.startsWith("//")) {
    return `https:${imageUrl}`
  }

  return imageUrl
}
