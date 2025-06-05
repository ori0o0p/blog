const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: './src/index.tsx',
  output: {
    path: path.resolve(__dirname, '_site'),
    filename: 'assets/js/[name].[contenthash].js',
    publicPath: '/blog/'
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: 'ts-loader',
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
      filename: 'index.html',
    }),
    new CopyWebpackPlugin({
      patterns: [
        { from: 'public/api', to: 'api' },
        { from: 'assets/css', to: 'assets/css' },
        { from: 'assets/js', to: 'assets/js' },
        { from: 'public', to: '.', globOptions: { ignore: ['**/api/**', '**/index.html'] } },
      ],
    }),
  ],
  devServer: {
    historyApiFallback: {
      index: '/blog/index.html'
    },
    static: {
      directory: path.join(__dirname, '_site'),
    },
    port: 4000,
  },
};