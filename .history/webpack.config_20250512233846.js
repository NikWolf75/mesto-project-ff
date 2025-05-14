const path = require('path');

module.exports = (env, argv) => {
  const isProduction = argv.mode === 'production';

  return {
    entry: 'src\scripts\index.js',  // Точка входа
    output: {
      path: path.resolve(__dirname, 'dist'),  // Папка для выходных файлов
      filename: 'bundle.js',  // Имя выходного файла
    },
    module: {
      rules: [
        {
          test: /\.js$/,  // Для всех .js файлов
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',  // Для транспиляции через Babel
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
      static: path.join(__dirname, 'dist'),  // Папка с выходными файлами
      compress: true,  // Включение сжатия
      port: 9000,  // Порт для dev-сервера
    },
    mode: 'development'  // Установка режима (dev или prod)
  };
};