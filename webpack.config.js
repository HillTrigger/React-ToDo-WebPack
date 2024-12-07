const path = require("path");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
// const CopyWebpackPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");

const isDev = process.env.NODE_ENV === "development";

console.log("IS DEV: ", isDev);

const filename = (ext) =>
  isDev ? `[name].${ext}` : `[name].[contenthash].${ext}`;

const cssLoaders = (...extra) => {
  const loaders = [
    {
      loader: MiniCssExtractPlugin.loader,
    },
    {
      loader: "css-loader",
    },
  ];
  if (extra) {
    loaders.push(...extra);
  }
  return loaders;
};

module.exports = {
  context: path.resolve(__dirname, "src"),
  devtool: isDev && "source-map",
  entry: {
    index: "./index.js",
  },
  output: {
    filename: filename("js"),
    path: path.resolve(__dirname, "dist"),
  },
  resolve: {
    extensions: [".js", ".json"],
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  optimization: {
    splitChunks: {
      chunks: "all",
    },
    minimize: !isDev,
    minimizer: [
      new CssMinimizerPlugin({
        minimizerOptions: {
          preset: [
            "default",
            {
              discardComments: { removeAll: true },
            },
          ],
        },
      }),
      new TerserPlugin({
        terserOptions: {
          format: {
            comments: false,
          },
        },
        extractComments: false,
      }),
    ],
  },

  plugins: [
    new HTMLWebpackPlugin({
      template: "./index.html", // Путь к вашему шаблону
      favicon: "./assests/favicon.ico", //Путь к вашей иконке
      // chunks: ["main"], // Порядок загрузки скриптов
      // inject: "body", // Скрипты будут вставлены в конец body
    }),
    new CleanWebpackPlugin(),
    // new CopyWebpackPlugin({ // Плагин для копирования каталогов
    //   patterns: [
    //     {
    //       from: path.resolve(__dirname, "./assests"),
    //       to: path.resolve(__dirname, "dist/assests"),
    //     },
    //     {
    //       from: path.resolve(__dirname, "favicon.ico"),
    //       to: path.resolve(__dirname, "dist"),
    //     },
    //   ],
    // }),
    new MiniCssExtractPlugin({
      filename: filename("css"),
    }),
  ],

  module: {
    rules: [
      {
        test: /\.(woff|woff2|ttf|eot)$/i,
        type: "asset/resource", // Webpack 5+ автоматически копирует шрифты в output
        generator: {
          filename: "assets/fonts/[name][ext]", // Укажите путь, куда будут копироваться шрифты
        },
      },
      {
        test: /\.css$/,
        use: cssLoaders(),
      },
      {
        test: /\.s[ac]ss$/,
        use: cssLoaders({
          loader: "sass-loader",
          options: {
            sassOptions: {
              warnRuleAsWarning: true,
            },
          },
        }),
      },
      {
        test: /\.(svg|png|jpe?g|gif)$/i,
        type: "asset/resource",
      },
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
                  targets: "> 0.25%, not dead",
                  useBuiltIns: "usage",
                  corejs: 3,
                },
              ],
            ],
          },
        },
      },
    ],
  },

  devServer: {
    port: 4200,
    hot: isDev,
    liveReload: true,
    open: isDev,
    watchFiles: ["src/**/*"],
  },
};
