"use client";
import { Eye, EyeOff } from "lucide-react";
import dynamic from "next/dynamic";
import React, { ReactNode, useState } from "react";

interface FieldProps {
  type?: string;
  disabled?: boolean;
  placeHolder?: string;
  name?: string;
  ref?: any;
  bgColor?: string;
  value?: string;
  className?: string;
  onChange?: any;
  xl?: boolean;
  lg?: boolean;
  md?: boolean;
  isIcon?: boolean;
  row?: number;
  col?: number;
  maxLength?: number;
  StyleColor?: string;
  styles?: any;
  customClass?: string;
  pattern?: string;
  inputCustomClass?: string;
  onKeyPress?: any;
  icon?: ReactNode;
  divStyle?: object;
}

const Field = ({
  type = "text",
  disabled,
  placeHolder,
  name,
  ref,
  bgColor,
  value,
  className,
  onChange,
  xl,
  lg,
  md,
  isIcon,
  row,
  col,
  maxLength,
  styles,
  customClass,
  pattern,
  onKeyPress,
  icon,
  inputCustomClass,
  divStyle,
}: FieldProps) => {
  const [showPassword, setShowPassword] = useState(false);
  // input fields

  const inputClassName = `outline-none focus:border-[#aab8c5] focus:border border w-full dark:border-[#aab8c5]/30 border-headingLight border rounded-sm text-black dark:text-[#aab8c5] text-sm p-3 ${
    bgColor ? bgColor : "bg-white dark:bg-fieldColor"
  } ${xl ? "sm:w-96 w-4/5" : lg ? "sm:w-80 w-4/5" : md ? "w-64" : "w-48"}`;

  const divClassName = ` focus-within:border focus-within:border-[#aab8c5] border border-headingLight  w-full rounded-sm outline-none text-black dark:text-[#aab8c5] text-sm  p-4 relative ${
    bgColor ? bgColor : "bg-white dark:bg-fieldColor"
  } ${isIcon ? "px-2" : "pr-2"} flex items-center justify-start ${
    xl ? "sm:w-96 w-4/5" : lg ? "sm:w-80 w-4/5" : md ? "w-64" : "w-48"
  }`;

  const textAreaClassName = `w-full border-none rounded-sm text-black dark:text-[#aab8c5] px-2 py-1 flex items-center justify-between ${
    xl ? "w-96" : lg ? "w-80" : md ? "w-64" : "w-48"
  }`;

  const inputProps = {
    type:
      type === "password"
        ? showPassword
          ? "text"
          : "password"
        : type === "text"
        ? "text"
        : type === "email"
        ? "email"
        : type === "number"
        ? "number"
        : type === "range"
        ? "range"
        : type === "radio"
        ? "radio"
        : type === "checkbox"
        ? "checkbox"
        : type === "date"
        ? "date"
        : type === "time"
        ? "time"
        : type === "url"
        ? "url"
        : "text",

    placeholder:
      placeHolder ||
      (type === "password"
        ? "Password"
        : type === "text"
        ? "Text"
        : type === "email"
        ? "Email"
        : type === "number"
        ? "Number"
        : type === "range"
        ? "Range"
        : type === "radio"
        ? "Radio"
        : type === "checkbox"
        ? "Checkbox"
        : type === "date"
        ? "Date"
        : type === "time"
        ? "Time"
        : type === "url"
        ? "URL"
        : "Text"),

    style: { ...styles },
    name: name,
    maxLength: maxLength,
    disabled: disabled,
    ...(onChange ? { value, onChange } : { defaultValue: value }),
    pattern: pattern,
    className: className
      ? `${inputClassName} ${className}`
      : type === "password" || isIcon
      ? `w-full ${inputClassName}`
      : customClass
      ? customClass
      : `${inputClassName}`,
    onKeyPress: onKeyPress,
  };

  const divProps = {
    className: customClass ? customClass : `${divClassName} ${className}`,
  };

  const textareaProps = {
    className: customClass ? customClass : `${textAreaClassName} ${className}`,
    placeholder: placeHolder,
    disabled: disabled,
    style: { background: "#F0F0F0" },
    rows: row,
    cols: col,
    name: name,
    ...(onChange ? { value, onChange } : { defaultValue: value }),
  };

  return (
    <>
      {type === "password" ? (
        <div
          {...divProps}
          style={divStyle}
          className={`${customClass || divClassName} flex items-center`}
        >
          {icon}
          <input
            {...{ ...inputProps, className: inputCustomClass || "w-full" }}
            autoComplete="off"
          />

          <div
            onClick={() => setShowPassword(!showPassword)}
            className="cursor-pointer flex-shrink-0 ml-2"
          >
            {showPassword ? (
              <Eye
                className="text-gray-500 hover:text-[#808fa2] transition-colors"
                size={18}
              />
            ) : (
              <EyeOff
                className="text-gray-500 hover:text-[#808fa2] transition-colors"
                size={18}
              />
            )}
          </div>
        </div>
      ) : isIcon ? (
        <div {...divProps} style={divStyle}>
          {icon}
          <input
            {...{ ...inputProps, className: inputCustomClass }}
            autoComplete="off"
          />
        </div>
      ) : type === "textarea" ? (
        <textarea {...textareaProps} autoComplete="off" />
      ) : (
        <div className="focus-within:border focus-within:border-[#aab8c5] rounded-md overflow-hidden border">
          <input {...inputProps} ref={ref} autoComplete="off" />
        </div>
      )}
    </>
  );
};

export default dynamic(() => Promise.resolve(Field), { ssr: false });
