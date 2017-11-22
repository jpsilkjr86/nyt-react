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
	app.get('/users/:userid/articles/saved/all', (req, res) => {
		console.log('RETRIEVING SAVED ARTICLES...');
		// calls helpers function for retrieving saved articles
		helpers.articles.getSaved().then(results => {
			console.log(results.length + ' ARTICLES FOUND! SENDING BACK TO CLIENT...');
			res.json(results);
		}).catch(err => {
			console.log(err);
			console.log('ERROR RETRIEVING SAVED ARTICLES (SEE LOG)');
			res.send('Error: server was unable to retrieve saved articles.');
		});
	});

	// route for retrieving article data for a single article
	app.get('/articles/:id', (req, res) => {
		console.log('GETTING ARTICLE DATA FOR ID ' + req.params.id + '...');
		// fetches article data via helper function
		helpers.articles.getOne(req.params.id).then(result => {
			console.log(result);
			console.log('ARTICLE FOUND! RETURNING DATA TO CLIENT.');
			res.json(result);
		}).catch(err => {
			console.log(err);
			console.log('ERROR GETTING ARTICLE DATA (SEE LOG)');
			res.send('Error: server was unable to retrieve article data.');
		});
	});

	// route for saving an article
	app.post('/users/:userid/articles/:id/save', (req, res) => {
		console.log('SAVING ARTICLE OF ID ' + req.params.id + '...');
		// saves article through helper function
		helpers.articles.save(req.params.id).then(result => {
			console.log(result);
			console.log('ARTICLE SAVED!');
			res.send('Article successfully saved!');
		}).catch(err => {
			console.log(err);
			console.log('ERROR SAVING ARTICLE (SEE LOG)');
			res.send('Error: server was unable to save article.');
		});
	});

	// route for unsaving an article
	app.post('/users/:userid/articles/:id/unsave', (req, res) => {
		console.log('UNSAVING ARTICLE OF ID ' + req.params.id + '...');
		// unsaves article through helper function
		helpers.articles.unsave(req.params.id).then(result => {
			console.log(result);
			console.log('ARTICLE UNSAVED.');
			res.send('Article successfully unsaved.');
		}).catch(err => {
			console.log(err);
			console.log('ERROR UNSAVING ARTICLE (SEE LOG)');
			res.send('Error: server was unable to unsave article.');
		});
	});
};