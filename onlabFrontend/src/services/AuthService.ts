import {
  LoginModel,
  RefreshTokenModel,
  RegisterModel,
  User,
} from "../models/User";
import apiInstance from "./api";

const login = async (loginModel: LoginModel) => {
  return apiInstance
    .post<User>("/users/login", {
      username: loginModel.userName,
      password: loginModel.password,
    })
    .then((response) => {
      apiInstance.defaults.headers.common.Authorization = `Bearer ${response.data.accessToken}`;
      return response.data;
    });
};

const register = async (registerModel: RegisterModel) => {
  return apiInstance.post("/users/register", registerModel);
};

const logout = async () => {
  return apiInstance.post("/users/logout").then(() => {
    apiInstance.defaults.headers.common.Authorization = " ";
  });
};

const updateUserToken = async (token: RefreshTokenModel) => {
  const response = await apiInstance.post<RefreshTokenModel>(
    "/users/refresh-token",
    token
  );

  return response.data;
};
const AuthService = {
  register,
  login,
  logout,
  updateUserToken,
};

export default AuthService;
