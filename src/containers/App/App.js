import React, { Component } from "react";
import { ConfigProvider, Result, Button } from "antd";
import { IntlProvider } from "react-intl";
import { ThemeProvider } from "styled-components";
import { compose } from "redux";
import { Provider, connect } from "react-redux";

import AppLocale from "../../languageProvider/AppLocale";
import { getCurrentLanguage } from "../../settings/language";
import { store, history } from "../../redux/store";
import themes from "../../settings/themes/themes";
import setting, { themeConfig } from "../../settings/setting";
import { appRoutes } from "../../router";
import AppLayout from "../../layouts/app/AppLayout";
import { Switch, Route } from "react-router";
import { BrowserRouter, Link } from "react-router-dom";
import getLang from "../../lib/getLang";

class App extends Component {
  state = {};
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
    auth: state.auth
  };
};

export default compose(connect(mapStateToProps))(App);
