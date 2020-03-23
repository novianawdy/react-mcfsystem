import { all, takeLatest, takeEvery, put, call } from "redux-saga/effects";
import { apiGet, apiPost } from "../../lib/helper";
import getLang from "../../lib/getLang";

// Get all notif first
export function* initNotif({ payload }) {
  const { show_unread_only } = payload;
  try {
    const notifications = yield call(
      apiGet,
      show_unread_only ? "notifications?show_unread_only=1" : "notifications"
    );

    // Jika sukses get data notif
    if (notifications && notifications.status === "success") {
      yield put({
        type: "INIT_NOTIFICATION_SUCCESS",
        notifications: notifications.result.data,
        current_page: notifications.result.current_page,
        last_page: notifications.result.last_page,
        total_unview: notifications.result.total_unview
      });
    } else {
      yield put({
        type: "INIT_NOTIFICATION_REQUEST"
      });
    }
  } catch (error) {
    yield put({
      type: "INIT_NOTIFICATION_REQUEST"
    });
  }
}

export function* loadMoreNotif({ payload }) {
  const { page, show_unread_only } = payload;
  try {
    const notifications = yield call(
      apiGet,
      `notifications?${show_unread_only ? "show_unread_only=1&" : ""}page=` +
        page
    );

    // Jika sukses get data notif
    if (notifications && notifications.status === "success") {
      yield put({
        type: "LOAD_MORE_NOTIFICATION_SUCCESS",
        notifications: notifications.result.data,
        current_page: notifications.result.current_page,
        last_page: notifications.result.last_page,
        total_unview: notifications.result.total_unview
      });
    } else if (notifications && notifications.status === "fail") {
      yield put({
        type: "LOAD_MORE_NOTIFICATION_ERROR",
        error: notifications
      });
    } else {
      yield put({
        type: "LOAD_MORE_NOTIFICATION_ERROR",
        error: { message: getLang({ id: "checkInternet" }) }
      });
    }
  } catch (error) {
    yield put({
      type: "LOAD_MORE_NOTIFICATION_ERROR",
      error: { message: getLang({ id: "checkInternet" }) }
    });
  }
}

export function* markAsRead({ payload }) {
  const { notification } = payload;
  const { id } = notification;

  try {
    const notification = yield call(apiPost, "notifications/mark-as-read", {
      notification_id: id
    });

    if (notification && notification.status === "success") {
      yield put({
        type: "SET_OPENED_NOTIFICATION_SUCCESS"
      });
    } else if (notification && notification.status === "fail") {
      yield put({
        type: "SET_OPENED_NOTIFICATION_ERROR",
        error: notification,
        payload
      });
    } else {
      yield put({
        type: "SET_OPENED_NOTIFICATION_ERROR",
        error: { message: getLang({ id: "checkInternet" }) },
        payload
      });
    }
  } catch (error) {
    yield put({
      type: "SET_OPENED_NOTIFICATION_ERROR",
      error: { message: getLang({ id: "checkInternet" }) },
      payload
    });
  }
}

export function* markAllAsRead() {
  try {
    const result = yield call(apiGet, "notifications/mark-all-as-read");

    if (result && result.status === "success") {
      yield put({
        type: "INIT_NOTIFICATION_REQUEST",
        payload: { show_unread_only: true }
      });
    } else if (result && result.status === "fail") {
      yield put({
        type: "MARK_ALL_NOTIFICATIONS_AS_READ_ERROR",
        error: result
      });
    } else {
      yield put({
        type: "MARK_ALL_NOTIFICATIONS_AS_READ_ERROR",
        error: { message: getLang({ id: "checkInternet" }) }
      });
    }
  } catch (error) {
    yield put({
      type: "MARK_ALL_NOTIFICATIONS_AS_READ_ERROR",
      error: { message: getLang({ id: "checkInternet" }) }
    });
  }
}

export default function* rootSaga() {
  yield all([
    yield takeLatest("INIT_NOTIFICATION_REQUEST", initNotif),
    yield takeLatest("LOAD_MORE_NOTIFICATION_REQUEST", loadMoreNotif),
    yield takeEvery("SET_OPENED_NOTIFICATION_REQUEST", markAsRead),
    yield takeLatest("MARK_ALL_NOTIFICATIONS_AS_READ_REQUEST", markAllAsRead)
  ]);
}
