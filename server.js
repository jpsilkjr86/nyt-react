// ================ Dependencies ================
const express = require('express'),
	bodyParser = require('body-parser'),
  logger = require('morgan'),
  mongoose = require('mongoose');

// sets up express app
const app = express();
const port = process.env.PORT || 3000;

// ================ Mongoose Configuration ================
// configures mongoose promises to ES6 Promises
mongoose.Promise = Promise;
// sets database configuration
const remoteUri = 'mongodb://heroku_6zgtwlpt:2u5oir8pm0sp4qvkrgvmsrkb7c@ds129394.mlab.com:29394/heroku_6zgtwlpt';
mongoose.connect(remoteUri, { useMongoClient: true });
// for setting up local database connection (make sure to create 'nyt-react' 
// database first on your mongoDB before running this)
// const localUri = 'mongodb://localhost/nyt-react';
// mongoose.connect(localUri, { useMongoClient: true });

// saves connection as variable
const db = mongoose.connection;

// ================ Express Configuration ================
// Configures Express and body parser
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));

// serves public directory as static, enabling html pages to link with their assets
app.use(express.static('public'));

// ============ Webpack Middleware Configurations (Development Only) ============
// first checks to make sure NODE_ENV is in development mode (ie not production mode)
if (process.env.NODE_ENV !== 'production') {
  console.log('NODE_ENV is in development mode.'
  	+ '\nConfiguring webpack-dev-middleware and webpack-hot-middleware...');

  // dependendies for webpack middleware
  const webpack = require('webpack'),
  	webpackDevMiddleware = require('webpack-dev-middleware'),
  	webpackHotMiddleware = require('webpack-hot-middleware'),
  	config = require('./webpack.dev.js');
  const compiler = webpack(config);

  // webpack-dev-middleware emits files compiled by webpack to a live server.
  // webpack-hot-middleware allows hot reload of webpack with express server (just refresh page).
  // more info about webpack-dev-middleware at:
  // https://webpack.js.org/guides/development/#using-webpack-dev-middleware
  // https://github.com/webpack/webpack-dev-middleware
  // for info on integrating hot-middleware and dev-middleware see section "Server" at:
  // https://ditrospecta.com/javascript/react/es6/webpack/heroku/2015/08/08/deploying-react-webpack-heroku.html

  // configures webpack middlewares in development mode
  app.use(webpackHotMiddleware(compiler))
  app.use(webpackDevMiddleware(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath
  }));
}

// ================ Connection Establishment ================
// show any mongoose connection errors
db.on('error', function(error) {
 	console.log('Mongoose Error: ', error);
});

// attempts to establish connection to mongoose db
db.once('open', function() {
	console.log('Mongoose connection successful.');
	// listens to port for running server within mongoose connection callback
	app.listen(port, () => {
		console.log('App listening on port ' + port);
		// sets up routes
		require('./controllers/api-routes.js')(app);
	});
});