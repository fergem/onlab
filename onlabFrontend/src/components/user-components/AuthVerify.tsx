import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/react-query/AuthHooks";

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
        console.log("bent");
        console.log(user);
        logoutUser();
        navigate("/");
      }
    }
  }, [logoutUser, navigate, user]);

  return <div />;
}
