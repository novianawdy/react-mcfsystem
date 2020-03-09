const action = {
  GET_LOG_REQUEST: "GET_LOG_REQUEST",
  GET_LOG_SUCCESS: "GET_LOG_SUCCESS",
  GET_LOG_ERROR: "GET_LOG_ERROR",
  CLEAR_SUCCESS: "CLEAR_SUCCESS",
  CLEAR_ERROR: "CLEAR_ERROR",
  getLogRequest: (page, filter) => ({
    type: action.GET_LOG_REQUEST,
    payload: { page, filter }
  }),
  clearSuccess: () => ({
    type: action.CLEAR_SUCCESS
  }),
  clearError: () => ({
    type: action.CLEAR_ERROR
  })
};

export default action;
