import React, { Component } from "react";
import { ConfigProvider, Result, Button, notification, Icon } from "antd";
import { IntlProvider } from "react-intl";
import { ThemeProvider } from "styled-components";
import { compose } from "redux";
import { Provider, connect } from "react-redux";
import Pusher from "pusher-js";

import AppLocale from "../../languageProvider/AppLocale";
import { getCurrentLanguage } from "../../settings/language";
import { store, history } from "../../redux/store";
import themes from "../../settings/themes/themes";
import setting, { themeConfig, pusherSetting } from "../../settings/setting";
import { appRoutes } from "../../router";
import AppLayout from "../../layouts/app/AppLayout";
import { Switch, Route } from "react-router";
import { BrowserRouter, Link } from "react-router-dom";
import getLang from "../../lib/getLang";

import notifActions from "../../redux/notification/action";
import settingActions from "../../redux/setting/action";
import authActions from "../../redux/auth/action";
import { auth } from "../../lib/helper";

const {
  initNotif,
  newNotif,
  addNotif,
  clearFlashNotif,
  setOpenedNotif
} = notifActions;
const { setSetting } = settingActions;
const { setUserData } = authActions;

class App extends Component {
  componentDidMount = () => {
    const { user } = this.props.auth;
    const { initNotif, newNotif, addNotif } = this.props;
    initNotif(true);

    this.pusher = new Pusher("08bc04087062ea175b28f2eba6f03552", pusherSetting);

    this.userChannel = this.pusher.subscribe(
      `private-notification.${user ? user.id : ""}`
    );
    console.log(`subscribing channel:`, this.userChannel.name);

    this.userChannel.bind_global((eventName, data) => {
      // console.log(`event: ${eventName}`, data);

      // ketika user bukan user yang sedang mengubah
      // maka akan menampilkan notifikasi
      if (data && data.payload && data.payload.token !== `Bearer ${auth()}`) {
        newNotif(data.notification);
        this.updateReducer(data);
      }

      // ketika user merupakan user yang sedang mengubah
      // maka notifikasi akan disimpan, tidak ditampilkan
      else if (
        data &&
        data.payload &&
        data.payload.token === `Bearer ${auth()}`
      ) {
        addNotif(data.notification);
        this.updateReducer(data);
      }
    });
  };

  componentDidUpdate = () => {
    const { flash_notification } = this.props.notification;

    if (flash_notification) {
      this.showNotification(flash_notification);
    }
  };

  componentWillUnmount = () => {
    const { user } = this.props.auth;
    this.pusher.unsubscribe(
      `private-notification.${user ? user.username : ""}`
    );
    console.log(`unsubscribing channel:`, this.userChannel.name);
    this.pusher.disconnect();
    console.log(`disconnecting pusher:`, this.pusher);
  };

  updateReducer = data => {
    const { notification, payload } = data;
    const { type } = notification;
    const { setSetting, setUserData } = this.props;
    const { user } = this.props.auth;

    switch (type) {
      // Temperature
      case 1:
        break;
      // Profile Change
      case 2:
        if (user.id === payload.user.id) {
          localStorage.setItem("user", JSON.stringify(payload.user));
          setUserData(payload.user);
        }
        break;
      // Password Change
      case 3:
        break;
      // Setting Change
      case 4:
        localStorage.setItem("setting", JSON.stringify(payload.setting));
        setSetting(payload.setting);
        break;
      default:
        break;
    }
  };

  showNotification = flash_notification => {
    const { clearFlashNotif } = this.props;
    const { type, related_user } = flash_notification;
    const { username } = related_user ? related_user : {};

    let notifConfig = {
      message: getLang({ id: flash_notification.title }),
      description: (
        <span
          dangerouslySetInnerHTML={{
            __html: getLang({
              id: flash_notification.body,
              values: { username: username }
            })
          }}
        />
      ),
      icon: undefined,
      duration: flash_notification.type === 1 ? 20 : 4.5,
      top: 96
    };

    switch (type) {
      // Temperature
      case 1:
        notifConfig.icon = <Icon type="fire" style={{ color: "#f5222d" }} />;
        notification.error(notifConfig);
        break;
      // Profile Change
      case 2:
        notifConfig.icon = <Icon type="idcard" style={{ color: "#1890ff" }} />;
        notification.info(notifConfig);
        break;
      // Password Change
      case 3:
        notifConfig.icon = (
          <Icon type="safety-certificate" style={{ color: "#faad14" }} />
        );
        notification.warning(notifConfig);
        break;
      // Setting Change
      case 4:
        notifConfig.icon = <Icon type="control" style={{ color: "#52c41a" }} />;
        notification.success(notifConfig);
        break;
      default:
        break;
    }

    clearFlashNotif();
  };

  render() {
    const currentAppLocale =
      AppLocale[
        getCurrentLanguage(store.getState().auth.language || setting.language)
          .locale
      ];

    const { location, auth } = this.props;
    const { user } = auth;
    const { url } = this.props.match;

    return (
      <ConfigProvider locale={currentAppLocale.antd}>
        <IntlProvider
          locale={currentAppLocale.locale}
          messages={currentAppLocale.messages}
        >
          <ThemeProvider theme={themes[themeConfig.theme]}>
            <Provider store={store}>
              <BrowserRouter>
                <AppLayout
                  title="MCFSystem"
                  location={location}
                  auth={auth}
                  onClickMenu={pathname => (location.pathname = pathname)}
                >
                  <Switch>
                    {appRoutes.map((data, key) => {
                      if (
                        !data.role ||
                        (data.role && data.role.includes(user.role))
                      ) {
                        return (
                          <Route
                            exact
                            key={key}
                            history={history}
                            path={`${url}${data.path}`}
                            component={data.component}
                          />
                        );
                      } else {
                        return undefined;
                      }
                    })}

                    <Route
                      path="*"
                      render={props => (
                        <Result
                          status="404"
                          title="404"
                          subTitle={getLang({ id: "pageNotExist" })}
                          extra={
                            <Link to="/app/dashboard">
                              <Button type="primary">
                                {getLang({ id: "backHome" })}
                              </Button>
                            </Link>
                          }
                          style={{ padding: "48px 32px 0px 32px" }}
                          {...props}
                        />
                      )}
                    />
                  </Switch>
                </AppLayout>
              </BrowserRouter>
            </Provider>
          </ThemeProvider>
        </IntlProvider>
      </ConfigProvider>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.auth,
    notification: state.notification
  };
};

const mapDispatchToProps = {
  initNotif,
  newNotif,
  addNotif,
  clearFlashNotif,
  setOpenedNotif,
  setSetting,
  setUserData
};

export default compose(connect(mapStateToProps, mapDispatchToProps))(App);
