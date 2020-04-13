const {
  override,
  fixBabelImports,
  addLessLoader,
  addWebpackPlugin,
  addWebpackModuleRule,
} = require("customize-cra");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const build = true;

if (build) {
  module.exports = override(
    fixBabelImports("import", {
      libraryName: "antd",
      libraryDirectory: "es",
      style: true,
    }),
    addLessLoader({
      javascriptEnabled: true,
      modifyVars: {
        "@primary-color": "#374afb",
        "@layout-header-background": "#1E1D2E",
        // "@font-family": "Poppins,Helvetica,sans-serif"
      },
    }),

    /** Enable ketika ingin build  */
    addWebpackPlugin(new MiniCssExtractPlugin()),
    addWebpackModuleRule({
      test: /\.css$/i,
      use: [MiniCssExtractPlugin.loader, "css-loader"],
    })
  );
} else {
  module.exports = override(
    fixBabelImports("import", {
      libraryName: "antd",
      libraryDirectory: "es",
      style: true,
    }),
    addLessLoader({
      javascriptEnabled: true,
      modifyVars: {
        "@primary-color": "#374afb",
        "@layout-header-background": "#1E1D2E",
        // "@font-family": "Poppins,Helvetica,sans-serif"
      },
    })
  );
}
