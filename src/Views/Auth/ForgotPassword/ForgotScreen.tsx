"use client";
import React, { useState } from "react";
import darkLogo from "../../../../public/Logo/logo-dark.png";
import lightLogo from "../../../../public/Logo/logo-light.png";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Link from "next/link";
import AuthLayout from "@/Layout/Auth/AuthLayout";
import Button from "@/components/Button/Button";
import Field from "@/components/InputField/Field";

const ForgotScreen = () => {
    const [email, setEmail] = useState<string>("");

    const router = useRouter();

    return (
        <AuthLayout>
            <div className="flex flex-col xl:gap-8 gap-3 items-center justify-center plusJakartaSans h-screen">
                <div className="dark:bg-cardBG bg-layoutLightBG px-4 2xl:w-[35%] xl:w-[50%] md:w-[70%] w-[100%] flex items-center justify-center xl:py-[4rem] py-[2rem] rounded-md">
                    <div className="flex flex-col gap-7 w-full">
                        <div className="flex justify-center items-center">
                            <Image src={darkLogo} alt="Logo" width={110} height={110} className="flex dark:hidden" />
                            <Image src={lightLogo} alt="Logo" width={110} height={100} className="hidden dark:flex" />
                        </div>
                        <div className="flex justify-center items-center flex-col gap-2.5 px-8">
                            <h2 className="uppercase font-bold dark:text-headingDark text-headingLight h2">Reset Password</h2>
                            <p className="text-secondaryTextColor text-center ">Enter your email address and we'll send you an email with instructions to reset your password.</p>
                        </div>
                        <div className="flex flex-col gap-4">
                            <div className="flex flex-col gap-2 px-4">
                                <label className="text-sm dark:text-headingDark text-headingLight font-semibold">Email</label>
                                <Field placeHolder="Enter Your Email" type="email" inputCustomClass="w-full" className="gap-2" styles={{ outline: "none" }} divStyle={{ padding: "0.75rem 0.8rem" }} onChange={(e: any) => setEmail(e.target.value)} name="email" value={email} disabled={false} />
                            </div>
                        </div>
                        <div className="flex items-center justify-center px-4">
                            <Button name="Reset Password" pClass="font-semibold" onClick={() => router.push("/verify-otp")} />
                        </div>
                    </div>
                </div>
                <div className="flex gap-1 text-white">
                    <p>Back to</p>
                    <Link href={"/login"} className="font-bold underline">
                        Sign In
                    </Link>
                </div>
            </div>
        </AuthLayout>
    );
};

export default ForgotScreen;
