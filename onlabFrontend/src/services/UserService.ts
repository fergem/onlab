import axios from "axios";
import { useContext } from "react";
import { UserContext } from "../App";
import Pet from "../models/Pet";

const getUserPets = async () => {
  const response = await axios.get<Pet[]>("/api/users/pets", {
    headers: authHeader(),
  });
  return response.data;
};

const insertPet = ({ name, description, species, age }: Pet) => {
  return axios.post<any>(
    "/api/users/addpet",
    {
      name,
      description,
      species,
      age,
    },
    {
      headers: authHeader(),
    }
  );
};

const logout = () => {
  localStorage.removeItem("user");
  window.location.href = "/";
};

export const UserService = {
  logout,
  insertPet,
  getUserPets,
};
