const action = {
  INIT_NOTIFICATION_REQUEST: "INIT_NOTIFICATION_REQUEST",
  INIT_NOTIFICATION_SUCCESS: "INIT_NOTIFICATION_SUCCESS",
  LOAD_MORE_NOTIFICATION_REQUEST: "LOAD_MORE_NOTIFICATION_REQUEST",
  LOAD_MORE_NOTIFICATION_SUCCESS: "LOAD_MORE_NOTIFICATION_SUCCESS",
  LOAD_MORE_NOTIFICATION_ERROR: "LOAD_MORE_NOTIFICATION_ERROR",
  MARK_ALL_NOTIFICATIONS_AS_READ_REQUEST:
    "MARK_ALL_NOTIFICATIONS_AS_READ_REQUEST",
  MARK_ALL_NOTIFICATIONS_AS_READ_ERROR: "MARK_ALL_NOTIFICATIONS_AS_READ_ERROR",
  NOTIFICATE_USER: "NOTIFICATE_USER",
  CLEAR_FLASH_NOTIFICATION: "CLEAR_FLASH_NOTIFICATION",
  ADD_NOTIFICATION: "ADD_NOTIFICATION",
  SET_OPENED_NOTIFICATION_REQUEST: "SET_OPENED_NOTIFICATION_REQUEST",
  SET_OPENED_NOTIFICATION_ERROR: "SET_OPENED_NOTIFICATION_ERROR",
  CLEAR_SUCCESS: "CLEAR_SUCCESS",
  CLEAR_ERROR: "CLEAR_ERROR",
  initNotif: (show_unread_only = true) => ({
    type: action.INIT_NOTIFICATION_REQUEST,
    payload: { show_unread_only }
  }),
  loadMoreNotif: (page, show_unread_only = true) => ({
    type: action.LOAD_MORE_NOTIFICATION_REQUEST,
    payload: { page, show_unread_only }
  }),
  markAllNotifAsRead: () => ({
    type: action.MARK_ALL_NOTIFICATIONS_AS_READ_REQUEST
  }),
  setOpenedNotif: (index, notification) => ({
    type: action.SET_OPENED_NOTIFICATION_REQUEST,
    payload: { index, notification }
  }),
  newNotif: notification => ({
    type: action.NOTIFICATE_USER,
    payload: {
      ...notification,
      is_read: false
    }
  }),
  addNotif: notification => ({
    type: action.ADD_NOTIFICATION,
    payload: {
      ...notification,
      is_read: false
    }
  }),
  clearFlashNotif: () => ({
    type: action.CLEAR_FLASH_NOTIFICATION
  }),
  clearSuccess: () => ({
    type: action.CLEAR_SUCCESS
  }),
  clearError: () => ({
    type: action.CLEAR_ERROR
  })
};

export default action;
