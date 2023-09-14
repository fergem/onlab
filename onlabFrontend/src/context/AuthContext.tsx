import { createContext } from "react";
import User from "../models/User";

interface IAuthContext {
  user: User | null;
  setUser: (user: User | null) => void;
}

const AuthContext = createContext<IAuthContext>({
  user: null,
  setUser: () => {},
});

export default AuthContext;
