import { all, put, takeLatest } from "redux-saga/effects";
import action from "./action";
import { saveLocal, makeId, saveSession } from "../../lib/helper";

export function* loginRequest({ payload }) {
  const { body } = payload;
  const bearer = makeId(50);
  // saving bearer
  if (body.remember) {
    saveLocal("at", bearer);
  } else {
    saveSession("at", bearer);
  }

  yield put({
    type: action.LOGIN_SUCCESS,
    bearer
  });
}

export default function* rootSaga() {
  yield all([takeLatest(action.LOGIN_REQUEST, loginRequest)]);
}
