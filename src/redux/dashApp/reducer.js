import action from "./action";

const initState = {
  language: "ID"
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
