// imports React Component class
import React, { Component } from 'react';

import SnippetCollection from '../SnippetCollection.jsx';

// declares Results component as ES6 class, which will be this file's export
const Results = props => {

  return (
    <div className="panel panel-default">
    	<div className="panel-heading">
    		<h3 className="text-center">Search Results</h3>
    	</div>
      <div className="panel-body">
        <SnippetCollection
          articles={props.searchResults}
          onSaveClick={props.onSaveClick}
          onUnsaveClick={props.onUnsaveClick}
        />
        <button className="btn btn-warning pull-right" onClick={props.clearResults}>Clear</button>
    	</div>
    </div>
  );

}; // end of Results

// exports Results component for other files to use
export default Results;