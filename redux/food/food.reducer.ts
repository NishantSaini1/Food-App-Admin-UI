const initialState = {
  loading: false,
  addCategoryResponse: null,
  updateCategoryResponse: null,
  error: null,
  categories: [],
  total: 0,
  page: 1,
  limit: 10,
  addSuccess: false,
  updateSuccess: false,
};

export const foodReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case "CATEGORY_POST_REQUEST":
      return {
        ...state,
        loading: true,
        error: null,
        addSuccess: false,
      };

    case "CATEGORY_POST_SUCCESS":
      return {
        ...state,
        loading: false,
        addSuccess: true,
        addCategoryResponse: action.payload,
      };

    case "CATEGORY_POST_FAILURE":
      return {
        ...state,
        loading: false,
        addSuccess: false,
        error: action.payload,
      };
    case "CATEGORY_GET_REQUEST":
      return {
        ...state,
        loading: true,
        error: null,
        updateSuccess: false,
      };

    case "CATEGORY_GET_SUCCESS": {
      const raw =
        action.payload.data || action.payload.categories || [];

      // Normalize _id -> id so the table and UI can rely on `id`
      const categories = (raw || []).map((item: any, index: number) => ({
        ...item,
        id: item.id ?? item._id ?? index,
      }));

      return {
        ...state,
        loading: false,
        categories,
        total: action?.payload?.pagination?.total || 0,
        page: action?.payload?.pagination?.page || state.page,
        limit: action?.payload?.pagination?.limit || state.limit,
      };
    }

    case "CATEGORY_GET_FAILURE":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case "CATEGORY_UPDATE_REQUEST":
      return {
        ...state,
        loading: true,
        error: null,
        addSuccess: false,
      };

    case "CATEGORY_UPDATE_SUCCESS":
      return {
        ...state,
        loading: false,
        addSuccess: true,
        updateSuccess: true,
        updateCategoryResponse: action.payload,
      };

    case "CATEGORY_UPDATE_FAILURE":
      return {
        ...state,
        loading: false,
        addSuccess: false,
        error: action.payload,
      };

    default:
      return state;
  }
};
