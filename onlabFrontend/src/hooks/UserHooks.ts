import { useState } from "react";
import { useMutation, useQuery } from "react-query";
import Pet from "../models/Pet";
import ImageUploadService from "../services/ImageUploadService";
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
      onSuccess: (res) => {
        setPets(res);
      },
    }
  );
  return [pets, error, loading, listJobs] as const;
};

export const usePostUserPet = () => {};

export const petImageUpload = (petID: number, file: File) => {
  const {
    isLoading: loading,
    mutate: postPetPicture,
    isError: error,
  } = useMutation<any, Error>(
    async () => {
      const data = await ImageUploadService.uploadPetPicture(petID, file);
      return data;
    },
    {
      onSuccess: (res) => {},
      onError: (err: any) => {},
    }
  );
  return [postPetPicture] as const;
};
