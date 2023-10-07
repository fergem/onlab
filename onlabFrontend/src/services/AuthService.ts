import axios from "axios";
import { LoginModel, RegisterModel, User } from "../models/User";

const login = async (loginModel: LoginModel) => {
  return axios
    .post<User>("/api/users/login", {
      username: loginModel.userName,
      password: loginModel.password,
    })
    .then((response) => {
      axios.defaults.headers.common.Authorization = `Bearer ${response.data.bearer}`;
      return response.data;
    });
};

const register = async (registerModel: RegisterModel) => {
  return axios.post("/api/users/register", registerModel);
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
