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
        console.log(JSON.stringify(response.data));
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

const insertPet = ({ name, description, species, age }: Pet) => {
  return axios.post<any>("/api/users/addpet", {
    name,
    description,
    species,
    age,
  });
};

const logout = () => {
  localStorage.removeItem("user");
};

const getCurrentUser = () => {
  const userStr = localStorage.getItem("user");
  if (userStr) {
    console.log(JSON.parse(userStr));
    return JSON.parse(userStr);
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
};
