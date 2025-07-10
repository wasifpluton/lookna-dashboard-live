// src/components/CustomUploadBtn/CustomUploadBtn.tsx

import React, { useRef, useState } from "react";
import { Upload, Trash2 } from "lucide-react";

interface CustomUploadBtnProps {
  value?: File | null;
  onChange: (file: File | null) => void;
  previewUrl?: string | null;
  label?: string;
  className?: string;
  placeholder?: string;
  width?: number | string;
}

const CustomUploadBtn: React.FC<CustomUploadBtnProps> = ({
  value,
  onChange,
  previewUrl: externalPreviewUrl,
  label = "Thumbnail",
  className = "",
  placeholder,
  width,
}) => {
  const [internalPreview, setInternalPreview] = useState<string | null>(null);
  const [fileType, setFileType] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    onChange(file);
    if (file) {
      setFileType(file.type);
      setFileName(file.name);
      if (file.type.startsWith("image/")) {
        setInternalPreview(URL.createObjectURL(file));
      } else {
        setInternalPreview(null);
      }
    } else {
      setInternalPreview(null);
      setFileType(null);
      setFileName(null);
    }
  };

  const preview = externalPreviewUrl ?? internalPreview;

  return (
    <div className={`flex flex-col gap-2 mt-4 ${className}`}>
      <label className="text-sm text-textColorDark">{label}</label>
      <input
        ref={inputRef}
        type="file"
        accept="image/*,video/*"
        className="hidden"
        onChange={handleChange}
      />
      <button
        type="button"
        className="px-4 py-2 bg-[var(--primary-theme-color)] text-white rounded cursor-pointer flex items-center justify-center"
        onClick={() => inputRef.current?.click()}
        aria-label="Upload File"
      >
        <Upload className="w-6 h-6" />
      </button>
      {value ? (
        fileType && fileType.startsWith("image/") && preview ? (
          <div className="relative mt-2 w-32 h-32">
            <img
              src={preview}
              alt="Thumbnail Preview"
              className="rounded w-32 h-32 object-cover border"
            />
            <button
              type="button"
              className="absolute top-1 right-1 bg-black/60 rounded-full p-1 text-white hover:bg-red-600 transition"
              onClick={() => {
                setInternalPreview(null);
                setFileType(null);
                setFileName(null);
                onChange(null);
                if (inputRef.current) inputRef.current.value = "";
              }}
              aria-label="Remove File"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ) : fileType && fileType.startsWith("video/") ? (
          <div className="relative mt-2 w-32 h-32 flex items-center justify-center border rounded bg-[var(--glass-bg)] text-white text-center text-xs">
            <span className="truncate px-2">{fileName}</span>
            <button
              type="button"
              className="absolute top-1 right-1 bg-black/60 rounded-full p-1 text-white hover:bg-red-600 transition"
              onClick={() => {
                setInternalPreview(null);
                setFileType(null);
                setFileName(null);
                onChange(null);
                if (inputRef.current) inputRef.current.value = "";
              }}
              aria-label="Remove File"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ) : null
      ) : (
        placeholder && (
          <div className="mt-2 w-32 h-32 flex items-center justify-center border rounded text-gray-400 bg-[var(--glass-bg)] text-center text-xs">
            {placeholder}
          </div>
        )
      )}
    </div>
  );
};

export default CustomUploadBtn;
