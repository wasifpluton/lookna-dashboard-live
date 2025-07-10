import { toast } from "react-toastify";

export const ShowErrorToast = (message: string) => {
  toast.error(message || "Something went wrong!", {
    style: {
      fontSize: "0.9rem",
      color: "#721c24",
    },
  });
};

export const ShowSuccessToast = (message: string) => {
  toast.success(message || "Something went wrong!", {
    style: {
      fontSize: "0.9rem",
      color: "#008000c9",
    },
  });
};

export const ShowWarningToast = (message: string) => {
  toast.warning(message || "Something went wrong!", {
    style: {
      fontSize: "0.9rem",
      color: "#FFCC00",
    },
  });
};

// Accepts the error object and shows toasts for each detail or the main message
export const ShowApiErrorToast = (error: any) => {
  if (error?.details && Array.isArray(error.details)) {
    error.details.forEach((msg: string) => {
      toast.error(msg || "Something went wrong!", {
        style: {
          fontSize: "0.9rem",
          color: "#721c24",
        },
      });
    });
  } else {
    toast.error(error?.message || "Something went wrong!", {
      style: {
        fontSize: "0.9rem",
        color: "#721c24",
      },
    });
  }
};
