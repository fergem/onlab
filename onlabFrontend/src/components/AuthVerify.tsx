import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/AuthHooks";

const parseJwt = (token: string | undefined) => {
  if (token) {
    try {
      return JSON.parse(atob(token.split(".")[1]));
    } catch (e) {
      return null;
    }
  }
  return "";
};

export default function AuthVerify() {
  const navigate = useNavigate();
  const { user, logoutUser } = useAuth();
  useEffect(() => {
    if (user) {
      const decodedJwt = parseJwt(user?.bearer);
      if (decodedJwt.exp * 1000 < Date.now() || !user.bearer) {
        logoutUser();
        navigate("/");
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <div />;
}
