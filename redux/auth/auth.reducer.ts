const initialState = {
  loading: false,
  user: null,
  token: null,
  error: null,
};

export const authReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case "LOGIN_REQUEST":
      return { ...state, loading: true, error: null };

    case "LOGIN_SUCCESS":
      return {
        ...state,
        loading: false,
        user: action.payload.user || state.user,
        token: action.payload.token || action.payload.idToken || null,
      };

    case "LOGIN_FAILURE":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case "LOGOUT":
      return {
        ...initialState,
      };

    default:
      return state;
  }
};
