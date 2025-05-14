const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

// Определяем, в каком режиме работает Webpack
const isProduction = process.env.NODE_ENV === 'production';

module.exports = {
  entry: './src/scripts/index.js', // Точка входа
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: isProduction ? '[name].[contenthash].js' : 'main.js',  // Используем хэширование в production
  },
  module: {
    rules: [
      {
        test: /\.css$/, // Обработка CSS файлов
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  devServer: {
    static: path.join(__dirname, 'dist'),
    compress: true,
    port: 9000,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
  ],
  mode: isProduction ? 'production' : 'development', // Устанавливаем режим сборки
};
