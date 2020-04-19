const setting = {
  baseUrl: "http://api.mcfsystem.hostkulo.com/",
  wsserver: "api.mcfsystem.hostkulo.com",
  appName: "MCF System",
  appDescription: "Monitoring and Controlling Fluid System",
  footer: "Monitoring and Controlling Fluid System ©2020",
  language: "ID",
  build: false,
};

export const pusherSetting = (token) => ({
  wsHost: setting.wsserver,
  wsPort: 6001,
  authTransport: "ajax",
  authEndpoint: `${setting.baseUrl}broadcasting/auth`,
  auth: {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
  },
});

export const mqttSetting = {
  host: "ws://34.70.45.52",
  options: (id) => ({
    clientId: `MCFSystem_client.${id}`,
    port: 1884,
  }),
  topics: ["monitoring"],
};

export const themeConfig = {
  theme: "themedefault",
};

export default setting;
