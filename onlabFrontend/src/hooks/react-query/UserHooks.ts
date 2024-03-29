import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { Pet, PetInsertModel, PetUpdateModel } from "../../models/Pet";
import {
  UpdatePasswordModel,
  UpdateUserModel,
  UserDetails,
} from "../../models/User";
import UserService from "../../services/UserService";
import useNotification from "../useNotification";

export const useGetUser = () => {
  const [userDetails, setUserDetails] = useState<UserDetails>();
  const {
    isLoading: isLoadingUserDetials,
    refetch: getUserDetails,
    isError: isErrorUserDetails,
    data,
  } = useQuery<UserDetails, Error>({
    queryKey: ["query-user-details", userDetails],
    queryFn: async () => {
      const result = UserService.getUserDetails();
      return result;
    },
    staleTime: Infinity,
    cacheTime: 0,
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (data) setUserDetails(data);
  }, [data]);
  return {
    userDetails,
    isLoadingUserDetials,
    isErrorUserDetails,
    getUserDetails,
  };
};

export const useGetUserPets = () => {
  const [pets, setPets] = useState<Pet[]>([]);
  const {
    isLoading,
    refetch: refetchPets,
    isError,
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

  return { pets, isError, isLoading, refetchPets };
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
        queryClient.invalidateQueries("query-pets");
        notifications.success(
          `Successfully added ${result.name}, the ${result.species} to your profile`
        );
      },

      onError: (error: AxiosError) => {
        notifications.error(error.response?.data as string);
      },
    }
  );
  return { postPet };
};

export const useUpdateUserPet = () => {
  const queryClient = useQueryClient();
  const notifications = useNotification();

  const { mutate: updatePet } = useMutation(
    "mutate-updatePet",
    async (pet: PetUpdateModel) => {
      return UserService.updatePet(pet);
    },
    {
      onSuccess: (result) => {
        queryClient.invalidateQueries("query-pets");
        notifications.success(`Successfully updated ${result.name}`);
      },

      onError: (error: AxiosError) => {
        notifications.error(error.response?.data as string);
      },
    }
  );
  return { updatePet };
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
      onSuccess: () => {
        notifications.success("Successfully updated user information");
        queryClient.invalidateQueries("query-user-details");
      },
      onError: (error: AxiosError) =>
        notifications.error(error.response?.data as string),
    }
  );
  return { updateUser };
};

export const useUpdateUserPassword = () => {
  const queryClient = useQueryClient();

  const notifications = useNotification();
  const { mutate: updateUser } = useMutation(
    "mutate-updateUser",
    async (model: UpdatePasswordModel) => {
      return UserService.updatePassword(model);
    },
    {
      onSuccess: () => {
        notifications.success("Successfully updated password");
        queryClient.invalidateQueries("query-user-details");
      },
      onError: (error: AxiosError) =>
        notifications.error(error.response?.data as string),
    }
  );
  return { updateUser };
};

export const useUserProfilePictureUpload = () => {
  const queryClient = useQueryClient();
  const notifications = useNotification();

  const { mutate: postProfilePicture } = useMutation(
    async (fileSelected: File) => {
      if (fileSelected) return UserService.uploadProfilePicture(fileSelected);
    },
    {
      onSuccess: () => {
        notifications.success("Successfully updated user information");
        queryClient.invalidateQueries("query-user-details");
      },
      onError: (error: AxiosError) =>
        notifications.error(error.response?.data as string),
    }
  );
  return { postProfilePicture };
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
      onError: (error: AxiosError) =>
        notifications.error(error.response?.data as string),
    }
  );

  return { deletePet };
};
