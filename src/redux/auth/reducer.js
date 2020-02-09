import action from "./action";
import { getLocal, getSession } from "../../lib/helper";
import setting from "../../settings/setting";

const initState = {
  language: localStorage.getItem("language") || setting.language,
  bearer: getLocal("at") || getSession("at"),
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
        bearer: dispatch.bearer
      };
    case action.LOGIN_ERROR:
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
