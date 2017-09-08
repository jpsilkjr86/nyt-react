const path = require('path');
// webpack configuration for all environments (starting point)
module.exports = {
  // entry point for react app
  entry: "./app/app.js",
  // output of compiled js (bundle.js)
  output: {
    path: path.join(__dirname, '/public'),
    publicPath: '/',
    filename: "public/bundle.js"
  },
  // transformations
  module: {
    loaders: [
      {
        // limited to .js or .jsx extensions
        test: /\.jsx?$/,
        // only look inside app folder
        include: /app/,
        // redundant step; excludes any node_modules files
        exclude: /node_modules/
        loader: "babel",
        query: {
          // transformations
          presets: ["react", "es2015"]
        }
      }
    ]
  }
};
