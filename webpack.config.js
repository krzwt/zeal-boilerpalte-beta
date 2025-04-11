// Webpack config (ES6 Compatible) with full comments

import path from "path";
import { fileURLToPath } from "node:url";
import TerserPlugin from "terser-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import CssMinimizerPlugin from "css-minimizer-webpack-plugin";
import { WebpackManifestPlugin } from "webpack-manifest-plugin";

// Get current file path and directory
const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

// Detect if we're in development mode
const isDev = process.argv.includes("--watch");

// Base plugins always applied
const plugins = [
  new MiniCssExtractPlugin({
    filename: "css/[name].[contenthash].css",
    chunkFilename: "css/[id].[contenthash].css",
  }),
  new WebpackManifestPlugin({
    publicPath: "/",     // Ensure proper public path
    basePath: "",        // No double prefix
  }),
];

// Export Webpack config object
export default {
  mode: isDev ? "development" : "production",

  entry: {
    main: ["./sources/js/script.js", "./sources/scss/style.scss"],
  },

  output: {
    path: path.resolve(dirname, "public"),
    filename: "js/[name].[contenthash].js",
    clean: true,
    publicPath: "/",
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              [
                "@babel/preset-env",
                {
                  targets: {
                    esmodules: true,
                  },
                  bugfixes: true,
                  modules: false,
                },
              ],
            ],
            cacheDirectory: true,
          },
        },
      },
      {
        test: /\.(scss|css)$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
      },
      {
        test: /\.(png|jpe?g|gif|svg|webp|avif)$/i,
        type: "asset/resources",
        generator: {
          filename: "images/[name][ext][query]",
        },
      },
    ],
  },

  resolve: {
    extensions: [".scss"],
    alias: {
      "@scss": path.resolve(dirname, "sources/scss"),
    },
  },

  plugins,

  optimization: {
    minimize: !isDev,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          ecma: 2015,
          compress: {
            drop_console: !isDev,
          },
        },
      }),
      new CssMinimizerPlugin(),
    ],
  },

  target: ["web", "es2015"],
  
  devtool: "cheap-module-source-map",

  watch: isDev,

  stats: {
    colors: true,
    modules: false,
    children: false,
    chunks: false,
    chunkModules: false,
  },

  performance: {
    hints: isDev ? false : "warning",
    maxEntrypointSize: 512000,
    maxAssetSize: 512000,
  },
};
