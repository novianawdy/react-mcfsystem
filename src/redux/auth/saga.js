import { all, call, put, takeLatest } from "redux-saga/effects";
import action from "./action";
import { saveLocal, apiPost } from "../../lib/helper";
import getLang from "../../lib/getLang";

export function* loginRequest({ payload }) {
  const { body } = payload;

  const response = yield call(apiPost, "login", body);

  try {
    if (response && response.status === "success") {
      const { token, user } = response.result;
      // saving user data to localStorage
      localStorage.setItem("user", JSON.stringify(user));

      // saving bearer
      saveLocal("at", token);
      // if (body.remember) {
      //   saveLocal("at", token);
      // } else {
      //   saveSession("at", token);
      // }

      yield put({
        type: action.LOGIN_SUCCESS,
        bearer: token,
        user
      });
    } else if (response && response.status === "fail") {
      yield put({
        type: action.LOGIN_ERROR,
        error: response
      });
    } else {
      yield put({
        type: action.LOGIN_ERROR,
        error: { message: getLang({ id: "checkInternet" }) }
      });
    }
  } catch (e) {
    yield put({
      type: action.LOGIN_ERROR,
      error: { message: getLang({ id: "checkInternet" }) }
    });
  }
}

export function* logoutRequest() {
  const language = localStorage.getItem("language");

  // clearing data
  localStorage.clear();
  sessionStorage.clear();
  localStorage.setItem("language", language);

  window.location.replace("/");

  yield put({
    type: action.LOGOUT_SUCCESS
  });
}

export default function* rootSaga() {
  yield all([
    takeLatest(action.LOGIN_REQUEST, loginRequest),
    takeLatest(action.LOGOUT_REQUEST, logoutRequest)
  ]);
}
