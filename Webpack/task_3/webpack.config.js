const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");

module.exports = {
  entry: {
    all: [
      './modules/header/header.js',
      './modules/body/body.js',
      './modules/footer/footer.js',
    ],
  },
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: '[name].bundle.js',
  },
   mode: "development",
   module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(gif|jpe?g|png|svg)$/i,
        type: 'javascript/auto',
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'assets/',
              publicPath: 'assets/',
              esModule: false,
            },
          },
          {
            loader: 'image-webpack-loader',
            options: {
              disable: false,
              mozjpeg: {
                progressive: true,
              },
            },
          },
        ],
      },
   ],
  },
  devServer: {
    host: "127.0.0.1",
    port: 8564,
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({title: "task 3", chunks: ['vendors', 'header', 'body', 'footer']})
  ],
  devtool: 'inline-source-map',
  optimization: {
    splitChunks: {
      chunks: "all",
      name: "vendors",
    },
  },
};