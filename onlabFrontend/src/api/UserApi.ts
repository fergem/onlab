import axios from "axios";
import { useEffect, useState } from "react";
import User from "../models/User";

export const LoadUsersfromApi = () => {
  const [users, setUsers] = useState<User[]>([]);
  useEffect(() => {
    axios.get<User[]>("/api/users").then((response) => {
      console.log(response.data);
      setUsers(response.data);
    });
  }, []);

  return users;
};
