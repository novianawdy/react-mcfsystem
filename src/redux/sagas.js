import { all } from "redux-saga/effects";

import dashAppSagas from "./dashApp/saga";
import authSagas from "./auth/saga";

export default function* rootSaga(getState) {
  yield all([dashAppSagas(), authSagas()]);
}
