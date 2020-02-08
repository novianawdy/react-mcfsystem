import { all } from "redux-saga/effects";

import dashAppSagas from "./dashApp/saga";

export default function* rootSaga(getState) {
  yield all([dashAppSagas()]);
}
