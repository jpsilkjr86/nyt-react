// imports axios for promisified server requests
const axios = require('axios');

// imports database models
const Article = require('../models/Article.js');

// instantiates object to be exported
const helpers = {
	// nyt sub-object
	nyt: {
		// stores apiKey
		apiKey: '2435b0927da3480c82c5a009cb4f4375',
		url: 'https://api.nytimes.com/svc/search/v2/articlesearch.json',
		// nyt search helper method, start and end years default to empty strings
		search: (topic, start_year='', end_year='') => {
			// returns promise that resolves with results or rejects with raw response data or err
			return new Promise ( (resolve, reject) => {
				// builds params object
				const params = {
					q: topic,
					"api-key": helpers.nyt.apiKey,
					sort: "newest",
					fq: "document_type:article"
				};
				// adds begin_date and end_date parameters if necessary
				if (start_year != '') {
					params.begin_date = start_year + '0101';
				} if (end_year != '') {
					params.end_date = end_year + '0101';
				}
				console.log(params);
				// builds config object for axios request
				const config = {method: 'get', url: helpers.nyt.url, params: params };
		    // returns thenable promise which executes get request
		    axios(config).then(result => {
		    	console.log('RESPONSE RECEIVED FROM API REQUEST');
		    	// early returns if the API get request failed
		    	if (result.data.status !== 'OK') {
		    		console.log('API request failed.')
		    		return reject(result.data);
		    	}
		    	// otherwise resolves with retrieved documents
		    	console.log('RESPONSE STATUS: OK! RETURNING RETRIEVED DOCUMENTS...')
		    	resolve(result.data.response.docs);
		    }).catch(err => {
		    	console.log('ERROR PERFORMING GET REQUEST TO NYTIMES');
		    	reject(err);
		    }); // end of axios promise
			}); // end of returned Promise
		}, // end of helpers.nyt.search
		// syncs NY-Times articles with database
		dbSync: (results) => {
			// declared promisesAry as temp array
			const promisesAry = [];
			// loop through results and builds array of promises for saving articles to database
			for (let i = 0; i < results.length; i++) {
				// generate new promise for each article and pushes them onto promisesAry
				let query = {link: results[i].web_url};
				let newData = {
					headline: results[i].headline.main,
					summary: results[i].snippet,
					byline: results[i].byline.original,
					date: results[i].pub_date
				};
				// ensures that article is upserted, the doc in callback reflects 
				// updated data, and defaults are set upon upsert (usually doesnt happen)
				// https://stackoverflow.com/questions/25755521/mongoose-upsert-does-not-create-default-schema-property
				let options = {upsert: true, new: true, setDefaultsOnInsert: true};
				// push promise of exec() onto promisesAry
				promisesAry.push(Article.findOneAndUpdate(query, newData, options).exec());
			} // end of for-loop
			// returns Promise.all of promisesAry array
			return Promise.all(promisesAry);
		} // end of helpers.nyt.dbSync
	}, // end of helpers.nyt sub-object
	// helpers sub-object for handling articles in database
	articles: {
		// method for saving article to database
		save: id => {
			return Article.findById(id).exec().then(article => {
				article.saved = true;
				return article.save();
			});
		}, // end of helpers.articles.save
		// method for unsaving article to database
		unsave: id => {
			return Article.findById(id).exec().then(article => {
				article.saved = false;
				return article.save();
			});
		}, // end of helpers.articles.unsave
		// method for retrieving all saved articles
		getSaved: () => {
			return Article.find({saved: true}).sort('-date').exec();
		}, // end of helpers.articles.getSaved
		// method for retrieving data for a single article by id
		getOne: id => {
			return Article.findById(id).exec();
		} // end of helpers.articles.getOne
	} // end of helpers.articles sub-object
};

module.exports = helpers;