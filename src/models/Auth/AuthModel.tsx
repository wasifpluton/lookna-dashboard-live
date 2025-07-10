"use client";

import {
  ShowApiErrorToast,
  ShowErrorToast,
  ShowSuccessToast,
  ShowWarningToast,
} from "@/components/Toast/Toast";
import { useLoginMutation, useLogoutMutation } from "@/Redux/Auth/AuthSlice";

import { deleteCookie, setCookie } from "cookies-next";
import { useRouter } from "next/navigation";

export const useLoginHandler = () => {
  const [login, { isLoading }] = useLoginMutation();
  const router = useRouter();

  const Login = async (data: {
    email: string;
    password: string;
    deviceId: string;
  }) => {
    try {
      if (data?.email === "" || data?.password === "") {
        return ShowWarningToast("All fields required");
      }

      const res = await login(data);

      if (!res.error) {
        ShowSuccessToast("Logged in successfully");
        setCookie("lookna_admin", res);
        router.push("/dashboard");
      } else {
        ShowErrorToast((res?.error as any)?.data?.message);
      }
    } catch (error) {
      ShowApiErrorToast(error);
    }
  };

  return { Login, isLoading };
};

export const useLogoutHandler = () => {
  const [logoutAPI] = useLogoutMutation();
  const router = useRouter();

  const Logout = async (refreshToken: {
    refreshToken: string;
    deviceId: string;
  }) => {
    try {
      const res = await logoutAPI({
        refreshToken: refreshToken.refreshToken,
        deviceId: refreshToken.deviceId,
      });

      if (!res.error) {
        deleteCookie("lookna_admin");
        router.push("/login");
      } else {
        ShowErrorToast((res?.error as any)?.data?.message);
      }
    } catch (error) {
      ShowApiErrorToast(error);
    }
  };

  return { Logout };
};
