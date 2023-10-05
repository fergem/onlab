import { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { Pet, PetInsertModel } from "../../models/Pet";
import { UpdateUserModel, UserDetails } from "../../models/User";
import UserService from "../../services/UserService";
import useNotification from "../useNotification";

export const useGetUser = () => {
  const [userDetails, setUserDetails] = useState<UserDetails>();
  const {
    isLoading: loadingUserDetials,
    refetch: getUserDetails,
    isError: errorUserDetails,
    data,
  } = useQuery<UserDetails, Error>({
    queryKey: "query-user-details",
    queryFn: async () => {
      return UserService.getUserDetails();
    },
  });

  useEffect(() => {
    if (data) setUserDetails(data);
  }, [data]);

  return { userDetails, loadingUserDetials, errorUserDetails, getUserDetails };
};

export const useGetUserPets = () => {
  const [pets, setPets] = useState<Pet[]>([]);
  const {
    isLoading: loading,
    refetch: listPets,
    isError: error,
    data,
  } = useQuery<Pet[], Error>({
    queryKey: "query-pets",
    queryFn: async () => {
      return UserService.getUserPets();
    },
  });

  useEffect(() => {
    if (data) setPets(data);
  }, [data]);

  return { pets, error, loading, listPets };
};

export const usePostUserPet = () => {
  const queryClient = useQueryClient();
  const notifications = useNotification();

  const { mutate: postPet } = useMutation(
    "mutate-postPet",
    async (pet: PetInsertModel) => {
      return UserService.insertPet(pet);
    },
    {
      onSuccess: (result) => {
        queryClient.setQueryData(["query-pets", result.id], result);
        notifications.success("Successfully updated password");
      },

      onError: (error: Error) => {
        notifications.error(error.message);
      },
    }
  );
  return { postPet };
};

export const useUpdateUser = () => {
  const queryClient = useQueryClient();
  const notifications = useNotification();

  const { mutate: updateUser } = useMutation(
    "mutate-updateUser",
    async (info: UpdateUserModel) => {
      return UserService.updateUser(info);
    },
    {
      onSuccess: (result) => {
        notifications.success("Successfully updated user information");
        queryClient.setQueryData(["query-user-details"], result);
      },
      onError: (error: Error) => notifications.error(error.message),
    }
  );
  return { updateUser };
};

export const useUpdateUserPassword = () => {
  const notifications = useNotification();
  const { mutate: updateUser } = useMutation(
    "mutate-updateUser",
    async (password: string) => {
      return UserService.updatePassword(password);
    },
    {
      onSuccess: () => {
        notifications.success("Successfully updated password");
      },
      onError: (error: Error) => notifications.error(error.message),
    }
  );
  return { updateUser };
};

export const useUserProfilePictureUpload = () => {
  const queryClient = useQueryClient();
  const notifications = useNotification();

  const { mutate: postProfilePicture, isError: errorUpload } = useMutation(
    async (fileSelected: File) => {
      if (fileSelected) return UserService.uploadProfilePicture(fileSelected);
    },
    {
      onSuccess: (result) => {
        notifications.success("Successfully updated user information");
        queryClient.setQueryData(["query-user-details"], result);
      },
      onError: (error: Error) => notifications.error(error.message),
    }
  );
  return { postProfilePicture, errorUpload };
};

export const useDeletePet = () => {
  const queryClient = useQueryClient();
  const notifications = useNotification();

  const { mutate: deletePet } = useMutation(
    async (id: number) => {
      return UserService.deletePet(id);
    },
    {
      onSuccess: () => {
        notifications.success("Successfully deleted pet");
        queryClient.invalidateQueries("query-pets");
      },
      onError: (error: Error) => notifications.error(error.message),
    }
  );

  return { deletePet };
};
