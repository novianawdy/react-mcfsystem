import React, { Component } from "react";
import { ConfigProvider } from "antd";
import { IntlProvider } from "react-intl";
import { ThemeProvider } from "styled-components";
import { compose } from "redux";
import { Provider, connect } from "react-redux";

import AppLocale from "../../languageProvider/AppLocale";
import { getCurrentLanguage } from "../../settings/language";
import { store, history } from "../../redux/store";
import themes from "../../settings/themes/themes";
import setting, { themeConfig } from "../../settings/setting";
import Routes from "../../router";

class App extends Component {
  state = {};
  render() {
    const currentAppLocale =
      AppLocale[
        getCurrentLanguage(store.getState().auth.language || setting.language)
          .locale
      ];
    return (
      <ConfigProvider locale={currentAppLocale.antd}>
        <IntlProvider
          locale={currentAppLocale.locale}
          messages={currentAppLocale.messages}
        >
          <ThemeProvider theme={themes[themeConfig.theme]}>
            <Provider store={store}>
              <Routes history={history} />
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
