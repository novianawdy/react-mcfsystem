const action = {
  LOGIN_REQUEST: "LOGIN_REQUEST",
  LOGIN_SUCCESS: "LOGIN_SUCCESS",
  LOGIN_ERROR: "LOGIN_ERROR",
  LOGOUT_REQUEST: "LOGOUT_REQUEST",
  LOGOUT_SUCCESS: "LOGOUT_SUCCESS",
  LOGOUT_ERROR: "LOGOUT_ERROR",
  CHANGE_LANG: "CHANGE_LANG",
  CLEAR_SUCCESS: "CLEAR_SUCCESS",
  CLEAR_ERROR: "CLEAR_ERROR",
  loginRequest: data => ({
    type: action.LOGIN_REQUEST,
    payload: { body: data }
  }),
  logoutRequest: () => ({
    type: action.LOGOUT_REQUEST
  }),
  changeLanguage: language => ({
    type: action.CHANGE_LANG,
    language
  }),
  clearSuccess: () => ({
    type: action.CLEAR_SUCCESS
  }),
  clearError: () => ({
    type: action.CLEAR_ERROR
  })
};

export default action;
