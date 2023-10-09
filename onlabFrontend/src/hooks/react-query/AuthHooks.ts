import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import {
  LoginModel,
  RefreshTokenModel,
  RegisterModel,
  User,
} from "../../models/User";
import AuthService from "../../services/AuthService";

export const useLocalStorage = () => {
  const [value, setValue] = useState<string | null>(null);

  const setItem = (key: string, itemValue: string) => {
    localStorage.setItem(key, itemValue);
    setValue(itemValue);
  };

  const getItem = (key: string) => {
    const itemValue = localStorage.getItem(key);
    setValue(itemValue);
    return itemValue;
  };

  const removeItem = (key: string) => {
    localStorage.removeItem(key);
    setValue(null);
  };

  return { value, setItem, getItem, removeItem };
};

export const useUser = () => {
  const { user, setUser } = useContext(AuthContext);
  const { setItem, removeItem } = useLocalStorage();

  const addUser = (userAdded: User) => {
    setUser(userAdded);
    setItem("user", JSON.stringify(userAdded));
  };

  const removeUser = () => {
    setUser(null);
    removeItem("user");
  };

  return {
    user,
    addUser,
    removeUser,
  };
};

export const useAuth = () => {
  const { user, addUser, removeUser } = useUser();
  const { getItem } = useLocalStorage();
  const navigate = useNavigate();

  useEffect(() => {
    const userToGet = getItem("user");
    if (userToGet) {
      const contextUser = JSON.parse(userToGet ?? "");
      addUser(contextUser);
      axios.defaults.headers.common.Authorization = `Bearer ${contextUser.accessToken}`;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const registerUser = async (registerModel: RegisterModel) => {
    await AuthService.register(registerModel);
    navigate("/login");
  };

  const loginUser = async (loginModel: LoginModel) => {
    const userData = await AuthService.login(loginModel);
    addUser(userData);
    navigate("/profile");
  };

  const refreshToken = async (model: RefreshTokenModel) => {
    const response = await AuthService.updateUserToken(model);
    if (user)
      addUser({
        ...user,
        accessToken: response.accessToken,
        refreshToken: response.refreshToken,
      });
  };

  const logoutUser = async () => {
    if (user)
      // await AuthService.logout(authHeader());
      removeUser();
  };

  const getLocalRefreshToken = () => {
    return user?.refreshToken;
  };

  const getLocalAccessToken = () => {
    return user?.accessToken;
  };

  return {
    user,
    registerUser,
    loginUser,
    logoutUser,
    refreshToken,
    getLocalRefreshToken,
    getLocalAccessToken,
  };
};
