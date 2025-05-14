const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
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
    test: /\.html$/i,
    loader: 'html-loader',
    options: {
    sources: {
      list: [
        '...',
        {
          tag: 'img',
          attribute: 'src',
          type: 'src',
        },
      ],
    },
},
},
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
        use: [
          'style-loader',    // Добавляет CSS в DOM с помощью тега <style>
          'css-loader',      // Загружает и интерпретирует CSS файлы
          'postcss-loader',],
      },
        {
        test: /\.(jpg|jpeg|png|gif|svg)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[hash].[ext]',
              outputPath: 'images/', // Путь к картинкам
            },
          },
        ],
      },
        {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,  // Обработка шрифтов
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[hash].[ext]', // Хэширование файлов шрифтов
              outputPath: 'fonts/', // Указывает директорию для хранения шрифтов
            },
          },
        ],
        },
      ],
    },
devServer: {
  static: path.join(__dirname, 'dist'),  // Папка, где хранятся собранные файлы
  compress: true,  // Включение сжатия
  port: 9000,  // Порт для dev-сервера
  open: true,  // Автоматически открывает браузер
},
  optimization: {
    minimize: true,  // Включаем минификацию для всех файлов
    minimizer: [
      new CssMinimizerPlugin(),  // Минификация CSS
    ],
      },
    plugins: [
      new HtmlWebpackPlugin({
        template: './src/index.html',  // Шаблон HTML
      }),
          new CleanWebpackPlugin(),
    new MiniCssExtractPlugin(),
    ],
    mode: 'production'  // Установка режима (dev или prod)
  };