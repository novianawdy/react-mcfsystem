import React from "react";
import { ConfigProvider } from "antd";
import { IntlProvider } from "react-intl";
import { ThemeProvider } from "styled-components";
import { Provider } from "react-redux";
import PublicRoutes from "./router";
import AppLocale from "./languageProvider/AppLocale";
import { getCurrentLanguage } from "./settings/language";
import themes from "./settings/themes/themes";
import { themeConfig } from "./settings/setting";
import { store } from "./redux/store";

const currentAppLocale =
  AppLocale[
    getCurrentLanguage(store.getState().dashApp.language || "ID").locale
  ];

const DashApp = () => (
  <ConfigProvider locale={currentAppLocale.antd}>
    <IntlProvider
      locale={currentAppLocale.locale}
      messages={currentAppLocale.messages}
    >
      <ThemeProvider theme={themes[themeConfig.theme]}>
        <Provider store={store}>
          <PublicRoutes />
        </Provider>
      </ThemeProvider>
    </IntlProvider>
  </ConfigProvider>
);

export default DashApp;
