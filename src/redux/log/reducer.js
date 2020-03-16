import action from "./action";

const initState = {
  logs: [],
  filter: null,
  current_page: 1,
  last_page: null,
  page_size: null,
  total: null,
  loading: false,
  success: undefined,
  error: undefined
};

export default function logReducer(state = initState, dispatch) {
  switch (dispatch.type) {
    case action.GET_LOG_REQUEST:
      return {
        ...state,
        logs: dispatch.payload.page === 1 ? [] : state.logs,
        filter: dispatch.payload.filter,
        loading: true
      };
    case action.GET_LOG_SUCCESS:
      return {
        ...state,
        loading: false,
        logs:
          dispatch.current_page === 1
            ? dispatch.logs
            : state.logs.concat(dispatch.logs),
        current_page: dispatch.current_page,
        last_page: dispatch.last_page,
        page_size: dispatch.page_size,
        total: dispatch.total
      };
    case action.GET_LOG_ERROR:
      return {
        ...state,
        loading: false,
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
