import axios from "axios";
import Pet from "../models/Pet";

const login = async (username: string, password: string) => {
  return await axios
    .post<any>("/api/users/login", {
      username,
      password,
    })
    .then((response) => {
      if (response.data.bearer) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }
      return response.data;
    });
};

const register = (username: string, email: string, password: string) => {
  return axios.post<any>("/api/users/register", {
    username,
    email,
    password,
  });
};

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

const getCurrentUser = () => {
  const userStr = localStorage.getItem("user");
  if (userStr) {
    //console.log(JSON.parse(userStr));
    const loggedUser = JSON.parse(userStr);
    return loggedUser.user;
  }

  return null;
};

const authHeader = () => {
  const userStr = localStorage.getItem("user");
  let user = null;
  if (userStr) user = JSON.parse(userStr);

  if (user && user.bearer) {
    return { Authorization: "Bearer " + user.bearer };
  } else {
    return { Authorization: "" };
  }
};

export const UserService = {
  login,
  logout,
  getCurrentUser,
  register,
  authHeader,
  insertPet,
  getUserPets,
};
