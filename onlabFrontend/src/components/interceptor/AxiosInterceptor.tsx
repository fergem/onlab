/* eslint-disable no-param-reassign */
/* eslint-disable no-underscore-dangle */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/jsx-no-useless-fragment */
import { useAuth } from "../../hooks/react-query/AuthHooks";
import { User } from "../../models/User";
import AuthService from "../../services/AuthService";
import apiInstance from "../../services/api";

export interface IAxiosInterceptor {
  children: JSX.Element;
}

interface PromiseCallback {
  resolve: (value?: unknown) => void;
  reject: (reason?: any) => void;
}

export default function AxiosInterceptor({ children }: IAxiosInterceptor) {
  const { refreshToken, logoutUser } = useAuth();
  let isRefreshing = false;
  let failedQueue: PromiseCallback[] = [];
  const processQueue = (error: any, token: string | null = null) => {
    failedQueue.forEach((prom) => {
      if (error) {
        prom.reject(error);
      } else {
        prom.resolve(token);
      }
    });

    failedQueue = [];
  };

  const pushToQueue = (originalRequest: any) => {
    new Promise((resolve, reject) => {
      failedQueue.push({ resolve, reject });
    })
      .then((token) => {
        originalRequest.headers.Authorization = `Bearer ${token}`;
        return apiInstance(originalRequest);
      })
      .catch((err) => {
        return Promise.reject(err);
      });
  };

  apiInstance.interceptors.response.use(
    (response) => response,
    (error) => {
      const originalRequest = error.config;
      if (error.response.status === 401 && !originalRequest._retry) {
        if (isRefreshing) return pushToQueue(originalRequest);
        originalRequest._retry = true;
        isRefreshing = true;
        return new Promise((resolve, reject) => {
          AuthService.refreshToken(getLocalRefreshToken())
            .then(({ data }) => {
              refreshToken(data);
              apiInstance.defaults.headers.common.Authorization = `Bearer ${data.accessToken}`;
              originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;
              resolve(apiInstance(originalRequest));
              processQueue(null, data.accessToken);
            })
            .catch((err) => {
              logoutUser();
              processQueue(err, null);
              reject(err);
            })
            .finally(() => {
              isRefreshing = false;
            });
        });
      }
      return Promise.reject(error);
    }
  );

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
