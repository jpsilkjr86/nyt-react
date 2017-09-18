// imports React Component class
import React, { Component } from 'react';

import SnippetCollection from './SnippetCollection.jsx';
import CustomPanel from './CustomPanel.jsx';

// declares Results component as ES6 class, which will be this file's export
const Results = props => {

  return (
    <CustomPanel heading="Results">
      {/* only displays results if the results array is not empty */}
      {props.searchResults.length > 0 ? (
        <div>
          <SnippetCollection
            articles={props.searchResults}
            onSaveClick={props.onSaveClick}
            onUnsaveClick={props.onUnsaveClick}
          />
          <button className="btn btn-warning pull-right" onClick={props.clearResults}>Clear</button>
        </div>
      ) : (
        <p className="text-center"><em>There are currently no results to display.</em></p>
      )}
    </CustomPanel>
  );

}; // end of Results

// exports Results component for other files to use
export default Results;