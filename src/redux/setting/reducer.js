import action from "./action";

const initState = {
  setting: localStorage.getItem("setting")
    ? JSON.parse(localStorage.getItem("setting"))
    : {
        global_setting: [],
        mock_setting: []
      },
  loading: false,
  loadingSubmit: false,
  success: undefined,
  error: undefined
};

export default function settingReducer(state = initState, dispatch) {
  switch (dispatch.type) {
    case action.GET_SETTING_REQUEST:
      return {
        ...state,
        loading: true
      };
    case action.GET_SETTING_SUCCESS:
      return {
        ...state,
        loading: false,
        setting: dispatch.setting
      };
    case action.GET_SETTING_ERROR:
      return {
        ...state,
        loading: false,
        error: dispatch.error.message
      };
    case action.UPDATE_SETTING_REQUEST:
      return {
        ...state,
        loadingSubmit: true
      };
    case action.UPDATE_SETTING_SUCCESS:
      return {
        ...state,
        loadingSubmit: false,
        success: dispatch.success.message
      };
    case action.UPDATE_SETTING_ERROR:
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
