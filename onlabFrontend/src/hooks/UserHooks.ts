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
      retryDelay: 6000,
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
  const [fileSelected, setFileSelected] = useState<File | null>(null);
  const {
    isLoading: loading,
    mutate: postProfilePicture,
    isError: error,
  } = useMutation<any, Error>(
    async () => {
      if (fileSelected)
        return await ImageUploadService.uploadProfilePicture(fileSelected);
    },
    {
      onSuccess: (res) => {},
      onError: (err: any) => {},
    }
  );
  return { fileSelected, setFileSelected, postProfilePicture };
};
