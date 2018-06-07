const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "development",
  resolve: {
    modules: [path.join(__dirname, "src"), "node_modules"],
    extensions: [".js", ".jsx"]
  },
  devtool: "cheap-module-eval-source-map",
  entry: [
    "webpack-hot-middleware/client?reload=true", //note that it reloads the page if hot module reloading fails.
    path.resolve(__dirname, "../src/index.js")
  ],
  target: "web",
  output: {
    path: __dirname + "/public", // Note: Physical files are only output by the production build task `npm run build`.
    publicPath: "/",
    filename: "bundle.js"
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify("development")
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.LoaderOptionsPlugin({
      debug: true,
      minimize: true
    }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "../src/index.html"),
      // hash: true,
      filename: "index.html",
      inject: "body",
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true
      }
    })
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            plugins: ["transform-regenerator"],

            presets: [
              "@babel/preset-es2015",
              "@babel/preset-es2016",
              "@babel/preset-es2017",
              ["@babel/preset-stage-2", { "decoratorsLegacy": true }],
              "@babel/preset-react"
            ]
          }
        }
      }
    ]
  }
};
