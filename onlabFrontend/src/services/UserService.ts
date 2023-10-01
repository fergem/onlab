import axios from "axios";
import Pet, { PetFilter, PetInsertModel } from "../models/Pet";
import { UserInformation } from "../models/User";

const getUserPets = async (filter?: PetFilter) => {
  const response = await axios.get<Pet[]>("/api/users/pets", {
    params: {
      petIDs: filter?.petIDs?.join(","),
    },
  });
  return response.data;
};

const updateUser = async (info: UserInformation) => {
  const response = await axios.patch<UserInformation>(
    "api/users/updateprofile",
    info
  );
  return response.data;
};

const updatePassword = async (password: string) => {
  const response = await axios.patch<UserInformation>(
    "api/users/changepassword",
    {
      Password: password,
    }
  );
  return response.data;
};

const insertPet = async ({ name, species, age, images }: PetInsertModel) => {
  const result = await axios.post<number>("/api/users/addpet", {
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

  const endresult = await axios.post<string>(
    "/api/users/addpetimage",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
        petID: result.data,
      },
    }
  );
  return endresult;
};

const deletePet = async (id: number) => {
  const result = await axios.delete(`/api/users/deletepet/${id}`);
  return result;
};

const UserService = {
  insertPet,
  getUserPets,
  deletePet,
  updateUser,
  updatePassword,
};
export default UserService;
