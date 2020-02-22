import { all, put, takeLatest } from "redux-saga/effects";
import action from "./action";
import { saveLocal, makeId, saveSession } from "../../lib/helper";

export function* loginRequest({ payload }) {
  const { body } = payload;
  const bearer = makeId(50);

  const user = {
    username: body.username
  };

  // saving user data to localStorage
  localStorage.setItem("user", JSON.stringify(user));

  // saving bearer
  if (body.remember) {
    saveLocal("at", bearer);
  } else {
    saveSession("at", bearer);
  }

  yield put({
    type: action.LOGIN_SUCCESS,
    bearer,
    user
  });
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
