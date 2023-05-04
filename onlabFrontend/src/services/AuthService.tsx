import axios from "axios";
import { createContext, ReactNode, useState } from "react";
import User, { LoggedUser } from "../models/User";

const authHeader = (bearer: string, setBearer: (bearer: string) => {}) => {
  if (bearer) {
    return { Authorization: "Bearer " + bearer };
  } else {
    return { Authorization: "" };
  }
};

const login = async (username: string, password: string) => {
  return await axios
    .post<any>("/api/users/login", {
      username,
      password,
    })
    .then((response) => {
      if (response.data.bearer) {
        var userString = JSON.stringify(response.data);
        localStorage.setItem("user", userString);
      }
      return response.data;
    });
};

const register = async (username: string, email: string, password: string) => {
  return await axios.post<any>("/api/users/register", {
    username,
    email,
    password,
  });
};

export const initalUser: User = {
  firstName: "",
  lastName: "",
  userName: "",
  age: 0,
  email: "",
  picture: [],
};

export const initalContextValue = {
  bearer: "",
  setBearer: (bearer: string) => {},
  user: initalUser,
  setUser: (user: User) => {},
  login: (username: string, password: string) => {},
  register: (username: string, email: string, password: string) => {},
  authHeader: (bearer?: string) => {},
};
export const UserContext = createContext(initalContextValue);

interface IProp {
  children: ReactNode;
}

const AuthService: React.FC<IProp> = ({ children }) => {
  const [user, setUser] = useState(initalUser);
  const [bearer, setBearer] = useState("");
  return (
    <UserContext.Provider
      value={{ bearer, setBearer, user, setUser, login, register, authHeader }}>
      {children}
    </UserContext.Provider>
  );
};

export default AuthService;
