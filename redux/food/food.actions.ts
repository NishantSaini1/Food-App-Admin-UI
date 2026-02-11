import authApi from "@/services/authApi";
import api from "@/services/api";

export const addCategory = (data: { name: string; isActive: boolean }) => {
  return async (dispatch: any) => {
    try {
      dispatch({ type: "CATEGORY_POST_REQUEST" });

      const res = await authApi.post("/food/category", data);

      dispatch({
        type: "CATEGORY_POST_SUCCESS",
        payload: res.data,
      });
      
      // Optional: store token


    } catch (error: any) {
      dispatch({
        type: "CATEGORY_POST_FAILURE",
        payload:
          error?.response?.data?.message ||
          error?.response?.data?.error ||
          "Please try again.",
      });
    }
  };
};

export const updateCategory = ({
  id,
  name,
  isActive,
}: {
  id: string | number;
  name: string;
  isActive: boolean;
}) => {
  return async (dispatch: any) => {
    try {
      dispatch({ type: "CATEGORY_UPDATE_REQUEST" });

      const res = await authApi.put(`/food/category/${id}`, {
        name,
        isActive,
      });

      dispatch({
        type: "CATEGORY_UPDATE_SUCCESS",
        payload: res.data,
      });
    } catch (error: any) {
      dispatch({
        type: "CATEGORY_UPDATE_FAILURE",
        payload:
          error?.response?.data?.message ||
          error?.response?.data?.error ||
          "Please try again.",
      });
    }
  };
};

export const getCategories = ({
  search = "",
  page = 1,
  limit = 10,
}: {
  search?: string;
  page?: number;
  limit?: number;
}) => {
  return async (dispatch: any) => {
    try {
      dispatch({ type: "CATEGORY_GET_REQUEST" });

      const res = await api.get("/food/category", {
        params: {
          search,
          page,
          limit,
        },
      });

      dispatch({
        type: "CATEGORY_GET_SUCCESS",
        payload: res.data,
      });
    } catch (error: any) {
      dispatch({
        type: "CATEGORY_GET_FAILURE",
        payload:
          error?.response?.data?.error || "Failed to fetch categories",
      });
    }
  };
};

