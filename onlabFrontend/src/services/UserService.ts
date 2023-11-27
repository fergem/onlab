import { Pet, PetInsertModel } from "../models/Pet";
import { UpdateUserModel, UserDetails } from "../models/User";
import apiInstance from "./api";

const getUserDetails = async () => {
  const response = await apiInstance.get<UserDetails>("/users/details");

  return response.data;
};

const getUserPets = async () => {
  const response = await apiInstance.get<Pet[]>("/users/pets");
  return response.data;
};

const updateUser = async (info: UpdateUserModel) => {
  const response = await apiInstance.patch<UserDetails>(
    "/users/updateprofile",
    info
  );
  return response.data;
};

const updatePassword = async (password: string) => {
  const response = await apiInstance.patch("/users/changepassword", {
    Password: password,
  });
  return response.data;
};

const insertPet = async ({ name, species, age, image: images }: PetInsertModel) => {
  const result = await apiInstance.post<Pet>("/users/addpet", {
    name,
    species,
    age,
  });

  const formData = new FormData();

  if (images) {
    images.forEach((e) => {
      formData.append("file", e);
    });
  }

  const endresult = await apiInstance.patch<Pet>(
    "/users/addpetimage",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
        petID: result.data.id,
      },
    }
  );
  return endresult.data;
};

const deletePet = async (id: number) => {
  const result = await apiInstance.delete(`/users/deletepet/${id}`);
  return result;
};

const uploadPetPictures = async (ID: number, file: File) => {
  const formData = new FormData();

  formData.append("file", file);

  const response = await apiInstance.patch<Pet>(
    "/users/addpetimage",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
        petID: ID,
      },
    }
  );

  return response.data;
};

const uploadProfilePicture = async (file: File | undefined) => {
  const formData = new FormData();
  if (file !== undefined) formData.append("file", file);

  const response = await apiInstance.patch<UserDetails>(
    "/users/addprofilepicture",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
};

const UserService = {
  insertPet,
  getUserPets,
  deletePet,
  updateUser,
  updatePassword,
  uploadPetPictures,
  uploadProfilePicture,
  getUserDetails,
};
export default UserService;
