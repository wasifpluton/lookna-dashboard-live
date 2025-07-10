import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { LoginRequest, LoginResponse } from "./AuthTypes";

export const AuthSlice = createApi({
  reducerPath: "AuthSlice",
  baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_PORT }),
  endpoints: (build) => ({
    Login: build.mutation<LoginResponse, LoginRequest>({
      query: (data) => ({
        url: `/api/login-admin`,
        method: "POST",
        body: data,
      }),
    }),

    Logout: build.mutation<
      { message: string },
      { refreshToken: string; deviceId: string }
    >({
      query: (data) => ({
        url: `/api/logout`,
        method: "POST",
        body: {
          refreshToken: data.refreshToken,
          deviceId: data.deviceId,
        },
      }),
    }),

    refreshToken: build.mutation<
      { message: string },
      { refreshToken: string; deviceId: string }
    >({
      query: (refreshToken) => ({
        url: `/api/refresh-token`,
        method: "POST",
        body: {
          refreshToken: refreshToken.refreshToken,
          deviceId: refreshToken.deviceId,
        },
      }),
    }),
  }),
});

export const { useLoginMutation, useLogoutMutation, useRefreshTokenMutation } =
  AuthSlice;
