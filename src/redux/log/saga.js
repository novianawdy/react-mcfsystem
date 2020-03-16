import { all, call, put, takeLatest } from "redux-saga/effects";
import action from "./action";
import { apiGet } from "../../lib/helper";
import getLang from "../../lib/getLang";

export function* getLogRequest({ payload }) {
  const { page, filter } = payload;

  let str = null;

  if (filter) {
    let values = Object.assign({}, filter);
    values.start_date = values.date
      ? values.date[0].format("YYYY-MM-DD HH:mm:ss")
      : undefined;
    values.end_date = values.date
      ? values.date[1].format("YYYY-MM-DD HH:mm:ss")
      : undefined;
    delete values.date;

    if (!values.search) delete values.search_by;
    if (!values.flow) delete values.flow_is;
    if (!values.temperature) delete values.temperature_is;

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
    `logs?page=${page}${filter ? `&${str}` : ""}`
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
        type: action.GET_LOG_SUCCESS,
        logs: data,
        current_page,
        last_page,
        page_size: per_page,
        total
      });
    } else if (response && response.status === "fail") {
      yield put({
        type: action.GET_LOG_ERROR,
        error: response
      });
    } else {
      yield put({
        type: action.GET_LOG_ERROR,
        error: { message: getLang({ id: "checkInternet" }) }
      });
    }
  } catch (e) {
    yield put({
      type: action.GET_LOG_ERROR,
      error: { message: getLang({ id: "checkInternet" }) }
    });
  }
}

export default function* rootSaga() {
  yield all([takeLatest(action.GET_LOG_REQUEST, getLogRequest)]);
}
