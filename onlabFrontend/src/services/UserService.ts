import { Pet, PetInsertModel, PetUpdateModel } from "../models/Pet";
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

const insertPet = async ({ name, species, age, image }: PetInsertModel) => {
  const formData = new FormData();

  formData.append("Name", name);
  formData.append("Species", species);
  formData.append("Age", age.toString());

  if (image) formData.append("file", image);

  const endresult = await apiInstance.post<Pet>(
    "/users/addpet",
    {
      pet: {
        name,
        species,
        age,
      },
      file: image,
    },
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return endresult.data;
};

const updatePet = async (pet: PetUpdateModel) => {
  const endresult = await apiInstance.put<Pet>(
    "/users/updatepet",
    {
      pet,
    },
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return endresult.data;
};

const deletePet = async (id: number) => {
  const result = await apiInstance.delete(`/users/deletepet/${id}`);
  return result;
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
  updatePet,
  getUserPets,
  deletePet,
  updateUser,
  updatePassword,
  uploadProfilePicture,
  getUserDetails,
};
export default UserService;
