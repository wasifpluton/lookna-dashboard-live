import React from "react";

const ConfirmationModal = ({
  isOpen,
  onClose,
  onConfirm,
  message = "Are you sure?",
}: {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  message?: string;
}) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-lg p-6 w-full max-w-sm shadow-lg">
        <div className="mb-4 text-gray-800 text-lg">{message}</div>
        <div className="flex justify-end gap-2">
          <button
            className="px-4 py-2 rounded bg-gray-200 text-gray-700"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 rounded bg-red-600 text-white"
            onClick={() => {
              onConfirm();
              onClose();
            }}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
