import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import Pet, { PetFilter, PetInsertModel } from "../models/Pet";
import ImageUploadService from "../services/ImageUploadService";
import UserService from "../services/UserService";
import { useUser } from "./AuthHooks";

export const useGetUserPets = (filter?: PetFilter) => {
  const [pets, setPets] = useState<Pet[]>([]);
  const {
    isLoading: loading,
    refetch: listPets,
    isError: error,
  } = useQuery<Pet[], Error>(
    "query-pets",
    async () => {
      const data = await UserService.getUserPets(filter);
      return data;
    },
    {
      onSuccess: (res) => {
        setPets(res);
      },
    }
  );
  return { pets, error, loading, listPets };
};

export const usePostUserPet = () => {
  const queryClient = useQueryClient();
  const { mutate: postPet, isError: error } = useMutation<
    unknown,
    Error,
    PetInsertModel
  >(
    "mutate-postPet",
    async (pet: PetInsertModel) => {
      return UserService.insertPet(pet);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("query-pets");
      },
    }
  );
  return { error, postPet };
};

// export const usePetImageUpload = () => {
//   const { mutate: postPetPicture, isError: errorUpload } = useMutation(
//     async (uploadData: PetImageUploadModel) => {
//       const data = await ImageUploadService.uploadPetPictures(
//         uploadData.petID,
//         uploadData.file
//       );
//       return data;
//     }
//   );
//   return { errorUpload, postPetPicture };
// };

export const useUserProfilePictureUpload = () => {
  const { addUser } = useUser();
  const { mutate: postProfilePicture, isError: errorUpload } = useMutation(
    async (fileSelected: File) => {
      if (fileSelected)
        return ImageUploadService.uploadProfilePicture(fileSelected);
    },
    {
      onSuccess: (res) => {
        if (res) addUser(res);
      },
    }
  );
  return { postProfilePicture, errorUpload };
};

export const useDeletePet = () => {
  const { mutate: deletePet } = useMutation(async (id: number) => {
    return UserService.deletePet(id);
  });

  return { deletePet };
};
