import action from "./action";
import { getLocal, getSession } from "../../lib/helper";
import setting from "../../settings/setting";

const initState = {
  language: localStorage.getItem("language") || setting.language,
  bearer: getLocal("at") ? getLocal("at") : getSession("at"),
  user: localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : {},
  loading: false,
  success: undefined,
  error: undefined
};

export default function authReducer(state = initState, dispatch) {
  switch (dispatch.type) {
    case action.LOGIN_REQUEST:
      return {
        ...state,
        loading: true
      };
    case action.LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        bearer: dispatch.bearer,
        user: dispatch.user
      };
    case action.LOGIN_ERROR:
      return {
        ...state,
        loading: false,
        error: dispatch.error.message
      };
    case action.SET_USER_DATA:
      return {
        ...state,
        user: dispatch.user
      };
    case action.LOGOUT_REQUEST:
      return {
        ...state,
        loading: true
      };
    case action.LOGOUT_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        bearer: null,
        user: {}
      };
    case action.LOGOUT_ERROR:
      return {
        ...state,
        loading: false,
        error: dispatch.error.message
      };
    case action.CHANGE_LANG:
      return {
        ...state,
        language: dispatch.language
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
