const {
  override,
  fixBabelImports,
  addLessLoader,
  addWebpackModuleRule
} = require("customize-cra");

module.exports = override(
  fixBabelImports("import", {
    libraryName: "antd",
    libraryDirectory: "es",
    style: true
  }),
  addLessLoader({
    javascriptEnabled: true,
    modifyVars: {
      "@primary-color": "#374afb",
      "@layout-header-background": "#1E1D2E",
      "@font-family": "Poppins,Helvetica,sans-serif"
    }
  })
);
