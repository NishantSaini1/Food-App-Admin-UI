const initialState = {
    loading: false,
    user: null,
    token: null,
    error: null,
  };
  
  export const authReducer = (
    state = initialState,
    action: any
  ) => {
    switch (action.type) {
      case "LOGIN_REQUEST":
        return { ...state, loading: true, error: null };
  
      case "LOGIN_SUCCESS":
        return {
          ...state,
          loading: false,
          user: action.payload.user,
          token: action.payload.token,
        };
  
      case "LOGIN_FAILURE":
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
  
      default:
        return state;
    }
  };
  