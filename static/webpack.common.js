const path = require('path');
const ManifestWebpackPlugin = require('webpack-manifest-plugin');

module.exports = {
  entry: {
    app: './src/index.js'
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      {
        test: /\.css$/i,
        use: ['style-loader','css-loader']
      }
    ]
  },
  resolve: {
    extensions: [
      '.js'
    ]
  },
  plugins: [
    new ManifestWebpackPlugin({
      filename: '../public/manifest.json'
    })
  ]
}
