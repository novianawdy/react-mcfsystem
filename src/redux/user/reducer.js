import action from "./action";

const initState = {
  users: [],
  filter: null,
  current_page: 1,
  last_page: null,
  page_size: null,
  total: null,
  loading: false,
  loadingSubmit: false,
  success: undefined,
  error: undefined
};

export default function userReducer(state = initState, dispatch) {
  switch (dispatch.type) {
    case action.GET_USER_REQUEST:
      return {
        ...state,
        users: dispatch.payload.page === 1 ? [] : state.users,
        filter: dispatch.payload.filter,
        loading: true
      };
    case action.GET_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        users:
          dispatch.current_page === 1
            ? dispatch.users
            : state.users.concat(dispatch.users),
        current_page: dispatch.current_page,
        last_page: dispatch.last_page,
        page_size: dispatch.page_size,
        total: dispatch.total
      };
    case action.GET_USER_ERROR:
      return {
        ...state,
        loading: false,
        error: dispatch.error.message
      };
    case action.REGISTER_USER_REQUEST:
      return {
        ...state,
        loadingSubmit: true
      };
    case action.REGISTER_USER_SUCCESS:
      return {
        ...state,
        loadingSubmit: false,
        success: dispatch.success.message
      };
    case action.REGISTER_USER_ERROR:
      return {
        ...state,
        loadingSubmit: false,
        error: dispatch.error.message
      };
    case action.UPDATE_USER_REQUEST:
      return {
        ...state,
        loadingSubmit: true
      };
    case action.UPDATE_USER_SUCCESS:
      return {
        ...state,
        loadingSubmit: false,
        success: dispatch.success.message
      };
    case action.UPDATE_USER_ERROR:
      return {
        ...state,
        loadingSubmit: false,
        error: dispatch.error.message
      };
    case action.CHANGE_USER_PASSWORD_REQUEST:
      return {
        ...state,
        loadingSubmit: true
      };
    case action.CHANGE_USER_PASSWORD_SUCCESS:
      return {
        ...state,
        loadingSubmit: false,
        success: dispatch.success.message
      };
    case action.CHANGE_USER_PASSWORD_ERROR:
      return {
        ...state,
        loadingSubmit: false,
        error: dispatch.error.message
      };
    case action.CLEAR_SUCCESS:
      return {
        ...state,
        success: undefined
      };
    case action.CLEAR_ERROR:
      return {
        ...state,
        error: undefined
      };
    default:
      return state;
  }
}
