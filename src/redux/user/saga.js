import { all, call, put, takeLatest } from "redux-saga/effects";
import action from "./action";
import { apiGet, apiPut, apiPost } from "../../lib/helper";
import getLang from "../../lib/getLang";

export function* getUserRequest({ payload }) {
  const { page, filter } = payload;

  let str = null;

  if (filter) {
    let values = Object.assign({}, filter);

    if (!values.search) delete values.search_by;

    Object.keys(values).map(key =>
      values[key]
        ? str
          ? (str += `&${key}=${values[key]}`)
          : (str = `${key}=${values[key]}`)
        : null
    );
  }

  const response = yield call(
    apiGet,
    `user?page=${page}${filter ? `&${str}` : ""}`
  );

  try {
    if (response && response.status === "success") {
      const {
        data,
        current_page,
        last_page,
        per_page,
        total
      } = response.result;

      yield put({
        type: action.GET_USER_SUCCESS,
        users: data,
        current_page,
        last_page,
        page_size: per_page,
        total
      });
    } else if (response && response.status === "fail") {
      yield put({
        type: action.GET_USER_ERROR,
        error: response
      });
    } else {
      yield put({
        type: action.GET_USER_ERROR,
        error: { message: getLang({ id: "checkInternet" }) }
      });
    }
  } catch (e) {
    yield put({
      type: action.GET_USER_ERROR,
      error: { message: getLang({ id: "checkInternet" }) }
    });
  }
}

export function* registerUserRequest({ payload }) {
  const { body, page, filter } = payload;

  const response = yield call(apiPost, "user/register", body);

  try {
    if (response && response.status === "success") {
      yield all([
        put({
          type: action.REGISTER_USER_SUCCESS,
          success: { message: getLang({ id: "user.successRegister" }) }
        }),
        put({
          type: action.GET_USER_REQUEST,
          payload: { page, filter }
        })
      ]);
    } else if (response && response.status === "fail") {
      yield put({
        type: action.REGISTER_USER_ERROR,
        error: response
      });
    } else {
      yield put({
        type: action.REGISTER_USER_ERROR,
        error: { message: getLang({ id: "checkInternet" }) }
      });
    }
  } catch (e) {
    yield put({
      type: action.REGISTER_USER_ERROR,
      error: { message: getLang({ id: "checkInternet" }) }
    });
  }
}

export function* updateUserRequest({ payload }) {
  const { body, page, filter } = payload;

  const response = yield call(apiPut, "user", body);

  try {
    if (response && response.status === "success") {
      yield all([
        put({
          type: action.UPDATE_USER_SUCCESS,
          success: { message: getLang({ id: "user.successUpdate" }) }
        }),
        put({
          type: action.GET_USER_REQUEST,
          payload: { page, filter }
        })
      ]);
    } else if (response && response.status === "fail") {
      yield put({
        type: action.UPDATE_USER_ERROR,
        error: response
      });
    } else {
      yield put({
        type: action.UPDATE_USER_ERROR,
        error: { message: getLang({ id: "checkInternet" }) }
      });
    }
  } catch (e) {
    yield put({
      type: action.UPDATE_USER_ERROR,
      error: { message: getLang({ id: "checkInternet" }) }
    });
  }
}

export function* changeUserPasswordRequest({ payload }) {
  const { body, page, filter } = payload;

  const response = yield call(apiPut, "user/change-password", body);

  try {
    if (response && response.status === "success") {
      yield all([
        put({
          type: action.UPDATE_USER_SUCCESS,
          success: { message: getLang({ id: "user.successChangePassword" }) }
        }),
        put({
          type: action.GET_USER_REQUEST,
          payload: { page, filter }
        })
      ]);
    } else if (response && response.status === "fail") {
      yield put({
        type: action.UPDATE_USER_ERROR,
        error: response
      });
    } else {
      yield put({
        type: action.UPDATE_USER_ERROR,
        error: { message: getLang({ id: "checkInternet" }) }
      });
    }
  } catch (e) {
    yield put({
      type: action.UPDATE_USER_ERROR,
      error: { message: getLang({ id: "checkInternet" }) }
    });
  }
}

export default function* rootSaga() {
  yield all([
    takeLatest(action.GET_USER_REQUEST, getUserRequest),
    takeLatest(action.REGISTER_USER_REQUEST, registerUserRequest),
    takeLatest(action.UPDATE_USER_REQUEST, updateUserRequest),
    takeLatest(action.CHANGE_USER_PASSWORD_REQUEST, changeUserPasswordRequest)
  ]);
}
