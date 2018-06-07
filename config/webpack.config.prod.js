const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
// import ExtractTextPlugin from 'extract-text-webpack-plugin'
var BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
  .BundleAnalyzerPlugin;

const config = {
  mode: "production",
  devtool: false,
  entry: {
    app: path.join(__dirname, "../src/index.js"),
    vendor: [
      "react",
      "react-redux",
      "react-dom"
      //"material-ui",
      //"lodash",
      //"react-sortable-hoc"
    ]
  },
  target: "web",
  output: {
    path: path.join(__dirname, "../build"),
    publicPath: "/",
    filename: "[name].[chunkhash].js"
    // chunkFilename: '[name].[chunkhash].js'
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          chunks: "initial",
          test: "vendor",
          // test: path.resolve(__dirname, "node_modules"),
          name: "vendor",
          enforce: true
        }
      }
    }
  },
  plugins: [
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    new webpack.NamedModulesPlugin(),
    new webpack.NamedChunksPlugin(),
    // new webpack.optimize.CommonsChunkPlugin({
    //   name: "vendor",
    //   minChunks: Infinity
    // }),
    // new webpack.optimize.CommonsChunkPlugin({ name: "runtime" }),
    new webpack.DefinePlugin({
      "process.env": { NODE_ENV: JSON.stringify("production") }
    }),
    new webpack.NoEmitOnErrorsPlugin(),
    // new webpack.optimize.UglifyJsPlugin({
    //   compress: { warnings: false }
    // }),
    new webpack.optimize.AggressiveMergingPlugin(),
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
            presets: [
              "@babel/preset-es2015",
              "@babel/preset-es2016",
              "@babel/preset-es2017",
              "@babel/preset-stage-2",
              "@babel/preset-react"
            ]
          }
        }
      }
    ]
  },
  resolve: {
    extensions: [".js", ".jsx"]
  }
};
if (process.env.REPORT)
  config.plugins.push(
    new BundleAnalyzerPlugin({
      analyzerPort: 4040,
      reportFileName: "report.html",
      statsFilename: "stats.json"
    })
  );
export default config;
