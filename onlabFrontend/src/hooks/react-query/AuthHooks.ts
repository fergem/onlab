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
import apiInstance from "../../services/api";

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
  const { getItem, setItem, removeItem } = useLocalStorage();

  const addUser = (userAdded: User) => {
    setUser(userAdded);
    setItem("user", JSON.stringify(userAdded));
  };

  const refreshUserToken = (tokenModel: RefreshTokenModel) => {
    const userInStorage = getItem("user");
    if (userInStorage) {
      const parsedUser = JSON.parse(userInStorage) as User;
      const newUser = {
        ...parsedUser,
        accessToken: tokenModel.accessToken,
        refreshToken: tokenModel.refreshToken,
      };
      setItem("user", JSON.stringify(newUser));
    }
  };

  const removeUser = () => {
    setUser(null);
    removeItem("user");
    window.location.href = "/";
  };

  return {
    user,
    refreshUserToken,
    addUser,
    removeUser,
  };
};

export const useAuth = () => {
  const { refreshUserToken, user, addUser, removeUser } = useUser();
  const { getItem } = useLocalStorage();
  const navigate = useNavigate();

  useEffect(() => {
    const userToGet = getItem("user");
    if (userToGet) {
      const contextUser = JSON.parse(userToGet ?? "") as User;
      addUser(contextUser);
      apiInstance.defaults.headers.common.Authorization = `Bearer ${contextUser.accessToken}`;
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

  const refreshToken = (model: RefreshTokenModel) => {
    refreshUserToken(model);
  };

  const logoutUser = async () => {
    if (user) {
      removeUser();
    }
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
