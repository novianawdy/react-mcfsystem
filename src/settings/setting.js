import { auth } from "../lib/helper";

const setting = {
  baseUrl: "http://api.mcfsystem.hostkulo.com/",
  wsserver: "api.mcfsystem.hostkulo.com",
  appName: "MCF System",
  appDescription: "Monitoring and Controlling Fluid System",
  footer: "Monitoring and Controlling Fluid System ©2020",
  language: "ID",
  build: false
};

export const pusherSetting = {
  wsHost: setting.wsserver,
  wsPort: 6001,
  authTransport: "ajax",
  authEndpoint: `${setting.baseUrl}broadcasting/auth`,
  auth: {
    headers: {
      Authorization: `Bearer ${auth()}`,
      Accept: "application/json"
    }
  }
};

export const themeConfig = {
  theme: "themedefault"
};

export default setting;
