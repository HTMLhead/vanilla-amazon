const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;

module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
    ],
  },
  devServer: {
    contentBase: path.join(__dirname, "./dist/"),
    port: 9000,
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "Project Demo",
      minify: {
        collapseWhitespace: true,
      },
      hash: true,
      template: "./src/index.html",
    }),
    new BundleAnalyzerPlugin(),
  ],
};
