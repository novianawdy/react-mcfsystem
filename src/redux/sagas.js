import { all } from "redux-saga/effects";

import dashAppSagas from "./dashApp/saga";
import authSagas from "./auth/saga";
import logSagas from "./log/saga";
import userSagas from "./user/saga";
import settingSagas from "./setting/saga";
import notificationSagas from "./notification/saga";

export default function* rootSaga(getState) {
  yield all([
    dashAppSagas(),
    authSagas(),
    logSagas(),
    userSagas(),
    settingSagas(),
    notificationSagas()
  ]);
}
