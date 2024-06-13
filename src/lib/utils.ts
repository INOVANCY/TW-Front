import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function capitalizeFirstLetter(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export function getInitials(firstName: string, lastName: string) {
  return firstName.charAt(0) + lastName.charAt(0);
}

export function getBearerToken() {
  return localStorage.getItem("token");
}

export function getProfilePicture(fileName: string | null) {
  if (fileName === null) {
    return "/defaults/user_placeholder.png";
  } else {
    return process.env.API_URL + "/uploads/" + fileName;
  }
}
