// ================ Dependencies ================
const express = require('express'),
	bodyParser = require('body-parser'),
  logger = require('morgan'),
  mongoose = require('mongoose');

// sets up express app
const app = express();
const port = process.env.PORT || 3000;

// ================ Mongoose Configuration ================
// configure mongoose promises to ES6 Promises
mongoose.Promise = Promise;
// set database configuration
const remoteUri = 'mongodb://heroku_6zgtwlpt:2u5oir8pm0sp4qvkrgvmsrkb7c@ds129394.mlab.com:29394/heroku_6zgtwlpt';
mongoose.connect(remoteUri, { useMongoClient: true });
// const localUri = 'mongodb://localhost/nyt-react';
// mongoose.connect(localUri, { useMongoClient: true });

// save connection as variable
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
		// require('./controllers/html-routes.js')(app);
		// require('./controllers/api-routes.js')(app, passport);
	});
});