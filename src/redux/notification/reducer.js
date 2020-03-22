import action from "./action";
const initState = {
  notification_stack: [], // semua notifikasi, diurutkan dari yang terbaru
  flash_notification: null, // notifikasi yang sedang ditampilkan
  show_unread_only: true,
  current_page: 1,
  last_page: null,
  total_unview: 0,
  loading: false,
  loadingInit: false,
  success: undefined,
  error: undefined
};

export default function notificationsReducer(state = initState, dispatch) {
  switch (dispatch.type) {
    case action.INIT_NOTIFICATION_REQUEST: {
      return {
        ...state,
        notification_stack: [],
        show_unread_only: dispatch.payload.show_unread_only,
        current_page: 1,
        last_page: null,
        loadingInit: true
      };
    }
    case action.INIT_NOTIFICATION_SUCCESS: {
      return {
        ...state,
        notification_stack: dispatch.notifications,
        current_page: dispatch.current_page,
        last_page: dispatch.last_page,
        total_unview: dispatch.total_unview,
        loadingInit: false
      };
    }
    case action.LOAD_MORE_NOTIFICATION_REQUEST: {
      return {
        ...state,
        loading: true,
        show_unread_only: dispatch.payload.show_unread_only
      };
    }
    case action.LOAD_MORE_NOTIFICATION_SUCCESS: {
      return {
        ...state,
        notification_stack: [
          ...state.notification_stack,
          ...dispatch.notifications
        ],
        current_page: dispatch.current_page,
        last_page: dispatch.last_page,
        total_unview: dispatch.total_unview,
        loading: false
      };
    }
    case action.LOAD_MORE_NOTIFICATION_ERROR: {
      return {
        ...state,
        error: dispatch.error.message
      };
    }
    case action.MARK_ALL_NOTIFICATIONS_AS_READ_REQUEST: {
      return {
        ...state,
        loadingInit: true
      };
    }
    case action.MARK_ALL_NOTIFICATIONS_AS_READ_ERROR: {
      return {
        ...state,
        loadingInit: false,
        error: dispatch.error.message
      };
    }
    case action.NOTIFICATE_USER: {
      return {
        ...state,
        flash_notification: dispatch.payload
      };
    }
    case action.CLEAR_FLASH_NOTIFICATION: {
      return {
        ...state,
        notification_stack: [state.flash_notification].concat(
          ...state.notification_stack
        ),
        flash_notification: null,
        total_unview: state.total_unview + 1
      };
    }
    case action.ADD_NOTIFICATION: {
      return {
        ...state,
        notification_stack: [dispatch.payload].concat(
          ...state.notification_stack
        ),
        total_unview: state.total_unview + 1
      };
    }
    case action.SET_OPENED_NOTIFICATION_REQUEST: {
      const { index } = dispatch.payload;
      const { notification_stack } = state;

      let notif = notification_stack[index];
      if (notif && !notif.notification_user.is_read) {
        notification_stack.splice(index, 1);

        return {
          ...state,
          notification_stack: notification_stack,
          total_unview: state.total_unview - 1
        };
      } else {
        return state;
      }
    }
    case action.SET_OPENED_NOTIFICATION_ERROR: {
      const { index, notification } = dispatch.payload;
      const { notification_stack } = state;

      let notif = notification_stack[index];
      if (notif.notification_user.is_read) {
        notification_stack.splice(index, 1, notification);

        return {
          ...state,
          notification_stack: notification_stack,
          total_unview: state.total_unview + 1,
          error: dispatch.error.message
        };
      } else {
        return state;
      }
    }
    case action.CLEAR_SUCCESS:
      return {
        ...state,
        success: undefined
      };
    case action.CLEAR_ERROR:
      return {
        ...state,
        error: undefined
      };
    default:
      return state;
  }
}
