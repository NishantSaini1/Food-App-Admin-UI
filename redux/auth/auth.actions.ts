import api from "@/services/api";

export const login = (data: { email: string; password: string }) => {
  return async (dispatch: any) => {
    try {
      dispatch({ type: "LOGIN_REQUEST" });

      const res = await api.post("/admin/login", data);

      dispatch({
        type: "LOGIN_SUCCESS",
        payload: res.data,
      });

      // Store tokens for subsequent requests
      if (typeof window !== "undefined") {
        localStorage.setItem("accessToken", res?.data?.idToken || res?.data?.token || "");
        if (res?.data?.refreshToken) {
          localStorage.setItem("refreshToken", res.data.refreshToken);
        }
      }
    } catch (error: any) {
      console.log("login error", error?.response);
      dispatch({
        type: "LOGIN_FAILURE",
        payload:
          error?.response?.data?.error ||
          "Login failed. Please try again.",
      });
    }
  };
};

export const logout = () => {
  return (dispatch: any) => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
    }

    dispatch({ type: "LOGOUT" });
  };
};
