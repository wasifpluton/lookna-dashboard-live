// src/components/CustomSelect/CustomSelect.tsx

import React, { useState, useRef, useEffect } from "react";

interface Option {
  value: string;
  label: string;
}

interface CustomSelectProps {
  options: Option[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

const CustomSelect: React.FC<CustomSelectProps> = ({
  options,
  value,
  onChange,
  placeholder = "Select...",
}) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div className={`relative w-full `} ref={ref}>
      <button
        type="button"
        className="w-full p-2 md:p-3 rounded-md  text-white border-2 focus:border-white flex justify-between items-center bg-[var(--glass-bg)]"
        onClick={() => setOpen((o) => !o)}
      >
        <span>
          {value === "" ? (
            <span className="text-gray-400">{placeholder}</span>
          ) : (
            options.find((opt) => opt.value === value)?.label
          )}
        </span>
        <svg
          className={`w-4 h-4 ml-2 transition-transform ${
            open ? "rotate-180" : ""
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>
      {open && (
        <ul
          className="absolute left-0 right-0 mt-1 rounded-md shadow-lg z-50 overflow-hidden"
          style={{ background: "var(--primary-theme-color)" }}
        >
          {/* Empty option for placeholder */}
          <li
            className={`px-4 py-2 bg-[var(--primary-theme-color)] cursor-pointer transition-colors ${
              value === ""
                ? "bg-[var(--primary-theme-color)] text-white"
                : "hover:bg-[var(--primary-theme-color)] hover:text-white"
            }`}
            onClick={() => {
              onChange("");
              setOpen(false);
            }}
          >
            {placeholder}
          </li>
          {options.map((opt) => (
            <li
              key={opt.value}
              className={`px-4 py-2 bg-[var(--glass-bg)] cursor-pointer transition-colors ${
                value === opt.value
                  ? "bg-[var(--primary-theme-color)] text-white"
                  : "hover:bg-[var(--primary-theme-color)] hover:text-white"
              }`}
              onClick={() => {
                onChange(opt.value);
                setOpen(false);
              }}
            >
              {opt.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CustomSelect;
