import axios from "axios";
import User, { LoginModel, RegisterModel } from "../models/User";

const login = async (loginModel: LoginModel) => {
  return axios
    .post<any>("/api/users/login", {
      username: loginModel.userName,
      password: loginModel.password,
    })
    .then((response) => {
      axios.defaults.headers.common.Authorization = `Bearer ${response.data.user.bearer}`;
      return response.data;
    });
};

const register = async (registerModel: RegisterModel) => {
  return axios.post<User>("/api/users/register", {
    email: registerModel.email,
    username: registerModel.userName,
    password: registerModel.password,
  });
};

const logout = async () => {
  return axios.post("api/users/logout").then(() => {
    axios.defaults.headers.common.Authorization = " ";
  });
};

const AuthService = {
  register,
  login,
  logout,
};

export default AuthService;
