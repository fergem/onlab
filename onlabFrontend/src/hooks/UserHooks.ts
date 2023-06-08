import { useContext, useState } from "react";
import { useMutation, useQuery } from "react-query";
import { AuthContext } from "../context/AuthContext";
import Pet from "../models/Pet";
import ImageUploadService from "../services/ImageUploadService";
import { UserService } from "../services/UserService";
import { useAuth } from "./AuthHooks";

export const useGetUserPets = () => {
  const [pets, setPets] = useState<Pet[]>([]);
  const {
    isLoading: loading,
    refetch: listPets,
    isError: error,
  } = useQuery<any, Error>(
    "query-pets",
    async () => {
      const data = await UserService.getUserPets();
      return data;
    },
    {
      refetchOnMount: true,
      refetchInterval: 6000,
      refetchOnWindowFocus: true,
      onSuccess: (res) => {
        setPets(res);
      },
    }
  );
  return [pets, error, loading, listPets] as const;
};

export const usePostUserPet = () => {};

export const petImageUpload = (petID: number, file: File) => {
  const {
    isLoading: loading,
    mutate: postPetPicture,
    isError: error,
  } = useMutation<any, Error>(
    async () => {
      const data = await ImageUploadService.uploadPetPictures(petID, file);
      return data;
    },
    {
      onSuccess: (res) => {},
      onError: (err: any) => {},
    }
  );
  return [postPetPicture] as const;
};

export const userProfilePictureUpload = () => {
  const { mutate: postProfilePicture } = useMutation<any, Error, File>(
    async (fileSelected: File) => {
      const data = await ImageUploadService.uploadProfilePicture(fileSelected);
      return data;
    },
    {
      onSuccess: (res) => {},
      onError: (err: any) => {},
    }
  );
  return [postProfilePicture] as const;
};
