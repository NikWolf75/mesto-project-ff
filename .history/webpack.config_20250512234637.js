const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');  // Плагин для работы с HTML
const TerserWebpackPlugin = require('terser-webpack-plugin');  // Плагин для минификации JS

module.exports = (env, argv) => {
  const isProduction = argv.mode === 'production';

  return {
    entry: './scripts/index.js',  // Точка входа
    output: {
      path: path.resolve(__dirname, 'dist'),  // Папка для выходных файлов
      filename: 'main.js',  // Для продакшн сборки использовать хеш
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
          test: /\.css$/,  // Для всех .css файлов
          use: ['style-loader', 'css-loader'],  // Для работы с CSS
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
      static: path.join(__dirname, 'dist'),
      compress: true,
      port: 9000,
    },
    optimization: {
      minimize: isProduction,  // Минификация включена только в продакшн
      minimizer: [new TerserWebpackPlugin()],  // Минификация JS
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './src/index.html',  // Шаблон HTML
        inject: 'body',  // Вставляем <script> в body
      }),
    ],
    mode: 'development'  // Установка режима (dev или prod)
  };
};