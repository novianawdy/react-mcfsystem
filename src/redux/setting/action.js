const action = {
  GET_SETTING_REQUEST: "GET_SETTING_REQUEST",
  GET_SETTING_SUCCESS: "GET_SETTING_SUCCESS",
  GET_SETTING_ERROR: "GET_SETTING_ERROR",
  UPDATE_SETTING_REQUEST: "UPDATE_SETTING_REQUEST",
  UPDATE_SETTING_SUCCESS: "UPDATE_SETTING_SUCCESS",
  UPDATE_SETTING_ERROR: "UPDATE_SETTING_ERROR",
  CLEAR_SUCCESS: "CLEAR_SUCCESS",
  CLEAR_ERROR: "CLEAR_ERROR",
  getSettingRequest: () => ({
    type: action.GET_SETTING_REQUEST
  }),
  updateSettingRequest: data => ({
    type: action.UPDATE_SETTING_REQUEST,
    payload: { body: data }
  }),
  clearSuccess: () => ({
    type: action.CLEAR_SUCCESS
  }),
  clearError: () => ({
    type: action.CLEAR_ERROR
  })
};

export default action;