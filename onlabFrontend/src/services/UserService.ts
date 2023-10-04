import axios from "axios";
import { Pet, PetFilter, PetInsertModel } from "../models/Pet";
import { UpdateUserModel, UserDetails } from "../models/User";

const getUserPets = async (filter?: PetFilter) => {
  const response = await axios.get<Pet[]>("/api/users/pets", {
    params: {
      petIDs: filter?.petIDs?.join(","),
    },
  });
  return response.data;
};

const updateUser = async (info: UpdateUserModel) => {
  const response = await axios.patch<UserDetails>(
    "api/users/updateprofile",
    info
  );
  return response.data;
};

const updatePassword = async (password: string) => {
  const response = await axios.patch("api/users/changepassword", {
    Password: password,
  });
  return response.data;
};

const insertPet = async ({ name, species, age, images }: PetInsertModel) => {
  const result = await axios.post<Pet>("/api/users/addpet", {
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

  const endresult = await axios.patch<Pet>("/api/users/addpetimage", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      petID: result.data.id,
    },
  });
  return endresult;
};

const deletePet = async (id: number) => {
  const result = await axios.delete(`/api/users/deletepet/${id}`);
  return result;
};

const uploadPetPictures = async (ID: number, file: File) => {
  const formData = new FormData();

  formData.append("file", file);

  const response = await axios.patch<Pet>("/api/users/addpetimage", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      petID: ID,
    },
  });

  return response.data;
};

const uploadProfilePicture = async (file: File | undefined) => {
  const formData = new FormData();
  if (file !== undefined) formData.append("file", file);

  const response = await axios.patch<UserDetails>(
    "/api/users/addprofilepicture",
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
};
export default UserService;
