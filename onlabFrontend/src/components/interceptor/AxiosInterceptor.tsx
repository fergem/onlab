/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable no-param-reassign */
/* eslint-disable no-underscore-dangle */
import { useEffect } from "react";
import { useAuth } from "../../hooks/react-query/AuthHooks";
import AuthService from "../../services/AuthService";
import apiInstance from "../../services/api";

export interface IAxiosInterceptor {
  children: JSX.Element;
}

export default function AxiosInterceptor({ children }: IAxiosInterceptor) {
  const { user, refreshToken } = useAuth();
  useEffect(() => {
    apiInstance.interceptors.request.use(
      (config) => {
        console.log("firstasd");
        const token = user?.accessToken;
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
          console.log(err.response.status);
          if (err.response.status === 401 && !originalConfig._retry) {
            originalConfig._retry = true;
            console.log("seconasdd");

            try {
              console.log(user);
              const result = await AuthService.updateUserToken({
                refreshToken: user?.refreshToken,
                accessToken: user?.accessToken,
              });

              console.log(result);
              refreshToken(result);

              return await apiInstance(originalConfig);
            } catch (_error) {
              return Promise.reject(_error);
            }
          }
        }

        return Promise.reject(err);
      }
    );
  }, [refreshToken, user]);
  return <>{children}</>;
}
