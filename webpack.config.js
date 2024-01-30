const path = require("path");
const src = path.resolve(__dirname, "src");
const dist = path.resolve(__dirname, "dist");

const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: src + "/js/app.ts",
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /nodemodules/,
        use: {
          loader: "ts-loader",
        },
        include: [src],
      },
      {
        test: /.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.html$/i,
        use: "html-loader",
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: "asset/resource",
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".js"],
  },
  output: {
    filename: "./js/app.js",
    path: dist,
    assetModuleFilename: "images/[name].[hash][ext][query]",
  },
  devServer: {
    static: dist,
    port: 3000,
    hot: true,
    open: false,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./index.html",
      minify: {
        collapseWhitespace: true,
      },
      hash: true,
    }),
  ],
  mode: "development",
};
