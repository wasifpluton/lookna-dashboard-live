// src/components/Modal/Modal.tsx

import React, { useEffect, useRef } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  width?: number | string;
  height?: number | string;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  footer,
  width = 400,
  height = "auto",
}) => {
  const modalRef = useRef<HTMLDivElement>(null);

  // Close on ESC key
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{
        backgroundImage: "url('/Auth/layout_bg.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        position: "fixed",
        inset: 0,
        zIndex: 50,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
      onClick={onClose}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "rgba(0,0,0,0.2)",
          zIndex: 0,
        }}
      />
      <div
        ref={modalRef}
        className={`relative rounded-xl shadow-lg flex flex-col ${width} ${height}`}
        style={{
          background: "var(--glass-bg, #fff)",
          maxWidth: "90vw",
          maxHeight: "90vh",
          overflow: "auto",
          zIndex: 1,
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-2xl text-white bg-black/30 rounded-full w-8 h-8 flex items-center justify-center hover:bg-black/60 transition"
          aria-label="Close modal"
        >
          &times;
        </button>
        {title && (
          <div className="px-6 pt-6 pb-2 border-b border-white/10">
            <h2 className="text-lg font-semibold">{title}</h2>
          </div>
        )}
        <div className="p-6 flex-1">{children}</div>
        {footer && (
          <div className="px-6 pb-4 pt-2 border-t border-white/10">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
};

export default Modal;
