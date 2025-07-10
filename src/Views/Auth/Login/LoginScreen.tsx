"use client";

import React, { useState } from "react";
import darkLogo from "../../../../public/Logo/logo-dark.png";
import lightLogo from "../../../../public/Logo/logo-light.png";
import { useRouter } from "next/navigation";
import AuthLayout from "@/Layout/Auth/AuthLayout";
import Button from "@/components/Button/Button";
import Field from "@/components/InputField/Field";
import Image from "next/image";
import Link from "next/link";
import { useLoginHandler } from "@/models/Auth/AuthModel";

interface loginFieldsState {
  email: string;
  password: string;
  deviceId: string;
}

const LoginScreen = () => {
  const [loginFields, setLoginFields] = useState<loginFieldsState>({
    email: "",
    password: "",
    deviceId: "Web",
  });

  const { email, password } = loginFields;
  const router = useRouter();

  const { Login, isLoading } = useLoginHandler();

  const handleLogin = (e: any): void => {
    e.preventDefault();
    Login(loginFields);
  };

  const handleFields = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginFields({ ...loginFields, [e.target.name]: e.target.value });
  };

  return (
    <AuthLayout>
      <div className="flex flex-col xl:gap-8 gap-3 items-center justify-center plusJakartaSans ">
        <div className="bg-[var(--glass-bg)] backdrop-blur-md border border-white rounded-xl shadow-lg px-4 w-full sm:w-[90%] md:w-[70%] lg:w-[50%] xl:w-[35%] flex items-center justify-center xl:py-[5rem] py-[2rem]">
          <div className="flex flex-col gap-7 w-full">
            <div className="flex justify-center items-center flex-col gap-2.5 px-8">
              <h2 className="text-textColorDark uppercase font-bold  h2">
                Sign In
              </h2>
              <p className="text-textColorDark text-center ">
                Enter your email address and password to access admin panel.
              </p>
            </div>
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-2 px-4">
                <label className="text-sm text-textColorDark font-semibold">
                  Username or Email
                </label>
                <input
                  type="email"
                  placeholder="Username"
                  className="p-2 md:p-3 rounded-md bg-transparent text-white focus:outline-none border-2 focus:border-white focus:border-2 placeholder:text-[12px] md:placeholder:text-[16px]"
                  name="email"
                  value={email}
                  onChange={handleFields}
                />
              </div>
              <div className="flex flex-col gap-2 px-4">
                <span className="flex justify-between">
                  {/* <div className="flex items-center justify-between gap-2 w-full">
                    <label className="text-sm text-color-lightGray font-semibold">
                      Password
                    </label>
                    <Link
                      href={"/forgot-password"}
                      className="text-sm text-color-lightGray font-semibold"
                    >
                      Forgot Password?
                    </Link>
                  </div> */}
                  <label className="text-sm text-color-lightGray font-semibold">
                    Password
                  </label>
                </span>
                <input
                  type="password"
                  placeholder="Password"
                  className="p-2 md:p-3 rounded-md bg-transparent text-white focus:outline-none border-2 focus:border-white focus:border-2 placeholder:text-[12px] md:placeholder:text-[16px]"
                  name="password"
                  value={password}
                  onChange={handleFields}
                />
              </div>
            </div>
            <div className="flex items-center justify-center px-4">
              {isLoading ? (
                <button
                  type="submit"
                  // onClick={handleLogin}
                  className="bg-[var(--primary-theme-color)] rounded-md w-full text-white font-semibold py-2 roundedtransition"
                >
                  Logging in...
                </button>
              ) : (
                <button
                  type="submit"
                  onClick={handleLogin}
                  className="bg-[var(--primary-theme-color)] rounded-md w-full text-white font-semibold py-2 roundedtransition"
                >
                  Login
                </button>
              )}
            </div>
          </div>
        </div>
        {/* <div className="flex gap-1 text-white">
          <p>New Here?</p>
          <Link href={"/sign-up"} className="font-bold underline">
            Sign Up
          </Link>
        </div> */}
      </div>
    </AuthLayout>
  );
};

export default LoginScreen;
