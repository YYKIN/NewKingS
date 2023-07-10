const path = require("path");

module.exports = {
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: "babel-loader",
      },
    ],
  },
  resolve: {
    fallback: {
      util: require.resolve("util/"),
      stream: require.resolve("stream-browserify"),
      assert: require.resolve("assert/"),
      crypto: require.resolve("crypto-browserify"),
      url: require.resolve("url/"),
    },
  },
};
