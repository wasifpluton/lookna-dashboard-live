"use client";

import React from "react";
import Loader from "../Loader/Loader";
import dynamic from "next/dynamic";

interface ButtonProps {
    name?: string;
    bgcolor?: string;
    className?: string;
    disabled?: boolean;
    onClick?: () => void;
    isLoading?: boolean;
    icon?: React.ReactNode;
    textColor?: string;
    style?: React.CSSProperties;
    pClass?: string;
    mainClass?: string;
    type?: "button" | "submit" | "reset";
}

const Button = ({ name, bgcolor, className, disabled, onClick, isLoading, icon, textColor, style, pClass, mainClass, type }: ButtonProps) => {
    let btnClass;

    if (disabled) {
        btnClass = `text-sm w-full cursor-not-allowed text-white p-3 rounded-sm bg-gray-600 ${className} px-10`;
    } else if (mainClass) {
        btnClass = mainClass;
    } else {
        btnClass = `p-3 flex w-full items-center justify-center text-sm ${className} px-10 active:scale-[1.01] cursor-pointer`;
    }

    return (
        <button
            className={`${btnClass}  ${textColor} 
      ${bgcolor ? bgcolor : disabled ? "bg-gray-600" : " bg-RoseRed hover:bg-[#ba5252]"}
      ${disabled ? "text-white" : "text-primary-color"} plusJakartaSans rounded-sm transition-all duration-300 hover:scale-[103%]
      `}
            style={{ ...style, paddingBlock: "0.75rem" }}
            onClick={() => {
                if (disabled === true || isLoading) {
                    return;
                } else if (onClick) {
                    return onClick();
                } else {
                    return;
                }
            }}
            disabled={disabled}
            type={`${type ? type : "button"}`}
        >
            {isLoading ? (
                <span className={`flex items-center text-sm  justify-center plusJakartaSans ${textColor ? textColor : "text-white"} gap-2 ${pClass}`}>
                    <Loader />
                    {name && "Loading..."}
                </span>
            ) : icon ? (
                <span className={`flex items-center text-sm gap-2 w-full plusJakartaSans ${textColor ? textColor : "text-white"} ${pClass}`}>
                    {icon} {name}
                </span>
            ) : (
                <span className={`flex items-center text-sm gap-2 justify-center plusJakartaSans ${textColor ? textColor : "text-white"} ${pClass}`}>{name}</span>
            )}
        </button>
    );
};

export default dynamic(() => Promise.resolve(Button), { ssr: false });
