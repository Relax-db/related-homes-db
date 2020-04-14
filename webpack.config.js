const path = require('path');

const src = path.join(__dirname, 'client', 'src');
const publicDir = path.join(__dirname, 'client', 'public');

module.exports = {
  mode: 'development',
  entry: `${src}/index.jsx`,
  output: {
    filename: 'bundle.js',
    path: publicDir,
  },
  module: {
    rules: [
      {
        // devtool: "source-map",
        test: /\.jsx?/,
        include: src,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
            plugins: ['transform-object-rest-spread'],
          },
        },
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.json', '.jsx', '.css'],
  },
};
