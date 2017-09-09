// imports React Component class
import React, { Component } from 'react';

// declares Results component as ES6 class, which will be this file's export
class Results extends Component {
	
	// constructor has no props since this is the parent element
	constructor(props) {
    super(props);

    // set initial state
    this.state = {
      searchHistory: this.props.searchHistory,
			searchResults: this.props.searchResults
		};
    console.log('results:');
    console.log(this.state.searchResults);

    this.clearResults = this.clearResults.bind(this);

	} // end of constructor

  clearResults() {
    this.props.clearResults();
  }

	render() {
    return (
      <div className="panel panel-default">
      	<div className="panel-heading">
      		<h1 className="text-center">Search Results</h1>
      	</div>
        <div className="panel-body">
          <p></p>
          <button className="btn btn-warning pull-right" onClick={this.clearResults}>Clear</button>
      	</div>
      </div>
    )
  } // end of render

} // end of class

// exports Results component for other files to use
export default Results;