import { useState } from "react";
import { useQuery } from "react-query";
import Pet from "../models/Pet";
import { UserService } from "../services/UserService";

export const useGetUserPets = () => {
  const [pets, setPets] = useState<Pet[]>([]);
  const {
    isLoading: loading,
    refetch: listJobs,
    isError: error,
  } = useQuery<Pet[], Error>(
    "query-jobs",
    async () => {
      const data = await UserService.getUserPets();
      return data;
    },
    {
      //enabled: false,
      onSuccess: (res) => {
        //console.log("shiker jobok leszedése");
        setPets(res);
      },
    }
  );
  return [pets, error, loading, listJobs] as const;
};
