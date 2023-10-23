/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable no-param-reassign */
/* eslint-disable no-underscore-dangle */
import { useEffect } from "react";
import { useAuth } from "../../hooks/react-query/AuthHooks";
import { User } from "../../models/User";
import AuthService from "../../services/AuthService";
import apiInstance from "../../services/api";

export interface IAxiosInterceptor {
  children: JSX.Element;
}

export default function AxiosInterceptor({ children }: IAxiosInterceptor) {
  const { refreshToken, logoutUser } = useAuth();
  useEffect(() => {
    apiInstance.interceptors.request.use(
      (config) => {
        const token = getLocalRefreshToken().accessToken;
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
    apiInstance.interceptors.response.use(
      (res) => {
        return res;
      },
      async (err) => {
        const originalConfig = err.config;

        if (originalConfig.url !== "/users/login" && err.response) {
          // Access Token was expired
          if (err.response.status === 401 && !originalConfig._retry) {
            originalConfig._retry = true;

            try {
              const result = await AuthService.updateUserToken(
                getLocalRefreshToken()
              )
                .then((s) => {
                  refreshToken(s);
                })
                .catch(() => {
                  removeUser();
                });
              return await apiInstance(originalConfig);
            } catch (_error) {
              return Promise.reject(_error);
            }
          }
        }

        return Promise.reject(err);
      }
    );
  }, [logoutUser, refreshToken]);
  return <>{children}</>;
}

function getLocalRefreshToken() {
  const user = localStorage.getItem("user");
  if (user) {
    const { refreshToken, accessToken } = JSON.parse(user) as User;
    return { refreshToken, accessToken };
  }
  return {
    refreshToken: undefined,
    accessToken: undefined,
  };
}

function removeUser() {
  localStorage.removeItem("user");
  window.location.href = "/";
}
