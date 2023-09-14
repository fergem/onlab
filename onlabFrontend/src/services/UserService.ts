import axios from "axios";
import Pet, { PetInsertModel } from "../models/Pet";

const getUserPets = async () => {
  const response = await axios.get<Pet[]>("/api/users/pets");
  return response.data;
};

const insertPet = async ({
  name,
  description,
  species,
  age,
  picture,
}: PetInsertModel) => {
  const result = await axios.post<Pet>("/api/users/addpet", {
    name,
    description,
    species,
    age,
  });

  const formData = new FormData();

  if (picture) formData.append("file", picture);

  const endresult = await axios.post<string>(
    "/api/users/addpetimage",
    formData,
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        petID: result.data.id,
      },
    }
  );

  return endresult.data;
};

const UserService = {
  insertPet,
  getUserPets,
};
export default UserService;
