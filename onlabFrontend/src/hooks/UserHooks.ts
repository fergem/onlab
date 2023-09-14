import { useState } from "react";
import { useMutation, useQuery } from "react-query";
import Pet, { PetImageUploadModel, PetInsertModel } from "../models/Pet";
import ImageUploadService from "../services/ImageUploadService";
import UserService from "../services/UserService";

export const useGetUserPets = () => {
  const [pets, setPets] = useState<Pet[]>([]);
  const {
    isLoading: loading,
    refetch: listPets,
    isError: error,
  } = useQuery<Pet[], Error>(
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
  return { pets, error, loading, listPets };
};

export const usePostUserPet = () => {
  const { mutate: postPet, isError: error } = useMutation<any, Error, PetInsertModel>(
    "mutate-postPet",
    async (pet: PetInsertModel) => {
      return UserService.insertPet(pet);
    }
  );
  return { error, postPet };
};

export const usePetImageUpload = () => {
  const {
    isLoading: loading,
    mutate: postPetPicture,
    isError: error,
  } = useMutation(
    async (uploadData: PetImageUploadModel) => {
      const data = await ImageUploadService.uploadPetPictures(
        uploadData.petID,
        uploadData.file
      );
      return data;
    },
    {
      onSuccess: (res) => {},
      onError: (err: any) => {},
    }
  );
  return { postPetPicture };
};

export const useUserProfilePictureUpload = () => {
  const {
    isLoading: loading,
    mutate: postProfilePicture,
    isError: error,
  } = useMutation(
    async (fileSelected: File) => {
      if (fileSelected)
        return ImageUploadService.uploadProfilePicture(fileSelected);
    },
    {
      onSuccess: (res) => {},
      onError: (err: any) => {},
    }
  );
  return { postProfilePicture };
};
