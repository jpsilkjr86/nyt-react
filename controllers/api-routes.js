// exports as function which takes in app as parameter
module.exports = app => {
	// post route for submitting search, which queries API and res.send's results as json
	app.post('/search', (req, res) => {
		console.log(req.body);
		res.json({response: "test response"});
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