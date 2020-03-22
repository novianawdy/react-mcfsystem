import React from "react";
import { ConfigProvider } from "antd";
import { IntlProvider } from "react-intl";
import { ThemeProvider } from "styled-components";
import { Provider } from "react-redux";
import AppLocale from "./languageProvider/AppLocale";
import { getCurrentLanguage } from "./settings/language";
import themes from "./settings/themes/themes";
import setting, { themeConfig } from "./settings/setting";
import { store, history } from "./redux/store";
import Routes from "./router";
import moment from "moment";
import "moment/locale/id";

const currentAppLocale =
  AppLocale[
    getCurrentLanguage(store.getState().dashApp.language || setting.language)
      .locale
  ];
const lang = store.getState().dashApp.language || setting.language;
moment.locale(lang);

const DashApp = props => (
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

export default DashApp;
