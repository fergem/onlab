import axios from "axios";
import Pet from "../models/Pet";

const getUserPets = async () => {
  const response = await axios.get<Pet[]>("/api/users/pets");
  return response.data;
};

const insertPet = (
  { name, description, species, age }: Pet,
  petIDs: number[]
) => {
  return axios.post<any>("/api/users/addpet", {
    name,
    description,
    species,
    age,
    petIDs,
  });
};

export const UserService = {
  insertPet,
  getUserPets,
};
