const path = require('path');
const Dotenv = require('dotenv-webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ImageminPlugin = require('imagemin-webpack-plugin').default;
const ESLintPlugin = require('eslint-webpack-plugin');
const StylelintPlugin = require('stylelint-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

module.exports = (env, options) => {
  const isDev = options.mode === 'development';

  const config = {
    mode: isDev ? 'development' : 'production',
    devtool: isDev ? 'inline-source-map' : false,
    devServer: {
      open: true,
      compress: true,
      port: 8080,
      historyApiFallback: true,
      static: __dirname + '/src/',
    },
    context: path.join(__dirname, './src'),
    entry: path.join(__dirname, './src', 'index.jsx'),
    output: {
      path: path.resolve(__dirname, 'dist'),
      publicPath: '/', // Раскомментить при запуске проекта в режиме разработки
      filename: '[name].[contenthash].js',
    },
    plugins: [
      new Dotenv(),
      new HtmlWebpackPlugin({
        template: path.join(__dirname, 'src', 'index.html'),
      }),
      new CleanWebpackPlugin({ cleanStaleWebpackAssets: false }),
      new MiniCssExtractPlugin({
        filename: '[name].[contenthash].css',
        chunkFilename: '[id].css',
      }),
      new ImageminPlugin({
        test: /\.(png|gif|svg|jpg|jpeg)$/i,
      }),
      // new ESLintPlugin({ extensions: ['ts', 'tsx', 'js', 'jsx'] }),
      // new StylelintPlugin({ extensions: ['css', 'scss', 'sass'] }),
    ],
    module: {
      rules: [
        {
          test: /\.html$/,
          loader: 'html-loader',
        },
        {
          test: /\.pug$/,
          use: ['html-loader', 'pug-html-loader?pretty=true'],
        },
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          use: 'babel-loader',
        },
        {
          test: /\.tsx?$/,
          exclude: /node_modules/,
          use: 'ts-loader',
        },
        {
          test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
          type: 'asset/resource',
          generator: {
            filename: 'assets/[hash][ext][query]',
          },
        },
        {
          test: /\.(woff(2)?|eot|ttf|otf|svg)$/i,
          type: 'asset/inline',
        },
        {
          test: /\.css$/i,
          use: [
            isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
            'css-loader',
            'postcss-loader',
          ],
        },
        {
          test: /\.(s[ac]ss)$/i,
          use: [
            isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
            'css-loader',
            'postcss-loader',
            'sass-loader',
          ],
        },
      ],
    },
    resolve: {
      extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
    },
    optimization: {
      minimize: true,
      minimizer: [new CssMinimizerPlugin()],
      splitChunks: {
        cacheGroups: {
          styles: {
            name: 'styles',
            type: 'css/mini-extract',
            chunks: 'all',
            enforce: true,
          },
        },
      },
    },
  };

  return config;
};
