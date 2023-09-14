import axios from "axios";
import Pet, { PetInsertModel } from "../models/Pet";

const getUserPets = async () => {
  const response = await axios.get<Pet[]>("/api/users/pets");
  return response.data;
};

const insertPet = ({
  name,
  description,
  species,
  age,
  picture,
}: PetInsertModel) => {
  return axios.post<PetInsertModel>("/api/users/addpet", {
    name,
    description,
    species,
    age,
  });
};

const UserService = {
  insertPet,
  getUserPets,
};
export default UserService;
