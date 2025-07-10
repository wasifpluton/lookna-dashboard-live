"use client";
import LoginScreen from "@/Views/Auth/Login/LoginScreen";
import Dashboard from "@/Views/Dashboard/Dashboard/Dashboard";
import { getCookie } from "cookies-next";

export default function Home() {
  const user = getCookie("lookna_admin");
  const parsedUser = user ? JSON.parse(user as string) : null;
  const token = parsedUser?.data?.token;

  return token ? <Dashboard /> : <LoginScreen />;
}
