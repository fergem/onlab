import axios from "axios";

const login = async (username: string, password: string) => {
  return await axios
    .post<any>("/api/users/login", {
      username,
      password,
    })
    .then((response) => {
      axios.defaults.headers.common["Authorization"] =
        "Bearer " + response.data.user.bearer;
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
