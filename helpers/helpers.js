// imports axios for promisified server requests
const axios = require('axios');

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
		} // end of helpers.nyt.search
	} // end of helpers.nyt sub-object
};

module.exports = helpers;