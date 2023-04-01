import axios from "axios";

const login = async (username: string, password: string) => {
  console.log("Szarlogin");
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

export const register = (username: string, email: string, password: string) => {
  return axios.post<any>("/api/users/register", {
    username,
    email,
    password,
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

export const UserService = {
  login,
  logout,
  getCurrentUser,
  register,
};
