import axios from "axios";
import { LoginModel, RegisterModel } from "../models/User";

const login = async (loginModel: LoginModel) => {
  return await axios
    .post<any>("/api/users/login", {
      username: loginModel.userName,
      password: loginModel.password,
    })
    .then((response) => {
      axios.defaults.headers.common["Authorization"] =
        "Bearer " + response.data.user.bearer;
      return response.data;
    });
};

const register = async (registerModel: RegisterModel) => {
  return await axios.post<any>("/api/users/register", {
    email: registerModel.email,
    username: registerModel.userName,
    password: registerModel.password,
  });
};

const logout = async () => {
  return await axios.post("api/users/logout").then(() => {
    axios.defaults.headers.common["Authorization"] = " ";
  });
};

export const AuthService = {
  register,
  login,
  logout,
};
