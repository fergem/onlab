import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { Pet, PetInsertModel, PetUpdateModel } from "../../models/Pet";
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
      const result = UserService.getUserDetails();
      console.log(result);
      return result;
    },
  });

  useEffect(() => {
    if (data) setUserDetails(data);
  }, [data]);
  console.log(userDetails);
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
        queryClient.invalidateQueries("query-pets");
        notifications.success(
          `Successfully added ${result.name}, the ${result.species}`
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
      onError: (error: AxiosError) =>
        notifications.error(error.response?.data as string),
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
      onSuccess: () => {
        notifications.success("Successfully updated user information");
        queryClient.invalidateQueries("query-user-details");
      },
      onError: (error: AxiosError) =>
        notifications.error(error.response?.data as string),
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
      onError: (error: AxiosError) =>
        notifications.error(error.response?.data as string),
    }
  );

  return { deletePet };
};
