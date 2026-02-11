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
      
      // Optional: store token
      localStorage.setItem("accessToken", res?.data?.idToken);
      localStorage.setItem("refreshToken",res?.data?.refreshToken)

    } catch (error: any) {
        console.log("errorerrorerror",error.response)
      dispatch({
        type: "LOGIN_FAILURE",
        payload:
          error?.response?.data?.error ||
          "Login failed. Please try again.",
      });
    }
  };
};
