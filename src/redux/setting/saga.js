import { all, call, put, takeLatest } from "redux-saga/effects";
import action from "./action";
import { apiGet, apiPut } from "../../lib/helper";
import getLang from "../../lib/getLang";

export function* getSettingRequest() {
  const response = yield call(apiGet, "settings?grouped=1");

  try {
    if (response && response.status === "success") {
      const { setting } = response.result;
      localStorage.setItem("setting", JSON.stringify(setting));

      yield put({
        type: action.GET_SETTING_SUCCESS,
        setting
      });
    } else if (response && response.status === "fail") {
      yield put({
        type: action.GET_SETTING_ERROR,
        error: response
      });
    } else {
      yield put({
        type: action.GET_SETTING_ERROR,
        error: { message: getLang({ id: "checkInternet" }) }
      });
    }
  } catch (e) {
    yield put({
      type: action.GET_SETTING_ERROR,
      error: { message: getLang({ id: "checkInternet" }) }
    });
  }
}

export function* updateSettingRequest({ payload }) {
  const { body } = payload;

  const response = yield call(apiPut, "settings", body);

  try {
    if (response && response.status === "success") {
      const { setting } = response.result;

      yield all([
        put({
          type: action.UPDATE_SETTING_SUCCESS,
          setting
        }),
        put({
          type: action.GET_SETTING_REQUEST
        })
      ]);
    } else if (response && response.status === "fail") {
      yield put({
        type: action.UPDATE_SETTING_ERROR,
        error: response
      });
    } else {
      yield put({
        type: action.UPDATE_SETTING_ERROR,
        error: { message: getLang({ id: "checkInternet" }) }
      });
    }
  } catch (e) {
    yield put({
      type: action.UPDATE_SETTING_ERROR,
      error: { message: getLang({ id: "checkInternet" }) }
    });
  }
}

export default function* rootSaga() {
  yield all([
    takeLatest(action.GET_SETTING_REQUEST, getSettingRequest),
    takeLatest(action.UPDATE_SETTING_REQUEST, updateSettingRequest)
  ]);
}
