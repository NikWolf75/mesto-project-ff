const path = require('path');

module.exports = {
  entry: './src/scripts/index.js',  // точка входа
  output: {
    path: path.resolve(__dirname, 'dist'),  // путь к выходной папке
    filename: 'main.js',  // имя выходного файла
  },
  module: {
    rules: [
      {
        test: /\.js$/,  // для всех .js файлов
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',  // используем babel-loader
        },
      },
      {
        test: /\.css$/,  // для всех .css файлов
        use: ['style-loader', 'css-loader'],  // используем стили и CSS-лоадер
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,  // для изображений
        type: 'asset/resource',  // обрабатываем как ресурсы
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,  // для шрифтов
        type: 'asset/resource',
      },
    ],
  },
    devServer: {
      static: path.join(__dirname, 'dist'),  // Папка с выходными файлами
      compress: true,  // Включение сжатия
      port: 9000,  // Порт для dev-сервера
    },
    mode: 'development',
  };
};