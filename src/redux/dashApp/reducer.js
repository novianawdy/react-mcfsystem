import action from "./action";
import setting from "../../settings/setting";

const initState = {
  language: localStorage.getItem("language") || setting.language
};

export default function dashAppReducer(state = initState, dispatch) {
  switch (dispatch.type) {
    case action.CHANGE_LANG:
      return {
        ...state,
        language: dispatch.language
      };
    default:
      return state;
  }
}
