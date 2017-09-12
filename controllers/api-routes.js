// imports helpers object
const helpers = require('../helpers/helpers.js');

// exports as function which takes in app as parameter
module.exports = app => {
	// post route for submitting search, which queries API and res.send's results as json
	app.post('/search', (req, res) => {
		// saves search parameters as temp constables
		const topic = req.body.topic,
			start_year = req.body.start_year,
			end_year = req.body.end_year;
		// calls helpers.nyt.search, a promise, and sends back result to client
		helpers.nyt.search(topic, start_year, end_year).then(results => {
			console.log('RESULTS FOUND! NUMBER OF RETRIEVED ARTICLES: ' + results.length);
			// early returns if there are no articles to sync
			if (!results.length) {
				return res.json([]);
			}
			// otherwise continues promise chain by syncing results with database
			console.log('SYNCING RESULTS WITH DATABASE...');
			return helpers.nyt.dbSync(results);
		}).then(articles => {
			console.log('SYNCING COMPLETE! SENDING ARTICLES BACK TO CLIENT.');
			res.json(articles);
		}).catch(err => {
			console.log(err);
			console.log('SERVER ENCOUNTERED ERROR EXECUTING SEARCH (SEE ERR LOG)');
			res.send('Server encountered error executing search.');
		});
	});

	// get route for obtaining saved articles in json
	app.get('/articles/saved/all', (req, res) => {
		res.json({response: "test response"});
	});

	// route for saving an article
	app.post('/articles/:id/save', (req, res) => {
		console.log(req.body);
		res.json({response: "Save POST request received", data: req.body});
	});

	// route for unsaving an article
	app.post('/articles/:id/unsave', (req, res) => {
		console.log(req.body);
		res.json({response: "Unave POST request received", data: req.body});
	});
};