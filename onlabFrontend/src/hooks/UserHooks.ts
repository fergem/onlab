import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import Pet, { PetFilter, PetInsertModel } from "../models/Pet";
import { UserInformation } from "../models/User";
import ImageUploadService from "../services/ImageUploadService";
import UserService from "../services/UserService";
import { useUser } from "./AuthHooks";
import useNotification from "./useNotification";

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
  const { mutate: postPet, isError: error } = useMutation(
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

export const useUpdateUser = () => {
  const notifications = useNotification();
  const { updateProfile } = useUser();

  const { mutate: updateUser } = useMutation(
    "mutate-updateUser",
    async (info: UserInformation) => {
      return UserService.updateUser(info);
    },
    {
      onSuccess: (res) => {
        notifications.success("Successfully updated user information");
        updateProfile(res);
      },
      onError: () => notifications.error("Could not update user information"),
    }
  );
  return { updateUser };
};

export const useUpdateUserPassword = () => {
  const notifications = useNotification();
  const { updateProfile } = useUser();
  const { mutate: updateUser } = useMutation(
    "mutate-updateUser",
    async (password: string) => {
      return UserService.updatePassword(password);
    },
    {
      onSuccess: (res) => {
        notifications.success("Successfully updated password");
        updateProfile(res);
      },
      onError: () => notifications.error("Could not update password"),
    }
  );
  return { updateUser };
};

export const useUserProfilePictureUpload = () => {
  const { updateProfile } = useUser();
  const { mutate: postProfilePicture, isError: errorUpload } = useMutation(
    async (fileSelected: File) => {
      if (fileSelected)
        return ImageUploadService.uploadProfilePicture(fileSelected);
    },
    {
      onSuccess: (res) => {
        if (res) updateProfile(res);
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
