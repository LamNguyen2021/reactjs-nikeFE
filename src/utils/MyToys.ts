import { toast } from "react-toastify";

export const notifiSuccess = (str: string) => {
  toast.success("🦄" + str.toUpperCase(), {
    position: "top-right",
    autoClose: 2500,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
};

export const notifiError = (str: string) => {
  toast.error("🦄" + str.toUpperCase(), {
    position: "top-right",
    autoClose: 2500,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
};
