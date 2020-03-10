import { all } from "redux-saga/effects";

import dashAppSagas from "./dashApp/saga";
import authSagas from "./auth/saga";
import logSagas from "./log/saga";
import settingSagas from "./setting/saga";

export default function* rootSaga(getState) {
  yield all([dashAppSagas(), authSagas(), logSagas(), settingSagas()]);
}
