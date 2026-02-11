import toast from "react-hot-toast";

export const toastMiddleware = () => (next: any) => (action: any) => {
  // Skip toasts entirely for category GET actions
  if (action.type.startsWith("CATEGORY_GET_")) {
    return next(action);
  }

  if (action.type.endsWith("_SUCCESS")) {
    toast.success(action.payload?.message || "Success");
  }

  if (action.type.endsWith("_FAILURE")) {
    toast.error(action.payload || "Something went wrong");
  }

  return next(action);
};
