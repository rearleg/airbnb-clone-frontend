import { useQuery } from "@tanstack/react-query";
import { getMe } from "../api";
import { IUser } from "../types";

export default function useUser<IUser> () {
  const { isLoading, data, isError } = useQuery({
    queryKey: ["me"],
    queryFn: getMe,
    retry: false
  });
  return {
    userLoading: isLoading,
    user:data,
    isLoggedIn: !isError,
  }
}
