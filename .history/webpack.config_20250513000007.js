const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');  // Плагин для работы с HTML
const TerserWebpackPlugin = require('terser-webpack-plugin');  // Плагин для минификации JS
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

module.exports = {
  entry: './src/scripts/index.js',  // Точка входа в проект
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.js',
  },
    module: {
      rules: [
        {
          test: /\.js$/,  // Для всех .js файлов
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',  // Транспиляция через Babel
            options: {
              presets: ['@babel/preset-env'],  // Пресет для ES6 и новее
            },
          },
        },
        {
        test: /\.css$/,  // Обработка CSS файлов
        use: ['style-loader', 'css-loader'],
      },
        {
          test: /\.(png|svg|jpg|jpeg|gif)$/i,  // Для обработки изображений
          type: 'asset/resource',
        },
        {
          test: /\.(woff|woff2|eot|ttf|otf)$/i,  // Для шрифтов
          type: 'asset/resource',
        },
      ],
    },
devServer: {
  static: path.join(__dirname, 'dist'),  // Папка, где хранятся собранные файлы
  compress: true,  // Включение сжатия
  port: 9000,  // Порт для dev-сервера
  open: true,  // Автоматически открывает браузер
},
    plugins: [
      new HtmlWebpackPlugin({
        template: './src/index.html',  // Шаблон HTML
        inject: 'body',  // Вставляем <script> в body
      }),
    ],
    mode: 'development'  // Установка режима (dev или prod)
  };