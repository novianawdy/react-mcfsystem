const action = {
  GET_USER_REQUEST: "GET_USER_REQUEST",
  GET_USER_SUCCESS: "GET_USER_SUCCESS",
  GET_USER_ERROR: "GET_USER_ERROR",
  REGISTER_USER_REQUEST: "REGISTER_USER_REQUEST",
  REGISTER_USER_SUCCESS: "REGISTER_USER_SUCCESS",
  REGISTER_USER_ERROR: "REGISTER_USER_ERROR",
  UPDATE_USER_REQUEST: "UPDATE_USER_REQUEST",
  UPDATE_USER_SUCCESS: "UPDATE_USER_SUCCESS",
  UPDATE_USER_ERROR: "UPDATE_USER_ERROR",
  CHANGE_USER_PASSWORD_REQUEST: "CHANGE_USER_PASSWORD_REQUEST",
  CHANGE_USER_PASSWORD_SUCCESS: "CHANGE_USER_PASSWORD_SUCCESS",
  CHANGE_USER_PASSWORD_ERROR: "CHANGE_USER_PASSWORD_ERROR",
  CLEAR_SUCCESS: "CLEAR_SUCCESS",
  CLEAR_ERROR: "CLEAR_ERROR",
  getUserRequest: (page, filter) => ({
    type: action.GET_USER_REQUEST,
    payload: { page, filter }
  }),
  registerUserRequest: (data, page, filter) => ({
    type: action.REGISTER_USER_REQUEST,
    payload: { body: data, page, filter }
  }),
  updateUserRequest: (data, page, filter) => ({
    type: action.UPDATE_USER_REQUEST,
    payload: { body: data, page, filter }
  }),
  changeUserPasswordRequest: (data, page, filter) => ({
    type: action.CHANGE_USER_PASSWORD_REQUEST,
    payload: { body: data, page, filter }
  }),
  clearSuccess: () => ({
    type: action.CLEAR_SUCCESS
  }),
  clearError: () => ({
    type: action.CLEAR_ERROR
  })
};

export default action;
