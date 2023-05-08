import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import User from "../models/User";
import { AuthService } from "../services/AuthService";

export const useLocalStorage = () => {
  const [value, setValue] = useState<string | null>(null);

  const setItem = (key: string, value: string) => {
    localStorage.setItem(key, value);
    setValue(value);
  };

  const getItem = (key: string) => {
    const value = localStorage.getItem(key);
    setValue(value);
    return value;
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

  const addUser = (user: User) => {
    setUser(user);
    setItem("user", JSON.stringify(user));
  };

  const removeUser = () => {
    setUser(null);
    removeItem("user");
  };

  return [user, addUser, removeUser] as const;
};

export const useAuth = () => {
  const [user, addUser, removeUser] = useUser();
  const { getItem } = useLocalStorage();
  const navigate = useNavigate();

  useEffect(() => {
    const user = getItem("user");
    if (user) {
      addUser(JSON.parse(user));
    }
  }, []);

  const register = async (
    username: string,
    email: string,
    password: string
  ) => {
    await AuthService.register(username, email, password);
    navigate("/login");
  };

  const login = async (username: string, password: string) => {
    const userData = await AuthService.login(username, password);
    addUser(userData.user);
    navigate("/profile");
  };

  const logout = async () => {
    if (user)
      //await AuthService.logout(authHeader());
      removeUser();
    navigate("/");
  };

  return { user, register, login, logout };
};
